/**
 * Server-only notification fan-out for AIM Performance lead-form submissions.
 *
 * Used by `app/api/aim-performance/leads/route.ts` after a successful
 * Supabase insert. Every channel is env-var-gated so this is safe to
 * ship before any of the providers are configured — missing config
 * results in a silent no-op, not an error.
 *
 * Channels:
 *   1. Email      — implemented via Resend REST API. Active when
 *                   RESEND_API_KEY + AIM_PERFORMANCE_ADMIN_EMAIL are set.
 *   2. SMS        — TODO (e.g. Twilio). Active when the env vars below
 *                   are set; high-intent triggers documented inline.
 *   3. CRM task   — TODO (HubSpot or GoHighLevel). Active when API key
 *                   env vars are set.
 *
 * Source attribution: every notification body and CRM payload carries
 * `source: "AIM Performance South Common Launch"` so leads can be
 * filtered downstream regardless of channel.
 *
 * SECURITY: never import this file from a client component. The Resend
 * key, future Twilio creds, and future HubSpot/GHL keys are server-only.
 */

const SOURCE_ATTRIBUTION = 'AIM Performance South Common Launch';
const HIGH_INTENT_INTERESTS = new Set([
  'paid-physio-assessment',
  'claim-coverage',
  'employer-program',
]);

const LANDING_URL = 'https://aimphysiotherapy.ca/aim-performance-south-common';

export interface LeadNotificationPayload {
  id: string;
  first_name: string;
  last_name?: string | null;
  email: string;
  phone?: string | null;
  is_evolve_member?: string | null;
  interests: string[];
  preferred_contact_method?: string | null;
  message?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
}

/**
 * Fire all configured notifications for a newly-saved lead. Returns
 * immediately; the underlying sends are awaited internally but errors
 * from any single channel are swallowed and logged so they cannot fail
 * the patient-facing submit.
 */
export async function notifyAdminOnLead(lead: LeadNotificationPayload): Promise<void> {
  const isHighIntent = lead.interests.some((i) => HIGH_INTENT_INTERESTS.has(i));

  await Promise.all([
    sendAdminEmail(lead, isHighIntent).catch((err) => {
      console.error('[aim-performance] admin email failed:', err);
    }),
    sendHighIntentSms(lead, isHighIntent).catch((err) => {
      console.error('[aim-performance] high-intent SMS failed:', err);
    }),
    createCrmTask(lead, isHighIntent).catch((err) => {
      console.error('[aim-performance] CRM task failed:', err);
    }),
  ]);
}

// ---------------------------------------------------------------------------
// 1. Email — Resend (real implementation, env-gated)
// ---------------------------------------------------------------------------

