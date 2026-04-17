import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'vestibular-rehabilitation';

export const metadata = buildMetadata({
  title: 'Vestibular Rehabilitation',
  description: 'Expert treatment for BPPV, dizziness, vertigo, and balance disorders. Regain confidence in movement and everyday activities.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
