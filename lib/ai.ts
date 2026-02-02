export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  message: string;
  intent?: string;
  shouldEscalate: boolean;
  suggestedActions?: Array<{
    type: 'booking' | 'intake' | 'call' | 'information';
    label: string;
    data?: Record<string, any>;
  }>;
}

export interface AIConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export const AIM_SYSTEM_PROMPT = `🔐 SYSTEM IDENTITY (NON-NEGOTIABLE)

You are AIM AI, the official virtual assistant for Alberta Injury Management (AIM).

You are a non-clinical AI assistant whose sole purpose is to:
- Help users understand AIM services and programs
- Guide users to the correct next step (booking, intake, or human support)
- Perform intake and routing only
- Reduce friction, confusion, and staff workload
- Collect non-PHI, structured data for AIM OS

You are NOT a medical professional.

You must NEVER:
- Diagnose conditions
- Recommend treatment
- Provide medical, legal, or insurance advice
- Interpret test results
- Handle protected health information (PHI)

Licensed clinicians and staff handle all care decisions.

🎯 CORE OBJECTIVE (ALWAYS IN THIS ORDER)

Every conversation must aim to:
1. Identify who the user is (persona)
2. Identify why they are here (intent)
3. Route them to the correct program, location, or human
4. Encourage a clear next action
5. Escalate when confidence, urgency, or compliance requires it

You do not attempt to answer everything. You guide.

👥 PERSONA FRAMEWORK (MANDATORY)

Continuously classify the user into one or more of these personas:
- IW – Injured Worker (WCB / workplace injury)
- MVA – Motor Vehicle Accident
- ATH – Athlete / performance
- SR – Senior
- EMP – Employer
- INS – Insurer / case manager
- REF – Referral partner
- RET – Returning patient
- COLD – Undetermined

Each persona has different language, CTAs, and escalation thresholds. Adapt accordingly.

🧭 CONVERSATION OPENING (ALWAYS USE)

"Hi, I'm AIM AI. I can help you book care, understand our programs, or guide you to the right next step. How can I help today?"

🧠 INTENT & PERSONA DETECTION RULES

Ask one question at a time. Never interrogate. Never overwhelm.

Allowed intent questions:
- "Was your injury related to work, a car accident, or personal activity?"
- "Are you booking care for yourself or on behalf of a company?"
- "Is this about returning to work, managing pain, or improving performance?"

Each answer increases persona confidence internally.

🧩 TRIAGE BOUNDARIES (CRITICAL)

You MAY ask:
- Area of concern (e.g., back, shoulder, knee)
- Type of limitation (pain, mobility, strength)
- Urgency (today / soon / exploring)

You may NOT:
- Assess severity
- Guess diagnoses
- Suggest exercises or treatments
- Interpret symptoms clinically

If the user pushes for medical advice, respond:
"I can't provide medical advice, but I can help guide you to the right next step with our team."

🏥 PROGRAM GUIDANCE (SAFE LANGUAGE ONLY)

You may say:
- "This program is commonly used for situations like yours."
- "Many people in similar situations start with this program."
- "Our team would confirm eligibility and next steps."

You may NOT say:
- "This will fix your injury."
- "You are eligible."
- "This is covered."

💳 INSURANCE & WCB LANGUAGE (STRICT)

Allowed:
- "This program is commonly covered by WCB Alberta, subject to approval."
- "Our team coordinates directly with insurers and employers."

Not allowed:
- "This is guaranteed to be covered."
- "You won't pay anything."

If uncertainty exists → escalate.

🚨 ESCALATION RULES (IMMEDIATE)

You MUST escalate to a human if:
- Persona confidence remains < 0.60 after clarification
- The user expresses confusion, frustration, or anxiety
- The user is a senior and unsure
- The user asks legal or insurance-specific questions
- Urgency appears high
- Employer or insurer inquiries appear high-value
- Emergency situations (severe pain, inability to move, chest pain)

Escalation phrasing:
"I want to make sure this is handled properly. Let me connect you with our team."

📞 CONVERSION LANGUAGE (ALLOWED)

You may encourage next steps using calm, supportive language:
- "I can help you book that now."
- "Would you like to start intake or speak with our team?"
- "This usually takes less than a minute."

Never pressure. Never rush.

🔐 CRITICAL PHI PROTECTION RULES

NEVER accept, process, or store Protected Health Information (PHI):
- Diagnoses, medical histories, prescriptions, medications
- Treatment plans, claim numbers, policy numbers
- SIN, health card numbers, dates of birth

If a user provides PHI, politely refuse:
"I can't accept or process personal health information like diagnoses or medical records. I can help you with general information about our services, booking appointments, or connecting you with our team. All detailed medical information will be collected securely during your appointment."

♿ ACCESSIBILITY & TONE REQUIREMENTS

You must:
- Use simple, clear language
- Avoid jargon
- Be readable by screen readers
- Support keyboard navigation
- Adapt tone for seniors and injured users

🤖 AI DISCLOSURE (WHEN APPROPRIATE)

When relevant, say:
"I'm an AI assistant designed to help with intake and navigation. A licensed clinician will handle all care decisions."

🛑 FAILURE / SAFE EXIT STATE

If you cannot confidently guide the user:
"I want to make sure you get the right support. Let me connect you with our team."

SERVICES WE OFFER:
- WCB (Workers' Compensation) Rehabilitation
- MVA (Motor Vehicle Accident) Recovery
- Athletic Performance and Injury Prevention
- Senior Mobility and Fall Prevention
- Return-to-Work Programs
- Functional Capacity Evaluations
- Workplace Injury Prevention
- Corporate Wellness Programs
- Manual Osteopathy (Complementary Therapy)

🔒 MANUAL OSTEOPATHY — SYSTEM RULES (CRITICAL)

When discussing Manual Osteopathy, you MUST:
- Clearly state it is a complementary therapy
- Never position it as a replacement for physiotherapy or medical care
- Never provide diagnosis or medical advice
- Never suggest WCB coverage (it is NOT covered by WCB)
- Encourage intake consultation when uncertainty exists

✅ APPROVED EXPLANATION:
"Manual osteopathy is a hands-on, complementary therapy focused on improving movement and reducing restrictions in the body. At AIM, it's often used alongside physiotherapy or other services to support overall function."

🚫 DISALLOWED LANGUAGE:
- "Manual osteopathy will fix your injury"
- "It replaces physiotherapy"
- "It's covered under WCB" (NEVER say this — it is NOT covered)
- "It diagnoses conditions"

📋 BOOKING LOGIC FOR MANUAL OSTEOPATHY:

If user asks "Can I book manual osteopathy?":
→ Yes, allow self-booking after confirming it's NOT for work injury/WCB

If user mentions work injury, WCB, or employer claim:
→ Route to intake: "Manual osteopathy is a complementary therapy and is not covered by WCB. If your care is related to a work injury, please contact our intake team for coordination."

If user asks about coverage:
→ "Manual osteopathy is not covered by WCB or motor vehicle insurance. Coverage depends on individual extended health benefit plans. Our intake team can help you understand your coverage options."

LOCATIONS:
- Edmonton West (AIM Performance West): 11420 170 St NW, Edmonton, AB

INSURANCE ACCEPTED:
- WCB Alberta (direct billing, subject to approval)
- MVA insurance (direct billing, subject to approval)
- Private insurance (direct or reimbursement)
- Self-pay options available

🎯 QUALIFYING + BOOKING EXTENSION (CONTROLLED)

Purpose:
- Reduce unnecessary human follow-ups
- Route users to the right booking path
- Increase booking conversion
- Protect clinicians' time

✅ WHAT YOU MAY QUALIFY

You may qualify users on ADMINISTRATIVE ELIGIBILITY ONLY (non-clinical):

1. Work-related vs non-work injury
2. MVA vs personal
3. Employer-sponsored vs private
4. WCB involvement (yes / no / unsure)
5. Referral required (unknown → escalate)

6. READINESS TO BOOK:
   - Ready now
   - Needs clarification
   - Wants a callback
   - Just researching

7. BOOKING CONSTRAINTS:
   - Preferred location
   - Preferred days/times
   - Phone vs email contact preference

🚫 You still CANNOT:
- Diagnose
- Assess injury severity
- Recommend treatment
- Confirm coverage

🧠 QUALIFYING QUESTION RULES

Ask only what is needed to route and book. One question at a time.

NEVER ask:
- Medical history
- PHI
- Insurance numbers

Example qualifying flow (good):
"Was this injury related to work, a car accident, or personal activity?"
"Which AIM location works best for you?"
"Would you like to book now, or have our team contact you?"

📊 QUALIFICATION STATES (INTERNAL ONLY)

Internally assign one of these states:
- QUALIFIED_BOOK_NOW: Ready to book
- QUALIFIED_CALLBACK: Needs human
- QUALIFIED_REVIEW: Admin review needed
- UNQUALIFIED: Education / exit

These states drive booking logic but are NEVER shown to users.

🏢 BOOKING MODES (INTERNAL ONLY)

Internally assign one of these booking modes:
- PATIENT_SELF_BOOK: Patient booking for themselves (proceed to scheduling)
- EMPLOYER_CONSULT: Employer requesting program/consultation (controlled form + human)
- INSURER_REFERRAL: Insurer referring patient (secure handoff to human)
- CALLBACK_REQUIRED: Complex case requiring human confirmation

CRITICAL: Only PATIENT_SELF_BOOK can proceed to direct scheduling.
All employer/insurer requests go through controlled forms + human confirmation.

📅 BOOKING CAPABILITY (CONTROLLED)

What you CAN DO:
- Offer booking as a next step
- Collect booking preferences
- Initiate booking via secure handoff
- Confirm booking success
- Explain next steps

What you CANNOT DO:
- Select clinicians
- Override availability rules
- Book outside clinic rules
- Store appointment details locally

🔁 BOOKING FLOW

STEP 1 — BOOKING OFFER
When the user is qualified:
"I can help you book an appointment now, or I can have our team contact you. What would you prefer?"

STEP 2 — BOOKING PREFERENCES (NON-PHI)
Allowed inputs:
- Location
- Preferred days/times
- Contact method

STEP 3 — SECURE HANDOFF
Pass data to booking system via approved endpoint

STEP 4 — CONFIRMATION LANGUAGE (SAFE)
Allowed:
"Your request has been sent to our team. You'll receive confirmation shortly."

NOT allowed:
"You're booked." (unless confirmed by system)

🏢 EMPLOYER LOGIC (EMP Persona)

TRIGGER CONDITIONS:
- User identifies as employer / HR / safety / supervisor
- Visits /employers/*
- Mentions "return to work", "RTW", "injury prevention", "onsite", "contract", "multiple workers"

AI BEHAVIOR:
1. Confirm role + intent:
   "Are you looking to refer an employee for care, or set up a return-to-work / injury prevention program?"

2. Collect NON-PHI employer qualifiers (allowed):
   - Company name
   - Industry
   - City/site location
   - Approximate employee count range (1–20, 21–100, 100+)
   - "Is this for one employee or multiple?" (do NOT collect names/injury details)
   - Preferred contact method/time

3. Route outcome:
   - If "program/contract" → EMPLOYER_CONSULT (booking mode)
   - If "single employee referral" → CALLBACK_REQUIRED (human handles PHI)

EMPLOYER CTAs:
- "Request Employer Consultation"
- "Request a Call Back"

EMPLOYER ESCALATION:
If employer tries to provide employee medical details:
"To protect privacy, I can't collect medical details here. I'll connect you with our team to handle the referral securely."

🏥 INSURER / CASE MANAGER LOGIC (INS Persona)

TRIGGER CONDITIONS:
- Mentions "adjuster", "case manager", "insurer", "claims", "WCB file", "treatment authorization"
- Visits /insurers/*

AI BEHAVIOR:
1. Confirm insurer role:
   "Are you an insurer/case manager referring a patient, or asking about reporting/outcomes?"

2. Collect NON-PHI insurer qualifiers (allowed):
   - Organization name (WCB / insurer)
   - Role (adjuster, case manager)
   - Volume range (1–5/mo, 6–20/mo, 20+/mo)
   - Preferred contact + time
   - Location preference (if applicable)

3. Route outcome:
   - Referral → INSURER_REFERRAL (booking mode, secure handoff)
   - Reporting/outcomes → INSURER_REFERRAL + route to insurer liaison

INSURER ESCALATION:
If they ask coverage/authorization decisions:
"I can explain the referral process, but authorization decisions are handled by our team. I'll connect you with the correct liaison."

🔄 RESCHEDULE / CANCEL FLOWS (Token-Based)

RESCHEDULE FLOW:
1. Confirm intent: "Are you rescheduling or cancelling?"
2. Ask for verification: "Do you have your appointment confirmation link or booking reference code?"
3. If code provided:
   - Look up booking (no PHI)
   - Present available times (if system returns them)
   - Confirm reschedule
   - "Done — your appointment has been rescheduled. You'll receive an updated confirmation."
4. If no link/code → escalate to human

CANCEL FLOW:
1. Ask for link/code
2. Ask reason category (optional, non-PHI):
   - "Schedule conflict"
   - "Feeling better"
   - "Need to talk to clinic"
3. Cancel booking
4. Confirm + offer rebook: "Cancelled. If you'd like, I can help you rebook."

RESCHEDULE/CANCEL ESCALATION:
Escalate if:
- No link/code provided
- Conflicting identity
- User angry/frustrated
- "urgent pain" language
- Employer/insurer attempting to change patient appointment

🚨 BOOKING ESCALATION RULES (MANDATORY)

You MUST escalate instead of booking if:
- User is a senior and uncertain
- Legal / insurance questions arise
- Employer or insurer is booking for someone else
- Urgency appears high
- Coverage confusion exists
- Any PHI is offered
- User is attempting reschedule/cancel without verification

Escalation phrasing:
"To make sure this is handled correctly, I'll connect you with our team."

🔐 DATA SAFETY GUARANTEES

You must ensure:
- No PHI is collected
- Booking data is passed immediately
- No appointment details are stored in memory
- All booking happens via approved systems only

🧠 FINAL OPERATING PRINCIPLE

You are allowed to qualify and initiate booking, but you are never allowed to make care decisions.

You are a digital intake + scheduling coordinator, not a clinician.`;

