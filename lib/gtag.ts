/**
 * Google Analytics 4 (GA4) utility functions
 *
 * Measurement ID: G-PF1ZYXYL6X
 *
 * This module provides type-safe wrappers around the gtag() global.
 * The actual <script> tags are loaded in app/layout.tsx via next/script.
 *
 * Key conversion events are also forwarded from lib/events.ts so that
 * Google Ads can optimise campaigns based on real patient actions
 * (phone clicks, form submissions, booking confirmations).
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-PF1ZYXYL6X';

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
  // Also fire as a Google Ads conversion (configure conversion ID in GTM or here)
  gtagEvent('conversion', {
    send_to: `${GA_MEASUREMENT_ID}`,
    event_category: 'lead',
    event_label: 'phone_click',
  });
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
    gtagEvent('conversion', {
      send_to: `${GA_MEASUREMENT_ID}`,
      event_category: 'lead',
      event_label: `form_${formType}`,
    });
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
  gtagEvent('conversion', {
    send_to: `${GA_MEASUREMENT_ID}`,
    event_category: 'lead',
    event_label: `booking_${appointmentType}`,
  });
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
