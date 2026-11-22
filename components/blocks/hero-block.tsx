import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { SiteImage } from '@/components/media/site-image';
import { type SlotImage } from '@/lib/media';

type LegacyImage = { src: string; alt: string; priority?: boolean };

export type HeroBlockProps = {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'default' | 'compact' | 'split';
  /** A manifest slot (preferred — gets blur placeholder + shared crop) or a raw src. */
  image?: SlotImage | LegacyImage;
  children?: ReactNode;
  /** Optional facts strip under the CTAs, e.g. direct billing / wait time. */
  highlights?: string[];
  /** Rendered in the right column when no photograph is available. */
  panel?: ReactNode;
};

function isSlot(image: HeroBlockProps['image']): image is SlotImage {
  return Boolean(image && typeof (image as SlotImage).slot === 'string');
}

export function HeroBlock({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  variant = 'default',
  image,
  children,
  highlights,
  panel,
}: HeroBlockProps) {
  const isCompact = variant === 'compact';
  const hasMedia = Boolean(image || panel);
  const slotImage = isSlot(image) ? image : null;
  const legacyImage = image && !slotImage ? (image as LegacyImage) : null;

  return (
    <section
      className={`relative overflow-hidden ${
        image ? 'bg-gradient-to-b from-aim-steel-blue/55 to-white' : 'bg-gradient-to-b from-aim-steel-blue to-white'
      } ${isCompact ? 'py-16 md:py-20' : 'py-16 md:py-24 lg:py-28'}`}
    >
      <div
        className={`relative mx-auto max-w-6xl px-6 md:px-8 ${
          hasMedia ? 'grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14' : ''
        }`}
      >
        <div>
          {eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-aim-navy/10 bg-white/80 px-4 py-1.5 text-sm font-medium tracking-wide text-aim-navy shadow-sm backdrop-blur-sm">
              {eyebrow}
            </div>
          )}
          <h1
            className={`${
              hasMedia ? 'max-w-3xl' : 'max-w-4xl'
            } text-4xl font-bold leading-[1.1] tracking-tight text-aim-navy md:text-5xl lg:text-6xl`}
          >
            {headline}
          </h1>
          {subheadline && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-aim-slate md:text-xl md:leading-relaxed">
              {subheadline}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-9 flex flex-wrap gap-4">
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
          {highlights && highlights.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-aim-slate/80">
              {highlights.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-aim-teal" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>

        {slotImage && (
          <SiteImage
            image={slotImage}
            ratio="4/5"
            priority
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="lg:ml-auto lg:max-w-[520px]"
          />
        )}

        {!image && panel ? <div className="hidden lg:block">{panel}</div> : null}

        {legacyImage && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/80 bg-white shadow-2xl shadow-aim-navy/15">
            <Image
              src={legacyImage.src}
              alt={legacyImage.alt}
              fill
              priority={legacyImage.priority}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-aim-navy/10 via-transparent to-white/5"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </section>
  );
}
