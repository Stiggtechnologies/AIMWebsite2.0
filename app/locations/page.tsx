import { openLocations, comingSoonLocations } from '@/lib/content/locations';
import { LocationCard } from '@/components/blocks/location-card';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Our Locations',
  description: 'AIM physiotherapy and rehabilitation clinics across Alberta. See open locations and clinics coming soon.',
  path: '/locations',
});

export default function LocationsPage() {
  const openLocs = openLocations();
  const comingSoon = comingSoonLocations();

  return (
    <>
      <HeroBlock
        eyebrow="Locations"
        headline="Our Locations"
        subheadline="Find an AIM clinic near you. Explore active locations and see where we are opening next."
        primaryCta={{ label: 'Book Now', href: '/book' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />

      <Section heading="Open now">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {openLocs.map((loc) => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>
      </Section>

      <Section muted heading="Coming soon">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {comingSoon.map((loc) => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>
      </Section>

      <CtaStrip
        headline="Don't see your neighbourhood?"
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
