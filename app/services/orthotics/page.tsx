import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'orthotics';

export const metadata = buildMetadata({
  title: 'Foot Orthotics in Edmonton',
  description: 'Assessment-led foot orthotics fitting and follow-up at AIM Edmonton Main Hub. Request an appointment and confirm your benefit-plan requirements before treatment.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
