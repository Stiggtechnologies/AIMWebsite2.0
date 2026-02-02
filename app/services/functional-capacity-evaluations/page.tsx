import Link from 'next/link';
import { CheckCircle, ClipboardCheck, FileText, Users, Shield, AlertCircle } from 'lucide-react';
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
  title: 'Functional Capacity Evaluations (FCE) | Alberta Injury Management',
  description: 'Objective functional capacity evaluations for employers, insurers, and return-to-work decisions.',
};

async function getWorkRelatedReviews() {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .contains('persona_tags', ['injured_worker'])
    .eq('rating', 5)
    .order('published_at', { ascending: false })
    .limit(3);

  return reviews || [];
}

export default async function FCEPage() {
  const reviews = await getWorkRelatedReviews();
  const serviceSchema = generateServiceSchema(
    'Functional Capacity Evaluations (FCE)',
    'Objective functional capacity evaluations for employers, insurers, and return-to-work decisions. Standardized evaluations coordinated through AIM\'s central intake team.'
  );

  const procedureSchema = generateTherapeuticProcedureSchema(
    'Functional Capacity Evaluation',
    'Comprehensive standardized assessment of physical and functional capabilities including lifting capacity, positional tolerances, and job-specific task performance.',
    'Return-to-work assessments, disability determination, work capacity evaluation'
  );

  const faqSchema = generateFAQPageSchema([
    {
      question: 'Who can request an FCE?',
      answer: 'FCE requests typically come from employers, insurers, case managers, or legal representatives. Individual workers cannot self-refer for an FCE.',
    },
    {
      question: 'How long does an FCE take?',
      answer: 'A comprehensive FCE typically takes 4-6 hours, conducted over one or two days depending on the scope of assessment required. Report delivery usually occurs within 5-7 business days.',
    },
    {
      question: 'Is an FCE the same as a work capacity evaluation?',
      answer: 'Yes, these terms are often used interchangeably. Both refer to standardized assessments of an individual\'s physical and functional capabilities.',
    },
    {
      question: 'Can FCE results be used for legal proceedings?',
      answer: 'Yes. FCE reports provide objective, measurable data that can be used in legal, administrative, or insurance proceedings. Our evaluators follow standardized protocols recognized by courts and insurers.',
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
              Objective Functional Assessments to Support Informed Decisions
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Standardized evaluations coordinated through AIM's central intake team.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Functional Capacity Evaluation"
                serviceSlug="functional-capacity-evaluations"
                primaryLabel="Request an FCE"
                secondaryLabel="Employer or Insurer Inquiry"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Who Uses FCE Services
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <ul className="space-y-4">
              {[
                'Employers',
                'Insurers and case managers',
                'Administrative and legal stakeholders',
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
              What Makes Our FCE Program Different
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <ClipboardCheck className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Standardized Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Evidence-based evaluation protocols ensuring consistent, reliable results.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Objective Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive reports with measurable data to support decision-making.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertCircle className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>No Treatment Bias</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Independent assessment with no treatment decisions or recommendations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Clear Process</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Transparent administrative process managed through central intake.
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
                <strong>Important:</strong> Functional Capacity Evaluations are assessment tools only. They do not include treatment decisions or recommendations. Results are provided to the requesting organization for administrative or legal purposes.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>

      <div className="bg-aim-steel-blue py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              What an FCE Assesses
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                'Lifting capacity',
                'Carrying and pushing/pulling',
                'Positional tolerances (sitting, standing, bending)',
                'Fine and gross motor skills',
                'Endurance and work capacity',
                'Balance and coordination',
                'Functional mobility',
                'Job-specific task performance',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 flex-none text-aim-teal mt-0.5" aria-hidden="true" />
                  <span className="text-aim-slate">{item}</span>
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
              Trusted by Workers, Employers & Insurers
            </h2>
            <p className="mt-4 text-lg text-aim-slate">
              Objective evaluations that support fair return-to-work decisions.
            </p>
          </div>
          <ReviewBlock
            reviews={reviews}
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
                <AccordionTrigger>Who can request an FCE?</AccordionTrigger>
                <AccordionContent>
                  FCE requests typically come from employers, insurers, case managers, or legal representatives. Individual workers cannot self-refer for an FCE.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How long does an FCE take?</AccordionTrigger>
                <AccordionContent>
                  A comprehensive FCE typically takes 4-6 hours, conducted over one or two days depending on the scope of assessment required. Report delivery usually occurs within 5-7 business days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Is an FCE the same as a work capacity evaluation?</AccordionTrigger>
                <AccordionContent>
                  Yes, these terms are often used interchangeably. Both refer to standardized assessments of an individual's physical and functional capabilities.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can FCE results be used for legal proceedings?</AccordionTrigger>
                <AccordionContent>
                  Yes. FCE reports provide objective, measurable data that can be used in legal, administrative, or insurance proceedings. Our evaluators follow standardized protocols recognized by courts and insurers.
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
              Request a Functional Capacity Evaluation
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Contact our team to discuss your FCE requirements.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Functional Capacity Evaluation"
                serviceSlug="functional-capacity-evaluations"
                primaryLabel="Request FCE"
                secondaryLabel="Call (780) 250-8188"
              />
            </div>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
