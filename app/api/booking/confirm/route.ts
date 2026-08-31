import { NextRequest, NextResponse } from 'next/server';
import { aimOS, BookingConfirmation } from '@/lib/aim-os';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';
import { blockPHIInPayload } from '@/lib/phi-validator';
import { createServerSupabaseClient } from '@/lib/supabase';
import { DEFAULT_LOCATION } from '@/lib/config';
import { z } from 'zod';

const bookingConfirmSchema = z.object({
  handoff_type: z.literal('booking').optional(),
  persona: z.string(),
  program: z.string().optional(),
  location: z.string().optional(),
  preferred_times: z.array(z.string()).optional(),
  contact_method: z.enum(['phone', 'email', 'either']),
  contact_value: z.string().min(1),
  booking_mode: z.enum(['PATIENT_SELF_BOOK', 'EMPLOYER_CONSULT', 'INSURER_REFERRAL', 'CALLBACK_REQUIRED']).optional(),
  urgency: z.enum(['low', 'medium', 'high']).optional(),
  notes: z.string().optional(),
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

    const { data: lead, error: leadError } = await supabase
      .from('public_leads')
      .insert({
        persona: validatedData.persona,
        program_interest: validatedData.program ? [validatedData.program] : [],
        location_slug: locationSlug,
        urgency: validatedData.urgency || 'low',
        contact_method: validatedData.contact_method,
        contact_value: validatedData.contact_value,
        status: 'new',
        booking_mode: validatedData.booking_mode || 'PATIENT_SELF_BOOK',
        preferred_times: validatedData.preferred_times || [],
        notes: validatedData.notes,
        qualification_state: 'QUALIFIED_BOOK_NOW',
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

    const { data: token, error: tokenError } = await supabase
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
      console.error('Error creating booking token:', tokenError);
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
          'AIM OS handoff failed for booking_ref %s (lead is saved; front desk must work it from public_leads):',
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
