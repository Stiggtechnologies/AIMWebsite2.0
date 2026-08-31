// NOTE: none of these carry the /g flag, and that is deliberate.
//
// RegExp.prototype.test() on a global regex is STATEFUL: it advances lastIndex
// on a match and returns false on the next call against the same object, then
// resets. These patterns are module-level singletons reused across every request,
// so with /g the validator returned different answers for identical input
// depending on call order — meaning it could silently fail to detect a real SIN
// or health card number. A guard that is only sometimes armed is worse than no
// guard, because it is trusted. Without /g, test() is pure.
const PHI_PATTERNS = {
  sin: /\b\d{3}[-\s]?\d{3}[-\s]?\d{3}\b/,
  healthCard: /\b[A-Z]{2}\d{9,10}\b/i,
  postalCode: /\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b/i,
  phone: /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/,
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
  dateOfBirth: /\b\d{4}[-/]\d{2}[-/]\d{2}\b|\b\d{2}[-/]\d{2}[-/]\d{4}\b/,
};

type PhiPatternName = keyof typeof PHI_PATTERNS;

// Fields whose entire purpose is to hold a contact detail.
//
// A booking form cannot work if the field that exists to carry a phone number
// rejects phone numbers. /api/booking/confirm declares
// `contact_method: 'phone' | 'email' | 'either'` alongside a required
// `contact_value`, so contact_value can only ever be a phone number or an email
// address — and the guard rejected both. Every online booking since the form
// shipped was refused with "PHI detected in request", telling a patient trying
// to book physiotherapy that their own phone number was protected health
// information.
//
// The exemption is per-field AND per-pattern: contact_value may contain a phone
// number or an email, and is still checked for SIN, health card, date of birth,
// postal code and every PHI keyword. Contact details are how you reach someone;
// they are not clinical information.
const CONTACT_FIELD_EXEMPTIONS: Record<string, readonly PhiPatternName[]> = {
  contact_value: ['phone', 'email'],
  email: ['email'],
  email_address: ['email'],
  phone: ['phone'],
  phone_number: ['phone'],
  contact_email: ['email'],
  contact_phone: ['phone'],
};

/** Pattern names a given field name is allowed to contain. */
function exemptionsFor(context: string): readonly PhiPatternName[] {
  const field = context.split('.').pop() ?? '';
  return CONTACT_FIELD_EXEMPTIONS[field] ?? [];
}

const PHI_KEYWORDS = [
  'diagnosis',
  'diagnosed',
  'prescription',
  'medication',
  'medical history',
  'surgery',
  'treatment plan',
  'claim number',
  'policy number',
  'incident report',
  'blood pressure',
  'heart rate',
  'test results',
  'x-ray',
  'mri',
  'ct scan',
];

const BLOCKED_FIELDS = [
  'diagnosis',
  'medical_history',
  'prescription',
  'medication',
  'treatment_plan',
  'claim_number',
  'policy_number',
  'sin',
  'health_card',
  'date_of_birth',
  'dob',
];

export interface ValidationResult {
  isValid: boolean;
  violations: string[];
  sanitizedData?: any;
}

export function validateNoPHI(data: any, context: string = 'input'): ValidationResult {
  const violations: string[] = [];

  if (typeof data === 'string') {
    const exempt = exemptionsFor(context);
    for (const [type, pattern] of Object.entries(PHI_PATTERNS)) {
      if (exempt.includes(type as PhiPatternName)) continue;
      if (pattern.test(data)) {
        violations.push(`Detected potential ${type} in ${context}`);
      }
    }

    const lowerData = data.toLowerCase();
    for (const keyword of PHI_KEYWORDS) {
      if (lowerData.includes(keyword.toLowerCase())) {
        violations.push(`Detected PHI keyword "${keyword}" in ${context}`);
      }
    }
  }

  if (typeof data === 'object' && data !== null) {
    const keys = Object.keys(data);
    for (const blockedField of BLOCKED_FIELDS) {
      if (keys.some(key => key.toLowerCase().includes(blockedField))) {
        violations.push(`Blocked PHI field "${blockedField}" in ${context}`);
      }
    }

    for (const [key, value] of Object.entries(data)) {
      const result = validateNoPHI(value, `${context}.${key}`);
      violations.push(...result.violations);
    }
  }

  return {
    isValid: violations.length === 0,
    violations,
  };
}

export function sanitizeForAIChat(message: string): string {
  let sanitized = message;

  sanitized = sanitized.replace(PHI_PATTERNS.sin, '[REDACTED-SIN]');
  sanitized = sanitized.replace(PHI_PATTERNS.healthCard, '[REDACTED-HEALTH-CARD]');
  sanitized = sanitized.replace(PHI_PATTERNS.dateOfBirth, '[REDACTED-DOB]');

  return sanitized;
}

export function blockPHIInPayload(payload: any): ValidationResult {
  const result = validateNoPHI(payload, 'payload');

  if (!result.isValid) {
    return {
      isValid: false,
      violations: result.violations,
    };
  }

  return {
    isValid: true,
    violations: [],
    sanitizedData: payload,
  };
}

export const PHI_REFUSAL_MESSAGE =
  "I can't accept or process personal health information like diagnoses, medical records, or sensitive identifiers. " +
  "I can help you with general information about our services, booking appointments, or connecting you with our team. " +
  "All detailed medical information will be collected securely during your appointment.";
