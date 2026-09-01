import { NextRequest, NextResponse } from 'next/server';
import { aimOS, BookingConfirmation } from '@/lib/aim-os';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';
import { blockPHIInPayload } from '@/lib/phi-validator';
import { createServerSupabaseClient } from '@/lib/supabase';
import { DEFAULT_LOCATION } from '@/lib/config';
import { clinicIdForLocation } from '@/lib/clinic';
import {
  mergeUtms,
  readUtmsFromCookieHeader,
  readUtmsFromSearchParams,
  utmsForCrmInsert,
} from '@/lib/utm';
import { z } from 'zod';

const optionalUtm = z.string().trim().optional().nullable();

const bookingConfirmSchema = z.object({
  handoff_type: z.literal('booking').optional(),
  persona: z.string(),
  program: z.string().optional(),
  location: z.string().optional(),
  preferred_times: z.array(z.string()).optional(),
  contact_method: z.enum(['phone', 'email', 'either']),
  contact_value: z.string().min(1),
  // The AI intake conversation already collects the patient's name and phone
  // (components/ai/ai-intake-conversation.tsx) and then threw them away, because
  // this schema had nowhere to put them. A callback queue without a name is
  // barely a lead — the front desk cannot ring "7805550142" and ask for nobody.
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().optional(),
  booking_mode: z.enum(['PATIENT_SELF_BOOK', 'EMPLOYER_CONSULT', 'INSURER_REFERRAL', 'CALLBACK_REQUIRED']).optional(),
  urgency: z.enum(['low', 'medium', 'high']).optional(),
  notes: z.string().optional(),
  utm_source: optionalUtm,
  utm_medium: optionalUtm,
  utm_campaign: optionalUtm,
  utm_content: optionalUtm,
  utm_term: optionalUtm,
});

