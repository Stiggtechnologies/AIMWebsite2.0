import { PersonaType } from './persona';

export interface ChatResponse {
  message: string;
  intent?: string;
  shouldEscalate?: boolean;
  suggestedActions?: Array<{ text: string; href: string }>;
}

interface IntentPattern {
  patterns: RegExp[];
  intent: string;
  responses: Partial<Record<PersonaType, string>> & { default: string };
  actions?: Array<{ text: string; href: string }>;
}

const intentPatterns: IntentPattern[] = [
  {
    patterns: [/\b(book|appointment|schedule|see someone)\b/i],
    intent: 'booking',
    responses: {
      injured_worker: "I can help you book that now. This program is commonly used for situations like yours. We offer direct WCB billing and specialized return-to-work programs, subject to approval.",
      mva: "I can help you book that now. This program is commonly used for situations like yours. We handle direct insurance billing and specialize in motor vehicle accident recovery, subject to approval.",
      athlete: "I can help you book that now. Many people in similar situations start with this program. Our therapists specialize in athletic injuries and performance optimization.",
      senior: "I can help you with that. Our team would confirm eligibility and next steps. Let me connect you with our team who specialize in senior care.",
      employer: "I want to make sure this is handled properly. Let me connect you with our team who can discuss how we support workplace injury prevention programs.",
      insurer: "I want to make sure this is handled properly. Let me connect you with our team who can coordinate case management services and comprehensive reporting.",
      referral_partner: "Thank you for considering referring your patients to us. Let me connect you with our team to provide information about our referral process.",
      returning_patient: "Welcome back! I can help you schedule your next appointment.",
      undetermined: "I can help you book that now. Was your injury related to work, a car accident, or personal activity?",
      default: "I can help you book an appointment. Let me connect you with our booking system.",
    },
    actions: [
      { text: 'Book Now', href: '/book' },
      { text: 'Call Us', href: 'tel:+17802508188' },
    ],
  },
  {
    patterns: [/\b(wcb|workers compensation|work injury|workplace injury)\b/i],
    intent: 'wcb_services',
    responses: {
      default: "This program is commonly used for situations like yours. We specialize in WCB rehabilitation and return-to-work programs. Our services include direct WCB billing (subject to approval), functional capacity evaluations, and early intervention programs. Our team would confirm eligibility and next steps.",
    },
    actions: [
      { text: 'Learn About WCB Services', href: '/programs/wcb' },
      { text: 'Book Assessment', href: '/book' },
    ],
  },
  {
    patterns: [/\b(mva|motor vehicle|car accident|whiplash)\b/i],
    intent: 'mva_services',
    responses: {
      default: "This program is commonly used for situations like yours. Our MVA recovery program includes comprehensive treatment for motor vehicle accident injuries. This program is commonly covered by MVA insurance, subject to approval. Our team coordinates directly with insurers.",
    },
    actions: [
      { text: 'MVA Recovery Program', href: '/programs/mva' },
      { text: 'Start Recovery', href: '/book' },
    ],
  },
  {
    patterns: [/\b(sport|athlete|athletic|performance|training)\b/i],
    intent: 'athletic_services',
    responses: {
      default: "Our athletic program focuses on performance rehabilitation and injury prevention. We work with athletes at all levels to optimize performance and accelerate recovery from sports injuries.",
    },
    actions: [
      { text: 'Athletic Program', href: '/programs/athletic' },
      { text: 'Book Assessment', href: '/book' },
    ],
  },
  {
    patterns: [/\b(senior|elderly|fall|balance|mobility)\b/i],
    intent: 'senior_services',
    responses: {
      default: "Our senior care program includes fall prevention, balance training, and mobility programs designed to help you maintain independence and quality of life. We specialize in age-related conditions and functional improvement.",
    },
    actions: [
      { text: 'Senior Care Program', href: '/programs/senior' },
      { text: 'Learn More', href: '/book' },
    ],
  },
  {
    patterns: [/\b(location|where|address|clinic|office)\b/i],
    intent: 'locations',
    responses: {
      default: "We have multiple clinic locations across Alberta. Our main location is Edmonton West, with convenient access and flexible scheduling.",
    },
    actions: [
      { text: 'View All Locations', href: '/locations' },
      { text: 'Edmonton West', href: '/locations/edmonton-west' },
    ],
  },
  {
    patterns: [/\b(insurance|billing|cost|price|coverage|pay)\b/i],
    intent: 'insurance',
    responses: {
      default: "This program is commonly covered by WCB Alberta or MVA insurance, subject to approval. Our team coordinates directly with insurers and employers. Our team would confirm eligibility and specific coverage for your situation.",
    },
    actions: [
      { text: 'Insurance Info', href: '/get-care' },
      { text: 'Contact Us', href: 'tel:+17802508188' },
    ],
  },
  {
    patterns: [/\b(hours|open|when|available|time)\b/i],
    intent: 'hours',
    responses: {
      default: "We offer flexible scheduling to fit your needs. Hours vary by location. Please call us at (780) 250-8188 or use our online booking system to find a time that works for you.",
    },
    actions: [
      { text: 'Book Online', href: '/book' },
      { text: 'Call Us', href: 'tel:+17802508188' },
    ],
  },
  {
    patterns: [/\b(hello|hi|hey|help|start)\b/i],
    intent: 'greeting',
    responses: {
      injured_worker: "Hi, I'm AIM AI. I see you might be dealing with a work injury. I can help you book care, understand our WCB programs, or guide you to the right next step. How can I help today?",
      mva: "Hi, I'm AIM AI. I understand you may be recovering from a motor vehicle accident. I can help you book care, understand our MVA programs, or guide you to the right next step. How can I help today?",
      athlete: "Hi, I'm AIM AI. I see you're interested in athletic performance. I can help you book care, understand our athletic programs, or guide you to the right next step. How can I help today?",
      senior: "Hi, I'm AIM AI. I can help you book care, understand our senior programs, or guide you to the right next step. How can I help today?",
      default: "Hi, I'm AIM AI. I can help you book care, understand our programs, or guide you to the right next step. How can I help today?",
    },
  },
];

