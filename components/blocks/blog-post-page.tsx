import Link from 'next/link';
import { type ReactNode } from 'react';
import { HeroBlock } from './hero-block';
import { CtaStrip } from './cta-strip';
import { Section, Prose } from './section';
import { JsonLd, blogPostingSchema } from '@/lib/seo';
import type { BlogPost, BlogBlock } from '@/lib/content/blog';
import { getConditionBySlug } from '@/lib/content/conditions';
import { getServiceBySlug } from '@/lib/content/services';

// Minimal inline renderer for **bold** and [label](/href). No deps.
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

// Group the flat block list into sections keyed by each h2.
type Group = { heading?: string; blocks: BlogBlock[] };
function groupByH2(body: BlogBlock[]): Group[] {
  const groups: Group[] = [];
  let current: Group = { blocks: [] };
  for (const b of body) {
    if (b.kind === 'h2') {
      if (current.heading || current.blocks.length) groups.push(current);
      current = { heading: b.text, blocks: [] };
    } else {
      current.blocks.push(b);
    }
  }
  if (current.heading || current.blocks.length) groups.push(current);
  return groups;
}

function Blocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <Prose>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'h3':
            return (
              <h3 key={i} className="text-xl font-semibold text-aim-navy">
                {b.text}
              </h3>
            );
          case 'p':
            return <p key={i}>{renderInline(b.text)}</p>;
          case 'ul':
            return (
              <ul key={i} className="list-disc space-y-2 pl-6 marker:text-aim-teal">
                {b.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="list-decimal space-y-2 pl-6 marker:text-aim-teal">
                {b.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ol>
            );
          case 'hr':
            return <hr key={i} className="my-8 border-aim-divider-gray/50" />;
          default:
            return null;
        }
      })}
    </Prose>
  );
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const relConditions = post.relatedConditions
    .map(getConditionBySlug)
    .filter((c): c is NonNullable<typeof c> => !!c);
  const relServices = post.relatedServices
    .map(getServiceBySlug)
    .filter((s): s is NonNullable<typeof s> => !!s);
  const groups = groupByH2(post.body);

  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />
      <HeroBlock
        eyebrow={post.category}
        headline={post.title}
        subheadline={post.description}
        primaryCta={{ label: 'Book Now', href: '/book' }}
        secondaryCta={{ label: 'All Resources', href: '/resources' }}
      />

      <div className="mx-auto max-w-3xl px-6 pt-8 text-sm text-aim-slate/70 lg:px-8">
        {post.author} · {post.readingMinutes} min read · Updated{' '}
        {new Date(post.lastUpdated).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>

      {groups.map((g, i) => (
        <Section key={i} heading={g.heading} muted={i % 2 === 1}>
          <Blocks blocks={g.blocks} />
        </Section>
      ))}

      {(relServices.length > 0 || relConditions.length > 0) && (
        <Section heading="Related care" muted={groups.length % 2 === 1}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {relServices.map((s) => (
              <Link
                key={`svc-${s.slug}`}
                href={`/services/${s.slug}`}
                className="rounded-2xl border border-aim-divider-gray/50 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md"
              >
                <div className="text-lg font-semibold text-aim-navy">{s.name}</div>
                <p className="mt-1 text-sm text-aim-slate/75">{s.shortDescription}</p>
              </Link>
            ))}
            {relConditions.map((c) => (
              <Link
                key={`cond-${c.slug}`}
                href={`/conditions/${c.slug}`}
                className="rounded-2xl border border-aim-divider-gray/50 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md"
              >
                <div className="text-lg font-semibold text-aim-navy">{c.name}</div>
                <p className="mt-1 text-sm text-aim-slate/75">{c.shortDescription}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaStrip
        headline="Have a question this didn't answer?"
        subheadline="Book an assessment with an AIM clinician — direct billing and WCB/MVA support included."
        primaryCta={{ label: 'Book Now', href: '/book' }}
        secondaryCta={{ label: 'Find a Location', href: '/locations' }}
      />
    </>
  );
}
