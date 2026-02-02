import Link from 'next/link';
import { Briefcase, Car, Trophy, Heart, Building2, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonaCTACard } from '@/components/cta/persona-cta-card';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { PageTracker } from '@/components/providers/page-tracker';
import { ReviewBlock } from '@/components/reviews/review-block';
import { ReviewSchema } from '@/components/reviews/review-schema';
import { supabase } from '@/lib/supabase';

async function getFeaturedReviews() {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(2);

  return reviews || [];
}

export default async function Home() {
  const featuredReviews = await getFeaturedReviews();
  return (
    <>
      <ReviewSchema reviews={featuredReviews} />
      <PageTracker pageTitle="Home - Alberta Injury Management" />
      <section className="relative overflow-hidden bg-gradient-to-b from-aim-steel-blue to-white py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-6xl">
              Get Back to What Matters Most
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Expert injury management and physiotherapy in Alberta. Outcome-based care that gets you back to work, sport, and life faster.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-aim-cta-primary hover:bg-aim-cta-primary/90 text-white"
              >
                <Link href="/book">Book Your Assessment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-aim-navy text-aim-navy hover:bg-aim-steel-blue"
              >
                <Link href="/get-care" className="flex items-center gap-2">
                  How It Works <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-aim-slate/80">
              Direct billing for WCB and MVA cases. Most insurance accepted.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ReviewBlock
            reviews={featuredReviews}
            showAggregate={true}
            variant="hero"
            ctaLabel="Read More Reviews"
          />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Find the Right Care for You
            </h2>
            <p className="mt-4 text-lg text-aim-slate">
              We specialize in outcome-based rehabilitation for work injuries, motor vehicle accidents, athletic performance, and more.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PersonaCTACard
              title="Injured at Work"
              description="WCB rehabilitation and return-to-work programs designed to get you back on the job safely and effectively."
              icon={Briefcase}
              ctaText="Start WCB Care"
              ctaHref="/programs/wcb"
              ctaId="homepage-wcb"
              variant="primary"
            />
            <PersonaCTACard
              title="Motor Vehicle Accident"
              description="Comprehensive MVA recovery with direct insurance billing. Expert care for whiplash, soft tissue injuries, and more."
              icon={Car}
              ctaText="Start MVA Recovery"
              ctaHref="/programs/mva"
              ctaId="homepage-mva"
              variant="primary"
            />
            <PersonaCTACard
              title="Athletes & Active Individuals"
              description="Performance rehabilitation and injury prevention to keep you competing at your highest level."
              icon={Trophy}
              ctaText="Optimize Performance"
              ctaHref="/programs/athletic"
              ctaId="homepage-athletic"
              variant="primary"
            />
            <PersonaCTACard
              title="Seniors & Mobility"
              description="Fall prevention, balance training, and mobility programs to maintain independence and quality of life."
              icon={Heart}
              ctaText="Improve Mobility"
              ctaHref="/programs/senior"
              ctaId="homepage-senior"
              variant="secondary"
            />
            <PersonaCTACard
              title="Employers"
              description="Workplace injury prevention, early intervention programs, and return-to-work coordination."
              icon={Building2}
              ctaText="Partner With Us"
              ctaHref="/employers"
              ctaId="homepage-employer"
              variant="secondary"
            />
            <PersonaCTACard
              title="Insurance Providers"
              description="Trusted partner for case management, functional capacity evaluations, and outcome reporting."
              icon={Shield}
              ctaText="Learn More"
              ctaHref="/insurers"
              ctaId="homepage-insurer"
              variant="secondary"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-aim-steel-blue">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Why Choose AIM
            </h2>
            <p className="mt-4 text-lg text-aim-slate">
              Outcome-based care backed by evidence and powered by expertise.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-aim-navy">
                  <CheckCircle className="h-5 w-5 flex-none text-aim-teal" aria-hidden="true" />
                  Evidence-Based Treatment
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-aim-slate">
                  <p className="flex-auto">
                    Latest research-backed techniques combined with personalized care plans for optimal outcomes.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-aim-navy">
                  <CheckCircle className="h-5 w-5 flex-none text-aim-teal" aria-hidden="true" />
                  Direct Insurance Billing
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-aim-slate">
                  <p className="flex-auto">
                    Seamless direct billing for WCB and MVA cases. No upfront costs or paperwork hassle.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-aim-navy">
                  <CheckCircle className="h-5 w-5 flex-none text-aim-teal" aria-hidden="true" />
                  Fast Access to Care
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-aim-slate">
                  <p className="flex-auto">
                    Quick appointment booking and early intervention to accelerate your recovery timeline.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-aim-navy">
                  <CheckCircle className="h-5 w-5 flex-none text-aim-teal" aria-hidden="true" />
                  Specialized Practitioners
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-aim-slate">
                  <p className="flex-auto">
                    Expert physiotherapists with specialized training in work injuries, MVA, and sports rehabilitation.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-aim-navy">
                  <CheckCircle className="h-5 w-5 flex-none text-aim-teal" aria-hidden="true" />
                  Outcome-Focused Approach
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-aim-slate">
                  <p className="flex-auto">
                    Clear goals, measurable progress, and accountability every step of your recovery journey.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-aim-navy">
                  <CheckCircle className="h-5 w-5 flex-none text-aim-teal" aria-hidden="true" />
                  Convenient Locations
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-aim-slate">
                  <p className="flex-auto">
                    Multiple clinic locations across Alberta with flexible scheduling to fit your life.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Ready to Start Your Recovery?
            </h2>
            <p className="mt-4 text-lg text-aim-slate">
              Book your assessment today or speak with our team to find the right program for you.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-aim-cta-primary hover:bg-aim-cta-primary/90 text-white"
              >
                <Link href="/book">Book Appointment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-aim-navy text-aim-navy hover:bg-aim-steel-blue"
              >
                <Link href="tel:+17802508188">Call (780) 250-8188</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LazyChatWidget />
    </>
  );
}
