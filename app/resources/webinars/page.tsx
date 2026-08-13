import Link from 'next/link';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { webinars } from '@/lib/content/webinars';

export const metadata = {
  title: 'Video Guides | Alberta Injury Management',
  description:
    'Clinician-led video guides on physiotherapy, recovery, MVA and WCB claims, concussion, and pelvic health from the AIM clinical team.',
};

function statusPill(status: (typeof webinars)[number]['status']) {
  if (status === 'published') return { label: 'New', tone: 'bg-aim-teal text-white' };
  if (status === 'in-production') return { label: 'In Production', tone: 'bg-aim-navy text-white' };
  return { label: 'Coming Soon', tone: 'bg-aim-steel-blue text-aim-navy' };
}

export default function WebinarsIndexPage() {
  const byCategory = webinars.reduce<Record<string, typeof webinars>>((acc, w) => {
    (acc[w.category] ||= []).push(w);
    return acc;
  }, {});

  return (
    <>
      <div className="bg-aim-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Video Guides</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Clinician-led video guides on the topics we see every day — MVA recovery, post-op
              rehab, pelvic health, concussion, WCB, and vestibular. Recording now; every guide is
              already scripted and previewable below.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {Object.entries(byCategory).map(([category, list]) => (
          <section key={category} className="mb-14">
            <h2 className="text-2xl font-semibold text-aim-navy">{category}</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((w) => {
                const pill = statusPill(w.status);
                return (
                  <Link
                    key={w.slug}
                    href={`/resources/webinars/${w.slug}`}
                    className="flex flex-col rounded-2xl border border-aim-divider-gray/50 bg-white p-6 transition hover:border-aim-teal/50 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${pill.tone}`}
                      >
                        {pill.label}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wide text-aim-teal">
                        {w.targetRuntimeMinutes} min
                      </span>
                    </div>
                    <span className="mt-3 text-lg font-semibold text-aim-navy">{w.title}</span>
                    <span className="mt-2 text-sm text-aim-slate/75">{w.description}</span>
                    <span className="mt-4 text-xs text-aim-slate/60">
                      Presented by {w.presenter.name} · {w.presenter.role}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <LazyChatWidget />
    </>
  );
}
