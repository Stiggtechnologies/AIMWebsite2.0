import { DEFAULT_LOCATION } from './config';

/**
 * AIM-EDM-001 — Centre 87 / edmonton-main-hub.
 *
 * Live AIMOS clinic UUID (prod, verified 2026-09-01). Do not invent a
 * second clinic here. South Common / AIM Performance are paused and have
 * no AIMOS clinic row.
 *
 * Override with AIM_DEFAULT_CLINIC_ID if the AIMOS clinic row is ever
 * recreated. The fallback is the documented production UUID so a missing
 * env var still writes a visible lead instead of clinic_id NULL.
 */
export const AIM_EDM_001_CLINIC_ID = '28204b3e-1a45-43b1-94b0-dab164a697ed';
export const AIM_EDM_001_CODE = 'AIM-EDM-001';

/**
 * Website location slugs that belong to AIM-EDM-001.
 * DEFAULT_LOCATION.slug is edmonton-main-hub today; listed both ways so a
 * rename of the constant cannot silently drop the mapping.
 */
const AIM_EDM_001_LOCATION_SLUGS = new Set<string>([
  'edmonton-main-hub',
  DEFAULT_LOCATION.slug,
]);

export function getDefaultClinicId(): string {
  const fromEnv = process.env.AIM_DEFAULT_CLINIC_ID?.trim();
  return fromEnv || AIM_EDM_001_CLINIC_ID;
}

/**
 * Resolve the AIMOS clinic_id for a website booking.
 *
 * crm_leads RLS uses pp_user_can_access_clinic(clinic_id), which is false
 * when clinic_id IS NULL. A row without this UUID is invisible on the
 * Leads screen even though the insert succeeded.
 *
 * Unknown slugs (typos, paused locations, future sites) still default to
 * AIM-EDM-001 — it is the only live clinic. Do not return null.
 */
export function clinicIdForLocation(locationSlug?: string | null): string {
  const slug = locationSlug?.trim() || DEFAULT_LOCATION.slug;
  if (!AIM_EDM_001_LOCATION_SLUGS.has(slug)) {
    // Only live clinic as of 2026-09-01. When a second AIMOS clinic
    // exists, add it to AIM_EDM_001_LOCATION_SLUGS or a sibling map —
    // do not leave clinic_id unset.
  }
  return getDefaultClinicId();
}
