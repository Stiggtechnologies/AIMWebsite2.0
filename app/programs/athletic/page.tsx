import Link from 'next/link';
import { CheckCircle, Target, Zap, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';

export const metadata = {
  title: 'Athletic Performance Program | Alberta Injury Management',
  description: 'Sport-specific rehabilitation and performance optimization for athletes. Expert injury prevention, recovery, and performance enhancement programs in Alberta.',
};

export default function AthleticProgramPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-aim-steel-blue to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl">
              Athletic Performance Program
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Sport-specific rehabilitation and performance optimization to keep you competing at your highest level.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-aim-cta-primary hover:bg-aim-cta-primary/90 text-white"
              >
                <Link href="/intake">Start Your Journey</Link>
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
              Why Athletes Choose AIM
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Sport-Specific Training</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Customized rehabilitation programs designed for your specific sport and position.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Rapid Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Evidence-based protocols to minimize downtime and accelerate return to play.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Performance Enhancement</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Not just recovery - optimize strength, mobility, and athletic performance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Injury Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Proactive screening and conditioning to reduce injury risk and extend your career.
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
              Sports & Conditions We Specialize In
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-aim-navy mb-4">Sports We Work With</h3>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  'Hockey',
                  'Football',
                  'Soccer',
                  'Basketball',
                  'Volleyball',
                  'Running & Track',
                  'CrossFit & Weightlifting',
                  'Golf',
                  'Tennis & Racquet Sports',
                  'Skiing & Snowboarding',
                ].map((sport) => (
                  <li key={sport} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 flex-none text-aim-teal mt-0.5" aria-hidden="true" />
                    <span className="text-aim-slate">{sport}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-aim-navy mb-4">Common Athletic Injuries</h3>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  'ACL and knee ligament injuries',
                  'Shoulder injuries and instability',
                  'Ankle sprains',
                  'Muscle strains and tears',
                  'Stress fractures',
                  'Tendonitis and tendinopathy',
                  'Concussion management',
                  'Groin and hip injuries',
                  'Rotator cuff injuries',
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
                <AccordionTrigger>Do I need a referral?</AccordionTrigger>
                <AccordionContent>
                  No referral is required. You can book directly with us. However, if you have insurance coverage that requires a referral, we can guide you through that process.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How quickly can I return to sport?</AccordionTrigger>
                <AccordionContent>
                  Return-to-sport timelines vary based on injury type, severity, and individual factors. We use objective criteria and functional testing to ensure you're ready to return safely, minimizing re-injury risk.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Do you work with youth athletes?</AccordionTrigger>
                <AccordionContent>
                  Yes. We work with athletes of all ages and levels, from youth sports to elite competitors. Our programs are tailored to each athlete's developmental stage and competitive demands.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can you help prevent injuries?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. We offer pre-season screening, movement assessments, and injury prevention programs designed to identify and address risk factors before they become problems.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Do you accept insurance?</AccordionTrigger>
                <AccordionContent>
                  Yes. We accept most private insurance plans and can provide receipts for reimbursement. Payment plans are available for self-pay patients.
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
              Ready to Elevate Your Performance?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Get back in the game stronger and faster with expert athletic rehabilitation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-aim-teal hover:bg-aim-teal/90 text-white"
              >
                <Link href="/intake">Start Intake</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/book">Book Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
