import Link from 'next/link';
import { CheckCircle, AlertCircle, Users, ArrowRight, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { generateServiceSchema, generateTherapeuticProcedureSchema, generateFAQPageSchema } from '@/lib/schema';
import { ServiceCTA } from '@/components/cta/service-cta';
import { ReviewBlock } from '@/components/reviews/review-block';
import { ReviewSchema } from '@/components/reviews/review-schema';
import { supabase } from '@/lib/supabase';
import { CENTRAL_PHONE_DISPLAY, CENTRAL_PHONE_TEL } from '@/lib/config';

export const metadata = {
  title: 'Manual Osteopathy in Edmonton | Alberta Injury Management',
  description: 'Manual osteopathy at Alberta Injury Management offers hands-on, whole-body treatment to improve mobility, reduce pain, and restore balance. Complementary care available in Edmonton.',
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

export default async function ManualOsteopathyPage() {
  const reviews = await getServiceReviews('manual-osteopathy');
  const serviceSchema = generateServiceSchema(
    'Manual Osteopathy',
    'Hands-on manual osteopathy to support mobility, reduce pain, and restore balance. Complementary care available in Edmonton.'
  );

  const procedureSchema = generateTherapeuticProcedureSchema(
    'Manual Osteopathy Treatment',
    'A gentle, hands-on approach focused on how the body moves, adapts, and compensates as a system. Often used alongside physiotherapy and other services.',
    'Persistent stiffness, mobility restrictions, chronic musculoskeletal discomfort, post-injury compensation patterns'
  );

  const faqSchema = generateFAQPageSchema([
    {
      question: 'What is manual osteopathy?',
      answer: 'Manual osteopathy is a gentle, hands-on approach that focuses on how the body moves, adapts, and compensates as a system. It is a complementary therapy that addresses restrictions and imbalances through soft tissue mobilization, myofascial release, and gentle joint mobilization.',
    },
    {
      question: 'Is manual osteopathy covered by WCB or insurance?',
      answer: 'Manual osteopathy is not covered by WCB or motor vehicle insurance. Coverage depends on individual extended health benefit plans. Our intake team can help you understand your coverage options.',
    },
    {
      question: 'Can I book manual osteopathy for a work injury?',
      answer: 'If your care is related to a work injury, WCB claim, or insurance case, please contact our intake team first. Manual osteopathy is a complementary therapy and requires coordination with your primary care plan.',
    },
    {
      question: 'How does manual osteopathy differ from physiotherapy?',
      answer: 'Manual osteopathy is a complementary therapy that focuses on whole-body movement patterns and restrictions. It is not physiotherapy and does not provide medical diagnosis. At AIM, it is often used alongside physiotherapy as part of a coordinated care model.',
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
              Manual Osteopathy — Hands-On Care Focused on Whole-Body Function
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Manual osteopathy is a gentle, hands-on approach that focuses on how the body moves, adapts, and compensates as a system.
            </p>
            <p className="mt-4 text-base leading-7 text-aim-slate">
              At Alberta Injury Management, manual osteopathy is offered as a complementary therapy, often used alongside physiotherapy and other services to support mobility, comfort, and overall function.
            </p>
            <div className="mt-10">
              <ServiceCTA
                serviceName="Manual Osteopathy"
                serviceSlug="manual-osteopathy"
                primaryLabel="Book Manual Osteopathy"
                secondaryLabel={`Call ${CENTRAL_PHONE_DISPLAY}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Alert className="mb-12 border-amber-200 bg-amber-50">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-amber-900">
              <strong>Coverage Disclaimer:</strong> Manual osteopathy is a complementary therapy and is not regulated in the same manner as physiotherapy in Alberta. It is not covered by WCB or motor vehicle insurance. Coverage, if available, depends on individual extended health benefit plans.
            </AlertDescription>
          </Alert>

          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl mb-8">
              Who This Is For
            </h2>
            <p className="text-lg text-aim-slate mb-6">
              Manual osteopathy may be appropriate for individuals who:
            </p>
            <ul className="space-y-4 text-aim-slate">
              <li className="flex gap-x-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-none text-aim-teal" />
                <span>Experience persistent stiffness or mobility restrictions</span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-none text-aim-teal" />
                <span>Have chronic or recurring musculoskeletal discomfort</span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-none text-aim-teal" />
                <span>Feel "out of balance" after injury or prolonged compensation</span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-none text-aim-teal" />
                <span>Want a gentle, hands-on approach to movement and pain</span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircle className="mt-1 h-5 w-5 flex-none text-aim-teal" />
                <span>Are receiving physiotherapy and want complementary support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24 bg-aim-light-blue">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl mb-8">
              How Manual Osteopathy Works
            </h2>
            <p className="text-lg text-aim-slate mb-8">
              A manual osteopath assesses how different parts of the body move and interact, then applies hands-on techniques to address restrictions and imbalances.
            </p>

            <h3 className="text-xl font-semibold text-aim-navy mb-4">Common Techniques</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Soft Tissue Mobilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-aim-slate">Gentle manipulation of muscles and connective tissue</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Myofascial Release</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-aim-slate">Addressing restrictions in the fascial system</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Gentle Joint Mobilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-aim-slate">Improving joint movement and function</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Movement-Based Techniques</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-aim-slate">Supporting natural movement patterns</p>
                </CardContent>
              </Card>
            </div>

            <p className="mt-8 text-aim-slate">
              Manual osteopathy is non-invasive and does not involve medication, injections, or forceful manipulation.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl mb-8">
              Manual Osteopathy at AIM — Important Clarity
            </h2>

            <Card className="border-aim-navy">
              <CardHeader>
                <CardTitle>Understanding the Scope</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-aim-slate mb-4">Manual osteopathy:</p>
                <ul className="space-y-3 text-aim-slate">
                  <li className="flex gap-x-3">
                    <Info className="mt-1 h-5 w-5 flex-none text-aim-navy" />
                    <span><strong>Is</strong> a complementary therapy</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Info className="mt-1 h-5 w-5 flex-none text-aim-navy" />
                    <span><strong>Is not</strong> physiotherapy</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Info className="mt-1 h-5 w-5 flex-none text-aim-navy" />
                    <span><strong>Is not</strong> a medical diagnosis</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Info className="mt-1 h-5 w-5 flex-none text-aim-navy" />
                    <span><strong>Is not</strong> covered by WCB</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Info className="mt-1 h-5 w-5 flex-none text-aim-navy" />
                    <span><strong>May be</strong> covered under some extended health benefits</span>
                  </li>
                </ul>
                <p className="mt-6 text-aim-slate">
                  At AIM, manual osteopathy is delivered within a coordinated care model, with clear scope and transparency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24 bg-aim-light-blue">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl mb-8">
              How This Fits With Other AIM Services
            </h2>
            <p className="text-lg text-aim-slate mb-6">
              Manual osteopathy is often used:
            </p>
            <ul className="space-y-4 text-aim-slate mb-8">
              <li className="flex gap-x-3">
                <ArrowRight className="mt-1 h-5 w-5 flex-none text-aim-teal" />
                <span>Alongside <Link href="/services/physiotherapy" className="text-aim-teal hover:underline">physiotherapy</Link></span>
              </li>
              <li className="flex gap-x-3">
                <ArrowRight className="mt-1 h-5 w-5 flex-none text-aim-teal" />
                <span>In coordination with massage therapy</span>
              </li>
              <li className="flex gap-x-3">
                <ArrowRight className="mt-1 h-5 w-5 flex-none text-aim-teal" />
                <span>As part of a broader recovery or wellness plan</span>
              </li>
            </ul>
            <p className="text-aim-slate">
              Your care team will help determine whether this service is appropriate for your goals.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl mb-8">
              Next Steps
            </h2>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Our Intake Team Will</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-aim-slate">
                  <li className="flex gap-x-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-none text-aim-teal" />
                    <span>Confirm whether manual osteopathy is appropriate for your needs</span>
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-none text-aim-teal" />
                    <span>Review coverage considerations</span>
                  </li>
                  <li className="flex gap-x-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-none text-aim-teal" />
                    <span>Schedule your appointment or guide you to another service if needed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-aim-cta-primary hover:bg-aim-cta-primary/90">
                <Link href="/book">Book Manual Osteopathy</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-aim-navy text-aim-navy hover:bg-aim-steel-blue">
                <Link href={`tel:${CENTRAL_PHONE_TEL}`} className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Talk to Intake
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24 bg-aim-light-blue">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is manual osteopathy?</AccordionTrigger>
                <AccordionContent>
                  Manual osteopathy is a gentle, hands-on approach that focuses on how the body moves, adapts, and compensates as a system. It is a complementary therapy that addresses restrictions and imbalances through soft tissue mobilization, myofascial release, and gentle joint mobilization.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is manual osteopathy covered by WCB or insurance?</AccordionTrigger>
                <AccordionContent>
                  Manual osteopathy is not covered by WCB or motor vehicle insurance. Coverage depends on individual extended health benefit plans. Our intake team can help you understand your coverage options.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I book manual osteopathy for a work injury?</AccordionTrigger>
                <AccordionContent>
                  If your care is related to a work injury, WCB claim, or insurance case, please contact our intake team first. Manual osteopathy is a complementary therapy and requires coordination with your primary care plan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How does manual osteopathy differ from physiotherapy?</AccordionTrigger>
                <AccordionContent>
                  Manual osteopathy is a complementary therapy that focuses on whole-body movement patterns and restrictions. It is not physiotherapy and does not provide medical diagnosis. At AIM, it is often used alongside physiotherapy as part of a coordinated care model.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {reviews && reviews.length > 0 && (
        <div className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ReviewBlock reviews={reviews} />
          </div>
        </div>
      )}

      <LazyChatWidget />
    </>
  );
}
