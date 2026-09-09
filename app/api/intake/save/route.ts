import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, supabase } from '@/lib/supabase';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';
import { clinicIdForLocation } from '@/lib/clinic';
import { notifyClinicAboutLead } from '@/lib/clinic-lead-notifications';
import {
  mergeUtms,
  readUtmsFromCookieHeader,
  readUtmsFromSearchParams,
  utmsForCrmInsert,
} from '@/lib/utm';

/**
 * Fire-and-forget POST to a clinic notification webhook so submissions
 * land somewhere humans actually see (Slack/Zapier/Make/etc.). Disabled
 * unless INTAKE_NOTIFICATION_WEBHOOK_URL is set. Failures are swallowed
 * so they never break the patient-facing submit.
 */
function notifyClinic(payload: Record<string, any>): void {
  const url = process.env.INTAKE_NOTIFICATION_WEBHOOK_URL;
  if (!url) return;
  const timeoutMs = parseInt(process.env.INTAKE_NOTIFICATION_TIMEOUT_MS || '5000', 10);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.INTAKE_NOTIFICATION_WEBHOOK_SECRET
        ? { 'X-Webhook-Secret': process.env.INTAKE_NOTIFICATION_WEBHOOK_SECRET }
        : {}),
    },
    body: JSON.stringify(payload),
    signal: controller.signal,
  })
    .catch((err) => {
      console.error('Intake notification webhook failed:', err);
    })
    .finally(() => clearTimeout(timeoutId));
}

function channelFromAttribution(source?: string): string {
  const normalized = source?.trim().toLowerCase();
  if (normalized === 'facebook') return 'facebook';
  if (normalized === 'instagram') return 'instagram';
  if (normalized === 'linkedin') return 'linkedin';
  if (normalized === 'google') return 'google_business';
  return 'website';
}

async function mirrorSubmittedIntakeToCRM(
  submissionId: string,
  body: Record<string, any>,
  request: NextRequest,
): Promise<void> {
  const serverSupabase = createServerSupabaseClient();
  const patientData = body.patient_data || {};
  const firstName = String(patientData.first_name || '').trim() || 'Web';
  const lastName = String(patientData.last_name || '').trim() || 'enquiry';
  const reference = `INTAKE-${submissionId.slice(0, 8).toUpperCase()}`;
  const locationSlug = body.preferred_location || patientData.preferred_location;
  const clinicId = clinicIdForLocation(locationSlug);
  const note = `Quick intake ${submissionId} · Reference: ${reference} · Preferred location: ${body.preferred_location || 'not provided'}`;
  const utms = mergeUtms(
    {
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
      utm_content: body.utm_content,
      utm_term: body.utm_term,
    },
    readUtmsFromCookieHeader(request.headers.get('cookie')),
    readUtmsFromSearchParams(request.nextUrl.searchParams),
  );

  const { data: existing } = await serverSupabase
    .from('crm_leads')
    .select('id')
    .eq('notes', note)
    .limit(1);

  if (existing?.length) return;

  const { data: lead, error } = await serverSupabase.from('crm_leads').insert({
    external_id: reference,
    clinic_id: clinicId,
    first_name: firstName,
    last_name: lastName,
    phone: String(patientData.phone || '').trim(),
    email: patientData.email || null,
    status: 'new',
    priority: 'low',
    urgency_level: 'low',
    channel_source: channelFromAttribution(utms.utm_source),
    funnel_type: body.program_interest || null,
    ...utmsForCrmInsert(utms),
    notes: note,
  }).select('id').single();

  if (error || !lead) {
    // The intake is already safely stored. Keep the patient-facing submission
    // successful while making the AIMOS mirror failure visible to operators.
    console.error('Failed to mirror submitted intake into AIMOS lead queue:', error);
    return;
  }

  await notifyClinicAboutLead(serverSupabase, {
    clinicId,
    leadId: lead.id,
    reference,
    title: 'New website intake',
    type: 'website_intake_lead',
    name: `${firstName} ${lastName}`,
    email: patientData.email || null,
    phone: String(patientData.phone || '').trim(),
    requestLabel: body.program_interest || 'Quick intake',
    source: utms.utm_source || 'website',
    location: locationSlug || 'edmonton-main-hub',
    replyTo: patientData.email || null,
  }).catch((notificationError) => {
    console.error('Intake lead notification failed unexpectedly:', notificationError);
  });
}

export async function POST(request: NextRequest) {
  const clientId = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimit = checkRateLimit(`intake-save:${clientId}`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      {
        status: 429,
        headers: getRateLimitHeaders(rateLimit),
      }
    );
  }

  try {
    const body = await request.json();
    const {
      session_id,
      submission_id,
      patient_data,
      injury_data,
      insurance_data,
      medical_history,
      consent_data,
      preferred_location,
      status = 'draft',
    } = body;

    // Persist preferred_location inside patient_data so we stay schemaless
    // (no Supabase migration required for this PR).
    const enrichedPatientData = {
      ...(patient_data || {}),
      ...(preferred_location ? { preferred_location } : {}),
    };

    if (!session_id) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    if (submission_id) {
      const { data, error } = await supabase
        .from('intake_submissions')
        .update({
          patient_data: enrichedPatientData,
          injury_data: injury_data || {},
          insurance_data: insurance_data || {},
          medical_history: medical_history || {},
          consent_data: consent_data || {},
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', submission_id)
        .select()
        .single();

      if (error) {
        console.error('Error updating intake:', error);
        return NextResponse.json(
          { error: 'Failed to update intake' },
          { status: 500 }
        );
      }

      if (status === 'submitted') {
        await mirrorSubmittedIntakeToCRM(data.id, body, request);
        notifyClinic({
          event: 'intake_submitted',
          submission_id: data.id,
          session_id,
          patient_data: enrichedPatientData,
          injury_data: injury_data || {},
          insurance_data: insurance_data || {},
          preferred_location: preferred_location || null,
          status: data.status,
          submitted_at: new Date().toISOString(),
        });
      }

      return NextResponse.json(
        { success: true, id: data.id, status: data.status },
        { headers: getRateLimitHeaders(rateLimit) }
      );
    } else {
      const { data, error } = await supabase
        .from('intake_submissions')
        .insert({
          session_id,
          patient_data: enrichedPatientData,
          injury_data: injury_data || {},
          insurance_data: insurance_data || {},
          medical_history: medical_history || {},
          consent_data: consent_data || {},
          status,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating intake:', error);
        return NextResponse.json(
          { error: 'Failed to create intake' },
          { status: 500 }
        );
      }

      if (status === 'submitted') {
        await mirrorSubmittedIntakeToCRM(data.id, body, request);
        notifyClinic({
          event: 'intake_submitted',
          submission_id: data.id,
          session_id,
          patient_data: enrichedPatientData,
          injury_data: injury_data || {},
          insurance_data: insurance_data || {},
          preferred_location: preferred_location || null,
          status: data.status,
          submitted_at: new Date().toISOString(),
        });
      }

      return NextResponse.json(
        { success: true, id: data.id, status: data.status },
        { headers: getRateLimitHeaders(rateLimit) }
      );
    }
  } catch (error) {
    console.error('Intake save error:', error);
    return NextResponse.json(
      { error: 'Failed to save intake' },
      { status: 500 }
    );
  }
}
