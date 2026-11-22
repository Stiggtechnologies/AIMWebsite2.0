import Link from 'next/link';
import { HeroBlock } from './hero-block';
import { CtaStrip } from './cta-strip';
import { FaqSection } from './faq-section';
import { Section, FeatureList } from './section';
import type { Service } from '@/lib/content/services';
import { locations } from '@/lib/content/locations';
import { JsonLd, faqSchema } from '@/lib/seo';
import { MediaSplit } from '@/components/media/site-image';
import { image, serviceImage } from '@/lib/media';

export function ServicePage({ service }: { service: Service }) {
  const locationsOffering = locations.filter((l) => l.services.includes(service.slug));
  const usesQuickIntake = ['chiropractic-care', 'manual-osteopathy', 'orthotics'].includes(service.slug);
  const bookingHref = usesQuickIntake
    ? `/intake/form?service=${service.slug}`
    : `/book?service=${service.slug}`;
  const bookingLabel = usesQuickIntake ? 'Request an Appointment' : 'Book Now';
  return (
    <>
      <JsonLd data={faqSchema(service.faqs)} />
      <HeroBlock
        eyebrow="Service"
        headline={service.name}
        subheadline={service.positioning}
        primaryCta={{ label: bookingLabel, href: bookingHref }}
        secondaryCta={{ label: 'Find a Location', href: '/locations' }}
        image={serviceImage(service.slug)}
        highlights={['Direct billing for WCB and MVA claims', 'Most insurance accepted']}
      />

      <Section heading="How we help" subheading={`Conditions and concerns ${service.name.toLowerCase()} at AIM can help with.`}>
        <FeatureList items={service.helps} columns={2} />
      </Section>

      <Section muted heading="What treatment may include">
        <FeatureList items={service.treatmentMay} columns={2} />
      </Section>

      <Section>
        <MediaSplit image={image('assess-card')} ratio="4/3" reverse>
          <p className="text-sm font-semibold uppercase tracking-wider text-aim-teal">First visit</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-aim-navy md:text-4xl">
            How the first appointment runs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-aim-slate/85">
            We assess before we treat. The first appointment is longer than a follow-up because it
            includes the history, the physical examination and the plan.
          </p>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-aim-slate/85">
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aim-teal" aria-hidden="true" />Assessment and explanation of what is driving the symptoms.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aim-teal" aria-hidden="true" />Treatment that day where it is appropriate, including exercise.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aim-teal" aria-hidden="true" />A home plan and a review date, with reporting to WCB or your insurer when relevant.</li>
          </ul>
        </MediaSplit>
      </Section>

      <Section heading="Who this is for">
        <FeatureList items={service.whoFor} columns={2} />
      </Section>

      <Section muted heading={`Why choose AIM for ${service.name.toLowerCase()}`}>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {service.whyAim.map((w, i) => (
            <li key={i} className="rounded-2xl border border-aim-divider-gray/50 bg-white p-5 text-aim-navy">
              <span className="block text-sm font-semibold uppercase tracking-wider text-aim-teal">Why AIM</span>
              <span className="mt-1 block text-base leading-relaxed">{w}</span>
            </li>
          ))}
        </ul>
      </Section>

      {locationsOffering.length > 0 && (
        <Section
          heading="Offered at these AIM locations"
          subheading="Book at the clinic nearest to you."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {locationsOffering.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="rounded-2xl border border-aim-divider-gray/50 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-aim-teal">
                  {loc.status === 'open' ? 'Open now' : `Opening ${loc.opening}`}
                </div>
                <div className="mt-1 text-lg font-semibold text-aim-navy">{loc.name}</div>
                <div className="mt-1 text-sm text-aim-slate/75">{loc.area}</div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <FaqSection faqs={service.faqs} />

      <CtaStrip
        headline={`Ready to start ${service.name.toLowerCase()}?`}
        subheadline="Book your initial assessment at the AIM clinic nearest you."
        primaryCta={{ label: bookingLabel, href: bookingHref }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
