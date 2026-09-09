import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { createServerSupabaseClient } from '@/lib/supabase';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';
import { blockPHIInPayload } from '@/lib/phi-validator';
import { clinicIdForLocation } from '@/lib/clinic';
import {
  buildPartnerInquiryNote,
  funnelTypeForPartner,
  leadSourceSlugForPartner,
  notificationTitleForPartner,
  partnerInquirySchema,
} from '@/lib/partner-inquiry';
import { emailClinicPartnerInquiry } from '@/lib/partner-inquiry-notifications';

const RESPONSIBLE_ROLES = ['clinic_manager'];
const FALLBACK_ROLES = ['admin', 'executive'];

async function findNotificationRecipients(
  supabase: ReturnType<typeof createServerSupabaseClient>,
  clinicId: string,
): Promise<string[]> {
  const { data: membershipRows, error: membershipError } = await supabase
    .from('user_clinics')
    .select('user_id')
    .eq('clinic_id', clinicId);

  if (membershipError) {
    console.error('Partner inquiry recipient membership lookup failed:', membershipError);
  }

  const memberIds = (membershipRows || []).map((row) => row.user_id);
  const eligibleIds = new Set<string>();

  const addProfiles = (profiles: Array<{ id: string }> | null) => {
    for (const profile of profiles || []) eligibleIds.add(profile.id);
  };

  const baseProfileQuery = () => supabase
    .from('user_profiles')
    .select('id')
    .eq('is_active', true);

  const { data: primaryManagers, error: primaryManagerError } = await baseProfileQuery()
    .eq('primary_clinic_id', clinicId)
    .in('role', RESPONSIBLE_ROLES);
  if (primaryManagerError) {
    console.error('Partner inquiry primary manager lookup failed:', primaryManagerError);
  }
  addProfiles(primaryManagers);

  if (memberIds.length > 0) {
    const { data: memberManagers, error: memberManagerError } = await baseProfileQuery()
      .in('id', memberIds)
      .in('role', RESPONSIBLE_ROLES);
    if (memberManagerError) {
      console.error('Partner inquiry member manager lookup failed:', memberManagerError);
    }
    addProfiles(memberManagers);
  }

  if (eligibleIds.size > 0) return Array.from(eligibleIds);

  // A clinic should normally have at least one clinic_manager. The fallback
  // prevents a high-value organization inquiry from becoming invisible if
  // role configuration is temporarily incomplete.
  const { data: fallbackProfiles, error: fallbackError } = await baseProfileQuery()
    .eq('primary_clinic_id', clinicId)
    .in('role', FALLBACK_ROLES);
  if (fallbackError) {
    console.error('Partner inquiry fallback recipient lookup failed:', fallbackError);
  }
  addProfiles(fallbackProfiles);

  return Array.from(eligibleIds);
}

export async function POST(request: NextRequest) {
  const clientId = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimit = checkRateLimit(`partner-inquiry:${clientId}`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const parsed = partnerInquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please review the highlighted information.', details: parsed.error.flatten().fieldErrors },
      { status: 400, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  // This public form is deliberately contact-only. Individual patient, worker,
  // claim and clinical information belongs in the secure clinical workflow.
  const phiCheck = blockPHIInPayload(parsed.data);
  if (!phiCheck.isValid) {
    return NextResponse.json(
      {
        error: 'Please remove patient, worker, claim or medical details and submit only your organization inquiry.',
      },
      { status: 400, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const inquiry = parsed.data;
  const reference = `PARTNER-${randomUUID().slice(0, 8).toUpperCase()}`;
  const supabase = createServerSupabaseClient();
  const clinicId = clinicIdForLocation('edmonton-main-hub');
  const sourceSlug = leadSourceSlugForPartner(inquiry.category, inquiry.utm_source);

  const { data: source } = await supabase
    .from('crm_lead_sources')
    .select('id')
    .eq('slug', sourceSlug)
    .maybeSingle();

  const { data, error } = await supabase
    .from('crm_leads')
    .insert({
      external_id: reference,
      clinic_id: clinicId,
      first_name: inquiry.first_name,
      last_name: inquiry.last_name,
      email: inquiry.email,
      phone: inquiry.phone || '',
      lead_source_id: source?.id || null,
      landing_page_url: inquiry.page_path,
      utm_source: inquiry.utm_source || null,
      utm_medium: inquiry.utm_medium || null,
      utm_campaign: inquiry.utm_campaign || null,
      utm_content: inquiry.utm_content || null,
      status: 'new',
      priority: 'medium',
      channel_source: sourceSlug,
      funnel_type: funnelTypeForPartner(inquiry.category),
      content_topic: inquiry.interest,
      urgency_level: 'medium',
      intent_confidence: 'high',
      notes: buildPartnerInquiryNote(inquiry, reference),
    })
    .select('id')
    .single();

  if (error || !data) {
    console.error('Partner inquiry insert failed:', error);
    return NextResponse.json(
      { error: 'We could not save your request. Please call (780) 250-8188.' },
      { status: 500, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const recipients = await findNotificationRecipients(supabase, clinicId);
  const notificationTitle = notificationTitleForPartner(inquiry.category);

  const [activityResult, notificationResult, emailResult] = await Promise.all([
    supabase.from('crm_lead_activities').insert({
      lead_id: data.id,
      clinic_id: clinicId,
      activity_type: 'website_submission',
      notes: `${notificationTitle} received from ${inquiry.organization}. Reference ${reference}.`,
      metadata: {
        category: inquiry.category,
        organization: inquiry.organization,
        reference,
        source: sourceSlug,
      },
    }),
    recipients.length > 0
      ? supabase.from('notifications').insert(recipients.map((userId) => ({
          user_id: userId,
          type: 'partner_lead',
          title: notificationTitle,
          message: `${inquiry.first_name} ${inquiry.last_name} from ${inquiry.organization}. ${inquiry.interest}. Open Growth > Leads. ${reference}`,
          read: false,
        })))
      : Promise.resolve({ error: new Error('No active clinic manager or fallback recipient found') }),
    emailClinicPartnerInquiry(inquiry, reference)
      .then(() => ({ error: null as Error | null }))
      .catch((emailError: unknown) => ({
        error: emailError instanceof Error ? emailError : new Error('Unknown clinic email error'),
      })),
  ]);

  // The canonical lead is already safe. Notification fan-out and audit-log
  // failures are surfaced in server logs but never tell the submitter that the
  // saved inquiry failed.
  if (activityResult.error) {
    console.error('Partner inquiry activity insert failed:', activityResult.error);
  }
  if (notificationResult.error) {
    console.error('Partner inquiry notification fan-out failed:', notificationResult.error);
  }
  if (emailResult.error) {
    console.error('Partner inquiry clinic email failed:', emailResult.error);
  }

  return NextResponse.json(
    { success: true, reference },
    { headers: getRateLimitHeaders(rateLimit) },
  );
}
