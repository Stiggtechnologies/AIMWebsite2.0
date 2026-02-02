import Link from 'next/link';
import { CheckCircle, Clock, Users, ArrowRight, Phone } from 'lucide-react';
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
  title: 'Physiotherapy in Edmonton | Alberta Injury Management',
  description: 'Outcome-focused physiotherapy in Edmonton. Coordinated care for injured workers, seniors, and active individuals.',
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

export default async function PhysiotherapyPage() {
  const reviews = await getServiceReviews('physiotherapy');
  const serviceSchema = generateServiceSchema(
    'Physiotherapy',
    'Outcome-focused physiotherapy in Edmonton. Coordinated care for injured workers, seniors, and active individuals focused on restoring function and supporting safe return to work, sport, or daily life.'
  );

  const procedureSchema = generateTherapeuticProcedureSchema(
    'Physiotherapy Treatment',
    'Case-based physiotherapy treatment focused on complete recovery journey including assessment, treatment planning, and functional goals.',
    'Musculoskeletal injuries, work injuries, sports injuries, motor vehicle accidents, post-surgical rehabilitation'
  );

  const faqSchema = generateFAQPageSchema([
    {
      question: 'Do I need a referral for physiotherapy?',
      answer: 'No referral is required. You can book directly with us. Our intake team will confirm your injury context and coordinate the appropriate program.',
    },
    {
      question: 'How quickly can I be seen?',
      answer: 'Most appointments are available within 24-48 hours. We prioritize early intervention to prevent complications and support faster recovery.',
    },
    {
      question: 'What types of injuries do you treat?',
      answer: 'We treat work injuries, sports injuries, motor vehicle accident injuries, and general musculoskeletal conditions. Our team specializes in outcome-focused rehabilitation for all injury types.',
    },
    {
      question: 'Will you work with my employer or insurer?',
      answer: 'Yes. We coordinate directly with employers, WCB, and insurance providers to support your complete recovery and safe return to work or activities.',
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
              Physiotherapy That Focuses on Outcomes — Not Just Appointments
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Restoring function, reducing downtime, and supporting safe return to work, sport, or daily life.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Physiotherapy"
                serviceSlug="physiotherapy"
                primaryLabel="Book Physiotherapy"
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
              Who We Serve
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <ul className="space-y-4">
              {[
                'Injured workers (WCB or employer-supported)',
                'Seniors managing pain or mobility',
                'Individuals recovering from injury or surgery',
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
              Why Choose AIM Physiotherapy
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Case-Based Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Not visit-based. We focus on your complete recovery journey, not just individual sessions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ArrowRight className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Outcome-Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Treatment planning focused on measurable progress and functional goals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Central Coordination</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Coordinated intake team ensures you're in the right program from day one.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Collaborative Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Working with employers and insurers to support your complete recovery.
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
              Next Steps
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <ol className="space-y-6">
              {[
                { step: '1', text: 'Confirm injury context and coverage' },
                { step: '2', text: 'Coordinate appropriate program through our intake team' },
                { step: '3', text: 'Schedule care or escalate to intake coordination' },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-aim-teal text-white font-bold">
                    {item.step}
                  </span>
                  <span className="text-aim-slate text-lg mt-2">{item.text}</span>
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
              What Our Patients Say
            </h2>
            <p className="mt-4 text-lg text-aim-slate">
              Real experiences from people who chose outcome-focused care.
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
                <AccordionTrigger>Do I need a referral for physiotherapy?</AccordionTrigger>
                <AccordionContent>
                  No referral is required. You can book directly with us. Our intake team will confirm your injury context and coordinate the appropriate program.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How quickly can I be seen?</AccordionTrigger>
                <AccordionContent>
                  Most appointments are available within 24-48 hours. We prioritize early intervention to prevent complications and support faster recovery.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What types of injuries do you treat?</AccordionTrigger>
                <AccordionContent>
                  We treat work injuries, sports injuries, motor vehicle accident injuries, and general musculoskeletal conditions. Our team specializes in outcome-focused rehabilitation for all injury types.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Will you work with my employer or insurer?</AccordionTrigger>
                <AccordionContent>
                  Yes. We coordinate directly with employers, WCB, and insurance providers to support your complete recovery and safe return to work or activities.
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
              Book your physiotherapy assessment or speak with our intake team today.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Physiotherapy"
                serviceSlug="physiotherapy"
                primaryLabel="Book Now"
                secondaryLabel="Start Intake"
              />
            </div>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