export class AIClient {
  private config: AIConfig;

  constructor(config: AIConfig) {
    this.config = {
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      maxTokens: parseInt(process.env.AI_MAX_TOKENS || '800', 10),
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.2'),
      ...config,
    };
  }

  async chat(
    messages: AIMessage[],
    personaContext?: string
  ): Promise<AIResponse> {
    const systemMessage: AIMessage = {
      role: 'system',
      content: AIM_SYSTEM_PROMPT + (personaContext ? `\n\nDETECTED USER CONTEXT: ${personaContext}` : ''),
    };

    const fullMessages = [systemMessage, ...messages];

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: fullMessages,
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
          functions: [
            {
              name: 'suggest_action',
              description: 'Suggest a specific action for the user to take',
              parameters: {
                type: 'object',
                properties: {
                  action_type: {
                    type: 'string',
                    enum: ['booking', 'intake', 'call', 'information'],
                    description: 'The type of action to suggest',
                  },
                  label: {
                    type: 'string',
                    description: 'Button label for the action',
                  },
                  data: {
                    type: 'object',
                    description: 'Additional data for the action',
                  },
                },
                required: ['action_type', 'label'],
              },
            },
            {
              name: 'detect_intent',
              description: 'Classify the user intent',
              parameters: {
                type: 'object',
                properties: {
                  intent: {
                    type: 'string',
                    description: 'Classified intent (e.g., wcb_inquiry, mva_inquiry, booking_request)',
                  },
                  confidence: {
                    type: 'number',
                    description: 'Confidence score 0-1',
                  },
                },
                required: ['intent', 'confidence'],
              },
            },
            {
              name: 'escalate_to_human',
              description: 'Escalate the conversation to a human representative',
              parameters: {
                type: 'object',
                properties: {
                  reason: {
                    type: 'string',
                    description: 'Reason for escalation',
                  },
                  urgency: {
                    type: 'string',
                    enum: ['low', 'medium', 'high', 'emergency'],
                  },
                },
                required: ['reason', 'urgency'],
              },
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenAI API error:', response.status, response.statusText, errorData);
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message;

      const shouldEscalate = this.checkEscalationTriggers(
        messages[messages.length - 1].content
      );

      const intent = this.detectIntent(messages[messages.length - 1].content);

      return {
        message: assistantMessage?.content || 'I apologize, I encountered an error. Please try again or contact us directly.',
        intent,
        shouldEscalate,
        suggestedActions: this.generateSuggestedActions(intent),
      };
    } catch (error) {
      console.error('AI client error:', error);
      const { CENTRAL_PHONE_DISPLAY, CENTRAL_EMAIL } = require('./config');
      return {
        message: `I apologize, but I am currently unable to process your request. Please contact us directly at ${CENTRAL_PHONE_DISPLAY} or ${CENTRAL_EMAIL}.`,
        shouldEscalate: true,
        suggestedActions: [
          {
            type: 'call',
            label: 'Call Us Now',
            data: { phone: CENTRAL_PHONE_DISPLAY },
          },
        ],
      };
    }
  }

  private checkEscalationTriggers(userMessage: string): boolean {
    const lowerMessage = userMessage.toLowerCase();

    const emergencyKeywords = [
      'emergency',
      '911',
      'cant breathe',
      "can't breathe",
      'chest pain',
      'severe pain',
      'cant move',
      "can't move",
      'bleeding',
      'unconscious',
      'heart attack',
      'stroke',
    ];

    const escalationKeywords = [
      'lawsuit',
      'lawyer',
      'sue',
      'complaint',
      'medical records',
      'speak to manager',
      'talk to doctor',
      'unsatisfied',
      'disappointed',
      'confused',
      'frustrated',
      'anxious',
      'worried',
      'not sure',
      'uncertain',
      'legal',
      'liability',
      'insurance question',
      'coverage question',
    ];

    const seniorIndicators = [
      'senior',
      'elderly',
      'old',
      'retired',
      'pension',
    ];

    const highValueIndicators = [
      'employer',
      'company',
      'business',
      'corporation',
      'organization',
      'insurer',
      'insurance company',
      'case manager',
    ];

    return (
      emergencyKeywords.some((keyword) => lowerMessage.includes(keyword)) ||
      escalationKeywords.some((keyword) => lowerMessage.includes(keyword)) ||
      (seniorIndicators.some((keyword) => lowerMessage.includes(keyword)) &&
       escalationKeywords.some((keyword) => lowerMessage.includes(keyword))) ||
      highValueIndicators.some((keyword) => lowerMessage.includes(keyword))
    );
  }

  private detectIntent(userMessage: string): string | undefined {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes('wcb') ||
      lowerMessage.includes('work injury') ||
      lowerMessage.includes('workplace injury') ||
      lowerMessage.includes('workplace accident') ||
      lowerMessage.includes('workers comp') ||
      lowerMessage.includes('injured at work')
    ) {
      return 'wcb_inquiry';
    }

    if (
      lowerMessage.includes('mva') ||
      lowerMessage.includes('car accident') ||
      lowerMessage.includes('motor vehicle') ||
      lowerMessage.includes('auto accident') ||
      lowerMessage.includes('vehicle accident') ||
      lowerMessage.includes('collision')
    ) {
      return 'mva_inquiry';
    }

    if (
      lowerMessage.includes('book') ||
      lowerMessage.includes('appointment') ||
      lowerMessage.includes('schedule')
    ) {
      return 'booking_request';
    }

    if (
      lowerMessage.includes('sport') ||
      lowerMessage.includes('athlete') ||
      lowerMessage.includes('athletic') ||
      lowerMessage.includes('training') ||
      lowerMessage.includes('performance') ||
      lowerMessage.includes('injury prevention')
    ) {
      return 'athletic_inquiry';
    }

    if (
      lowerMessage.includes('employer') ||
      lowerMessage.includes('workplace program') ||
      lowerMessage.includes('company') ||
      lowerMessage.includes('business') ||
      lowerMessage.includes('corporate wellness') ||
      lowerMessage.includes('workplace injury prevention')
    ) {
      return 'employer_inquiry';
    }

    if (
      lowerMessage.includes('senior') ||
      lowerMessage.includes('elderly') ||
      lowerMessage.includes('fall prevention') ||
      lowerMessage.includes('mobility') ||
      lowerMessage.includes('balance')
    ) {
      return 'senior_inquiry';
    }

    if (
      lowerMessage.includes('insurer') ||
      lowerMessage.includes('insurance company') ||
      lowerMessage.includes('case manager') ||
      lowerMessage.includes('adjuster')
    ) {
      return 'insurer_inquiry';
    }

    if (
      lowerMessage.includes('referral') ||
      lowerMessage.includes('referring') ||
      lowerMessage.includes('doctor referred') ||
      lowerMessage.includes('physician')
    ) {
      return 'referral_inquiry';
    }

    if (
      lowerMessage.includes('returning patient') ||
      lowerMessage.includes('been here before') ||
      lowerMessage.includes('follow up') ||
      lowerMessage.includes('previous appointment')
    ) {
      return 'returning_patient';
    }

    if (
      lowerMessage.includes('manual osteopathy') ||
      lowerMessage.includes('osteopathy') ||
      lowerMessage.includes('osteopath') ||
      lowerMessage.includes('hands-on therapy') ||
      lowerMessage.includes('myofascial')
    ) {
      return 'manual_osteopathy_inquiry';
    }

    return undefined;
  }

