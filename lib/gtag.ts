/**
 * Google Analytics 4 (GA4) + Google Ads conversion tracking helpers.
 *
 * GA4 measurement ID is loaded unconditionally. Google Ads conversions
 * only fire when both NEXT_PUBLIC_GOOGLE_ADS_ID and the corresponding
 * per-event conversion label are set, so this module is safe to ship
 * before the Ads account is configured.
 *
 * The actual gtag.js <script> tag and the gtag('config', ...) calls
 * live in app/layout.tsx.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-PF1ZYXYL6X';

// Google Ads — leave blank in env until Google Ads conversion actions exist.
// When blank, fireAdsConversion() is a no-op (GA4 events still fire normally).
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';
export const GOOGLE_ADS_FORM_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_FORM_CONVERSION_LABEL || '';
export const GOOGLE_ADS_PHONE_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL || '';
export const GOOGLE_ADS_BOOKING_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION_LABEL || '';
export const ADS_CURRENCY = process.env.NEXT_PUBLIC_ADS_CURRENCY || 'CAD';
export const ADS_VALUE_PHONE = Number(process.env.NEXT_PUBLIC_ADS_VALUE_PHONE || '50');
export const ADS_VALUE_FORM = Number(process.env.NEXT_PUBLIC_ADS_VALUE_FORM || '150');
export const ADS_VALUE_BOOKING = Number(process.env.NEXT_PUBLIC_ADS_VALUE_BOOKING || '250');

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

/** Standard GA4 event parameters */
interface GtagEventParams {
  [key: string]: string | number | boolean | undefined;
}

/** Ensure window.gtag exists before calling */
function gtag(...args: any[]): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

// ---------------------------------------------------------------------------
// Core helpers
// ---------------------------------------------------------------------------

/** Send a pageview event (called on route change) */
export function gtagPageview(url: string, title?: string): void {
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
}

/** Send a custom GA4 event */
export function gtagEvent(
  action: string,
  params: GtagEventParams = {}
): void {
  gtag('event', action, params);
}

/**
 * Fire a Google Ads conversion. No-op unless both the Ads ID and the
 * per-event label are configured via NEXT_PUBLIC_GOOGLE_ADS_* env vars.
 *
 * `send_to` must be of the form `AW-XXXXXXXXXX/labelToken` for Ads to
 * recognise it. Sending the GA4 measurement ID does NOT record an Ads
 * conversion — that was the prior bug in this file.
 */
function fireAdsConversion(label: string, value: number): void {
  if (!GOOGLE_ADS_ID || !label) return;
  gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    value,
    currency: ADS_CURRENCY,
  });
}

// ---------------------------------------------------------------------------
// Conversion events — these map to Google Ads conversion actions
// ---------------------------------------------------------------------------

/** Visitor clicked the phone number CTA */
export function gtagPhoneClick(phoneNumber: string, source?: string): void {
  gtagEvent('phone_click', {
    event_category: 'engagement',
    event_label: phoneNumber,
    source: source || 'website',
  });
  fireAdsConversion(GOOGLE_ADS_PHONE_LABEL, ADS_VALUE_PHONE);
}

/** Visitor started the intake / booking form */
export function gtagFormStart(formId: string, formType: string): void {
  gtagEvent('form_start', {
    event_category: 'engagement',
    form_id: formId,
    form_type: formType,
  });
}

/** Visitor submitted a form (intake, contact, booking) */
export function gtagFormSubmit(formId: string, formType: string, success: boolean): void {
  gtagEvent('form_submit', {
    event_category: 'conversion',
    form_id: formId,
    form_type: formType,
    success: success.toString(),
  });
  if (success) {
    fireAdsConversion(GOOGLE_ADS_FORM_LABEL, ADS_VALUE_FORM);
  }
}

/** Visitor confirmed a booking / appointment */
export function gtagBookingConfirm(
  bookingId: string,
  appointmentType: string,
  location: string
): void {
  gtagEvent('booking_confirm', {
    event_category: 'conversion',
    booking_id: bookingId,
    appointment_type: appointmentType,
    location,
  });
  fireAdsConversion(GOOGLE_ADS_BOOKING_LABEL, ADS_VALUE_BOOKING);
}

/** CTA button / link click */
export function gtagCTAClick(ctaId: string, ctaText: string, destination?: string): void {
  gtagEvent('cta_click', {
    event_category: 'engagement',
    cta_id: ctaId,
    cta_text: ctaText,
    destination: destination || '',
  });
}

/** Scroll depth milestone */
export function gtagScrollDepth(page: string, depth: number): void {
  gtagEvent('scroll_depth', {
    event_category: 'engagement',
    page,
    depth,
  });
}

// ---------------------------------------------------------------------------
// TypeScript global augmentation so `window.gtag` doesn't error
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
