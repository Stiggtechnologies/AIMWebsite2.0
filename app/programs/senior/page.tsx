import Link from 'next/link';
import { CheckCircle, Heart, Shield, Activity, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';

export const metadata = {
  title: 'Senior Mobility & Fall Prevention | Alberta Injury Management',
  description: 'Specialized mobility programs for seniors in Alberta. Balance training, fall prevention, and strength programs to maintain independence and quality of life.',
};

export default function SeniorProgramPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-aim-steel-blue to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl">
              Senior Mobility & Fall Prevention
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Maintain independence and quality of life with programs designed specifically for active aging.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-aim-cta-primary hover:bg-aim-cta-primary/90 text-white"
              >
                <Link href="/intake">Get Started</Link>
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
              Why Choose AIM for Senior Care
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Fall Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Evidence-based programs to reduce fall risk and increase confidence in daily activities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Activity className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Strength & Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Progressive training to improve strength, balance, and functional mobility.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Home className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Maintain Independence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Stay active and independent in your home and community for as long as possible.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-10 w-10 text-aim-teal mb-4" aria-hidden="true" />
                <CardTitle>Personalized Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Programs tailored to your specific needs, goals, and health conditions.
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
              Conditions & Services
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-aim-navy mb-4">Conditions We Treat</h3>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  'Balance and gait disorders',
                  'Osteoarthritis',
                  'Osteoporosis management',
                  'Post-surgical rehabilitation',
                  'Chronic pain management',
                  'Parkinson\'s disease',
                  'Stroke recovery',
                  'Joint replacement recovery',
                  'Muscle weakness and deconditioning',
                  'Vertigo and dizziness',
                ].map((condition) => (
                  <li key={condition} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 flex-none text-aim-teal mt-0.5" aria-hidden="true" />
                    <span className="text-aim-slate">{condition}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-aim-navy mb-4">Program Components</h3>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  'Comprehensive fall risk assessment',
                  'Balance and coordination training',
                  'Strength and endurance building',
                  'Flexibility and mobility work',
                  'Functional movement training',
                  'Home safety evaluation',
                  'Walking aid assessment and training',
                  'Pain management strategies',
                  'Group exercise classes',
                  'Home exercise programs',
                ].map((component) => (
                  <li key={component} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 flex-none text-aim-teal mt-0.5" aria-hidden="true" />
                    <span className="text-aim-slate">{component}</span>
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
                <AccordionTrigger>Am I too old to benefit from physiotherapy?</AccordionTrigger>
                <AccordionContent>
                  No. Research shows that adults of all ages can improve strength, balance, and mobility with proper exercise and rehabilitation. It's never too late to start.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Will my insurance cover treatment?</AccordionTrigger>
                <AccordionContent>
                  Many seniors have extended health benefits that cover physiotherapy. Alberta Seniors Benefit may also provide coverage. We can help you navigate your coverage options and provide receipts for reimbursement.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Do you offer group classes?</AccordionTrigger>
                <AccordionContent>
                  Yes. We offer both one-on-one treatment and group exercise classes designed specifically for seniors. Group classes provide a social component while focusing on balance, strength, and mobility.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What if I have multiple health conditions?</AccordionTrigger>
                <AccordionContent>
                  Our physiotherapists are experienced in managing complex medical histories. We work closely with your healthcare team to create a safe, effective program that considers all your health conditions and medications.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How long are appointments?</AccordionTrigger>
                <AccordionContent>
                  Initial assessments are typically 60 minutes, with follow-up sessions ranging from 30-45 minutes. We adjust the pace and intensity to match your comfort level and ensure you get the most from each session.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Can family members attend appointments?</AccordionTrigger>
                <AccordionContent>
                  Yes. We encourage family members to attend, especially during the initial assessment and when learning home exercises. This helps ensure everyone understands the treatment plan and how to support your progress.
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
              Take the First Step Toward Better Mobility
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Stay active, independent, and confident with expert support from our team.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-aim-teal hover:bg-aim-teal/90 text-white"
              >
                <Link href="/intake">Complete Intake</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="tel:+17802508188">Call (780) 250-8188</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
