import Image from 'next/image';
import type { ReactNode } from 'react';
import { MEDIA, type SlotImage } from '@/lib/media';

/**
 * Image primitives.
 *
 * Three rules encoded here, because they are the ones that break otherwise:
 *  1. A frame always reserves its aspect ratio, so the client's CLS stays at 0
 *     and the page never jumps while a photo loads.
 *  2. Only a genuine above-the-fold hero gets `priority`; everything else lazy
 *     loads, so the LCP element is never competing with six program cards.
 *  3. Alt text comes from the manifest, never from the page, so a page author
 *     cannot accidentally invent a claim next to a photo.
 */

type Ratio = '16/9' | '4/3' | '3/4' | '4/5' | '1/1' | '21/9' | '16/10';

const RATIO_CLASS: Record<Ratio, string> = {
  '16/9': 'aspect-[16/9]',
  '16/10': 'aspect-[16/10]',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '4/5': 'aspect-[4/5]',
  '1/1': 'aspect-square',
  '21/9': 'aspect-[21/9]',
};

export const RATIO_OF: Record<string, Ratio> = {
  'assess-hero': '4/5',
  'assess-wide': '16/9',
  'assess-card': '4/3',
  'assess-portrait': '3/4',
  'assess-detail': '1/1',
  'work-hero': '4/5',
  'work-wide': '16/9',
  'work-card': '4/3',
  'work-detail': '1/1',
  'refer-hero': '4/5',
  'refer-wide': '16/9',
  'refer-card': '4/3',
  'refer-portrait': '3/4',
  'legal-wide': '16/9',
  'legal-card': '4/3',
  'legal-portrait': '3/4',
};

function intrinsicRatio(asset: { width: number; height: number }): Ratio {
  const r = asset.width / asset.height;
  const known: [Ratio, number][] = [
    ['21/9', 21 / 9],
    ['16/9', 16 / 9],
    ['16/10', 16 / 10],
    ['4/3', 4 / 3],
    ['1/1', 1],
    ['4/5', 4 / 5],
    ['3/4', 3 / 4],
  ];
  let chosen: Ratio = '4/3';
  let delta = Infinity;
  for (const [key, value] of known) {
    const d = Math.abs(value - r);
    if (d < delta) {
      delta = d;
      chosen = key;
    }
  }
  return chosen;
}

export type SiteImageProps = {
  image: SlotImage;
  /** Rendered width hint for the browser. Be honest: it drives which file loads. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  ratio?: Ratio;
  /** Wrapper treatment. `frame` adds the ring + soft elevation used site-wide. */
  frame?: 'none' | 'frame' | 'flush';
  /**
   * Gradient scrim painted over the image. Must be rendered as a sibling with an
   * explicit z-index: without one, Chrome can clip the absolutely positioned
   * image to the scrim's paint region instead of compositing over it.
   */
  scrim?: 'none' | 'bottom' | 'bottom-strong' | 'navy';
  children?: ReactNode;
};

