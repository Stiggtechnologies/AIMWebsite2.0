import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';

export const metadata = {
  title: 'For Insurance Providers | Alberta Injury Management',
  description: 'Trusted rehabilitation partner for insurance providers. Quality care, comprehensive reporting, and proven outcomes.',
};

export default function InsurersPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-aim-steel-blue to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl">
              Insurance Provider Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Your trusted partner for quality rehabilitation and case management.
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="bg-aim-cta-primary hover:bg-aim-cta-primary/90">
                <Link href="tel:+17805550100">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl mb-8">
              Why Partner With AIM
            </h2>
            <p className="text-lg text-aim-slate">
              We provide comprehensive rehabilitation services with transparent communication and measurable outcomes. Our evidence-based approach ensures efficient recovery and effective case resolution.
            </p>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
