import { z } from 'zod';

export const contactInterestSchema = z.enum([
  'patient',
  'referral',
  'employer',
  'legal',
  'partnerships',
  'careers',
  'general',
]);

const optionalUtm = z.string().trim().max(200).optional().nullable();

export const contactLeadSchema = z.object({
  full_name: z.string().trim().min(2, 'Full name is required').max(160),
  email: z.string().trim().email('A valid email is required').max(200),
  phone: z.string().trim().max(40).optional().nullable(),
  interest: contactInterestSchema,
  message: z.string().trim().min(2, 'A short message is required').max(1200),
  consent_given: z.literal(true, {
    errorMap: () => ({ message: 'Consent is required' }),
  }),
  page_path: z.string().trim().startsWith('/').max(240),
  utm_source: optionalUtm,
  utm_medium: optionalUtm,
  utm_campaign: optionalUtm,
  utm_content: optionalUtm,
  utm_term: optionalUtm,
});

export type ContactLead = z.infer<typeof contactLeadSchema>;
export type ContactInterest = z.infer<typeof contactInterestSchema>;

const INTEREST_LABELS: Record<ContactInterest, string> = {
  patient: 'Patient booking question',
  referral: 'Healthcare referral',
  employer: 'Employer inquiry',
  legal: 'Legal referral',
  partnerships: 'Partnership inquiry',
  careers: 'Career opportunity',
  general: 'General question',
};

export function contactInterestLabel(interest: ContactInterest): string {
  return INTEREST_LABELS[interest];
}

export function contactFunnelType(interest: ContactInterest): string {
  const funnels: Record<ContactInterest, string> = {
    patient: 'general',
    referral: 'partner_healthcare',
    employer: 'partner_employer',
    legal: 'partner_legal',
    partnerships: 'partnership',
    careers: 'career',
    general: 'general',
  };
  return funnels[interest];
}

export function contactLeadSourceSlug(
  interest: ContactInterest,
  utmSource?: string | null,
): string {
  const attributed = utmSource?.trim().toLowerCase();
  if (attributed === 'facebook' || attributed === 'meta') return 'facebook-ads';
  if (attributed === 'instagram') return 'instagram';
  if (attributed === 'linkedin') return 'linkedin';
  if (attributed === 'google' || attributed === 'google_ads') return 'google-ads';
  if (interest === 'referral') return 'physician-referral';
  return 'website-organic';
}
