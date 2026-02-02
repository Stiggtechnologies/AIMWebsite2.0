import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';

export const metadata = {
  title: 'For Employers | Alberta Injury Management',
  description: 'Workplace injury prevention, early intervention, and return-to-work programs for Alberta employers.',
};

export default function EmployersPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-aim-steel-blue to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl">
              Partner With AIM
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Reduce workplace injuries, accelerate recovery, and improve return-to-work outcomes.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-aim-cta-primary hover:bg-aim-cta-primary/90">
                <Link href="tel:+17802508188">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Employer Services
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-6">
            {[
              'Workplace injury prevention programs',
              'Ergonomic assessments and training',
              'Early intervention for injured workers',
              'Modified work program development',
              'Return-to-work coordination',
              'Functional capacity evaluations',
              'Direct WCB billing and documentation',
              'Progress reporting and communication',
            ].map((service) => (
              <div key={service} className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 flex-none text-aim-teal mt-0.5" />
                <span className="text-lg text-aim-slate">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-aim-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Partner With Us?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Contact us to discuss how we can support your workplace health and safety goals.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-aim-teal hover:bg-aim-teal/90">
              <Link href="tel:+17802508188">Call (780) 250-8188</Link>
            </Button>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
