import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { z } from 'zod';

const rescheduleSchema = z.object({
  booking_ref: z.string().min(1),
  new_time: z.string().optional(),
  preferred_times: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = rescheduleSchema.parse(body);

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
        preferred_times: validatedData.preferred_times || [],
        status: 'contacted',
        notes: `Reschedule requested at ${new Date().toISOString()}. ${validatedData.new_time ? `Requested time: ${validatedData.new_time}` : 'Preferred times updated'}`,
      })
      .eq('id', token.lead_id);

    await supabase
      .from('booking_tokens')
      .update({
        status: 'used',
        metadata: {
          ...token.metadata,
          reschedule_requested_at: new Date().toISOString(),
          new_time: validatedData.new_time,
          preferred_times: validatedData.preferred_times,
        },
      })
      .eq('id', token.id);

    await supabase.from('events').insert({
      type: 'booking_reschedule_requested',
      metadata: {
        booking_ref: validatedData.booking_ref,
        lead_id: token.lead_id,
        new_time: validatedData.new_time,
        preferred_times: validatedData.preferred_times,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Reschedule request submitted. Our team will contact you to confirm the new time.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error rescheduling booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
