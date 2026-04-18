import { getLocationBySlug } from '@/lib/content/locations';
import { LocationPage } from '@/components/blocks/location-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'st-paul';

export const metadata = buildMetadata({
  title: 'AIM St. Paul — Opening Fall 2026',
  description: 'AIM St. Paul opens Fall 2026. Physiotherapy, rehabilitation, sports injury, MVA/WCB, massage therapy. Serving St. Paul and surrounding communities. Join the waitlist.',
  path: `/locations/${SLUG}`,
});

export default function Page() {
  const loc = getLocationBySlug(SLUG);
  if (!loc) return notFound();
  return <LocationPage location={loc} />;
}