export async function POST(request: NextRequest) {
  const clientId = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimit = checkRateLimit(`booking:${clientId}`);

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

    const phiCheck = blockPHIInPayload(body);
    if (!phiCheck.isValid) {
      return NextResponse.json(
        {
          error: 'PHI detected in request',
          violations: phiCheck.violations,
        },
        { status: 400 }
      );
    }

    const validatedData = bookingConfirmSchema.parse(body);

    const supabase = createServerSupabaseClient();
    const locationSlug = validatedData.location || DEFAULT_LOCATION.slug;
    // AIM-EDM-001 (Centre 87). RLS hides any crm_leads row whose clinic_id
    // is NULL, which is why website bookings after #10 landed in the table
    // and still did not appear on the Leads screen. Verified live 2026-09-01.
    const clinicId = clinicIdForLocation(locationSlug);

    // Body first (AI intake / booking client), then first-party cookies
    // written on the landing hit, then the request query. Paid clicks that
    // land on `/` and later book still attribute.
    const utms = utmsForCrmInsert(mergeUtms(
      {
        utm_source: validatedData.utm_source ?? undefined,
        utm_medium: validatedData.utm_medium ?? undefined,
        utm_campaign: validatedData.utm_campaign ?? undefined,
        utm_content: validatedData.utm_content ?? undefined,
        utm_term: validatedData.utm_term ?? undefined,
      },
      readUtmsFromCookieHeader(request.headers.get('cookie')),
      readUtmsFromSearchParams(request.nextUrl.searchParams),
    ));

    // Where a website booking becomes a lead the clinic can actually work.
    //
    // crm_leads is the canonical lead record: it is what the Leads screen
    // (LeadPipelineKanban), the CRM dashboard, the intake-conversion view and
    // crmAlertService all read. public_leads was written here and read by
    // nothing — a queue with no reader. Writing to both would leave the front
    // desk guessing which list is real, so this writes to crm_leads only.
    //
    // crm_leads also carries utm_source / utm_medium / utm_campaign, which is
    // what connects a booking back to the Google Ads click that produced it.
    // public_leads had no such columns, so every paid booking was
    // unattributable the moment it landed. The insert below writes those
    // columns (plus content/term) when the client or cookies have them.
    //
    // first_name / last_name / phone are NOT NULL on crm_leads, deliberately:
    // the front desk cannot return a call to an anonymous record. Where the
    // caller did not give a name we store a legible placeholder carrying the
    // booking reference rather than a blank, so the row reads honestly on
    // screen as an unnamed web enquiry instead of looking like bad data.
    const contactIsEmail = validatedData.contact_method === 'email'
      || /@/.test(validatedData.contact_value);
    // NOT NULL on crm_leads. An email-only enquiry genuinely has no phone yet;
    // empty string records that honestly rather than inventing a number.
    const phone = contactIsEmail ? '' : validatedData.contact_value;
    const email = contactIsEmail ? validatedData.contact_value : validatedData.email ?? null;

    const { data: lead, error: leadError } = await supabase
      .from('crm_leads')
      .insert({
        clinic_id: clinicId,
        first_name: validatedData.first_name?.trim() || 'Web',
        last_name: validatedData.last_name?.trim() || 'enquiry',
        phone,
        email,
        status: 'new',
        priority: validatedData.urgency === 'high' ? 'high'
          : validatedData.urgency === 'medium' ? 'medium' : 'low',
        urgency_level: validatedData.urgency || 'low',
        channel_source: 'website',
        funnel_type: validatedData.program || null,
        ...utms,
        notes: [
          `Persona: ${validatedData.persona}`,
          validatedData.booking_mode ? `Mode: ${validatedData.booking_mode}` : null,
          validatedData.preferred_times?.length
            ? `Preferred: ${validatedData.preferred_times.join(', ')}` : null,
          validatedData.notes || null,
        ].filter(Boolean).join(' · '),
      })
      .select()
      .single();

    if (leadError || !lead) {
      console.error('Error creating lead:', leadError);
      return NextResponse.json(
        { error: 'Failed to create booking request' },
        { status: 500 }
      );
    }

    const { data: bookingRefData } = await supabase
      .rpc('generate_booking_ref');

    const bookingRef = bookingRefData || `BK${Date.now()}`;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // public_booking_tokens.lead_id still FKs to public_leads(id) in AIMOS.
    // After #10 this insert writes a crm_leads id, so the token row fails
    // until a sibling AIMOS migration retargets that FK to crm_leads.
    // Do not invent a public_leads row to satisfy the old constraint.
    // Keep attempting the insert so tokens start working the moment the
    // migration ships; if it fails, log and still confirm the booking
    // (patient response stays 200 — same contract as #9).
    const { error: tokenError } = await supabase
      .from('public_booking_tokens')
      .insert({
        booking_ref: bookingRef,
        lead_id: lead.id,
        expires_at: expiresAt.toISOString(),
        status: 'active',
        action_type: 'booking',
        metadata: {
          persona: validatedData.persona,
          location: validatedData.location,
          created_via: 'ai_chat',
        },
      })
      .select()
      .single();

    if (tokenError) {
      console.error(
        'Error creating booking token (AIMOS public_booking_tokens.lead_id still FKs to public_leads; crm_leads id will fail until that migration ships):',
        tokenError
      );
    }

    await supabase.from('events').insert({
      type: 'booking_requested',
      metadata: {
        lead_id: lead.id,
        booking_ref: bookingRef,
        persona: validatedData.persona,
        location: locationSlug,
        booking_mode: validatedData.booking_mode,
      },
    });

    if (validatedData.booking_mode === 'PATIENT_SELF_BOOK') {
      const bookingConfirmation: BookingConfirmation = {
        booking_id: lead.id,
        location: locationSlug,
        time: validatedData.preferred_times?.[0] || '',
        handoff_token: bookingRef,
      };

      // The lead and its booking token are already committed above. From here
      // on, the patient's request is safe in the database and the clinic can act
      // on it — so nothing downstream may be allowed to tell them it failed.
      //
      // aimOS.confirmBooking() posts to AIM_OS_API_BASE, which defaults to
      // https://api.aimos.ca. That host has no DNS record and the env var is not
      // set on this project, so the call throws on every request and the catch
      // below turned every successful booking into a 500. Verified in production
      // 2026-08-30: lead aadbcd3d was written, its token was written, and the
      // patient still received {"error":"Failed to confirm booking"}.
      //
      // A handoff to a system that may not be reachable is best-effort. It is
      // logged so the gap is visible, and the booking is confirmed regardless.
      let aimosResponse: { status: string } | Record<string, never> = {};
      try {
        aimosResponse = await aimOS.confirmBooking(bookingConfirmation);
      } catch (handoffError) {
        console.error(
          'AIM OS handoff failed for booking_ref %s (lead is saved in crm_leads; the front desk works it from the Leads screen):',
          bookingRef,
          handoffError
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Your booking request has been sent to our team. You\'ll receive confirmation shortly.',
        booking_ref: bookingRef,
        ...aimosResponse,
      }, {
        headers: getRateLimitHeaders(rateLimit),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Your request has been submitted. Our team will contact you shortly.',
      booking_ref: bookingRef,
    }, {
      headers: getRateLimitHeaders(rateLimit),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Booking confirm error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm booking' },
      { status: 500 }
    );
  }
}
