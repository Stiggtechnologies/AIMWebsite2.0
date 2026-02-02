import Link from 'next/link';
import { CheckCircle, Activity, TrendingUp, Phone, Target, Zap } from 'lucide-react';
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
  title: 'Performance Rehabilitation & Sports Injury Care | AIM Performance West',
  description: 'Performance-focused rehabilitation and sports injury care at AIM Performance West.',
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

export default async function PerformanceRehabilitationPage() {
  const reviews = await getServiceReviews('performance_rehabilitation');
  const serviceSchema = generateServiceSchema(
    'Performance Rehabilitation',
    'Performance-focused rehabilitation and sports injury care at AIM Performance West. Movement-focused rehabilitation for athletes and active individuals designed for performance, not just recovery.'
  );

  const procedureSchema = generateTherapeuticProcedureSchema(
    'Performance Rehabilitation Program',
    'Athletic performance-focused rehabilitation combining injury recovery with strength, power, and movement quality development.',
    'Sports injuries, athletic performance, movement optimization, injury prevention'
  );

  const faqSchema = generateFAQPageSchema([
    {
      question: 'Is this only for elite athletes?',
      answer: 'No. Our performance rehabilitation is for anyone who wants to return to activity stronger than before their injury, whether you\'re a competitive athlete, weekend warrior, or active individual.',
    },
    {
      question: 'How is performance rehab different from regular physiotherapy?',
      answer: 'Performance rehab integrates athletic training principles into rehabilitation. We focus not just on healing, but on improving strength, power, speed, and movement quality.',
    },
    {
      question: 'Can you work with my coach or trainer?',
      answer: 'Yes. We coordinate with coaches, trainers, and sport medicine physicians to ensure a seamless return to training and competition.',
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
              Rehab Designed for Performance, Not Just Recovery
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Movement-focused rehabilitation for athletes and active individuals.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Performance Rehabilitation"
                serviceSlug="performance-rehabilitation"
                primaryLabel="Book Performance Rehab"
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
              Who We Serve at Performance West
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <ul className="space-y-4">
              {[
                'Pickleball athletes',
                'Recreational athletes',
                'Competitive athletes',
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
              Our Performance Approach
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Sport-Specific Rehab</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Rehabilitation programs tailored to your sport's specific movement patterns and demands.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Activity className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Movement Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Focus on movement quality, biomechanics, and performance optimization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Outcome-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Progressive programs with measurable performance metrics and clear milestones.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Performance West</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All care delivered at our Performance West location, equipped for athletes.
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
              Common Sports Injuries We Treat
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                'Shoulder injuries (rotator cuff, impingement)',
                'Knee injuries (ACL, MCL, meniscus)',
                'Ankle sprains and instability',
                'Tennis/golfer\'s elbow',
                'Hip and groin injuries',
                'Hamstring and muscle strains',
                'Overuse and tendinopathy',
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

      <div className="bg-aim-steel-blue py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Return to Sport Process
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <ol className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Initial Assessment',
                  description: 'Comprehensive evaluation of injury, movement patterns, and sport demands',
                },
                {
                  step: '2',
                  title: 'Rehabilitation Phase',
                  description: 'Progressive rehab addressing pain, mobility, and functional strength',
                },
                {
                  step: '3',
                  title: 'Performance Training',
                  description: 'Sport-specific exercises building power, speed, and movement quality',
                },
                {
                  step: '4',
                  title: 'Return to Sport',
                  description: 'Gradual progression back to full training and competition',
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

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Why Choose Performance West
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance-Focused Environment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-aim-slate">
                    Our Performance West location is specifically designed for athletes, with equipment and space optimized for sport-specific training and rehabilitation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Movement Specialists</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-aim-slate">
                    Our team specializes in movement analysis, biomechanics, and sport-specific rehabilitation. We understand the demands of athletic performance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Beyond Pain Relief</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-aim-slate">
                    We don't just treat injuries—we optimize movement quality, address biomechanical issues, and help athletes return stronger and more resilient.
                  </p>
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
              What Athletes Say
            </h2>
            <p className="mt-4 text-lg text-aim-slate">
              Real experiences from athletes who got back to their sport stronger.
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
                <AccordionTrigger>Do I need a referral for performance rehab?</AccordionTrigger>
                <AccordionContent>
                  No referral is required. Athletes can book directly for assessment and rehabilitation services at our Performance West location.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Is performance rehab covered by insurance?</AccordionTrigger>
                <AccordionContent>
                  Many private insurance plans cover physiotherapy for sports injuries. We can provide receipts for insurance submission. Our team can verify your coverage.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What's the difference between regular physio and performance rehab?</AccordionTrigger>
                <AccordionContent>
                  Performance rehab focuses specifically on returning athletes to sport at their previous or higher level. It emphasizes movement quality, sport-specific demands, and performance optimization beyond just injury recovery.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I see a performance specialist for injury prevention?</AccordionTrigger>
                <AccordionContent>
                  Yes. We provide movement assessments and injury prevention programs for athletes looking to optimize performance and reduce injury risk, even without a current injury.
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
              Ready to Return to Peak Performance?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Book your performance rehabilitation assessment at our West location.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Performance Rehabilitation"
                serviceSlug="performance-rehabilitation"
                primaryLabel="Book at Performance West"
                secondaryLabel="View Location"
              />
            </div>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
