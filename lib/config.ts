export const DEFAULT_LOCATION = {
  id: "aim-main-hub-edmonton",
  slug: "edmonton-main-hub",
  name: "Alberta Injury Management – Main Hub Clinic",
  phone: "780-250-8188",
  email: "info@albertainjurymanagement.ca"
};

export const CENTRAL_PHONE = "780-250-8188";
export const CENTRAL_PHONE_DISPLAY = "(780) 250-8188";
export const CENTRAL_PHONE_TEL = "+17802508188";
export const CENTRAL_EMAIL = "info@albertainjurymanagement.ca";

export const LOCATIONS = [
  {
    id: "aim-main-hub-edmonton",
    slug: "edmonton-main-hub",
    name: "Alberta Injury Management – Main Hub Clinic",
    address_line_1: "Unit 100, 4936 87 Street NW",
    city: "Edmonton",
    province: "AB",
    postal_code: "T6E 5W3",
    country: "Canada",
    phone: "780-250-8188",
    email: "info@albertainjurymanagement.ca",
    latitude: 53.5212,
    longitude: -113.4696,
    hours: {
      monday: "8:00 AM – 6:00 PM",
      tuesday: "8:00 AM – 6:00 PM",
      wednesday: "8:00 AM – 6:00 PM",
      thursday: "8:00 AM – 6:00 PM",
      friday: "8:00 AM – 5:00 PM"
    },
    services: [
      "Physiotherapy",
      "WCB Rehabilitation",
      "Return-to-Work Programs",
      "Chronic Pain Management",
      "Functional Capacity Evaluations",
      "Work Conditioning",
      "Work Hardening",
      "Employer Injury Management Programs"
    ],
    is_active: true,
    is_main_hub: true,
    central_contact: true
  },
  {
    id: "aim-edmonton-west",
    slug: "edmonton-west",
    name: "AIM Performance West",
    address_line_1: "11420 170 St NW",
    city: "Edmonton",
    province: "AB",
    postal_code: "T5S 1J7",
    country: "Canada",
    phone: "780-250-8188",
    email: "info@albertainjurymanagement.ca",
    latitude: 53.5866,
    longitude: -113.6243,
    hours: {
      monday: "8:00 AM – 6:00 PM",
      tuesday: "8:00 AM – 6:00 PM",
      wednesday: "8:00 AM – 6:00 PM",
      thursday: "8:00 AM – 6:00 PM",
      friday: "8:00 AM – 5:00 PM"
    },
    services: [
      "Physiotherapy",
      "Performance Rehabilitation",
      "Sports Injury Rehab",
      "WCB Rehabilitation",
      "Return-to-Work Programs"
    ],
    is_active: true,
    is_main_hub: false,
    central_contact: true
  }
];

export type Location = typeof LOCATIONS[number];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find(loc => loc.slug === slug);
}

export function getMainHubLocation(): Location {
  return LOCATIONS.find(loc => loc.is_main_hub) || LOCATIONS[0];
}

export const SERVICE_BOOKING_RULES = {
  "physiotherapy": {
    selfBookable: true,
    requiresCoordination: false,
    allowedPersonas: ["injured_worker", "mva", "athlete", "senior", "undetermined", "returning_patient"] as const,
    restrictedMessage: null
  },
  "wcb-rehabilitation": {
    selfBookable: true,
    requiresCoordination: false,
    allowedPersonas: ["injured_worker"] as const,
    restrictedMessage: "WCB Rehabilitation requires a WCB claim number. Please call us to book."
  },
  "functional-capacity-evaluations": {
    selfBookable: false,
    requiresCoordination: true,
    allowedPersonas: ["employer", "insurer"] as const,
    restrictedMessage: "Functional Capacity Evaluations are arranged through employers or case managers. Individuals cannot self-book this service."
  },
  "work-hardening": {
    selfBookable: false,
    requiresCoordination: true,
    allowedPersonas: ["employer", "insurer"] as const,
    restrictedMessage: "Work Hardening programs require employer or insurer coordination. Individuals cannot self-book this service."
  },
  "work-conditioning": {
    selfBookable: true,
    requiresCoordination: true,
    allowedPersonas: ["injured_worker", "mva", "employer", "insurer"] as const,
    restrictedMessage: "Work Conditioning typically requires coordination with your employer or case manager."
  },
  "return-to-work": {
    selfBookable: false,
    requiresCoordination: true,
    allowedPersonas: ["employer", "insurer"] as const,
    restrictedMessage: "Return-to-Work programs are designed for employers and HR teams. Individuals cannot self-book this service."
  },
  "performance-rehabilitation": {
    selfBookable: true,
    requiresCoordination: false,
    allowedPersonas: ["athlete", "undetermined", "returning_patient"] as const,
    restrictedMessage: null
  },
  "manual-osteopathy": {
    selfBookable: true,
    requiresCoordination: false,
    allowedPersonas: ["undetermined", "returning_patient", "athlete", "senior"] as const,
    restrictedMessage: "Manual osteopathy is a complementary therapy. If your care is related to a work injury, WCB claim, or insurance case, please contact our intake team for coordination."
  }
} as const;

export type ServiceSlug = keyof typeof SERVICE_BOOKING_RULES;

export function canSelfBook(serviceSlug: ServiceSlug, personaType?: string): boolean {
  const rules = SERVICE_BOOKING_RULES[serviceSlug];
  if (!rules) return true;

  if (!rules.selfBookable) return false;

  if (!personaType) return rules.selfBookable;

  return (rules.allowedPersonas as readonly string[]).includes(personaType);
}

export function getBookingRestrictionMessage(serviceSlug: ServiceSlug): string | null {
  const rules = SERVICE_BOOKING_RULES[serviceSlug];
  return rules?.restrictedMessage || null;
}
