import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import type { Location } from '@/lib/content/locations';

export function LocationCard({ location }: { location: Location }) {
  const isComingSoon = location.status === 'coming-soon';
  return (
    <article className="flex h-full flex-col rounded-2xl border border-aim-divider-gray/50 bg-white p-6 transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
          isComingSoon
            ? 'bg-amber-50 text-amber-700'
            : 'bg-emerald-50 text-emerald-700'
        }`}>
          {isComingSoon ? 'Coming Soon' : 'Open Now'}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-aim-navy">{location.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-aim-slate/80">{location.shortDescriptor}</p>
      <div className="mt-5 space-y-2.5 text-sm text-aim-slate">
        <div className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-aim-teal" />
          <span>{location.area}</span>
        </div>
        {isComingSoon ? (
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-aim-teal" />
            <span>Opening {location.opening}</span>
          </div>
        ) : (
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-aim-teal" />
            <span>Mon–Fri {location.hours.Monday}</span>
          </div>
        )}
      </div>
      <div className="mt-6 flex-1" />
      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href={`/locations/${location.slug}`}
          className="inline-flex items-center gap-1.5 rounded-xl border border-aim-navy/15 bg-aim-off-white px-4 py-2 text-sm font-semibold text-aim-navy transition hover:bg-aim-navy/5"
        >
          View clinic <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        {!isComingSoon && (
          <Link
            href={`/book?location=${location.slug}`}
            className="inline-flex items-center rounded-xl bg-aim-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-aim-teal/90"
          >
            Book now
          </Link>
        )}
        {isComingSoon && (
          <Link
            href={`/contact?interest=waitlist-${location.slug}`}
            className="inline-flex items-center rounded-xl bg-aim-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-aim-teal/90"
          >
            Join waitlist
          </Link>
        )}
      </div>
    </article>
  );
}