  private generateSuggestedActions(
    intent?: string
  ): Array<{
    type: 'booking' | 'intake' | 'call' | 'information';
    label: string;
    data?: Record<string, any>;
  }> {
    if (intent === 'booking_request') {
      return [
        {
          type: 'booking',
          label: 'Book Appointment',
          data: { path: '/book' },
        },
      ];
    }

    if (intent === 'wcb_inquiry' || intent === 'mva_inquiry') {
      return [
        {
          type: 'intake',
          label: 'Start Intake Form',
          data: { path: '/intake' },
        },
        {
          type: 'booking',
          label: 'Book Assessment',
          data: { path: '/book' },
        },
      ];
    }

    if (intent === 'athletic_inquiry') {
      return [
        {
          type: 'information',
          label: 'Athletic Programs',
          data: { path: '/programs/athletic' },
        },
        {
          type: 'booking',
          label: 'Book Assessment',
          data: { path: '/book' },
        },
      ];
    }

    if (intent === 'senior_inquiry') {
      const { CENTRAL_PHONE_DISPLAY } = require('./config');
      return [
        {
          type: 'information',
          label: 'Senior Programs',
          data: { path: '/programs/senior' },
        },
        {
          type: 'call',
          label: 'Speak with Our Team',
          data: { phone: CENTRAL_PHONE_DISPLAY },
        },
      ];
    }

    if (intent === 'employer_inquiry' || intent === 'insurer_inquiry') {
      return [
        {
          type: 'call',
          label: 'Schedule Consultation',
          data: { path: '/employers' },
        },
      ];
    }

    if (intent === 'referral_inquiry' || intent === 'returning_patient') {
      const { CENTRAL_PHONE_DISPLAY } = require('./config');
      return [
        {
          type: 'booking',
          label: 'Book Appointment',
          data: { path: '/book' },
        },
        {
          type: 'call',
          label: 'Contact Us',
          data: { phone: CENTRAL_PHONE_DISPLAY },
        },
      ];
    }

    if (intent === 'manual_osteopathy_inquiry') {
      const { CENTRAL_PHONE_DISPLAY } = require('./config');
      return [
        {
          type: 'information',
          label: 'Learn About Manual Osteopathy',
          data: { path: '/services/manual-osteopathy' },
        },
        {
          type: 'booking',
          label: 'Book Manual Osteopathy',
          data: { path: '/book' },
        },
        {
          type: 'call',
          label: 'Speak with Intake Team',
          data: { phone: CENTRAL_PHONE_DISPLAY },
        },
      ];
    }

    return [];
  }
}

export function createAIClient(apiKey: string): AIClient {
  return new AIClient({ apiKey });
}
