import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrackedLink } from './tracked-link';

interface PersonaCTACardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  ctaText: string;
  ctaHref: string;
  ctaId: string;
  variant?: 'primary' | 'secondary';
}

export function PersonaCTACard({
  title,
  description,
  icon: Icon,
  ctaText,
  ctaHref,
  ctaId,
  variant = 'primary',
}: PersonaCTACardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <CardHeader>
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-lg mb-4 ${
            variant === 'primary'
              ? 'bg-aim-teal text-white'
              : 'bg-aim-steel-blue text-aim-navy'
          }`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
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
