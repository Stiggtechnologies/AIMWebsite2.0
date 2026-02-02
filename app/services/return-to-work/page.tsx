import Link from 'next/link';
import { CheckCircle, TrendingUp, Users, Shield, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { generateServiceSchema, generateTherapeuticProcedureSchema, generateFAQPageSchema } from '@/lib/schema';
import { ServiceCTA } from '@/components/cta/service-cta';
import { ReviewBlock } from '@/components/reviews/review-block';
import { ReviewSchema } from '@/components/reviews/review-schema';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Return-to-Work Programs for Employers | Alberta Injury Management',
  description: 'Employer-focused return-to-work programs designed to reduce downtime and risk.',
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

export default async function ReturnToWorkPage() {
  const reviews = await getServiceReviews('return_to_work');
  const serviceSchema = generateServiceSchema(
    'Return-to-Work Programs',
    'Employer-focused return-to-work programs designed to reduce downtime and risk. Partnering with employers to support safe, compliant workforce recovery.'
  );

  const procedureSchema = generateTherapeuticProcedureSchema(
    'Return-to-Work Coordination',
    'Comprehensive return-to-work coordination including modified duties planning, employer consultation, and gradual return strategies.',
    'Workplace injury management, return-to-work planning, modified duties coordination'
  );

  const faqSchema = generateFAQPageSchema([
    {
      question: 'Who is this program for?',
      answer: 'This program is designed for employers, HR professionals, and safety coordinators who need to coordinate return-to-work for injured employees.',
    },
    {
      question: 'How do you work with employers?',
      answer: 'We partner with employers to develop modified work plans, coordinate with WCB or insurers, and support gradual return-to-work transitions that reduce risk and downtime.',
    },
    {
      question: 'What if an employee cannot return to their original job?',
      answer: 'We work with employers to identify suitable modified duties or alternative roles that match the worker\'s current functional capacity while supporting continued recovery.',
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
              Structured Return-to-Work Programs That Reduce Downtime and Risk
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Partnering with employers to support safe, compliant workforce recovery.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Return-to-Work Programs"
                serviceSlug="return-to-work"
                primaryLabel="Book Employer Consultation"
                secondaryLabel="Refer an Injured Worker"
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
                'Employers and HR teams',
                'Safety and operations leaders',
                'Insurers and case managers',
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
              Program Benefits
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>RTW Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Structured return-to-work planning and coordination tailored to your workplace.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Functional progress tracking with objective measures and clear milestones.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Stakeholder Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Clear communication between employers, insurers, and care providers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Central Hub Oversight</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Centralized case management ensuring consistent, quality outcomes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Our Return-to-Work Process
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <ol className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Initial Assessment',
                  description: 'Comprehensive evaluation of worker capabilities and job demands',
                },
                {
                  step: '2',
                  title: 'Program Development',
                  description: 'Customized return-to-work plan with modified duties and timelines',
                },
                {
                  step: '3',
                  title: 'Implementation',
                  description: 'Coordinated execution with employer, worker, and care team',
                },
                {
                  step: '4',
                  title: 'Progress Monitoring',
                  description: 'Regular assessment and adjustment to ensure safe progression',
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-6">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-aim-teal text-white font-bold text-lg">
                    {item.step}
                  </span>
                  <div className="mt-1">
                    <h3 className="text-lg font-semibold text-aim-navy">{item.title}</h3>
                    <p className="text-aim-slate mt-1">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Trusted by Employers & Injured Workers
            </h2>
            <p className="mt-4 text-lg text-aim-slate">
              See what makes our return-to-work programs effective.
            </p>
          </div>
          <ReviewBlock
            reviews={reviews.slice(0, 3)}
            variant="contextual"
          />
        </div>
      </div>

      <div className="bg-aim-steel-blue py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do return-to-work programs reduce costs?</AccordionTrigger>
                <AccordionContent>
                  Structured RTW programs reduce downtime, minimize lost productivity, and lower WCB premiums by supporting safe, early return to modified duties. They also reduce the risk of reinjury and chronic disability.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What is a modified work plan?</AccordionTrigger>
                <AccordionContent>
                  A modified work plan outlines specific job tasks, hours, and restrictions based on worker capabilities during recovery. It allows workers to return to productive work while continuing rehabilitation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How long do RTW programs typically take?</AccordionTrigger>
                <AccordionContent>
                  Program duration varies based on injury severity and job demands. Most workers progress through modified duties over 4-12 weeks, with regular reassessment to adjust restrictions as function improves.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Do you work with our existing safety team?</AccordionTrigger>
                <AccordionContent>
                  Yes. We collaborate with your safety, HR, and operations teams to ensure RTW plans align with workplace policies and operational needs.
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
              Partner With AIM for Workplace Recovery
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Reduce downtime and support your workforce with structured return-to-work programs.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Return-to-Work Programs"
                serviceSlug="return-to-work"
                primaryLabel="Employer Consultation"
                secondaryLabel="Refer a Worker"
              />
            </div>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
