import Link from 'next/link';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { blogPosts } from '@/lib/content/blog';

export const metadata = {
  title: 'Resources | Alberta Injury Management',
  description:
    'Clinician-written guides on physiotherapy, recovery timelines, claims, and patient education from the AIM clinical team.',
};

export default function ResourcesPage() {
  const byCategory = blogPosts.reduce<Record<string, typeof blogPosts>>((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});

  return (
    <>
      <div className="bg-aim-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Resources</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Clinician-written guides to support your recovery — what to expect, when to seek care, and how
              recovery actually works.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {Object.entries(byCategory).map(([category, posts]) => (
          <section key={category} className="mb-14">
            <h2 className="text-2xl font-semibold text-aim-navy">{category}</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/resources/${p.slug}`}
                  className="flex flex-col rounded-2xl border border-aim-divider-gray/50 bg-white p-6 transition hover:border-aim-teal/50 hover:shadow-md"
                >
                  <span className="text-xs font-medium uppercase tracking-wide text-aim-teal">
                    {p.readingMinutes} min read
                  </span>
                  <span className="mt-2 text-lg font-semibold text-aim-navy">{p.title}</span>
                  <span className="mt-2 text-sm text-aim-slate/75">{p.description}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <LazyChatWidget />
    </>
  );
}
