import Link from 'next/link';

export type CtaStripProps = {
  headline: string;
  subheadline?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'default' | 'muted';
};

export function CtaStrip({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  variant = 'default',
}: CtaStripProps) {
  const isMuted = variant === 'muted';
  return (
    <section
      className={`${
        isMuted ? 'bg-aim-steel-blue' : 'bg-aim-navy'
      } py-16 md:py-20`}
    >
      <div className="mx-auto max-w-5xl px-6 text-center md:px-8">
        <h2
          className={`text-3xl font-semibold tracking-tight md:text-4xl ${
            isMuted ? 'text-aim-navy' : 'text-white'
          }`}
        >
          {headline}
        </h2>
        {subheadline && (
          <p
            className={`mx-auto mt-4 max-w-2xl text-lg ${
              isMuted ? 'text-aim-slate/80' : 'text-white/80'
            }`}
          >
            {subheadline}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-2xl bg-aim-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-aim-teal/20 transition hover:bg-aim-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className={`inline-flex items-center justify-center rounded-2xl border px-7 py-3.5 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                isMuted
                  ? 'border-aim-navy/20 bg-white text-aim-navy hover:bg-aim-navy/5'
                  : 'border-white/30 bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
