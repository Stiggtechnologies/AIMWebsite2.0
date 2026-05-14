'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';

// Landing-page routes that render their own brand chrome and should
// suppress the global site header + footer. Extend this list as new
// dedicated landing pages are added.
const CHROMELESS_PATHS: readonly string[] = ['/aim-performance-south-common'];

function isChromeless(pathname: string | null): boolean {
  if (!pathname) return false;
  return CHROMELESS_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  if (isChromeless(pathname)) return null;
  return <Header />;
}

export function SiteFooter() {
  const pathname = usePathname();
  if (isChromeless(pathname)) return null;
  return <Footer />;
}
