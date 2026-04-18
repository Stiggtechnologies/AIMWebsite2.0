import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Car, Accessibility } from 'lucide-react';
import { HeroBlock } from './hero-block';
import { CtaStrip } from './cta-strip';
import { Section } from './section';
import type { Location } from '@/lib/content/locations';
import { getServiceBySlug } from '@/lib/content/services';
import { JsonLd, localBusinessSchema } from '@/lib/seo';

export function LocationPage({ location }: { location: Location }) {
  const isComingSoon = location.status === 'coming-soon';
  const services = location.services
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => !!s);

  return (
    <>
      <JsonLd
        data={localBusinessSchema({
          name: location.name,
          slug: location.slug,
          streetAddress: location.streetAddress,
          city: location.city,
          region: location.region,
          postalCode: location.postalCode,
          phone: location.phone,
        })}
      />
      <HeroBlock
        eyebrow={isComingSoon ? `Opening ${location.opening}` : 'Open now'}
        headline={location.name}
        subheadline={location.shortDescriptor}
        primaryCta={
          isComingSoon
            ? { label: 'Join the Waitlist', href: `/contact?interest=waitlist-${location.slug}` }
            : { label: 'Book Now', href: `/book?location=${location.slug}` }
        }
        secondaryCta={{ label: 'Get Directions', href: `https://www.google.com/maps/search/${encodeURIComponent(`${location.streetAddress} ${location.city} ${location.region}`)}` }}
      />

      <Section heading="Clinic details">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-aim-divider-gray/50 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-aim-teal">Contact</h3>
            <dl className="mt-4 space-y-3 text-aim-slate">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-aim-navy" />
                <div>
                  <div>{location.streetAddress}</div>
                  <div>
                    {location.city}, {location.region} {location.postalCode}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-aim-navy" />
                <span>{location.phone}</span>
              </div>
              {location.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-aim-navy" />
                  <span>{location.email}</span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Car className="mt-0.5 h-5 w-5 flex-shrink-0 text-aim-navy" />
                <span>{location.parking}</span>
              </div>
              <div className="flex items-start gap-3">
                <Accessibility className="mt-0.5 h-5 w-5 flex-shrink-0 text-aim-navy" />
                <span>{location.accessibility}</span>
              </div>
            </dl>
          </div>
          <div className="rounded-2xl border border-aim-divider-gray/50 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-aim-teal">
              <Clock className="mr-1 inline h-4 w-4" />
              Hours
            </h3>
            <dl className="mt-4 space-y-2 text-sm text-aim-slate">
              {Object.entries(location.hours).map(([day, hrs]) => (
                <div key={day} className="flex justify-between border-b border-aim-divider-gray/30 py-1.5 last:border-0">
                  <dt className="font-medium text-aim-navy">{day}</dt>
                  <dd>{hrs}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section muted heading="Services at this location">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-2xl border border-aim-divider-gray/50 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md"
            >
              <div className="text-base font-semibold text-aim-navy">{s.name}</div>
              <p className="mt-1 text-sm text-aim-slate/75">{s.shortDescription}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section heading="Meet the team">
        <p className="text-aim-slate/80">
          [Team bios coming soon. We're hiring — see our <Link className="font-semibold text-aim-teal underline-offset-2 hover:underline" href="/careers">careers page</Link>.]
        </p>
      </Section>

      <CtaStrip
        headline={isComingSoon ? `${location.name} — opening ${location.opening}` : `Book at ${location.name}`}
        subheadline={
          isComingSoon
            ? 'Join the waitlist to be first to book once we open.'
            : 'Same-week appointments available for most services.'
        }
        primaryCta={
          isComingSoon
            ? { label: 'Join Waitlist', href: `/contact?interest=waitlist-${location.slug}` }
            : { label: 'Book Now', href: `/book?location=${location.slug}` }
        }
        secondaryCta={{ label: 'Call Clinic', href: `tel:${location.phone.replace(/[^\d+]/g, '')}` }}
      />
    </>
  );
}
