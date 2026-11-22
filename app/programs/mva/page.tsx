import Link from 'next/link';
import { CheckCircle, FileCheck, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { HeroBlock } from '@/components/blocks/hero-block';
import { MediaPanel } from '@/components/media/site-image';
import { programImage } from '@/lib/media';

export const metadata = {
  title: 'MVA Recovery Program | Alberta Injury Management',
  description: 'Motor vehicle accident recovery in Alberta. Direct insurance billing for whiplash, soft tissue injuries, and post-concussion care.',
  openGraph: {
    title: 'MVA Recovery Program | Alberta Injury Management',
    description: 'Motor vehicle accident recovery in Alberta. Direct insurance billing for whiplash, soft tissue injuries, and post-concussion care.',
    images: [{ url: '/og/mva.jpg', width: 1200, height: 630, alt: 'A physiotherapist guiding a patient through a shoulder assessment.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MVA Recovery Program | Alberta Injury Management',
    description: 'Motor vehicle accident recovery in Alberta. Direct insurance billing for whiplash, soft tissue injuries, and post-concussion care.',
    images: ['/og/mva.jpg'],
  },
};

export default function MVAProgramPage() {
  return (
    <>
      <HeroBlock
        eyebrow="Program"
        headline="Motor Vehicle Accident Recovery"
        subheadline="Rehabilitation for MVA injuries including whiplash, soft tissue injury and post-concussion symptoms, with direct billing to auto insurers."
        primaryCta={{ label: 'Start MVA Intake', href: '/intake' }}
        secondaryCta={{ label: 'Book Assessment', href: '/book' }}
        highlights={['Direct billing with auto insurers', 'Assessment within 24–48 hrs']}
        image={programImage('mva') ?? undefined}
      />

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
                <CardTitle>Documentation for Your Claim</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Detailed treatment records and progress reports for your insurance claim.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-aim-teal mb-4" />
                <CardTitle>Measurable Progress</CardTitle>
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
              <Link href="tel:+17802508188">Call Us</Link>
            </Button>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
