import type { SupabaseClient } from '@supabase/supabase-js';
import {
  clinicMailboxRecipients,
  DEFAULT_CLINIC_NOTIFICATION_ADDRESS,
  sendClinicEmail,
} from '@/lib/clinic-email';

export const DEFAULT_CLINIC_MAILBOX = DEFAULT_CLINIC_NOTIFICATION_ADDRESS;
export { clinicMailboxRecipients } from '@/lib/clinic-email';

const RESPONSIBLE_ROLES = ['clinic_manager'];
const FALLBACK_ROLES = ['admin', 'executive'];

export interface ClinicLeadNotification {
  clinicId: string;
  leadId: string;
  reference: string;
  title: string;
  type: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  requestLabel?: string | null;
  source?: string | null;
  location?: string | null;
  replyTo?: string | null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function findNotificationRecipients(
  supabase: SupabaseClient,
  clinicId: string,
): Promise<string[]> {
  const { data: memberships, error: membershipError } = await supabase
    .from('user_clinics')
    .select('user_id')
    .eq('clinic_id', clinicId);

  if (membershipError) {
    console.error('Clinic lead recipient membership lookup failed:', membershipError);
  }

  const memberIds = (memberships || []).map((row) => row.user_id);
  const eligibleIds = new Set<string>();
  const addProfiles = (profiles: Array<{ id: string }> | null) => {
    for (const profile of profiles || []) eligibleIds.add(profile.id);
  };
  const profileQuery = () => supabase
    .from('user_profiles')
    .select('id')
    .eq('is_active', true);

  const { data: primaryManagers, error: primaryError } = await profileQuery()
    .eq('primary_clinic_id', clinicId)
    .in('role', RESPONSIBLE_ROLES);
  if (primaryError) console.error('Clinic lead primary manager lookup failed:', primaryError);
  addProfiles(primaryManagers);

  if (memberIds.length > 0) {
    const { data: memberManagers, error: memberError } = await profileQuery()
      .in('id', memberIds)
      .in('role', RESPONSIBLE_ROLES);
    if (memberError) console.error('Clinic lead member manager lookup failed:', memberError);
    addProfiles(memberManagers);
  }

  if (eligibleIds.size > 0) return Array.from(eligibleIds);

  const { data: primaryFallback, error: fallbackError } = await profileQuery()
    .eq('primary_clinic_id', clinicId)
    .in('role', FALLBACK_ROLES);
  if (fallbackError) console.error('Clinic lead fallback recipient lookup failed:', fallbackError);
  addProfiles(primaryFallback);

  if (memberIds.length > 0) {
    const { data: memberFallback, error: memberFallbackError } = await profileQuery()
      .in('id', memberIds)
      .in('role', FALLBACK_ROLES);
    if (memberFallbackError) {
      console.error('Clinic lead member fallback lookup failed:', memberFallbackError);
    }
    addProfiles(memberFallback);
  }

  return Array.from(eligibleIds);
}

async function sendClinicMailboxEmail(lead: ClinicLeadNotification): Promise<void> {
  const rows = [
    ['AIM OS reference', lead.reference],
    ['Contact', lead.name],
    ['Email', lead.email || 'Not provided'],
    ['Phone', lead.phone || 'Not provided'],
    ['Request', lead.requestLabel || 'Website inquiry'],
    ['Location', lead.location || 'Edmonton Main Hub'],
    ['Source', lead.source || 'Website'],
  ];

  await sendClinicEmail({
    to: clinicMailboxRecipients(),
    replyTo: lead.replyTo,
    subject: `${lead.title} — ${lead.reference}`,
    html: `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f2a44">
  <div style="max-width:680px;margin:0 auto;overflow:hidden;border:1px solid #dbe4ea;border-radius:14px;background:#fff">
    <div style="padding:22px 28px;background:#0f2a44;color:#fff">
      <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#a9dadd">AIM OS lead notification</div>
      <h1 style="margin:8px 0 0;font-size:22px">${escapeHtml(lead.title)}</h1>
    </div>
    <div style="padding:24px 28px">
      <p style="margin:0 0 18px;color:#475569">This lead is already saved in AIM OS. Open <strong>Growth &gt; Leads</strong> and search for <strong>${escapeHtml(lead.name)}</strong>.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows.map(([name, value]) => `<tr><td style="width:165px;padding:8px 10px;border-bottom:1px solid #edf2f7;color:#64748b;vertical-align:top">${escapeHtml(name)}</td><td style="padding:8px 10px;border-bottom:1px solid #edf2f7;color:#0f2a44;vertical-align:top"><strong>${escapeHtml(value)}</strong></td></tr>`).join('')}
      </table>
      <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#64748b">For privacy, this email contains contact and routing details only. Clinical, injury, insurance and claim details remain in the approved secure workflow.</p>
    </div>
  </div>
</body></html>`,
  });
}

export async function notifyClinicAboutLead(
  supabase: SupabaseClient,
  lead: ClinicLeadNotification,
): Promise<void> {
  const recipients = await findNotificationRecipients(supabase, lead.clinicId);

  const [activityResult, notificationResult, emailResult] = await Promise.all([
    supabase.from('crm_lead_activities').insert({
      lead_id: lead.leadId,
      clinic_id: lead.clinicId,
      activity_type: 'website_submission',
      notes: `${lead.title}. Reference ${lead.reference}.`,
      metadata: {
        reference: lead.reference,
        source: lead.source || 'website',
        type: lead.type,
      },
    }),
    recipients.length > 0
      ? supabase.from('notifications').insert(recipients.map((userId) => ({
          user_id: userId,
          type: lead.type,
          title: lead.title,
          message: `${lead.name}. ${lead.requestLabel || 'Website inquiry'}. Open Growth > Leads. ${lead.reference}`,
          read: false,
        })))
      : Promise.resolve({ error: new Error('No active clinic manager or fallback recipient found') }),
    sendClinicMailboxEmail(lead)
      .then(() => ({ error: null as Error | null }))
      .catch((error: unknown) => ({
        error: error instanceof Error ? error : new Error('Unknown clinic mailbox error'),
      })),
  ]);

  if (activityResult.error) {
    console.error('Clinic lead activity insert failed:', activityResult.error);
  }
  if (notificationResult.error) {
    console.error('Clinic lead notification fan-out failed:', notificationResult.error);
  }
  if (emailResult.error) {
    console.error('Clinic lead mailbox email failed:', emailResult.error);
  }
}
