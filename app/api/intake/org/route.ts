import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { z } from 'zod';

const orgRequestSchema = z.object({
  handoff_type: z.literal('org_request'),
  org_type: z.enum(['EMPLOYER', 'INSURER']),
  org_name: z.string().min(1),
  role: z.string().optional(),
  intent: z.enum(['RTW_PROGRAM', 'INJURY_PREVENTION', 'REFERRAL', 'REPORTING', 'CONSULTATION']),
  volume_range: z.string().optional(),
  location_preference: z.string().optional(),
  contact_method: z.enum(['phone', 'email', 'either']),
  contact_value: z.string().min(1),
  contact_window: z.string().optional(),
  notes: z.string().optional(),
  persona: z.enum(['EMP', 'INS']),
  confidence: z.number().optional(),
  industry: z.string().optional(),
  employee_count_range: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = orgRequestSchema.parse(body);

    const supabase = createServerSupabaseClient();

    const { data: orgRequest, error: insertError } = await supabase
      .from('org_requests')
      .insert({
        org_type: validatedData.org_type,
        org_name: validatedData.org_name,
        role: validatedData.role,
        intent: validatedData.intent,
        volume_range: validatedData.volume_range,
        location_preference: validatedData.location_preference,
        contact_method: validatedData.contact_method,
        contact_value: validatedData.contact_value,
        contact_window: validatedData.contact_window,
        notes: validatedData.notes,
        status: 'new',
        persona: validatedData.persona,
        industry: validatedData.industry,
        employee_count_range: validatedData.employee_count_range,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting org request:', insertError);
      return NextResponse.json(
        { error: 'Failed to submit organization request' },
        { status: 500 }
      );
    }

    await supabase.from('events').insert({
      type: 'org_request_submitted',
      metadata: {
        org_request_id: orgRequest.id,
        org_type: validatedData.org_type,
        intent: validatedData.intent,
        persona: validatedData.persona,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Organization request submitted successfully',
      request_id: orgRequest.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error processing org request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
