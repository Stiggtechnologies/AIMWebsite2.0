import type { Metadata } from 'next';
import { HeroBlock } from '@/components/blocks/hero-block';
import { CtaStrip } from '@/components/blocks/cta-strip';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function ComingSoonTemplate() {
  return (
    <>
      <HeroBlock
        eyebrow="Coming Soon"
        headline="New AIM location — coming soon"
        subheadline="AIM is actively expanding across Alberta. Get in touch if you're interested in being first to book at an upcoming clinic."
      />
      <CtaStrip
        headline="Interested in a new AIM clinic?"
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
