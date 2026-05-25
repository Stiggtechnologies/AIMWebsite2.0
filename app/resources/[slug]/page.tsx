import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { BlogPostPage } from '@/components/blocks/blog-post-page';
import { blogPosts, getBlogPostBySlug } from '@/lib/content/blog';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/resources/${params.slug}`,
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPage post={post} />;
}
