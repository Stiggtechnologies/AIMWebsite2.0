import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createAIClient, AIMessage } from '@/lib/ai';
import { generateResponse } from '@/lib/simple-ai';
import { PersonaType } from '@/lib/persona';
import { aimOS, PersonaCode } from '@/lib/aim-os';
import { sanitizeForAIChat, validateNoPHI, PHI_REFUSAL_MESSAGE } from '@/lib/phi-validator';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  const clientId = request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimit = checkRateLimit(`ai-chat:${clientId}`);

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
    const { message, history, sessionId, serviceName, serviceContext, personaType } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const phiCheck = validateNoPHI(message, 'user_message');
    if (!phiCheck.isValid) {
      return NextResponse.json(
        {
          message: PHI_REFUSAL_MESSAGE,
          intent: 'phi_blocked',
          shouldEscalate: false,
        },
        { headers: getRateLimitHeaders(rateLimit) }
      );
    }

    const sanitizedMessage = sanitizeForAIChat(message);

    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      console.log('No OpenAI API key found, falling back to simple AI');
      const personaType = await getPersonaType(sessionId);
      const response = generateResponse(
        sanitizedMessage,
        personaType,
        history || []
      );

      if (sessionId) {
        await logConversation(sessionId, message, response);
      }

      return NextResponse.json(response, {
        headers: getRateLimitHeaders(rateLimit),
      });
    }

    const aiClient = createAIClient(openaiApiKey);

    const messages: AIMessage[] = [
      ...(history || []).map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: sanitizedMessage,
      },
    ];

    let personaContext = await getPersonaContext(sessionId);

    const personaData = await getPersonaData(sessionId);
    if (personaData) {
      try {
        const aimosContext = await aimOS.getAIContext({
          persona: personaData.persona_code as PersonaCode,
          program: personaData.program,
        });

        personaContext = `${personaContext || ''}

AIM OS Context:
- Allowed Programs: ${aimosContext.allowed_programs.join(', ')}
- Eligibility Notes: ${aimosContext.eligibility_notes}
- Escalation Rules: ${aimosContext.escalation_rules.join(', ')}`;
      } catch (error) {
        console.error('Failed to fetch AIM OS context:', error);
      }
    }

    if (serviceName) {
      personaContext = `${personaContext || ''}

SERVICE CONTEXT:
- Current Service: ${serviceName}
- Service Details: ${serviceContext || 'User is viewing this service page'}
- User Persona: ${personaType || 'undetermined'}

IMPORTANT: Use this service context to provide relevant guidance. If the user's persona (employer/insurer) should not self-book this service, guide them to contact our team instead.`;
    }

    const reviewContext = await getReviewContext(personaType, sanitizedMessage);
    if (reviewContext) {
      personaContext = `${personaContext || ''}

${reviewContext}`;
    }

    const response = await aiClient.chat(messages, personaContext);

    if (sessionId) {
      await logConversation(sessionId, message, response);
    }

    return NextResponse.json(response, {
      headers: getRateLimitHeaders(rateLimit),
    });
  } catch (error) {
    console.error('AI chat error:', error);
    const response = generateResponse(
      'help',
      'undetermined',
      []
    );
    return NextResponse.json(response);
  }
}

async function getPersonaType(sessionId?: string): Promise<PersonaType> {
  if (!sessionId) return 'undetermined';

  try {
    const { data, error } = await supabase
      .from('personas')
      .select('persona_type')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (error || !data) return 'undetermined';

    return data.persona_type as PersonaType;
  } catch (error) {
    console.error('Error getting persona type:', error);
    return 'undetermined';
  }
}

async function getPersonaContext(sessionId?: string): Promise<string | undefined> {
  if (!sessionId) return undefined;

  try {
    const { data, error } = await supabase
      .from('personas')
      .select('persona_type, confidence_scores')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (error || !data) return undefined;

    const topScores = Object.entries(data.confidence_scores as Record<string, number>)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([persona, score]) => `${persona}: ${(score * 100).toFixed(0)}%`)
      .join(', ');

    return `User appears to be: ${data.persona_type} (confidence scores: ${topScores})`;
  } catch (error) {
    console.error('Error getting persona context:', error);
    return undefined;
  }
}

async function getPersonaData(sessionId?: string): Promise<{ persona_code: string; program?: string } | null> {
  if (!sessionId) return null;

  try {
    const { data, error } = await supabase
      .from('personas')
      .select('persona_type, behavioral_signals')
      .eq('session_id', sessionId)
      .maybeSingle();

    if (error || !data) return null;

    const personaMap: Record<string, string> = {
      'injured_worker': 'IW',
      'athletic': 'ATH',
      'employer': 'EMP',
      'insurer': 'INS',
      'senior': 'SR',
      'undetermined': 'COLD',
    };

    return {
      persona_code: personaMap[data.persona_type] || 'COLD',
      program: (data.behavioral_signals as any)?.program_interest?.[0],
    };
  } catch (error) {
    console.error('Error getting persona data:', error);
    return null;
  }
}

async function getReviewContext(
  personaType?: string,
  userMessage?: string
): Promise<string | undefined> {
  try {
    const hesitationKeywords = [
      'tried before',
      "didn't work",
      "hasn't helped",
      'not sure',
      'worried',
      'nervous',
      'concerned',
      'doubt',
      'skeptical',
      'failed',
      'previous',
      'other clinics',
      'other physio',
    ];

    const messageText = (userMessage || '').toLowerCase();
    const showsHesitation = hesitationKeywords.some((keyword) =>
      messageText.includes(keyword)
    );

    if (!showsHesitation && !personaType) {
      return undefined;
    }

    let query = supabase
      .from('reviews')
      .select('reviewer_name, excerpt, rating')
      .eq('rating', 5)
      .limit(2);

    if (personaType && personaType !== 'undetermined') {
      query = query.contains('persona_tags', [personaType]);
    }

    const { data: reviews } = await query;

    if (!reviews || reviews.length === 0) {
      return undefined;
    }

    const reviewsText = reviews
      .map(
        (review) =>
          `"${review.excerpt}" — ${review.reviewer_name}, ${review.rating}-star review`
      )
      .join('\n\n');

    return `
PATIENT TESTIMONIALS:
When users express hesitation or past negative experiences, you may share these authentic reviews:

${reviewsText}

USAGE GUIDELINES:
- Only quote reviews when directly relevant to user concerns
- Keep it natural and conversational
- Never force testimonials into every response
- Introduce with context like "One of our patients shared:" or "A recent patient told us:"`;
  } catch (error) {
    console.error('Error getting review context:', error);
    return undefined;
  }
}

async function logConversation(
  sessionId: string,
  userMessage: string,
  response: any
): Promise<void> {
  try {
    const { data: existing } = await supabase
      .from('ai_conversations')
      .select('id, messages, detected_intent')
      .eq('session_id', sessionId)
      .maybeSingle();

    const allMessages = [
      ...(existing?.messages || []),
      {
        role: 'user',
        content: userMessage,
        timestamp: new Date().toISOString(),
      },
      {
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString(),
      },
    ];

    if (existing) {
      await supabase
        .from('ai_conversations')
        .update({
          messages: allMessages,
          detected_intent: response.intent || existing.detected_intent,
          escalated: response.shouldEscalate,
        })
        .eq('id', existing.id);
    } else {
      await supabase.from('ai_conversations').insert({
        session_id: sessionId,
        messages: allMessages,
        detected_intent: response.intent,
        escalated: response.shouldEscalate,
      });
    }
  } catch (error) {
    console.error('Error logging conversation:', error);
  }
}
