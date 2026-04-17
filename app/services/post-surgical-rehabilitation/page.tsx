import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'post-surgical-rehabilitation';

export const metadata = buildMetadata({
  title: 'Post-Surgical Rehabilitation',
  description: 'Surgeon-aligned rehabilitation after knee, hip, shoulder, and spinal surgery. Restore strength, mobility, and function with confidence.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
