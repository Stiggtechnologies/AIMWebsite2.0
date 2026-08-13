import Link from 'next/link';
import { type ReactNode } from 'react';
import { HeroBlock } from './hero-block';
import { CtaStrip } from './cta-strip';
import { Section, Prose } from './section';
import { JsonLd, videoObjectSchema } from '@/lib/seo';
import type { Webinar } from '@/lib/content/webinars';
import { getConditionBySlug } from '@/lib/content/conditions';
import { getServiceBySlug } from '@/lib/content/services';
import { getBlogPostBySlug } from '@/lib/content/blog';

// Same inline renderer the blog uses — **bold** and [label](/href).
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] !== undefined) {
      nodes.push(<strong key={key++}>{m[2]}</strong>);
    } else if (m[4] !== undefined && m[5] !== undefined) {
      const href = m[5];
      const isInternal = href.startsWith('/');
      nodes.push(
        isInternal ? (
          <Link key={key++} href={href} className="text-aim-teal underline underline-offset-2">
            {m[4]}
          </Link>
        ) : (
          <a key={key++} href={href} className="text-aim-teal underline underline-offset-2">
            {m[4]}
          </a>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function statusLabel(status: Webinar['status']): string {
  if (status === 'published') return 'Video Guide';
  if (status === 'in-production') return 'Coming Soon · In Production';
  return 'Coming Soon';
}

export function WebinarPage({ webinar }: { webinar: Webinar }) {
  const isPublished = webinar.status === 'published' && webinar.video !== null;
  const relConditions = webinar.relatedConditions
    .map(getConditionBySlug)
    .filter((c): c is NonNullable<typeof c> => !!c);
  const relServices = webinar.relatedServices
    .map(getServiceBySlug)
    .filter((s): s is NonNullable<typeof s> => !!s);
  const relArticles = webinar.relatedArticles
    .map(getBlogPostBySlug)
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <>
      {isPublished && webinar.video && (
        <JsonLd data={videoObjectSchema(webinar, webinar.video)} />
      )}

      <HeroBlock
        eyebrow={`${statusLabel(webinar.status)} · ${webinar.category}`}
        headline={webinar.title}
        subheadline={webinar.description}
        primaryCta={{ label: 'Book Now', href: '/book' }}
        secondaryCta={{ label: 'All Resources', href: '/resources' }}
      />

      <div className="mx-auto max-w-3xl px-6 pt-8 text-sm text-aim-slate/70 lg:px-8">
        {webinar.presenter.name} · {webinar.presenter.role} · {webinar.targetRuntimeMinutes} min
        {isPublished && webinar.publishedAt && (
          <>
            {' '}
            · Published{' '}
            {new Date(webinar.publishedAt).toLocaleDateString('en-CA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </>
        )}
      </div>

      {isPublished && webinar.video && (
        <Section>
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-aim-navy shadow-lg">
              <iframe
                src={webinar.video.embedUrl}
                title={webinar.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
            {webinar.video.transcriptUrl && (
              <p className="mt-4 text-center text-sm text-aim-slate/70">
                <a
                  href={webinar.video.transcriptUrl}
                  className="text-aim-teal underline underline-offset-2"
                >
                  Read the full transcript
                </a>
              </p>
            )}
          </div>
        </Section>
      )}

      {!isPublished && (
        <Section muted>
          <div className="mx-auto max-w-3xl rounded-2xl border border-aim-divider-gray/50 bg-white p-6 text-center">
            <div className="text-sm font-semibold uppercase tracking-wider text-aim-teal">
              Recording in the works
            </div>
            <p className="mt-3 text-aim-slate/85">
              This clinician-led video guide is scripted and heading into production. In the
              meantime, our written guides cover the same ground, and our clinicians are the fastest
              path to a personalized plan.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-md bg-aim-teal px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-aim-teal/90"
              >
                Book an assessment
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-md border border-aim-navy/20 bg-white px-5 py-2.5 text-sm font-semibold text-aim-navy hover:bg-aim-navy/5"
              >
                Read the guides
              </Link>
            </div>
          </div>
        </Section>
      )}

      <Section heading="What you'll learn" muted={isPublished}>
        <Prose>
          <ul className="list-disc space-y-2 pl-6 marker:text-aim-teal">
            {webinar.learningObjectives.map((obj, i) => (
              <li key={i}>{renderInline(obj)}</li>
            ))}
          </ul>
        </Prose>
      </Section>

      <Section heading={isPublished ? 'What’s covered' : 'What the video will cover'} muted={!isPublished}>
        <div className="mx-auto max-w-3xl space-y-6">
          {webinar.segments.map((seg, i) => (
            <div key={i} className="border-l-2 border-aim-teal/60 pl-5">
              <div className="text-sm font-mono text-aim-slate/60">
                {String(seg.minute).padStart(2, '0')}:00
              </div>
              <div className="mt-1 text-lg font-semibold text-aim-navy">{seg.title}</div>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-aim-slate/85 marker:text-aim-teal">
                {seg.beats.map((b, j) => (
                  <li key={j}>{renderInline(b)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section heading="Companion resource" muted={isPublished}>
        <div className="mx-auto max-w-3xl rounded-2xl border border-aim-divider-gray/50 bg-white p-6">
          <div className="text-lg font-semibold text-aim-navy">{webinar.companionPdf.title}</div>
          <p className="mt-2 text-aim-slate/80">{webinar.companionPdf.description}</p>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-aim-slate/85 marker:text-aim-teal">
            {webinar.companionPdf.contents.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          {webinar.companionPdf.url ? (
            <a
              href={webinar.companionPdf.url}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-aim-teal px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-aim-teal/90"
            >
              Download PDF
            </a>
          ) : (
            <div className="mt-4 text-sm text-aim-slate/60">
              PDF ships with the recording. Ask your clinician for a printed copy at your next visit.
            </div>
          )}
        </div>
      </Section>

      {(relServices.length > 0 || relConditions.length > 0 || relArticles.length > 0) && (
        <Section heading="Related care & reading" muted={!isPublished}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {relServices.map((s) => (
              <Link
                key={`svc-${s.slug}`}
                href={`/services/${s.slug}`}
                className="rounded-2xl border border-aim-divider-gray/50 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md"
              >
                <div className="text-xs font-medium uppercase tracking-wide text-aim-teal">
                  Service
                </div>
                <div className="mt-1 text-lg font-semibold text-aim-navy">{s.name}</div>
                <p className="mt-1 text-sm text-aim-slate/75">{s.shortDescription}</p>
              </Link>
            ))}
            {relConditions.map((c) => (
              <Link
                key={`cond-${c.slug}`}
                href={`/conditions/${c.slug}`}
                className="rounded-2xl border border-aim-divider-gray/50 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md"
              >
                <div className="text-xs font-medium uppercase tracking-wide text-aim-teal">
                  Condition
                </div>
                <div className="mt-1 text-lg font-semibold text-aim-navy">{c.name}</div>
                <p className="mt-1 text-sm text-aim-slate/75">{c.shortDescription}</p>
              </Link>
            ))}
            {relArticles.map((a) => (
              <Link
                key={`art-${a.slug}`}
                href={`/resources/${a.slug}`}
                className="rounded-2xl border border-aim-divider-gray/50 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md"
              >
                <div className="text-xs font-medium uppercase tracking-wide text-aim-teal">
                  Article · {a.readingMinutes} min
                </div>
                <div className="mt-1 text-lg font-semibold text-aim-navy">{a.title}</div>
                <p className="mt-1 text-sm text-aim-slate/75">{a.description}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaStrip
        headline="Ready to move from watching to doing?"
        subheadline="Book an assessment with an AIM clinician — direct billing, WCB, and MVA support included."
        primaryCta={{ label: 'Book Now', href: '/book' }}
        secondaryCta={{ label: 'Find a Location', href: '/locations' }}
      />
    </>
  );
}
