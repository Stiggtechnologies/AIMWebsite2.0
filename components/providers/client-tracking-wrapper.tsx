'use client';

import { ReactNode, useEffect } from 'react';
import { TrackingProvider } from './tracking-provider';
import { installDuplicateGa4Guard } from '@/lib/gtm-guard';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';

export function ClientTrackingWrapper({ children }: { children: ReactNode }) {
  // GA4 is loaded directly by app/layout.tsx. Google Tag Manager is loaded
  // alongside it, which makes it easy for someone to add a GA4 tag inside the
  // container and silently double every metric. This watches for that and
  // complains in the console; it does not change what is sent.
  useEffect(() => installDuplicateGa4Guard(GA_MEASUREMENT_ID), []);

  return <TrackingProvider>{children}</TrackingProvider>;
}
