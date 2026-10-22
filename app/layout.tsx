import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { SiteHeader, SiteFooter } from '@/components/navigation/site-chrome';
import { SkipToContent } from '@/components/layout/skip-to-content';
import { Toaster } from '@/components/ui/toaster';
import { ClientTrackingWrapper } from '@/components/providers/client-tracking-wrapper';
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID } from '@/lib/gtag';
import {
  GoogleTagManagerScript,
  GoogleTagManagerNoScript,
} from '@/components/analytics/google-tag-manager';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://aimphysiotherapy.ca'),
  title: 'Alberta Injury Management | Physiotherapy & Rehabilitation in Edmonton',
  description: 'AIM provides physiotherapy, WCB rehabilitation, MVA recovery, and return-to-work programs in Edmonton.',
  keywords: 'physiotherapy Edmonton, WCB rehabilitation Alberta, MVA recovery, injury management, return to work programs, workplace injury prevention',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://aimphysiotherapy.ca',
    siteName: 'Alberta Injury Management',
    title: 'Alberta Injury Management | Physiotherapy & Rehabilitation',
    description: 'Physiotherapy and injury management for work injuries, MVA recovery, and athletic performance in Edmonton.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alberta Injury Management',
    description: 'Physiotherapy and injury management in Edmonton',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="facebook-domain-verification"
          content="lztsxmu0cux7kz81q0u3mspvxnc9pf"
        />
        {/* Google Analytics 4 + Google Ads (loaded via single gtag.js library) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
            ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
          `}
        </Script>

        {/* Google Tag Manager. Deliberately AFTER gtag.js above: GA4 and Ads
            are loaded directly by this site, and GTM is here for tags that are
            not. See components/analytics/google-tag-manager.tsx before adding
            a GA4 tag inside the container — it would double every number. */}
        <GoogleTagManagerScript />
      </head>
      <body className={inter.className}>
        <GoogleTagManagerNoScript />
        <ClientTrackingWrapper>
          <SkipToContent />
          <SiteHeader />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <SiteFooter />
          <Toaster />
        </ClientTrackingWrapper>
      </body>
    </html>
  );
}
