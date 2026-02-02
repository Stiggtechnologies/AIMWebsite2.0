import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';

export const metadata = {
  title: 'How to Get Care | Alberta Injury Management',
  description: 'Learn how to access expert physiotherapy and rehabilitation services at AIM. Simple steps to start your recovery journey.',
};

export default function GetCarePage() {
  return (
    <>
      <div className="bg-gradient-to-b from-aim-steel-blue to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl">
              How to Get Care at AIM
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Getting started with your rehabilitation is simple. We're here to support you every step of the way.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-12">
            <div className="flex gap-6">
              <div className="flex-none">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-aim-teal text-white font-bold text-xl">
                  1
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-aim-navy mb-3">Contact Us</h2>
                <p className="text-aim-slate mb-4">
                  Call us at (780) 250-8188 or use our online booking system. Most appointments available within 24-48 hours.
                </p>
                <Button asChild className="bg-aim-cta-primary hover:bg-aim-cta-primary/90">
                  <Link href="/book">Book Appointment</Link>
                </Button>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-none">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-aim-teal text-white font-bold text-xl">
                  2
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-aim-navy mb-3">Complete Intake</h2>
                <p className="text-aim-slate mb-4">
                  Fill out your intake form online or over the phone. This helps us prepare for your first visit and understand your needs.
                </p>
                <Button asChild variant="outline" className="border-aim-navy text-aim-navy">
                  <Link href="/intake">Start Intake Form</Link>
                </Button>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-none">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-aim-teal text-white font-bold text-xl">
                  3
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-aim-navy mb-3">Initial Assessment</h2>
                <p className="text-aim-slate">
                  Your first appointment includes a comprehensive assessment where we'll evaluate your condition, discuss your goals, and create a personalized treatment plan.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-none">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-aim-teal text-white font-bold text-xl">
                  4
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-aim-navy mb-3">Begin Treatment</h2>
                <p className="text-aim-slate">
                  Start your evidence-based rehabilitation program with regular progress tracking and adjustments to ensure optimal outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-aim-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Questions? We're Here to Help
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Call us or chat with our AI assistant for immediate support.
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