async function sendAdminEmail(
  lead: LeadNotificationPayload,
  isHighIntent: boolean
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.AIM_PERFORMANCE_ADMIN_EMAIL;
  const from =
    process.env.AIM_PERFORMANCE_NOTIFICATION_FROM ||
    'AIM Performance <noreply@aimphysiotherapy.ca>';

  if (!apiKey || !to) return; // not configured — silent no-op

  const fullName = [lead.first_name, lead.last_name].filter(Boolean).join(' ');
  const subject = `${isHighIntent ? '🔥 ' : ''}New AIM Performance lead — ${fullName}`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html: buildEmailHtml(lead, isHighIntent),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Resend ${response.status}: ${text}`);
  }
}

function buildEmailHtml(lead: LeadNotificationPayload, isHighIntent: boolean): string {
  const row = (label: string, value: string | null | undefined) => {
    if (!value) return '';
    return `<tr><td style="padding:6px 12px;color:#64748b;width:160px">${label}</td><td style="padding:6px 12px;color:#0F2A44"><strong>${escapeHtml(value)}</strong></td></tr>`;
  };

  return `<!DOCTYPE html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;margin:0;padding:24px">
  <div style="max-width:640px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
    <div style="background:#0F2A44;color:white;padding:20px 28px">
      <div style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#94a3b8">${SOURCE_ATTRIBUTION}</div>
      <div style="margin-top:6px;font-size:20px;font-weight:700">${isHighIntent ? '🔥 High-intent lead' : 'New lead inquiry'}</div>
    </div>
    <div style="padding:24px 28px">
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${row('Name', [lead.first_name, lead.last_name].filter(Boolean).join(' '))}
        ${row('Email', lead.email)}
        ${row('Phone', lead.phone || '(not provided)')}
        ${row('Preferred contact', lead.preferred_contact_method)}
        ${row('Evolve member?', lead.is_evolve_member)}
        ${row('Interests', lead.interests.join(', '))}
        ${row('Message', lead.message)}
      </table>
      ${
        lead.utm_source || lead.utm_campaign
          ? `<div style="margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b">
              <strong style="color:#0F2A44">Attribution</strong><br>
              ${[
                lead.utm_source && `source: ${escapeHtml(lead.utm_source)}`,
                lead.utm_medium && `medium: ${escapeHtml(lead.utm_medium)}`,
                lead.utm_campaign && `campaign: ${escapeHtml(lead.utm_campaign)}`,
                lead.utm_content && `content: ${escapeHtml(lead.utm_content)}`,
                lead.utm_term && `term: ${escapeHtml(lead.utm_term)}`,
              ]
                .filter(Boolean)
                .join(' · ')}
            </div>`
          : ''
      }
      <div style="margin-top:24px;font-size:12px;color:#94a3b8">
        Lead ID: <code>${escapeHtml(lead.id)}</code><br>
        Source: ${SOURCE_ATTRIBUTION}<br>
        Landing page: <a href="${LANDING_URL}" style="color:#2FA4A9">${LANDING_URL}</a>
      </div>
    </div>
  </div>
</body></html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---------------------------------------------------------------------------
// 2. SMS — high-intent leads only (TODO: implement when provider chosen)
// ---------------------------------------------------------------------------

/**
 * Fire an SMS to the on-call admin when the lead expressed interest in
 * a high-intent track (paid physio assessment, WCB/MVA/insurance, or
 * employer/workplace program).
 *
 * TODO (Twilio implementation sketch):
 *   const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_FROM } = process.env;
 *   const to = process.env.AIM_PERFORMANCE_ADMIN_SMS_PHONE;
 *   if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_SMS_FROM || !to) return;
 *   const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
 *   await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
 *     method: 'POST',
 *     headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
 *     body: new URLSearchParams({ From: TWILIO_SMS_FROM, To: to, Body: smsBody }),
 *   });
 */
async function sendHighIntentSms(
  _lead: LeadNotificationPayload,
  isHighIntent: boolean
): Promise<void> {
  if (!isHighIntent) return;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_SMS_FROM;
  const to = process.env.AIM_PERFORMANCE_ADMIN_SMS_PHONE;
  if (!accountSid || !authToken || !fromNumber || !to) return;

  // TODO: implement Twilio POST per the sketch above. Build SMS body:
  //   `AIM Performance: high-intent lead from ${first} ${last} (${interests.join(',')}). View: ${LANDING_URL}`
  console.info('[aim-performance] SMS pathway enabled but not yet implemented');
}

// ---------------------------------------------------------------------------
// 3. CRM task — HubSpot or GoHighLevel (TODO: implement when chosen)
// ---------------------------------------------------------------------------

/**
 * Create a CRM follow-up task for the new lead. Active when either
 * HubSpot or GoHighLevel credentials are present.
 *
 * TODO (HubSpot sketch — Contacts API + Tasks):
 *   if (process.env.HUBSPOT_API_KEY) {
 *     // 1. Upsert contact by email:
 *     //    POST https://api.hubapi.com/crm/v3/objects/contacts
 *     //    with properties: firstname, lastname, email, phone,
 *     //                     aim_source: SOURCE_ATTRIBUTION,
 *     //                     aim_interests: lead.interests.join(';')
 *     // 2. Create task associated with that contact:
 *     //    POST https://api.hubapi.com/crm/v3/objects/tasks
 *     //    body: contact-follow-up subject + dueDate + priority
 *   }
 *
 * TODO (GoHighLevel sketch — Subaccount API):
 *   if (process.env.GHL_LOCATION_ID && process.env.GHL_API_KEY) {
 *     // 1. POST /contacts/ to upsert
 *     // 2. POST /opportunities/ or /tasks/ to create follow-up
 *   }
 */
async function createCrmTask(
  _lead: LeadNotificationPayload,
  _isHighIntent: boolean
): Promise<void> {
  if (process.env.HUBSPOT_API_KEY) {
    console.info('[aim-performance] HubSpot pathway enabled but not yet implemented');
    return;
  }
  if (process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID) {
    console.info('[aim-performance] GoHighLevel pathway enabled but not yet implemented');
    return;
  }
  // Neither configured — silent no-op.
}
