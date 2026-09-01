import { getLocationBySlug } from '@/lib/content/locations';
import { LocationPage } from '@/components/blocks/location-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'south-common';

// The previous title — "Opening April 30, 2026" — was still being served to
// Google four months after that date, on a page whose body simultaneously said
// "Open now". The location is paused, so the page stays reachable for anyone
// holding a direct link but is no longer advertised or indexed.
export const metadata = {
  ...buildMetadata({
    title: 'AIM South Common',
    description: 'AIM South Common is not open. No opening date is currently confirmed. See our open Edmonton locations.',
    path: `/locations/${SLUG}`,
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  const loc = getLocationBySlug(SLUG);
  if (!loc) return notFound();
  return <LocationPage location={loc} />;
}
