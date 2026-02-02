'use client';

import { ReactNode } from 'react';
import { TrackingProvider } from './tracking-provider';

export function ClientTrackingWrapper({ children }: { children: ReactNode }) {
  return <TrackingProvider>{children}</TrackingProvider>;
}
