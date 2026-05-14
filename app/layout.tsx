import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { SiteHeader, SiteFooter } from '@/components/navigation/site-chrome';
import { SkipToContent } from '@/components/layout/skip-to-content';
import { Toaster } from '@/components/ui/toaster';
import { ClientTrackingWrapper } from '@/components/providers/client-tracking-wrapper';
import { GA_MEASUREMENT_ID, GOOGLE_ADS_ID } from '@/lib/gtag';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://albertainjurymanagement.ca'),
  title: 'Alberta Injury Management | Expert Physiotherapy & Rehabilitation in Edmonton',
  description: 'AIM provides outcome-based physiotherapy, WCB rehabilitation, MVA recovery, and return-to-work programs across Alberta. Expert injury management for lasting results.',
  keywords: 'physiotherapy Edmonton, WCB rehabilitation Alberta, MVA recovery, injury management, return to work programs, workplace injury prevention',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://albertainjurymanagement.ca',
    siteName: 'Alberta Injury Management',
    title: 'Alberta Injury Management | Expert Physiotherapy & Rehabilitation',
    description: 'Outcome-based physiotherapy and injury management for Alberta. Expert care for work injuries, MVA recovery, and athletic performance.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alberta Injury Management',
    description: 'Expert physiotherapy and injury management in Alberta',
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
      </head>
      <body className={inter.className}>
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
