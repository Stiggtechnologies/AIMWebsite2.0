import Link from 'next/link';
import { Briefcase, Car, Trophy, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonaCTACard } from '@/components/cta/persona-cta-card';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';

export const metadata = {
  title: 'Programs | Alberta Injury Management',
  description: 'Specialized rehabilitation programs for WCB, MVA, athletic injuries, seniors, and more. Expert care tailored to your recovery needs.',
};

export default function ProgramsPage() {
  return (
    <>
      <div className="bg-aim-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Specialized Rehabilitation Programs
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Evidence-based programs designed for your specific injury type and recovery goals.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <PersonaCTACard
              title="WCB Rehabilitation"
              description="Comprehensive return-to-work programs for workplace injuries. Direct billing, outcome-focused treatment, and employer coordination."
              icon={Briefcase}
              ctaText="Learn More"
              ctaHref="/programs/wcb"
              ctaId="programs-wcb"
              variant="primary"
            />
            <PersonaCTACard
              title="MVA Recovery"
              description="Expert care for motor vehicle accident injuries including whiplash, soft tissue injuries, and post-concussion syndrome."
              icon={Car}
              ctaText="Learn More"
              ctaHref="/programs/mva"
              ctaId="programs-mva"
              variant="primary"
            />
            <PersonaCTACard
              title="Athletic Performance"
              description="Sport-specific rehabilitation and injury prevention to optimize performance and minimize downtime."
              icon={Trophy}
              ctaText="Learn More"
              ctaHref="/programs/athletic"
              ctaId="programs-athletic"
              variant="primary"
            />
            <PersonaCTACard
              title="Senior Mobility & Fall Prevention"
              description="Balance training, strength programs, and mobility work to maintain independence and prevent falls."
              icon={Heart}
              ctaText="Learn More"
              ctaHref="/programs/senior"
              ctaId="programs-senior"
              variant="primary"
            />
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-aim-navy">Not Sure Which Program Is Right for You?</h2>
            <p className="mt-4 text-lg text-aim-slate">
              Our team can help you find the best path to recovery.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-aim-cta-primary hover:bg-aim-cta-primary/90 text-white"
              >
                <Link href="/book">Book Assessment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-aim-navy text-aim-navy hover:bg-aim-steel-blue"
              >
                <Link href="tel:+17802508188">Call (780) 250-8188</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
