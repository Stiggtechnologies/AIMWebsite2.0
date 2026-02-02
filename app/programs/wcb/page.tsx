import Link from 'next/link';
import { CheckCircle, Clock, FileText, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';

export const metadata = {
  title: 'WCB Rehabilitation Program | Alberta Injury Management',
  description: 'Expert WCB rehabilitation and return-to-work programs in Alberta. Direct billing, outcome-based treatment, and employer coordination for workplace injuries.',
};

export default function WCBProgramPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-aim-steel-blue to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl">
              WCB Rehabilitation Program
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Get back to work safely and effectively with Alberta's trusted WCB rehabilitation partner.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-aim-cta-primary hover:bg-aim-cta-primary/90 text-white"
              >
                <Link href="/intake">Start WCB Intake</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-aim-navy text-aim-navy hover:bg-aim-steel-blue"
              >
                <Link href="/book">Book Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Why Choose AIM for WCB Rehabilitation
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Direct WCB Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  No upfront costs. We handle all paperwork and billing directly with WCB Alberta.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Fast Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Early intervention appointments available within 24-48 hours of injury.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Employer Coordination</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We work directly with your employer to facilitate safe return-to-work.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Proven Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Evidence-based treatment with measurable progress tracking and accountability.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="bg-aim-steel-blue py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Common WCB Injuries We Treat
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                'Back and spine injuries',
                'Shoulder and rotator cuff injuries',
                'Repetitive strain injuries',
                'Slip and fall injuries',
                'Lifting injuries',
                'Carpal tunnel syndrome',
                'Neck and whiplash injuries',
                'Knee and leg injuries',
                'Hand and wrist injuries',
                'Post-surgical rehabilitation',
              ].map((injury) => (
                <li key={injury} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 flex-none text-aim-teal mt-0.5" aria-hidden="true" />
                  <span className="text-aim-slate">{injury}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Do I need a referral for WCB treatment?</AccordionTrigger>
                <AccordionContent>
                  No referral is required. Once you have a WCB claim number, you can book directly with us. We'll handle all communication with WCB Alberta.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How quickly can I be seen?</AccordionTrigger>
                <AccordionContent>
                  We prioritize early intervention for work injuries. Most patients are seen within 24-48 hours of first contact. Same-day appointments may be available for urgent cases.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Will you work with my employer?</AccordionTrigger>
                <AccordionContent>
                  Yes. We coordinate directly with employers to develop modified work plans and facilitate safe, gradual return-to-work. This is a key part of our rehabilitation approach.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What if I need to see a specialist?</AccordionTrigger>
                <AccordionContent>
                  If specialist consultation is needed, we'll coordinate referrals and continue supporting your rehabilitation throughout the process. We work collaboratively with orthopedic surgeons, pain specialists, and other healthcare providers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How long will treatment take?</AccordionTrigger>
                <AccordionContent>
                  Treatment duration varies based on injury severity and individual progress. We establish clear goals and timelines from the start, with regular progress reviews to ensure you're on track.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="bg-aim-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Recovery?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Complete your intake form or book your initial assessment today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-aim-teal hover:bg-aim-teal/90 text-white"
              >
                <Link href="/intake">Start WCB Intake</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/book">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
