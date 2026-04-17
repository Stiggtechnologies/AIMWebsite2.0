import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'concussion-rehabilitation';

export const metadata = buildMetadata({
  title: 'Concussion Rehabilitation',
  description: 'Evidence-based concussion care with vestibular therapy, cervical treatment, and staged return-to-work and return-to-sport protocols.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
