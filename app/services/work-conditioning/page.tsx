import Link from 'next/link';
import { CheckCircle, TrendingUp, Activity, Users, Target, Clock } from 'lucide-react';
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
  title: 'Work Conditioning Programs | Alberta Injury Management',
  description: 'Progressive work conditioning programs supporting safe return to job demands.',
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

export default async function WorkConditioningPage() {
  const reviews = await getWorkRelatedReviews();
  const serviceSchema = generateServiceSchema(
    'Work Conditioning Programs',
    'Progressive work conditioning programs supporting safe return to job demands. Job-specific conditioning coordinated with employers and insurers to build work readiness.'
  );

  const procedureSchema = generateTherapeuticProcedureSchema(
    'Work Conditioning Program',
    'Progressive program bridging rehabilitation and return to work including graduated exercise, functional tasks, and work simulation.',
    'Return to work preparation, post-injury conditioning, functional restoration'
  );

  const faqSchema = generateFAQPageSchema([
    {
      question: 'What is the difference between work conditioning and work hardening?',
      answer: 'Work conditioning is typically less intensive and focuses on general fitness and functional capacity. Work hardening is more intensive and job-specific, simulating actual work tasks.',
    },
    {
      question: 'How long is a work conditioning program?',
      answer: 'Programs typically run 2-6 weeks, with sessions 1-3 hours per day, 2-5 days per week depending on individual needs and goals.',
    },
    {
      question: 'Will my employer be involved?',
      answer: 'Yes. We coordinate with employers to ensure the program aligns with job requirements and supports a safe, sustainable return to work.',
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
              Progressive Programs Designed to Build Work Readiness
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Job-specific conditioning coordinated with employers and insurers.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Work Conditioning"
                serviceSlug="work-conditioning"
                primaryLabel="Start Work Conditioning"
                secondaryLabel="Employer Referral"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Who Work Conditioning Helps
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <ul className="space-y-4">
              {[
                'Injured workers preparing to return to job demands',
                'Employers supporting structured recovery',
                'Insurers managing return-to-work timelines',
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
              Program Features
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Job-Specific Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conditioning programs tailored to the specific demands of your job role.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Progressive Loading</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Systematic progression to build strength, endurance, and work tolerance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Activity className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Outcome Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Regular assessment and tracking to ensure measurable progress.
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
                  Direct communication with employers to align program goals with workplace needs.
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
              What to Expect in Work Conditioning
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <ol className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Initial Assessment',
                  description: 'Comprehensive evaluation of current functional capacity and job demands',
                },
                {
                  step: '2',
                  title: 'Program Design',
                  description: 'Customized conditioning plan with specific goals and timelines',
                },
                {
                  step: '3',
                  title: 'Progressive Training',
                  description: 'Supervised sessions building strength, endurance, and job-specific skills',
                },
                {
                  step: '4',
                  title: 'Return-to-Work Transition',
                  description: 'Coordinated progression to modified or full work duties',
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

      <div className="bg-aim-steel-blue py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Work Conditioning vs. Work Hardening
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Work Conditioning</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 flex-none text-aim-teal mt-0.5" />
                      <span className="text-aim-slate">Focuses on physical conditioning and functional capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 flex-none text-aim-teal mt-0.5" />
                      <span className="text-aim-slate">Typically 2-3 sessions per week for 4-6 weeks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 flex-none text-aim-teal mt-0.5" />
                      <span className="text-aim-slate">Prepares workers for moderate job demands</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Work Hardening</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 flex-none text-aim-teal mt-0.5" />
                      <span className="text-aim-slate">Comprehensive program addressing physical, behavioral, and vocational components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 flex-none text-aim-teal mt-0.5" />
                      <span className="text-aim-slate">Typically 3-5 sessions per week for 6-8 weeks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 flex-none text-aim-teal mt-0.5" />
                      <span className="text-aim-slate">Prepares workers for physically demanding roles</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
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
              Workers who got back to their jobs stronger and safer.
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
                <AccordionTrigger>Who determines if I need work conditioning?</AccordionTrigger>
                <AccordionContent>
                  Work conditioning is typically recommended by physicians, physiotherapists, or case managers when a worker needs structured conditioning before returning to full job duties. Our intake team confirms program suitability.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How long does work conditioning take?</AccordionTrigger>
                <AccordionContent>
                  Most work conditioning programs run 4-6 weeks with 2-3 sessions per week. Duration depends on injury complexity, current functional level, and job demands.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Is work conditioning covered by WCB?</AccordionTrigger>
                <AccordionContent>
                  Work conditioning may be covered by WCB, private insurance, or employer funding. Our team verifies coverage and authorization before program start.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I work while doing work conditioning?</AccordionTrigger>
                <AccordionContent>
                  Yes, many workers participate in work conditioning while on modified duties. We coordinate schedules with employers to support both program attendance and gradual return-to-work.
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
              Ready to Build Work Readiness?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Start your work conditioning program today.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Work Conditioning"
                serviceSlug="work-conditioning"
                primaryLabel="Start Program"
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
