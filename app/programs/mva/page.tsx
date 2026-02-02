import Link from 'next/link';
import { CheckCircle, FileCheck, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';

export const metadata = {
  title: 'MVA Recovery Program | Alberta Injury Management',
  description: 'Expert motor vehicle accident recovery in Alberta. Direct insurance billing for whiplash, soft tissue injuries, and post-concussion care.',
};

export default function MVAProgramPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-aim-steel-blue to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl">
              Motor Vehicle Accident Recovery
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Comprehensive rehabilitation for MVA injuries with direct insurance billing. Get the care you need without upfront costs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="bg-aim-cta-primary hover:bg-aim-cta-primary/90">
                <Link href="/intake">Start MVA Intake</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-aim-navy text-aim-navy">
                <Link href="/book">Book Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <ShieldCheck className="h-10 w-10 text-aim-teal mb-4" />
                <CardTitle>Direct Insurance Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>We bill your insurance company directly. No upfront payment required.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-aim-teal mb-4" />
                <CardTitle>Immediate Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Early intervention is critical. Appointments available within 48 hours.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <FileCheck className="h-10 w-10 text-aim-teal mb-4" />
                <CardTitle>Expert Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Detailed treatment records and progress reports for your insurance claim.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-aim-teal mb-4" />
                <CardTitle>Proven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Evidence-based treatment protocols specifically for MVA injuries.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="bg-aim-steel-blue py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              MVA Injuries We Treat
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {['Whiplash and neck injuries', 'Soft tissue injuries', 'Concussion and post-concussion syndrome', 'Back and spine injuries', 'Shoulder injuries', 'Headaches and migraines', 'Jaw pain (TMJ)', 'Nerve-related pain'].map((injury) => (
                <li key={injury} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 flex-none text-aim-teal mt-0.5" />
                  <span className="text-aim-slate">{injury}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-aim-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start Your MVA Recovery Today
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            We accept all major insurance providers and handle all billing directly.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-aim-teal hover:bg-aim-teal/90">
              <Link href="/intake">Complete Intake Form</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="tel:+17805550100">Call Us</Link>
            </Button>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