export function SiteImage({
  image,
  sizes = '(min-width: 1024px) 48vw, 100vw',
  priority = false,
  className = '',
  ratio,
  frame = 'frame',
  scrim = 'none',
  children,
}: SiteImageProps) {
  const asset = MEDIA[image.slot];
  if (!asset) return null;

  const aspect = RATIO_CLASS[ratio ?? intrinsicRatio(asset)];
  const frameClass =
    frame === 'flush'
      ? 'overflow-hidden'
      : frame === 'none'
        ? ''
        : 'overflow-hidden rounded-3xl bg-aim-steel-blue ring-1 ring-aim-navy/10 shadow-[0_24px_60px_-24px_rgba(15,42,68,0.45)]';

  return (
    <figure className={`relative ${aspect} w-full ${frameClass} ${className}`}>
      <Image
        src={asset.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={asset.blurDataURL}
        className="z-0 object-cover"
        style={image.position ? { objectPosition: image.position } : undefined}
      />
      {scrim !== 'none' && (
        <div
          className={`pointer-events-none absolute inset-0 z-10 ${
            scrim === 'navy'
              ? 'bg-gradient-to-r from-aim-navy/85 via-aim-navy/55 to-aim-navy/15'
              : scrim === 'bottom-strong'
                ? 'bg-gradient-to-t from-aim-navy/75 via-aim-navy/15 to-transparent'
                : 'bg-gradient-to-t from-aim-navy/45 via-transparent to-transparent'
          }`}
          aria-hidden="true"
        />
      )}
      {children ? <div className="absolute inset-0 z-20">{children}</div> : null}
    </figure>
  );
}

/**
 * Brand panel for slots with no trustworthy photograph yet. This exists so a
 * page never borrows an unrelated image to fill a hole — an honest typographic
 * panel is better than a photo of the wrong thing.
 */
export function MediaPanel({
  eyebrow,
  value,
  label,
  className = '',
  ratio = '4/5',
}: {
  eyebrow?: string;
  value: string;
  label: string;
  className?: string;
  ratio?: Ratio;
}) {
  return (
    <div
      className={`relative ${RATIO_CLASS[ratio]} w-full overflow-hidden rounded-3xl bg-aim-navy ring-1 ring-aim-navy/20 shadow-[0_24px_60px_-24px_rgba(15,42,68,0.55)] ${className}`}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_0%,rgba(47,164,169,0.55)_0%,rgba(47,164,169,0.12)_38%,rgba(15,42,68,0)_70%)]"
        aria-hidden="true"
      />
      <svg
        className="absolute inset-x-0 bottom-0 h-2/3 w-full text-aim-teal/25"
        viewBox="0 0 400 300"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path d="M0 240C70 240 96 196 150 196s78 52 128 52 84-30 122-30v82H0z" fill="currentColor" opacity=".45" />
        <path d="M0 268C74 268 108 226 162 226s74 40 122 40 82-18 116-18v52H0z" fill="currentColor" opacity=".7" />
      </svg>
      <div className="relative flex h-full flex-col justify-between p-8">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">{eyebrow}</span>
        ) : (
          <span />
        )}
        <div>
          <div className="text-5xl font-semibold tracking-tight text-white">{value}</div>
          <div className="mt-3 max-w-[22ch] text-sm leading-relaxed text-white/70">{label}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Full-width photographic band. Used once per page at most, to break the rhythm
 * of white sections without turning the page into a slideshow.
 */
export function PhotoBand({
  image,
  children,
  height = '21/9',
  priority = false,
  scrim = 'navy',
}: {
  image: SlotImage;
  children?: ReactNode;
  height?: Ratio;
  priority?: boolean;
  scrim?: 'navy' | 'soft';
}) {
  const asset = MEDIA[image.slot];
  if (!asset) return null;
  return (
    <section className="relative isolate w-full overflow-hidden">
      <div className={`relative w-full ${RATIO_CLASS[height]} max-h-[560px]`}>
        <Image
          src={asset.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={asset.blurDataURL}
          className="z-0 object-cover"
        />
        <div
          className={
            scrim === 'navy'
              ? 'absolute inset-0 z-10 bg-gradient-to-r from-aim-navy/92 via-aim-navy/78 to-aim-navy/35'
              : 'absolute inset-0 z-10 bg-gradient-to-t from-white/85 via-white/40 to-transparent'
          }
          aria-hidden="true"
        />
        {children ? (
          <div className="absolute inset-0 z-20">
            <div className="mx-auto flex h-full max-w-6xl items-center px-6 md:px-8">{children}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/**
 * Two-column editorial split: photograph one side, copy the other. Alternating
 * the side on consecutive splits is what stops a long page feeling like a form.
 */
export function MediaSplit({
  image,
  children,
  reverse = false,
  ratio = '4/3',
  priority = false,
  className = '',
  panel,
}: {
  image?: SlotImage | null;
  children: ReactNode;
  reverse?: boolean;
  ratio?: Ratio;
  priority?: boolean;
  className?: string;
  panel?: ReactNode;
}) {
  return (
    <div
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''} ${className}`}
    >
      <div className="relative">
        {image ? (
          <SiteImage image={image} ratio={ratio} priority={priority} sizes="(min-width: 1024px) 46vw, 100vw" />
        ) : (
          panel
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
