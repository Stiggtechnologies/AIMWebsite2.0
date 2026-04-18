import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'sports-injury-rehabilitation';

export const metadata = buildMetadata({
  title: 'Sports Injury Rehabilitation',
  description: 'Return-to-sport rehabilitation with objective testing and sport-specific programming. Get back to your game stronger and injury-proof.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
