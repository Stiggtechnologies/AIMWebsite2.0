import Image from 'next/image';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrackedLink } from './tracked-link';
import { MEDIA, type SlotImage } from '@/lib/media';

interface PersonaCTACardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  ctaText: string;
  ctaHref: string;
  ctaId: string;
  variant?: 'primary' | 'secondary';
  /**
   * Optional photograph. When present the card leads with the image and the
   * icon chip overlaps its lower edge, which keeps a six-card grid from reading
   * as a wall of identical white boxes.
   */
  image?: SlotImage;
}

export function PersonaCTACard({
  title,
  description,
  icon: Icon,
  ctaText,
  ctaHref,
  ctaId,
  variant = 'primary',
  image,
}: PersonaCTACardProps) {
  const asset = image ? MEDIA[image.slot] : undefined;

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 h-full flex flex-col overflow-hidden">
      {image && asset ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-aim-steel-blue">
          <Image
            src={asset.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
            placeholder="blur"
            blurDataURL={asset.blurDataURL}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={image.position ? { objectPosition: image.position } : undefined}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-aim-navy/25 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div
            className={`absolute -bottom-6 left-5 inline-flex h-12 w-12 items-center justify-center rounded-xl shadow-md ring-4 ring-white ${
              variant === 'primary' ? 'bg-aim-teal text-white' : 'bg-aim-steel-blue text-aim-navy'
            }`}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
        </div>
      ) : null}

      <CardHeader className={image ? 'pt-10' : undefined}>
        {!image ? (
          <div
            className={`inline-flex h-12 w-12 items-center justify-center rounded-lg mb-4 ${
              variant === 'primary'
                ? 'bg-aim-teal text-white'
                : 'bg-aim-steel-blue text-aim-navy'
            }`}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
        ) : null}
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-end">
        <Button
          asChild
          className={
            variant === 'primary'
              ? 'w-full bg-aim-cta-primary hover:bg-aim-cta-primary/90'
              : 'w-full bg-aim-cta-secondary hover:bg-aim-cta-secondary/90'
          }
          data-cta-id={ctaId}
        >
          <TrackedLink href={ctaHref} ctaId={ctaId} ctaText={ctaText}>
            {ctaText}
          </TrackedLink>
        </Button>
      </CardContent>
    </Card>
  );
}
