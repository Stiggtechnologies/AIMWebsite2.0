import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'pelvic-floor-physiotherapy';

export const metadata = buildMetadata({
  title: 'Pelvic Floor Physiotherapy',
  description: 'Compassionate pelvic health care for prenatal, postpartum, pelvic pain, and incontinence — private, judgment-free specialized treatment.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
