import type { PartnerInquiry } from '@/lib/partner-inquiry';
import { notificationTitleForPartner } from '@/lib/partner-inquiry';
import { clinicMailboxRecipients, sendClinicEmail } from '@/lib/clinic-email';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function label(value?: string | null): string {
  return value?.trim() || 'Not provided';
}

export async function emailClinicPartnerInquiry(
  inquiry: PartnerInquiry,
  reference: string,
): Promise<void> {
  const to = clinicMailboxRecipients(
    process.env.CLINIC_NOTIFICATION_EMAIL
      || process.env.PARTNER_INQUIRY_NOTIFICATION_EMAIL,
  );
  if (to.length === 0) {
    console.error('Partner inquiry email not sent: clinic mailbox is not configured');
    return;
  }

  const title = notificationTitleForPartner(inquiry.category);
  const rows = [
    ['AIM OS reference', reference],
    ['Contact', `${inquiry.first_name} ${inquiry.last_name}`],
    ['Organization', inquiry.organization],
    ['Role', label(inquiry.role)],
    ['Email', inquiry.email],
    ['Phone', label(inquiry.phone)],
    ['Interest', inquiry.interest],
    ['Service footprint', label(inquiry.service_region)],
    ['Anticipated volume', label(inquiry.expected_volume)],
    ['Preferred contact', inquiry.preferred_contact],
    ['Organization context', label(inquiry.message)],
    ['Landing page', inquiry.page_path],
    ['Attribution', [
      inquiry.utm_source,
      inquiry.utm_medium,
      inquiry.utm_campaign,
      inquiry.utm_content,
      inquiry.utm_term,
    ].filter(Boolean).join(' · ') || 'Direct / not provided'],
  ];

  await sendClinicEmail({
    to,
    from: process.env.PARTNER_INQUIRY_NOTIFICATION_FROM,
    replyTo: inquiry.email,
    subject: `${title} — ${inquiry.organization} — ${reference}`,
    html: `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f2a44">
  <div style="max-width:680px;margin:0 auto;overflow:hidden;border:1px solid #dbe4ea;border-radius:14px;background:#fff">
    <div style="padding:22px 28px;background:#0f2a44;color:#fff">
      <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#a9dadd">AIM OS lead notification</div>
      <h1 style="margin:8px 0 0;font-size:22px">${escapeHtml(title)}</h1>
    </div>
    <div style="padding:24px 28px">
      <p style="margin:0 0 18px;color:#475569">The inquiry is already saved in AIM OS. Open <strong>Growth &gt; Leads</strong> and search for <strong>${escapeHtml(`${inquiry.first_name} ${inquiry.last_name}`)}</strong>. Use reference <strong>${escapeHtml(reference)}</strong> to confirm the record.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows.map(([name, value]) => `<tr><td style="width:165px;padding:8px 10px;border-bottom:1px solid #edf2f7;color:#64748b;vertical-align:top">${escapeHtml(name)}</td><td style="padding:8px 10px;border-bottom:1px solid #edf2f7;color:#0f2a44;vertical-align:top"><strong>${escapeHtml(value)}</strong></td></tr>`).join('')}
      </table>
      <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#64748b">This organization-level email intentionally excludes patient, worker, claim and medical information. Move any individual referral into AIM's approved secure clinical workflow.</p>
    </div>
  </div>
</body></html>`,
  });
}
