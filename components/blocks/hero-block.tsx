import Link from 'next/link';
import { ReactNode } from 'react';

export type HeroBlockProps = {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'default' | 'compact' | 'split';
  children?: ReactNode;
};

export function HeroBlock({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  variant = 'default',
  children,
}: HeroBlockProps) {
  const isCompact = variant === 'compact';
  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br from-aim-navy via-aim-navy to-[#0a1f33] text-white ${
        isCompact ? 'py-16 md:py-20' : 'py-20 md:py-28 lg:py-32'
      }`}
    >
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-aim-teal to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        {eyebrow && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium tracking-wide text-aim-teal">
            {eyebrow}
          </div>
        )}
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
          {headline}
        </h1>
        {subheadline && (
          <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl md:leading-relaxed">
            {subheadline}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-2xl bg-aim-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-aim-teal/20 transition hover:bg-aim-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-aim-navy"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-aim-navy"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
