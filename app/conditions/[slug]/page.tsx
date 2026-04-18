import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { ConditionPage } from '@/components/blocks/condition-page';
import { conditions, getConditionBySlug } from '@/lib/content/conditions';

export async function generateStaticParams() {
  return conditions.map((condition) => ({
    slug: condition.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const condition = getConditionBySlug(params.slug);
  if (!condition) return {};

  return buildMetadata({
    title: condition.name,
    description: condition.shortDescription,
    path: `/conditions/${params.slug}`,
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const condition = getConditionBySlug(params.slug);

  if (!condition) {
    notFound();
  }

  return <ConditionPage condition={condition} />;
}
