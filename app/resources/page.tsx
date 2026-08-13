import Link from 'next/link';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { blogPosts } from '@/lib/content/blog';
import { webinars } from '@/lib/content/webinars';

export const metadata = {
  title: 'Resources | Alberta Injury Management',
  description:
    'Clinician-written articles and video guides on physiotherapy, recovery timelines, claims, and patient education from the AIM clinical team.',
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
              Clinician-written guides and video walkthroughs to support your recovery — what to
              expect, when to seek care, and how recovery actually works.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#video-guides"
                className="inline-flex items-center justify-center rounded-md bg-aim-teal px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-aim-teal/90"
              >
                Video Guides
              </a>
              <a
                href="#articles"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20"
              >
                Articles
              </a>
            </div>
          </div>
        </div>
      </div>

      <section id="video-guides" className="bg-aim-off-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-semibold text-aim-navy">Video Guides</h2>
            <Link
              href="/resources/webinars"
              className="text-sm font-semibold text-aim-teal hover:underline"
            >
              See all →
            </Link>
          </div>
          <p className="mt-2 max-w-2xl text-aim-slate/80">
            Short clinician-led walkthroughs of the topics we see most. Scripted now, recording
            underway.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {webinars.slice(0, 6).map((w) => {
              const label =
                w.status === 'published'
                  ? 'Watch'
                  : w.status === 'in-production'
                  ? 'In Production'
                  : 'Coming Soon';
              return (
                <Link
                  key={w.slug}
                  href={`/resources/webinars/${w.slug}`}
                  className="flex flex-col rounded-2xl border border-aim-divider-gray/50 bg-white p-6 transition hover:border-aim-teal/50 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-aim-steel-blue px-2.5 py-0.5 text-xs font-semibold text-aim-navy">
                      {label}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wide text-aim-teal">
                      {w.targetRuntimeMinutes} min · {w.category}
                    </span>
                  </div>
                  <span className="mt-3 text-lg font-semibold text-aim-navy">{w.title}</span>
                  <span className="mt-2 text-sm text-aim-slate/75">{w.description}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="articles" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-aim-navy">Articles</h2>
          <p className="mt-2 max-w-2xl text-aim-slate/80">
            Clinician-written guides, grouped by topic. Cover the same ground as the video guides
            in written form.
          </p>
          <div className="mt-8">
            {Object.entries(byCategory).map(([category, posts]) => (
              <section key={category} className="mb-14">
                <h3 className="text-xl font-semibold text-aim-navy">{category}</h3>
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
        </div>
      </section>

      <LazyChatWidget />
    </>
  );
}
