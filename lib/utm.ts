/**
 * Google Ads / campaign attribution for website bookings.
 *
 * The South Common lead form already captured these keys from the URL.
 * Booking confirm did not, so a paid click that booked landed in crm_leads
 * with utm_source/medium/campaign NULL. This helper is the shared read path
 * for the confirm route (body + cookies + query) and the AI intake client.
 */

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

export const AIM_UTM_STORAGE_KEY = 'aim_utms';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function trimUtm(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function hasAnyUtm(utms: UtmParams | null | undefined): boolean {
  if (!utms) return false;
  return UTM_KEYS.some((key) => Boolean(trimUtm(utms[key])));
}

export function readUtmsFromSearchParams(
  search: URLSearchParams | string | null | undefined
): UtmParams {
  if (!search) return {};
  const params =
    typeof search === 'string'
      ? new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
      : search;
  const out: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = trimUtm(params.get(key));
    if (value) out[key] = value;
  }
  return out;
}

export function readUtmsFromCookieHeader(
  cookieHeader: string | null | undefined
): UtmParams {
  if (!cookieHeader) return {};
  const map = new Map<string, string>();
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const name = part.slice(0, idx).trim();
    let raw = part.slice(idx + 1).trim();
    try {
      raw = decodeURIComponent(raw);
    } catch {
      // Keep the raw cookie value if it is not URI-encoded.
    }
    map.set(name, raw);
  }
  const out: UtmParams = {};
  for (const key of UTM_KEYS) {
    const value = trimUtm(map.get(key));
    if (value) out[key] = value;
  }
  return out;
}

/**
 * First non-empty value per key wins. Confirm uses body, then cookies,
 * then the request query so an explicit client payload is not overwritten
 * by a stale cookie, but a paid click that only left cookies still attributes.
 */
export function mergeUtms(
  ...sources: Array<UtmParams | null | undefined>
): UtmParams {
  const out: UtmParams = {};
  for (const key of UTM_KEYS) {
    for (const source of sources) {
      const value = trimUtm(source?.[key]);
      if (value) {
        out[key] = value;
        break;
      }
    }
  }
  return out;
}

export function utmsForCrmInsert(
  utms: UtmParams
): Record<UtmKey, string | null> {
  return {
    utm_source: utms.utm_source ?? null,
    utm_medium: utms.utm_medium ?? null,
    utm_campaign: utms.utm_campaign ?? null,
    utm_content: utms.utm_content ?? null,
    utm_term: utms.utm_term ?? null,
  };
}

function readStoredUtms(): UtmParams {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(AIM_UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    const out: UtmParams = {};
    for (const key of UTM_KEYS) {
      const value = trimUtm((parsed as Record<string, unknown>)[key] as string);
      if (value) out[key] = value;
    }
    return out;
  } catch {
    return {};
  }
}

function persistUtms(utms: UtmParams): void {
  if (typeof window === 'undefined' || !hasAnyUtm(utms)) return;
  try {
    sessionStorage.setItem(AIM_UTM_STORAGE_KEY, JSON.stringify(utms));
  } catch {
    // Private mode / quota — cookies below are the fallback.
  }
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  for (const key of UTM_KEYS) {
    const value = utms[key];
    if (!value) continue;
    document.cookie = `${key}=${encodeURIComponent(value)}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  }
}

/**
 * Call once on any page load. A Google Ads click usually lands on `/` with
 * UTMs, then the patient navigates to /ai-intake — the query string is gone
 * unless we keep it. Last-touch: a new UTM query overwrites the stored set.
 */
export function captureUtmsFromWindow(): UtmParams {
  if (typeof window === 'undefined') return {};
  const fromUrl = readUtmsFromSearchParams(window.location.search);
  if (hasAnyUtm(fromUrl)) {
    persistUtms(fromUrl);
    return fromUrl;
  }
  return mergeUtms(readStoredUtms(), readUtmsFromCookieHeader(document.cookie));
}

/** Payload fragment for POST /api/booking/confirm. */
export function getUtmsForPayload(): UtmParams {
  if (typeof window === 'undefined') return {};
  return mergeUtms(
    readUtmsFromSearchParams(window.location.search),
    readStoredUtms(),
    readUtmsFromCookieHeader(document.cookie)
  );
}
