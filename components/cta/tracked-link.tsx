'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useTracking } from '@/components/providers/tracking-provider';

interface TrackedLinkProps {
  href: string;
  ctaId: string;
  ctaText: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function TrackedLink({ href, ctaId, ctaText, onClick, children, className }: TrackedLinkProps) {
  const { trackCTAClick } = useTracking();

  const handleClick = () => {
    trackCTAClick(ctaId, ctaText, href);
    onClick?.();
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
