import { getLocationBySlug } from '@/lib/content/locations';
import { LocationPage } from '@/components/blocks/location-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'south-common';

export const metadata = buildMetadata({
  title: 'AIM South Common — Opening April 30, 2026',
  description: 'AIM South Common opens April 30, 2026 in South Edmonton. Physiotherapy, rehab, concussion, vestibular, pelvic health, MVA/WCB. Join the waitlist.',
  path: `/locations/${SLUG}`,
});

export default function Page() {
  const loc = getLocationBySlug(SLUG);
  if (!loc) return notFound();
  return <LocationPage location={loc} />;
}
