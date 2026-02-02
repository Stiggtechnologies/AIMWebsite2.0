import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { z } from 'zod';

const lookupSchema = z.object({
  booking_ref: z.string().min(1),
  action: z.literal('lookup'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = lookupSchema.parse(body);

    const supabase = createServerSupabaseClient();

    const { data: token, error: tokenError } = await supabase
      .from('booking_tokens')
      .select('*, lead:public_leads(*)')
      .eq('booking_ref', validatedData.booking_ref)
      .eq('status', 'active')
      .single();

    if (tokenError || !token) {
      return NextResponse.json(
        { error: 'Invalid or expired booking reference' },
        { status: 404 }
      );
    }

    if (new Date(token.expires_at) < new Date()) {
      await supabase
        .from('booking_tokens')
        .update({ status: 'expired' })
        .eq('id', token.id);

      return NextResponse.json(
        { error: 'Booking reference has expired' },
        { status: 410 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: {
        booking_ref: token.booking_ref,
        status: token.status,
        location: token.lead?.location_slug,
        created_at: token.created_at,
        metadata: token.metadata,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error looking up booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
