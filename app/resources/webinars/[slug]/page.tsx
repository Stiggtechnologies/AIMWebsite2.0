import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { WebinarPage } from '@/components/blocks/webinar-page';
import { webinars, getWebinarBySlug } from '@/lib/content/webinars';

export async function generateStaticParams() {
  return webinars.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const webinar = getWebinarBySlug(params.slug);
  if (!webinar) return {};

  return buildMetadata({
    title: webinar.title,
    description: webinar.description,
    path: `/resources/webinars/${params.slug}`,
    image: webinar.video?.thumbnailUrl,
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const webinar = getWebinarBySlug(params.slug);

  if (!webinar) {
    notFound();
  }

  return <WebinarPage webinar={webinar} />;
}
