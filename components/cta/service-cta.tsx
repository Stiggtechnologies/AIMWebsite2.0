'use client';

import { useTracking } from '@/components/providers/tracking-provider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone } from 'lucide-react';

interface ServiceCTAProps {
  serviceName: string;
  serviceSlug: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}

export function ServiceCTA({ serviceName, serviceSlug, primaryLabel, secondaryLabel }: ServiceCTAProps) {
  const { personaType } = useTracking();

  const bookingUrl = `/book?service=${serviceSlug}`;

  const getCTAs = () => {
    if (personaType === 'injured_worker') {
      return {
        primary: {
          label: primaryLabel || `Get Help With ${serviceName}`,
          href: '/intake',
          variant: 'default' as const,
        },
        secondary: {
          label: secondaryLabel || 'Book Assessment',
          href: bookingUrl,
          variant: 'outline' as const,
        },
      };
    }

    if (personaType === 'employer') {
      return {
        primary: {
          label: 'Request Employer Consultation',
          href: '/employers',
          variant: 'default' as const,
        },
        secondary: {
          label: 'Call Us',
          href: 'tel:+17802508188',
          variant: 'outline' as const,
          isPhone: true,
        },
      };
    }

    if (personaType === 'insurer') {
      return {
        primary: {
          label: 'Request Case Manager Consultation',
          href: '/insurers',
          variant: 'default' as const,
        },
        secondary: {
          label: 'Call Us',
          href: 'tel:+17802508188',
          variant: 'outline' as const,
          isPhone: true,
        },
      };
    }

    if (personaType === 'senior') {
      return {
        primary: {
          label: 'Speak with Our Team',
          href: 'tel:+17802508188',
          variant: 'default' as const,
          isPhone: true,
        },
        secondary: {
          label: 'Learn More',
          href: '/about',
          variant: 'outline' as const,
        },
      };
    }

    if (personaType === 'athlete') {
      return {
        primary: {
          label: primaryLabel || 'Book Assessment',
          href: bookingUrl,
          variant: 'default' as const,
        },
        secondary: {
          label: 'View Athletic Programs',
          href: '/programs/athletic',
          variant: 'outline' as const,
        },
      };
    }

    return {
      primary: {
        label: primaryLabel || 'Get Started',
        href: '/intake',
        variant: 'default' as const,
      },
      secondary: {
        label: secondaryLabel || 'Call (780) 250-8188',
        href: 'tel:+17802508188',
        variant: 'outline' as const,
        isPhone: true,
      },
    };
  };

  const ctas = getCTAs();

  return (
    <div className="flex items-center justify-center gap-x-6 flex-wrap">
      <Button
        asChild
        size="lg"
        className="bg-aim-cta-primary hover:bg-aim-cta-primary/90 text-white"
        variant={ctas.primary.variant}
      >
        {ctas.primary.isPhone ? (
          <a href={ctas.primary.href}>
            <Phone className="h-5 w-5 mr-2" />
            {ctas.primary.label}
          </a>
        ) : (
          <Link href={ctas.primary.href}>{ctas.primary.label}</Link>
        )}
      </Button>
      <Button
        asChild
        size="lg"
        variant={ctas.secondary.variant}
        className={ctas.secondary.variant === 'outline' ? 'border-aim-navy text-aim-navy hover:bg-aim-steel-blue' : ''}
      >
        {ctas.secondary.isPhone ? (
          <a href={ctas.secondary.href}>
            <Phone className="h-5 w-5 mr-2" />
            {ctas.secondary.label}
          </a>
        ) : (
          <Link href={ctas.secondary.href}>{ctas.secondary.label}</Link>
        )}
      </Button>
    </div>
  );
}
