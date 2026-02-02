import Link from 'next/link';
import { CheckCircle, Dumbbell, Users, Clock, Phone, Target } from 'lucide-react';
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
  title: 'Work Hardening Programs | Alberta Injury Management',
  description: 'Structured work hardening programs for physically demanding roles.',
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

export default async function WorkHardeningPage() {
  const reviews = await getWorkRelatedReviews();
  const serviceSchema = generateServiceSchema(
    'Work Hardening Programs',
    'Structured work hardening programs for physically demanding roles. Job-specific programs coordinated through AIM\'s Main Hub to prepare workers for safe return to full duty.'
  );

  const procedureSchema = generateTherapeuticProcedureSchema(
    'Work Hardening Program',
    'Intensive job-specific conditioning program simulating actual work demands including strength, endurance, and task-specific training.',
    'Return to physically demanding work, pre-employment conditioning, workplace injury rehabilitation'
  );

  const faqSchema = generateFAQPageSchema([
    {
      question: 'How is work hardening different from regular physiotherapy?',
      answer: 'Work hardening is an intensive, job-specific program that simulates actual work demands. It focuses on building the specific strength, endurance, and skills needed for your job.',
    },
    {
      question: 'How long does a work hardening program last?',
      answer: 'Programs typically run 4-8 weeks depending on job demands and individual progress. Sessions are usually 2-4 hours per day, 3-5 days per week.',
    },
    {
      question: 'Who coordinates my work hardening program?',
      answer: 'Programs are coordinated through our Main Hub with input from employers, insurers, and your healthcare team to ensure alignment with return-to-work goals.',
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
              Structured Programs for Demanding Job Requirements
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Job-specific programs coordinated through AIM's Main Hub.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Work Hardening"
                serviceSlug="work-hardening"
                primaryLabel="Employer Inquiry"
                secondaryLabel="Call (780) 250-8188"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Who Benefits from Work Hardening
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <ul className="space-y-4">
              {[
                'Employers with physically demanding roles',
                'Case managers coordinating complex RTW plans',
                'Workers preparing for full-duty return',
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
              Program Components
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Dumbbell className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Job-Specific Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive programs simulating actual job tasks and demands.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Employer-Insurer Coordination</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Direct collaboration with all stakeholders to support successful outcomes.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Centralized Oversight</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All work hardening programs managed through our Main Hub for quality assurance.
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
              What Makes Work Hardening Different
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Comprehensive Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-aim-slate">
                    Work hardening addresses physical conditioning, behavioral factors, and vocational components. It's the most intensive return-to-work program, designed for workers returning to physically demanding roles.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Higher Intensity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-aim-slate">
                    Programs typically run 3-5 days per week for 6-8 weeks, with sessions lasting 4-6 hours. This extended format allows for comprehensive conditioning and simulation of full work days.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Multidisciplinary Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-aim-slate">
                    Our work hardening programs involve physiotherapists, occupational therapists, and kinesiologists working together to address all aspects of work readiness.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-aim-steel-blue py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Work Hardening Program Structure
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <ol className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Comprehensive Assessment',
                  description: 'Detailed evaluation of physical, functional, and behavioral factors',
                },
                {
                  step: '2',
                  title: 'Job Demand Analysis',
                  description: 'Thorough analysis of actual job tasks, environment, and physical requirements',
                },
                {
                  step: '3',
                  title: 'Progressive Program',
                  description: 'Systematic progression building strength, endurance, and job-specific skills',
                },
                {
                  step: '4',
                  title: 'Work Simulation',
                  description: 'Realistic simulation of job tasks and full work-day demands',
                },
                {
                  step: '5',
                  title: 'Return-to-Work Transition',
                  description: 'Coordinated transition with employer support and follow-up',
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
              Successful Return-to-Work Stories
            </h2>
            <p className="mt-4 text-lg text-aim-slate">
              Workers who regained strength and returned to full duty safely.
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
                <AccordionTrigger>When is work hardening recommended?</AccordionTrigger>
                <AccordionContent>
                  Work hardening is recommended for workers returning to physically demanding jobs who need comprehensive conditioning beyond standard physiotherapy. It's typically used after work conditioning or when workers need to meet high physical demands.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How does work hardening differ from work conditioning?</AccordionTrigger>
                <AccordionContent>
                  Work hardening is more comprehensive and intensive. It runs 3-5 days/week for 6-8 weeks with longer sessions, addresses physical, behavioral, and vocational components, and prepares workers for highly demanding roles. Work conditioning is shorter and focuses primarily on physical conditioning.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Is work hardening covered by insurance?</AccordionTrigger>
                <AccordionContent>
                  Work hardening may be covered by WCB, private insurance, or employer funding. Our team verifies coverage and obtains necessary authorization before program start.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Where are work hardening programs delivered?</AccordionTrigger>
                <AccordionContent>
                  All work hardening programs are coordinated through and delivered at our Main Hub, which has the specialized equipment and space required for comprehensive job simulation and conditioning.
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
              Discuss Work Hardening Options
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Contact our intake team to discuss program suitability and requirements.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Work Hardening"
                serviceSlug="work-hardening"
                primaryLabel="Employer Inquiry"
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
