import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'chronic-pain-rehabilitation';

export const metadata = buildMetadata({
  title: 'Chronic Pain Rehabilitation',
  description: 'Chronic pain rehabilitation built on Cognitive Functional Therapy (CFT), graded movement, and team-based, function-focused recovery.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
