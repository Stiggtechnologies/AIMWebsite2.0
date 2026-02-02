import { NextRequest, NextResponse } from 'next/server';
import { aimOS, IntakeHandoff, PersonaCode, UrgencyLevel, ContactPreference } from '@/lib/aim-os';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';
import { blockPHIInPayload } from '@/lib/phi-validator';

export async function POST(request: NextRequest) {
  const clientId = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimit = checkRateLimit(`intake:${clientId}`);

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
    const { handoff_token, persona, program, location, urgency, contact_pref, notes } = body;

    if (!handoff_token || !persona || !urgency || !contact_pref) {
      return NextResponse.json(
        { error: 'Missing required fields: handoff_token, persona, urgency, contact_pref' },
        { status: 400 }
      );
    }

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

    const intakeHandoff: IntakeHandoff = {
      handoff_token,
      persona: persona as PersonaCode,
      program,
      location,
      urgency: urgency as UrgencyLevel,
      contact_pref: contact_pref as ContactPreference,
      notes,
    };

    const response = await aimOS.initiateIntake(intakeHandoff);

    return NextResponse.json(response, {
      headers: getRateLimitHeaders(rateLimit),
    });
  } catch (error) {
    console.error('Intake init error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate intake' },
      { status: 500 }
    );
  }
}
