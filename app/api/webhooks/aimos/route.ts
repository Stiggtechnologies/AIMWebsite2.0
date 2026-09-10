import { NextRequest, NextResponse } from 'next/server';
import { WebhookPayload } from '@/lib/aim-os';
import { verifyAimosWebhookSignature } from '@/lib/aimos-webhook';
import { notifyClinicAboutLead } from '@/lib/clinic-lead-notifications';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('x-aimos-signature');
    const payload = await request.text();

    if (!verifyAimosWebhookSignature(
      payload,
      signature,
      process.env.AIM_OS_WEBHOOK_SECRET,
    )) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const body: WebhookPayload = JSON.parse(payload);

    switch (body.type) {
      case 'intake_status_update':
        await handleIntakeStatusUpdate(body);
        break;
      case 'lead_created':
        await handleLeadCreated(body.lead_id);
        break;
      default:
        console.warn('Unknown webhook type');
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleLeadCreated(leadId: string): Promise<void> {
  if (!leadId) throw new Error('lead_id is required');

  const { data: lead, error } = await supabase
    .from('crm_leads')
    .select(`
      id, external_id, clinic_id, first_name, last_name, email, phone,
      channel_source, funnel_type,
      service_line:crm_service_lines(name, slug),
      lead_source:crm_lead_sources(name, slug)
    `)
    .eq('id', leadId)
    .single();

  if (error || !lead) {
    console.error('AIM OS lead lookup failed:', error);
    throw new Error('Lead not found');
  }
  if (!lead.clinic_id) throw new Error('Lead has no clinic assignment');

  const serviceLine = Array.isArray(lead.service_line)
    ? lead.service_line[0]
    : lead.service_line;
  const leadSource = Array.isArray(lead.lead_source)
    ? lead.lead_source[0]
    : lead.lead_source;
  const source = leadSource?.name || lead.channel_source || 'AIM OS';
  const reference = lead.external_id || `AIM-${lead.id.slice(0, 8).toUpperCase()}`;
  const result = await notifyClinicAboutLead(supabase, {
    clinicId: lead.clinic_id,
    leadId: lead.id,
    reference,
    title: `New ${source} lead`,
    type: 'aimos_lead_created',
    name: `${lead.first_name} ${lead.last_name}`.trim(),
    email: lead.email,
    phone: lead.phone,
    requestLabel: serviceLine?.name || lead.funnel_type || 'General inquiry',
    source,
    location: 'Assigned AIM clinic',
    replyTo: lead.email,
  });

  if (!result.mailboxEmailSent) {
    throw new Error('Clinic mailbox delivery failed');
  }
}

async function handleIntakeStatusUpdate(
  payload: Extract<WebhookPayload, { type: 'intake_status_update' }>,
): Promise<void> {
  const { intake_id, status } = payload;

  const { error } = await supabase
    .from('intake_submissions')
    .update({ status })
    .eq('id', intake_id);

  if (error) {
    console.error('Failed to update intake status:', error);
    throw error;
  }

  console.log(`Updated intake ${intake_id} to status ${status}`);
}
