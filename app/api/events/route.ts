import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { aimOS, AIMOSEvent } from '@/lib/aim-os';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';
import { DEFAULT_LOCATION } from '@/lib/config';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  const clientId = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimit = checkRateLimit(`events:${clientId}`);

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
    const { event_type, session_id, event_data, persona_snapshot } = body;

    if (!event_type || !session_id) {
      return NextResponse.json(
        { error: 'event_type and session_id are required' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('events').insert({
      session_id,
      event_type,
      event_data: event_data || {},
      persona_snapshot: persona_snapshot || null,
    });

    if (error) {
      console.error('Error saving event:', error);
      return NextResponse.json(
        { error: 'Failed to save event' },
        { status: 500 }
      );
    }

    if (persona_snapshot?.persona_type) {
      const aimosEvent: AIMOSEvent = {
        event_id: uuidv4(),
        timestamp: new Date().toISOString(),
        session_id,
        event_type: event_type as any,
        persona: mapPersonaType(persona_snapshot.persona_type) as any,
        confidence: calculateTopConfidence(persona_snapshot.confidence_scores),
        program_interest: event_data.program_interest,
        location_slug: event_data.location_slug || DEFAULT_LOCATION.slug,
        urgency: event_data.urgency,
        source: event_data.source,
        metadata: event_data,
      };

      aimOS.sendEvent(aimosEvent).catch(err => {
        console.error('Failed to forward event to AIM OS:', err);
      });
    }

    return NextResponse.json(
      { success: true },
      { headers: getRateLimitHeaders(rateLimit) }
    );
  } catch (error) {
    console.error('Event API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function mapPersonaType(type: string): string {
  const mapping: Record<string, string> = {
    'injured_worker': 'IW',
    'athletic': 'ATH',
    'employer': 'EMP',
    'insurer': 'INS',
    'senior': 'SR',
    'undetermined': 'COLD',
  };
  return mapping[type] || 'COLD';
}

function calculateTopConfidence(scores: Record<string, number> = {}): number {
  const values = Object.values(scores);
  return values.length > 0 ? Math.max(...values) : 0;
}
