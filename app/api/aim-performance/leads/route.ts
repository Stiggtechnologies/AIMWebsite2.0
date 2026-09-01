import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';
import { notifyAdminOnLead } from '@/lib/aim-performance-notifications';

// =============================================================================
// POST /api/aim-performance/leads
//
// Persists a lead-form submission from the AIM Performance South Common
// landing page into the `aim_performance_leads` Supabase table.
//
// Security model (matches 20260127091906_fix_security_issues.sql):
//   - Public anon clients have NO direct write access to the table.
//   - This route runs server-side and inserts using the Supabase
//     service-role key. RLS denies all other writes.
//
// Validation:
//   - first_name required, non-empty
//   - email required, must look like an email
//   - interests required, at least one value
//   - consent_given required, must be true
//   - status defaults to 'new'
//   - source defaults to 'aim-performance-south-common-landing-page'
//
// Future expansion (next prompt in the sequence):
//   - Admin email notification fan-out
//   - SMS for high-intent leads (paid assessment / WCB / employer)
//   - HubSpot / GoHighLevel CRM task creation
// Keep those additions inside this handler (or extracted helpers) so
// the persistence + notification stays in a single auditable place.
// =============================================================================

const LeadSchema = z.object({
  first_name: z.string().trim().min(1, 'First name is required'),
  last_name: z.string().trim().optional().nullable(),
  email: z.string().trim().email('Valid email is required'),
  phone: z.string().trim().optional().nullable(),
  is_evolve_member: z.string().trim().optional().nullable(),
  interests: z.array(z.string().min(1)).min(1, 'Select at least one interest'),
  preferred_contact_method: z.string().trim().optional().nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
  consent_given: z.literal(true, {
    errorMap: () => ({ message: 'Consent is required' }),
  }),
  source: z.string().trim().optional().nullable(),
  utm_source: z.string().trim().optional().nullable(),
  utm_medium: z.string().trim().optional().nullable(),
  utm_campaign: z.string().trim().optional().nullable(),
  utm_content: z.string().trim().optional().nullable(),
  utm_term: z.string().trim().optional().nullable(),
});

// AIM Performance South Common is paused (2026-09-01), so this endpoint no
// longer accepts submissions. The UI shows <RegistrationPaused/> instead of the
// form, but the route is public and must refuse on its own — hiding a form does
// not stop a POST. 410 rather than 404: the resource existed and is gone for
// now, which is the honest status code and stops clients retrying.
//
// To re-open: delete this block and restore <LeadForm/> in
// app/aim-performance-south-common/page.tsx. Nothing below was removed.
const REGISTRATION_PAUSED = true;

export async function POST(request: NextRequest) {
  if (REGISTRATION_PAUSED) {
    return NextResponse.json(
      {
        error: 'Founder Access registration is closed',
        detail:
          'AIM Performance South Common is on hold and is not accepting registrations or assessment requests.',
      },
      { status: 410 }
    );
  }

  const clientId = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimit = checkRateLimit(`aim-performance-leads:${clientId}`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429, headers: getRateLimitHeaders(rateLimit) }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400, headers: getRateLimitHeaders(rateLimit) }
    );
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400, headers: getRateLimitHeaders(rateLimit) }
    );
  }

  const lead = parsed.data;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('aim_performance_leads')
    .insert({
      first_name: lead.first_name,
      last_name: lead.last_name || null,
      email: lead.email,
      phone: lead.phone || null,
      is_evolve_member: lead.is_evolve_member || null,
      interests: lead.interests,
      preferred_contact_method: lead.preferred_contact_method || null,
      message: lead.message || null,
      consent_given: lead.consent_given,
      source: lead.source || 'aim-performance-south-common-landing-page',
      utm_source: lead.utm_source || null,
      utm_medium: lead.utm_medium || null,
      utm_campaign: lead.utm_campaign || null,
      utm_content: lead.utm_content || null,
      utm_term: lead.utm_term || null,
      status: 'new',
    })
    .select('id')
    .single();

  if (error) {
    console.error('aim_performance_leads insert failed:', error);
    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500, headers: getRateLimitHeaders(rateLimit) }
    );
  }

  // Fire-and-forget admin notifications. Each channel is env-gated and
  // independently failure-safe — see lib/aim-performance-notifications.ts.
  // We deliberately don't `await` so the patient-facing submit stays
  // snappy regardless of provider latency, and we explicitly `catch` to
  // satisfy lint rules / avoid unhandled-rejection warnings.
  void notifyAdminOnLead({
    id: data.id,
    first_name: lead.first_name,
    last_name: lead.last_name ?? null,
    email: lead.email,
    phone: lead.phone ?? null,
    is_evolve_member: lead.is_evolve_member ?? null,
    interests: lead.interests,
    preferred_contact_method: lead.preferred_contact_method ?? null,
    message: lead.message ?? null,
    utm_source: lead.utm_source ?? null,
    utm_medium: lead.utm_medium ?? null,
    utm_campaign: lead.utm_campaign ?? null,
    utm_content: lead.utm_content ?? null,
    utm_term: lead.utm_term ?? null,
  }).catch((err) => {
    console.error('notifyAdminOnLead threw unexpectedly:', err);
  });

  return NextResponse.json(
    { success: true, id: data.id },
    { headers: getRateLimitHeaders(rateLimit) }
  );
}
