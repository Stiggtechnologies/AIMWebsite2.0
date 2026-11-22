import Link from 'next/link';
import { HeroBlock } from './hero-block';
import { CtaStrip } from './cta-strip';
import { FaqSection } from './faq-section';
import { Section, FeatureList, Prose } from './section';
import type { Condition } from '@/lib/content/conditions';
import { getServiceBySlug } from '@/lib/content/services';
import { JsonLd, faqSchema } from '@/lib/seo';
import { MediaSplit } from '@/components/media/site-image';
import { conditionImage, image } from '@/lib/media';

export function ConditionPage({ condition }: { condition: Condition }) {
  const related = condition.relatedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => !!s);

  return (
    <>
      <JsonLd data={faqSchema(condition.faqs)} />
      <HeroBlock
        eyebrow="Condition"
        headline={condition.name}
        subheadline={condition.shortDescription}
        primaryCta={{ label: 'Book an Assessment', href: `/book?condition=${condition.slug}` }}
        secondaryCta={{ label: 'Find a Location', href: '/locations' }}
        image={conditionImage(condition.slug)}
        highlights={['Assessment first, then a plan', 'Direct billing for WCB and MVA claims']}
      />

      <Section heading={`About ${condition.name.toLowerCase()}`}>
        <Prose>
          <p>{condition.whatItIs}</p>
        </Prose>
      </Section>

      <Section muted heading="Common causes">
        <FeatureList items={condition.commonCauses} columns={2} />
      </Section>

      <Section heading="Symptoms we commonly see">
        <FeatureList items={condition.symptoms} columns={2} />
      </Section>

      <Section>
        <MediaSplit image={image('assess-wide')} ratio="4/3">
          <p className="text-sm font-semibold uppercase tracking-wider text-aim-teal">First visit</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-aim-navy md:text-4xl">
            What an assessment looks like
          </h2>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-aim-slate/85">
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aim-teal" aria-hidden="true" />A conversation about how the problem started and what it stops you doing.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aim-teal" aria-hidden="true" />Movement, strength and neurological testing as the presentation requires.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aim-teal" aria-hidden="true" />A written plan with goals, expected timelines and what to do between visits.</li>
          </ul>
        </MediaSplit>
      </Section>

      <Section muted heading="How AIM helps">
        <Prose>
          <p>{condition.howAimHelps}</p>
        </Prose>
      </Section>

      {related.length > 0 && (
        <Section heading="Related services">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-2xl border border-aim-divider-gray/50 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md"
              >
                <div className="text-lg font-semibold text-aim-navy">{s.name}</div>
                <p className="mt-1 text-sm text-aim-slate/75">{s.shortDescription}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <FaqSection faqs={condition.faqs} />

      <CtaStrip
        headline={`Get help with ${condition.name.toLowerCase()}`}
        subheadline="Book an assessment at your nearest AIM clinic — direct billing and WCB/MVA support included."
        primaryCta={{ label: 'Book Now', href: `/book?condition=${condition.slug}` }}
        secondaryCta={{ label: 'View All Services', href: '/services' }}
      />
    </>
  );
}
