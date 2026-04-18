import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import { ConditionCard } from '@/components/blocks/condition-card';
import { conditions } from '@/lib/content/conditions';

export const metadata = buildMetadata({
  title: 'Conditions We Treat',
  description:
    'Evidence-based rehabilitation for common musculoskeletal, vestibular, and post-injury conditions across Alberta.',
  path: '/conditions',
});

export default function ConditionsHub() {
  return (
    <>
      <HeroBlock
        eyebrow="Conditions"
        headline="Conditions We Treat"
        subheadline="Evidence-based rehabilitation for common musculoskeletal, vestibular, and post-injury conditions across Alberta."
        primaryCta={{ label: 'Book Now', href: '/book' }}
        secondaryCta={{ label: 'View Services', href: '/services' }}
      />

      <Section heading="Browse our condition guides">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition) => (
            <ConditionCard
              key={condition.slug}
              name={condition.name}
              slug={condition.slug}
              shortDescription={condition.shortDescription}
            />
          ))}
        </div>
      </Section>

      <CtaStrip
        headline="Ready to start your recovery?"
        subheadline="Book an assessment at your nearest AIM clinic — direct billing and WCB/MVA support included."
        primaryCta={{ label: 'Book Now', href: '/book' }}
        secondaryCta={{ label: 'Find a Location', href: '/locations' }}
      />
    </>
  );
}
