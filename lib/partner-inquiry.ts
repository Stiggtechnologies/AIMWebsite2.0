import { z } from 'zod';

export const partnerCategorySchema = z.enum(['employer', 'healthcare', 'legal']);

const optionalShortText = z.string().trim().max(200).optional().nullable();
const optionalUtm = z.string().trim().max(200).optional().nullable();

export const partnerInquirySchema = z.object({
  category: partnerCategorySchema,
  first_name: z.string().trim().min(1, 'First name is required').max(80),
  last_name: z.string().trim().min(1, 'Last name is required').max(80),
  organization: z.string().trim().min(2, 'Organization is required').max(160),
  role: optionalShortText,
  email: z.string().trim().email('A valid email is required').max(200),
  phone: z.string().trim().max(40).optional().nullable(),
  interest: z.string().trim().min(1, 'Select an area of interest').max(120),
  service_region: optionalShortText,
  expected_volume: optionalShortText,
  preferred_contact: z.enum(['email', 'phone', 'either']),
  message: z.string().trim().max(1200).optional().nullable(),
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

export type PartnerInquiry = z.infer<typeof partnerInquirySchema>;
export type PartnerCategory = z.infer<typeof partnerCategorySchema>;

export const PARTNER_CATEGORY_LABELS: Record<PartnerCategory, string> = {
  employer: 'Employer / industrial partnership',
  healthcare: 'Healthcare referral relationship',
  legal: 'Legal referral relationship',
};

export const PARTNER_NOTIFICATION_TITLES: Record<PartnerCategory, string> = {
  employer: 'New employer program inquiry',
  healthcare: 'New healthcare referral inquiry',
  legal: 'New legal referral inquiry',
};

export function notificationTitleForPartner(category: PartnerCategory): string {
  return PARTNER_NOTIFICATION_TITLES[category];
}

export function funnelTypeForPartner(category: PartnerCategory): string {
  return `partner_${category}`;
}

export function leadSourceSlugForPartner(
  category: PartnerCategory,
  utmSource?: string | null,
): string {
  const attributed = utmSource?.trim().toLowerCase();
  if (attributed === 'facebook' || attributed === 'meta') return 'facebook-ads';
  if (attributed === 'instagram') return 'instagram';
  if (attributed === 'linkedin') return 'linkedin';
  if (attributed === 'google' || attributed === 'google_ads') return 'google-ads';
  if (category === 'healthcare') return 'physician-referral';
  return 'website-organic';
}

export function buildPartnerInquiryNote(
  inquiry: PartnerInquiry,
  reference: string,
): string {
  return [
    `Partner inquiry: ${reference}`,
    `Type: ${PARTNER_CATEGORY_LABELS[inquiry.category]}`,
    `Organization: ${inquiry.organization}`,
    inquiry.role ? `Role: ${inquiry.role}` : null,
    `Interest: ${inquiry.interest}`,
    inquiry.service_region ? `Region: ${inquiry.service_region}` : null,
    inquiry.expected_volume ? `Expected volume: ${inquiry.expected_volume}` : null,
    `Preferred contact: ${inquiry.preferred_contact}`,
    inquiry.message ? `Message: ${inquiry.message}` : null,
  ].filter(Boolean).join(' · ');
}
