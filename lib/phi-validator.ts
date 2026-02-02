const PHI_PATTERNS = {
  sin: /\b\d{3}[-\s]?\d{3}[-\s]?\d{3}\b/g,
  healthCard: /\b[A-Z]{2}\d{9,10}\b/gi,
  postalCode: /\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b/gi,
  phone: /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  dateOfBirth: /\b\d{4}[-/]\d{2}[-/]\d{2}\b|\b\d{2}[-/]\d{2}[-/]\d{4}\b/g,
};

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
    for (const [type, pattern] of Object.entries(PHI_PATTERNS)) {
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
