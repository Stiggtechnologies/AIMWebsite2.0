import Link from 'next/link';
import { Briefcase, Car, Trophy, Heart, Building2, Shield } from 'lucide-react';
import { PersonaCTACard } from '@/components/cta/persona-cta-card';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';

export const metadata = {
  title: 'Who We Help | Alberta Injury Management',
  description: 'AIM serves injured workers, MVA patients, athletes, seniors, employers, and insurance providers across Alberta.',
};

export default function WhoWeHelpPage() {
  return (
    <>
      <div className="bg-aim-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Who We Help
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Specialized care for diverse needs across Alberta's communities and industries.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PersonaCTACard
              title="Injured Workers"
              description="WCB rehabilitation and return-to-work programs for workplace injuries."
              icon={Briefcase}
              ctaText="Learn More"
              ctaHref="/programs/wcb"
              ctaId="who-we-help-wcb"
              variant="primary"
            />
            <PersonaCTACard
              title="MVA Patients"
              description="Comprehensive recovery programs for motor vehicle accident injuries."
              icon={Car}
              ctaText="Learn More"
              ctaHref="/programs/mva"
              ctaId="who-we-help-mva"
              variant="primary"
            />
            <PersonaCTACard
              title="Athletes"
              description="Performance rehabilitation and injury prevention for competitive athletes."
              icon={Trophy}
              ctaText="Learn More"
              ctaHref="/programs/athletic"
              ctaId="who-we-help-athletic"
              variant="primary"
            />
            <PersonaCTACard
              title="Seniors"
              description="Mobility programs and fall prevention for active aging."
              icon={Heart}
              ctaText="Learn More"
              ctaHref="/programs/senior"
              ctaId="who-we-help-senior"
              variant="primary"
            />
            <PersonaCTACard
              title="Employers"
              description="Workplace injury prevention and return-to-work coordination."
              icon={Building2}
              ctaText="Learn More"
              ctaHref="/employers"
              ctaId="who-we-help-employers"
              variant="secondary"
            />
            <PersonaCTACard
              title="Insurance Providers"
              description="Trusted partner for case management and outcome reporting."
              icon={Shield}
              ctaText="Learn More"
              ctaHref="/insurers"
              ctaId="who-we-help-insurers"
              variant="secondary"
            />
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
