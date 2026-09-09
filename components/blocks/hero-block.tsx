import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

export type HeroBlockProps = {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'default' | 'compact' | 'split';
  image?: {
    src: string;
    alt: string;
    priority?: boolean;
  };
  children?: ReactNode;
};

export function HeroBlock({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  variant = 'default',
  image,
  children,
}: HeroBlockProps) {
  const isCompact = variant === 'compact';
  return (
    <section
      className={`relative overflow-hidden ${image ? 'bg-gradient-to-b from-aim-steel-blue/55 to-white' : 'bg-gradient-to-b from-aim-steel-blue to-white'} ${
        isCompact ? 'py-16 md:py-20' : 'py-20 md:py-28 lg:py-32'
      }`}
    >
      <div className={`relative mx-auto max-w-6xl px-6 md:px-8 ${image ? 'grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14' : ''}`}>
        <div>
          {eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-aim-navy/10 bg-white/75 px-4 py-1.5 text-sm font-medium tracking-wide text-aim-teal shadow-sm backdrop-blur-sm">
              {eyebrow}
            </div>
          )}
          <h1 className={`${image ? 'max-w-3xl' : 'max-w-4xl'} text-4xl font-bold leading-[1.1] tracking-tight text-aim-navy md:text-5xl lg:text-6xl`}>
            {headline}
          </h1>
          {subheadline && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-aim-slate md:text-xl md:leading-relaxed">
              {subheadline}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-10 flex flex-wrap gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center rounded-md bg-aim-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-aim-teal/20 transition hover:bg-aim-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aim-teal focus-visible:ring-offset-2"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-md border border-aim-navy/20 bg-white/75 px-7 py-3.5 text-base font-semibold text-aim-navy transition hover:border-aim-navy/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aim-teal focus-visible:ring-offset-2"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>

        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/80 bg-white shadow-2xl shadow-aim-navy/15">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={image.priority}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-aim-navy/10 via-transparent to-white/5" aria-hidden="true" />
          </div>
        )}
      </div>
    </section>
  );
}
