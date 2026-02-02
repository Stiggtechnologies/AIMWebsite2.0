'use client';

import { ReactNode } from 'react';
import { usePageTracking } from '@/hooks/use-page-tracking';

interface PageTrackerProps {
  children?: ReactNode;
  pageTitle?: string;
}

export function PageTracker({ children, pageTitle }: PageTrackerProps) {
  usePageTracking(pageTitle);
  return children ? <>{children}</> : null;
}
