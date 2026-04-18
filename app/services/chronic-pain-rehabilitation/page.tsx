import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'chronic-pain-rehabilitation';

export const metadata = buildMetadata({
  title: 'Chronic Pain Rehabilitation',
  description: 'Pain-science informed chronic pain management using graded movement, education, and function-focused recovery strategies.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
