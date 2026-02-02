import Link from 'next/link';
import { CheckCircle, Clock, FileText, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { generateServiceSchema, generateTherapeuticProcedureSchema, generateFAQPageSchema } from '@/lib/schema';
import { ServiceCTA } from '@/components/cta/service-cta';
import { ReviewBlock } from '@/components/reviews/review-block';
import { ReviewSchema } from '@/components/reviews/review-schema';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'WCB Physiotherapy & Rehabilitation | Alberta Injury Management',
  description: 'Specialized WCB rehabilitation supporting injured workers, employers, and insurers across Alberta.',
};

async function getServiceReviews(serviceTag: string) {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .contains('service_tags', [serviceTag])
    .eq('rating', 5)
    .order('published_at', { ascending: false })
    .limit(4);

  return reviews || [];
}

export default async function WCBRehabilitationPage() {
  const reviews = await getServiceReviews('wcb_rehabilitation');
  const serviceSchema = generateServiceSchema(
    'WCB Rehabilitation',
    'Specialized WCB rehabilitation supporting injured workers, employers, and insurers across Alberta. Coordinated care for safe, sustainable return to work.'
  );

  const procedureSchema = generateTherapeuticProcedureSchema(
    'WCB Rehabilitation Program',
    'Comprehensive rehabilitation program for workplace injuries including physiotherapy, work conditioning, and return-to-work coordination.',
    'Workplace injuries, musculoskeletal conditions, occupational injuries'
  );

  const faqSchema = generateFAQPageSchema([
    {
      question: 'Do I need a WCB claim number?',
      answer: 'Yes, you\'ll need an active WCB claim number to access WCB-funded rehabilitation services. Our team will verify coverage and authorization before starting treatment.',
    },
    {
      question: 'How quickly can I be seen?',
      answer: 'We prioritize early intervention for workplace injuries. Most patients are seen within 24-48 hours once WCB authorization is confirmed.',
    },
    {
      question: 'Will you work with my employer?',
      answer: 'Yes. Employer coordination is a core part of WCB rehabilitation. We develop modified work plans and support gradual return-to-work transitions.',
    },
    {
      question: 'What if I need specialist consultation?',
      answer: 'We coordinate referrals when specialist input is needed and continue supporting your rehabilitation throughout the process.',
    },
  ]);

  return (
    <>
      <ReviewSchema reviews={reviews} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="bg-gradient-to-b from-aim-steel-blue to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl">
              WCB Rehabilitation Focused on Safe, Sustainable Return to Work
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Coordinated care for workers, employers, and WCB case managers.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="WCB Rehabilitation"
                serviceSlug="wcb-rehabilitation"
                primaryLabel="Get Help With a Work Injury"
                secondaryLabel="Employer or Case Manager Inquiry"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Who We Serve
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <ul className="space-y-4">
              {[
                'Workers injured on the job',
                'Employers supporting injured employees',
                'WCB case managers',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 flex-none text-aim-teal mt-0.5" aria-hidden="true" />
                  <span className="text-aim-slate text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-aim-steel-blue py-16 sm:py-24">
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
                <CardTitle>Structured Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Evidence-based rehabilitation programs designed for workplace injury recovery.
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
                  Direct collaboration with employers and insurers to support safe return to work.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Outcome-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Focus on measurable progress and functional improvements at every stage.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Central Administration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Centralized intake and case management for seamless coordination.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Alert>
              <AlertDescription className="text-aim-slate">
                <strong>Important:</strong> Coverage and eligibility are determined by WCB Alberta and confirmed by our team. We work directly with WCB to ensure appropriate authorization for all services.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>

      <div className="bg-aim-steel-blue py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Common Workplace Injuries We Treat
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

      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              What Injured Workers Say
            </h2>
            <p className="mt-4 text-lg text-aim-slate">
              Real experiences from workers who got back to their jobs safely.
            </p>
          </div>
          <ReviewBlock
            reviews={reviews.slice(0, 3)}
            variant="contextual"
          />
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
                <AccordionTrigger>Do I need a WCB claim number?</AccordionTrigger>
                <AccordionContent>
                  Yes, you'll need an active WCB claim number to access WCB-funded rehabilitation services. Our team will verify coverage and authorization before starting treatment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How quickly can I be seen?</AccordionTrigger>
                <AccordionContent>
                  We prioritize early intervention for workplace injuries. Most patients are seen within 24-48 hours once WCB authorization is confirmed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Will you work with my employer?</AccordionTrigger>
                <AccordionContent>
                  Yes. Employer coordination is a core part of WCB rehabilitation. We develop modified work plans and support gradual return-to-work transitions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What if I need specialist consultation?</AccordionTrigger>
                <AccordionContent>
                  We coordinate referrals when specialist input is needed and continue supporting your rehabilitation throughout the process.
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
              Ready to Start Your WCB Rehabilitation?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Get help with your work injury today.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="WCB Rehabilitation"
                serviceSlug="wcb-rehabilitation"
                primaryLabel="Start Intake"
                secondaryLabel="Book Assessment"
              />
            </div>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
