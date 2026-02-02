import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  const clientId = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimit = checkRateLimit(`intake-save:${clientId}`);

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
    const {
      session_id,
      submission_id,
      patient_data,
      injury_data,
      insurance_data,
      medical_history,
      consent_data,
      status = 'draft',
    } = body;

    if (!session_id) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    if (submission_id) {
      const { data, error } = await supabase
        .from('intake_submissions')
        .update({
          patient_data: patient_data || {},
          injury_data: injury_data || {},
          insurance_data: insurance_data || {},
          medical_history: medical_history || {},
          consent_data: consent_data || {},
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', submission_id)
        .select()
        .single();

      if (error) {
        console.error('Error updating intake:', error);
        return NextResponse.json(
          { error: 'Failed to update intake' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, id: data.id, status: data.status },
        { headers: getRateLimitHeaders(rateLimit) }
      );
    } else {
      const { data, error } = await supabase
        .from('intake_submissions')
        .insert({
          session_id,
          patient_data: patient_data || {},
          injury_data: injury_data || {},
          insurance_data: insurance_data || {},
          medical_history: medical_history || {},
          consent_data: consent_data || {},
          status,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating intake:', error);
        return NextResponse.json(
          { error: 'Failed to create intake' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, id: data.id, status: data.status },
        { headers: getRateLimitHeaders(rateLimit) }
      );
    }
  } catch (error) {
    console.error('Intake save error:', error);
    return NextResponse.json(
      { error: 'Failed to save intake' },
      { status: 500 }
    );
  }
}
