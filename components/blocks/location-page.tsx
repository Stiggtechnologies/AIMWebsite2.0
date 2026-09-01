import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Car, Accessibility } from 'lucide-react';
import { HeroBlock } from './hero-block';
import { CtaStrip } from './cta-strip';
import { Section } from './section';
import type { Location } from '@/lib/content/locations';
import { getServiceBySlug } from '@/lib/content/services';
import { JsonLd, localBusinessSchema } from '@/lib/seo';

export function LocationPage({ location }: { location: Location }) {
  // Derived from 'open' rather than from 'coming-soon', deliberately. The old
  // `isComingSoon = status === 'coming-soon'` treated EVERYTHING else as open,
  // so adding a third status would silently have published a paused clinic as
  // "Open now" with a Book Now button.
  const isOpen = location.status === 'open';
  const isComingSoon = location.status === 'coming-soon';

  // A location we have not leased has no address or phone. Every block below
  // is guarded on the value actually existing, so nothing renders a token.
  const hasAddress = Boolean(location.streetAddress);
  const hasPhone = Boolean(location.phone);
  const services = location.services
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => !!s);

  return (
    <>
      {/* Only claim to be a physiotherapy business at an address when there IS
          one. Emitting this for an unopened clinic tells Google a place exists
          that does not, which is what put "Opening April 30, 2026" into search
          results for a location with no address. */}
      {isOpen && hasAddress && hasPhone && (
        <JsonLd
          data={localBusinessSchema({
            name: location.name,
            slug: location.slug,
            streetAddress: location.streetAddress!,
            city: location.city,
            region: location.region,
            postalCode: location.postalCode ?? '',
            phone: location.phone!,
          })}
        />
      )}
      <HeroBlock
        eyebrow={isOpen ? 'Open now' : isComingSoon ? `Opening ${location.opening}` : 'Not yet open'}
        headline={location.name}
        subheadline={location.shortDescriptor}
        primaryCta={
          isOpen
            ? { label: 'Book Now', href: `/book?location=${location.slug}` }
            : { label: 'Contact Us', href: `/contact?interest=waitlist-${location.slug}` }
        }
        // Directions to an address we do not have would send people nowhere.
        secondaryCta={
          hasAddress
            ? {
                label: 'Get Directions',
                href: `https://www.google.com/maps/search/${encodeURIComponent(`${location.streetAddress} ${location.city} ${location.region}`)}`,
              }
            : undefined
        }
      />

      <Section heading="Clinic details">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-aim-divider-gray/50 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-aim-teal">Contact</h3>
            <dl className="mt-4 space-y-3 text-aim-slate">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-aim-navy" />
                <div>
                  {hasAddress ? (
                    <>
                      <div>{location.streetAddress}</div>
                      <div>
                        {location.city}, {location.region} {location.postalCode}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {location.city}, {location.region}
                      </div>
                      <div className="text-aim-slate/70">Address to be confirmed</div>
                    </>
                  )}
                </div>
              </div>
              {hasPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-aim-navy" />
                  <span>{location.phone}</span>
                </div>
              )}
              {location.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-aim-navy" />
                  <span>{location.email}</span>
                </div>
              )}
              {location.parking && (
                <div className="flex items-start gap-3">
                  <Car className="mt-0.5 h-5 w-5 flex-shrink-0 text-aim-navy" />
                  <span>{location.parking}</span>
                </div>
              )}
              {location.accessibility && (
                <div className="flex items-start gap-3">
                  <Accessibility className="mt-0.5 h-5 w-5 flex-shrink-0 text-aim-navy" />
                  <span>{location.accessibility}</span>
                </div>
              )}
            </dl>
          </div>
          {Object.keys(location.hours).length > 0 && (
          <div className="rounded-2xl border border-aim-divider-gray/50 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-aim-teal">
              <Clock className="mr-1 inline h-4 w-4" />
              {isOpen ? 'Hours' : 'Planned hours'}
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
          )}
        </div>
      </Section>

      {services.length > 0 && (
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
      )}

      <Section heading="Meet the team">
        <p className="text-aim-slate/80">
          [Team bios coming soon. We're hiring — see our <Link className="font-semibold text-aim-teal underline-offset-2 hover:underline" href="/careers">careers page</Link>.]
        </p>
      </Section>

      <CtaStrip
        headline={
          isOpen
            ? `Book at ${location.name}`
            : isComingSoon
              ? `${location.name} — opening ${location.opening}`
              : `${location.name} is not open yet`
        }
        subheadline={
          isOpen
            ? 'Same-week appointments available for most services.'
            : isComingSoon
              ? 'Join the waitlist to be first to book once we open.'
              : 'We are not taking bookings for this location. Our open clinics can see you now.'
        }
        primaryCta={
          isOpen
            ? { label: 'Book Now', href: `/book?location=${location.slug}` }
            : isComingSoon
              ? { label: 'Join Waitlist', href: `/contact?interest=waitlist-${location.slug}` }
              : { label: 'See open locations', href: '/locations' }
        }
        secondaryCta={
          hasPhone
            ? { label: 'Call Clinic', href: `tel:${location.phone!.replace(/[^\d+]/g, '')}` }
            : undefined
        }
      />
    </>
  );
}
