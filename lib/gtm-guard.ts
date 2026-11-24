/**
 * Runtime detector for the one mistake this setup invites.
 *
 * The site loads GA4 (G-PF1ZYXYL6X) directly through gtag.js. If someone also
 * adds a GA4 Configuration tag for the same measurement ID inside the GTM
 * container, pageviews and conversions are counted twice. Nothing breaks, no
 * error appears, and the numbers go UP — so the failure is invisible and
 * flattering, which is the worst combination.
 *
 * This watches the dataLayer for a second GA4 config carrying a measurement ID
 * the page already loads, and says so loudly in the console. It is a smoke
 * alarm, not a fix: it cannot stop the duplicate, only tell you it is there.
 */

export function installDuplicateGa4Guard(measurementId: string): () => void {
  if (typeof window === 'undefined' || !measurementId) return () => {};

  const w = window as unknown as { dataLayer?: unknown[] };
  const dl = (w.dataLayer = w.dataLayer || []);

  let configCount = 0;

  const inspect = (entry: unknown) => {
    // gtag() pushes an arguments object: ['config', 'G-XXXX', {...}]
    if (!entry || typeof entry !== 'object') return;
    const args = Array.from(entry as ArrayLike<unknown>);
    if (args[0] !== 'config' || args[1] !== measurementId) return;

    configCount += 1;
    if (configCount > 1) {
      console.error(
        `[analytics] GA4 ${measurementId} has been configured ${configCount} times on this page. ` +
          'Every pageview and conversion is now counted once per config. ' +
          'This almost always means a GA4 Configuration tag was added inside Google Tag Manager ' +
          'for a measurement ID the site already loads directly in app/layout.tsx. ' +
          'Remove it from GTM, or remove the gtag.js block from the layout — but not both at once.'
      );
    }
  };

  dl.forEach(inspect);

  const originalPush = dl.push.bind(dl);
  dl.push = function patchedPush(...items: unknown[]) {
    items.forEach(inspect);
    return originalPush(...items);
  };

  return () => {
    dl.push = originalPush;
  };
}
