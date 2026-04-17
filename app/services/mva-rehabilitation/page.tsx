import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'mva-rehabilitation';

export const metadata = buildMetadata({
  title: 'Motor Vehicle Accident Rehabilitation',
  description: 'MVA Section B rehabilitation for whiplash, concussion, and post-collision recovery. Direct billing and claim coordination included.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
