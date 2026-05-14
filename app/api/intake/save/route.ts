import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';

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
