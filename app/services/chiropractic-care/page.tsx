import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'chiropractic-care';

export const metadata = buildMetadata({
  title: 'Chiropractic Care in Edmonton',
  description: 'Dr. Ramadan Hochaimi, D.C. is now accepting new chiropractic patients at AIM Edmonton Main Hub. Call or complete the intake form to request an appointment.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