export function generateResponse(
  message: string,
  personaType: PersonaType = 'undetermined',
  conversationHistory: Array<{ role: string; content: string }> = []
): ChatResponse {
  const lowercaseMessage = message.toLowerCase();

  for (const pattern of intentPatterns) {
    for (const regex of pattern.patterns) {
      if (regex.test(lowercaseMessage)) {
        const response = pattern.responses[personaType] || pattern.responses.default;

        return {
          message: response,
          intent: pattern.intent,
          shouldEscalate: false,
          suggestedActions: pattern.actions,
        };
      }
    }
  }

  const fallbackResponses: Record<PersonaType | 'default', string> = {
    injured_worker: "I'd be happy to help you with information about our WCB services and work injury rehabilitation. I can help you book an appointment now, or would you like to speak with someone directly at (780) 250-8188?",
    mva: "I can provide information about our MVA recovery programs. Would you like to book an appointment now, or would you prefer to speak with our team at (780) 250-8188?",
    athlete: "I can help with information about our athletic programs. I can help you book an appointment now, or shall I connect you with our team at (780) 250-8188?",
    senior: "I can provide information about our senior care and mobility programs. Would you like to speak with our team at (780) 250-8188 to make sure you get the right support?",
    employer: "I want to make sure this is handled properly. Let me connect you with our employer services team at (780) 250-8188.",
    insurer: "I want to make sure this is handled properly. Let me connect you with our team at (780) 250-8188 to discuss case management services.",
    referral_partner: "Thank you for considering referring your patients. Let me connect you with our team at (780) 250-8188 to provide information about our referral process.",
    returning_patient: "Welcome back! I can help you book an appointment now. Would you like to schedule your next visit?",
    undetermined: "I'm here to help! I can help you book an appointment, provide information about our services, or answer questions about our programs. What would you like to know?",
    default: "I'm here to help! I can help you book an appointment or provide information. What would you like to know? You can also reach our team directly at (780) 250-8188.",
  };

  return {
    message: fallbackResponses[personaType] || fallbackResponses.default,
    shouldEscalate: false,
    suggestedActions: [
      { text: 'Book Appointment', href: '/book' },
      { text: 'View Services', href: '/programs' },
      { text: 'Call Us', href: 'tel:+17802508188' },
    ],
  };
}
