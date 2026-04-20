'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTracking } from '@/components/providers/tracking-provider';
import { gtagPageview } from '@/lib/gtag';

export function usePageTracking(pageTitle?: string) {
  const pathname = usePathname();
  const { trackPageView } = useTracking();

  useEffect(() => {
    if (pathname) {
      // Fire GA4 pageview (also fired inside EventDispatcher, but this
      // ensures GA4 captures route changes even if the Supabase call fails)
      gtagPageview(pathname, pageTitle || document.title);

      // Fire internal tracking (Supabase + GA4 via EventDispatcher)
      trackPageView(pathname, pageTitle || document.title);
    }
  }, [pathname, pageTitle, trackPageView]);
}
