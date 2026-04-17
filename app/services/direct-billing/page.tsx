import { getServiceBySlug } from '@/lib/content/services';
import { ServicePage } from '@/components/blocks/service-page';
import { buildMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

const SLUG = 'direct-billing';

export const metadata = buildMetadata({
  title: 'Direct Billing to Insurance',
  description: 'Direct billing to Alberta insurers, WCB, and MVA claims. No upfront payments for covered treatment. We handle the paperwork.',
  path: `/services/${SLUG}`,
});

export default function Page() {
  const service = getServiceBySlug(SLUG);
  if (!service) return notFound();
  return <ServicePage service={service} />;
}
