import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { clinicIdForLocation } from '@/lib/clinic';
import { notifyClinicAboutLead } from '@/lib/clinic-lead-notifications';
import {
  contactFunnelType,
  contactInterestLabel,
  contactLeadSchema,
  contactLeadSourceSlug,
} from '@/lib/contact-lead';
import { blockPHIInPayload } from '@/lib/phi-validator';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const clientId = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimit = checkRateLimit(`contact-lead:${clientId}`);

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

  const parsed = contactLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please review the highlighted information.', details: parsed.error.flatten().fieldErrors },
      { status: 400, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const phiCheck = blockPHIInPayload(parsed.data);
  if (!phiCheck.isValid) {
    return NextResponse.json(
      { error: 'Please remove medical, claim or other sensitive details. We will collect those securely.' },
      { status: 400, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  const lead = parsed.data;
  const names = lead.full_name.split(/\s+/).filter(Boolean);
  const firstName = names.shift() || 'Web';
  const lastName = names.join(' ') || 'contact';
  const reference = `WEB-${randomUUID().slice(0, 8).toUpperCase()}`;
  const clinicId = clinicIdForLocation('edmonton-main-hub');
  const sourceSlug = contactLeadSourceSlug(lead.interest, lead.utm_source);
  const supabase = createServerSupabaseClient();

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
      first_name: firstName,
      last_name: lastName,
      email: lead.email,
      phone: lead.phone || '',
      lead_source_id: source?.id || null,
      landing_page_url: lead.page_path,
      utm_source: lead.utm_source || null,
      utm_medium: lead.utm_medium || null,
      utm_campaign: lead.utm_campaign || null,
      utm_content: lead.utm_content || null,
      status: 'new',
      priority: ['referral', 'employer', 'legal', 'patient'].includes(lead.interest) ? 'medium' : 'low',
      channel_source: sourceSlug,
      funnel_type: contactFunnelType(lead.interest),
      content_topic: lead.interest,
      urgency_level: 'low',
      intent_confidence: 'medium',
      notes: [
        `Website contact: ${reference}`,
        `Topic: ${contactInterestLabel(lead.interest)}`,
        `Message: ${lead.message}`,
      ].join(' · '),
    })
    .select('id')
    .single();

  if (error || !data) {
    console.error('Website contact lead insert failed:', error);
    return NextResponse.json(
      { error: 'We could not save your message. Please call (780) 250-8188.' },
      { status: 500, headers: getRateLimitHeaders(rateLimit) },
    );
  }

  await notifyClinicAboutLead(supabase, {
    clinicId,
    leadId: data.id,
    reference,
    title: 'New website contact',
    type: 'website_contact_lead',
    name: lead.full_name,
    email: lead.email,
    phone: lead.phone,
    requestLabel: contactInterestLabel(lead.interest),
    source: sourceSlug,
    location: 'edmonton-main-hub',
    replyTo: lead.email,
  }).catch((notificationError) => {
    console.error('Website contact notification failed unexpectedly:', notificationError);
  });

  return NextResponse.json(
    { success: true, reference },
    { headers: getRateLimitHeaders(rateLimit) },
  );
}
