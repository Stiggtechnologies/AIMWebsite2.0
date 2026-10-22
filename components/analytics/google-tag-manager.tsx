import Script from 'next/script';

/**
 * Google Tag Manager container.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * READ THIS BEFORE ADDING A GA4 TAG INSIDE THE CONTAINER.
 *
 * This site ALREADY loads GA4 (G-PF1ZYXYL6X) and Google Ads directly, via
 * gtag.js in app/layout.tsx, and lib/gtag.ts fires Ads conversions through
 * window.gtag. GTM is added alongside that, not instead of it, so that
 * marketing tags can be managed without a deploy.
 *
 * The consequence: if you add a "GA4 Configuration" tag for G-PF1ZYXYL6X
 * inside this container, every pageview and every event is counted TWICE —
 * sessions inflate, bounce rate collapses, and conversion counts double. The
 * reporting looks better, which is exactly why it goes unnoticed.
 *
 * So: do not configure GA4 for G-PF1ZYXYL6X in GTM. Use GTM for tags that are
 * NOT already on the page (Meta pixel, LinkedIn, Bing, call tracking, etc).
 * If you ever want GA4 managed from GTM instead, remove the gtag.js blocks in
 * app/layout.tsx in the same change — never run both.
 *
 * gtmDuplicateGa4Guard() in lib/gtm-guard.ts warns in the browser console if
 * a second GA4 config for the same measurement ID shows up at runtime.
 * ──────────────────────────────────────────────────────────────────────────
 *
 * Renders nothing when NEXT_PUBLIC_GTM_ID is unset, so this is safe to ship
 * before the container is live.
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

export function GoogleTagManagerScript() {
  if (!GTM_ID) return null;
  return (
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/**
 * The <noscript> half of the snippet. Must be the first thing inside <body>.
 * Without it, visitors with JavaScript disabled are invisible to the container.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
