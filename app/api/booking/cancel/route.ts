import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { z } from 'zod';

const cancelSchema = z.object({
  booking_ref: z.string().min(1),
  cancel_reason: z.enum(['schedule_conflict', 'feeling_better', 'need_clinic', 'other']).optional(),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = cancelSchema.parse(body);

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

    await supabase
      .from('public_leads')
      .update({
        status: 'cancelled',
        notes: `Cancelled at ${new Date().toISOString()}. Reason: ${validatedData.cancel_reason || 'not specified'}. ${validatedData.notes || ''}`,
      })
      .eq('id', token.lead_id);

    await supabase
      .from('booking_tokens')
      .update({
        status: 'cancelled',
        metadata: {
          ...token.metadata,
          cancelled_at: new Date().toISOString(),
          cancel_reason: validatedData.cancel_reason,
          notes: validatedData.notes,
        },
      })
      .eq('id', token.id);

    await supabase.from('events').insert({
      type: 'booking_cancelled',
      metadata: {
        booking_ref: validatedData.booking_ref,
        lead_id: token.lead_id,
        cancel_reason: validatedData.cancel_reason,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Your appointment has been cancelled. If you\'d like to rebook, please let us know.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
