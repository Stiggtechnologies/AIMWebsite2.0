import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'chiropractic-care';

export const metadata = buildMetadata({
  title: 'Chiropractic Care',
  description: 'Exercise-forward chiropractic care for spinal mobility, joint function, and pain reduction. Integrated with physio and massage therapy.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
