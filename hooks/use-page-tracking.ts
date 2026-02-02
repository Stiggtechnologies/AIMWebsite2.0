'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTracking } from '@/components/providers/tracking-provider';

export function usePageTracking(pageTitle?: string) {
  const pathname = usePathname();
  const { trackPageView } = useTracking();

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname, pageTitle || document.title);
    }
  }, [pathname, pageTitle, trackPageView]);
}
