import Link from 'next/link';
import { Briefcase, Car, Trophy, Heart, Building2, Shield, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonaCTACard } from '@/components/cta/persona-cta-card';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { PageTracker } from '@/components/providers/page-tracker';
import { ReviewBlock } from '@/components/reviews/review-block';
import { ReviewSchema } from '@/components/reviews/review-schema';
import { SiteImage, PhotoBand } from '@/components/media/site-image';
import { BANDS, image } from '@/lib/media';
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

const WHY_AIM = [
  {
    title: 'Evidence-informed treatment',
    body: 'Current research combined with a personalised plan, reviewed as your function changes.',
  },
  {
    title: 'Direct billing for WCB and MVA',
    body: 'We bill WCB and auto insurers directly for covered claims, so there is no upfront payment.',
  },
  {
    title: 'Early access to care',
    body: 'Most patients are offered an initial assessment within 24–48 hours of contacting us.',
  },
  {
    title: 'Continuing education',
    body: 'Our physiotherapists complete ongoing training in work injury, MVA and sport rehabilitation.',
  },
  {
    title: 'Measured progress',
    body: 'Goals are set with you and reviewed against objective functional measures, not just how you feel.',
  },
  {
    title: 'Multiple Alberta locations',
    body: 'Clinics across Edmonton and Alberta with scheduling that fits around work and family.',
  },
];

export default async function Home() {
  const featuredReviews = await getFeaturedReviews();
  return (
    <>
      <ReviewSchema reviews={featuredReviews} />
      <PageTracker pageTitle="Home - Alberta Injury Management" />

      {/* Hero: copy left, photograph right. Only the hero image is priority —
          it is the LCP element on the highest-traffic route. */}
      <section className="relative overflow-hidden bg-gradient-to-b from-aim-steel-blue to-white pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div
          className="pointer-events-none absolute -right-24 top-0 hidden h-full w-1/2 bg-[radial-gradient(60%_60%_at_70%_35%,rgba(47,164,169,0.16),transparent_70%)] lg:block"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-aim-navy/10 bg-white/80 px-4 py-1.5 text-sm font-medium text-aim-navy shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-aim-teal" aria-hidden="true" />
              Physiotherapy &amp; injury management in Alberta
            </div>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-aim-navy sm:text-5xl lg:text-6xl">
              Get Back to What Matters Most
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate sm:text-xl">
              Outcome-based physiotherapy and injury management for work injuries, motor vehicle
              accidents, sport, and daily life — across Edmonton and Alberta.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-aim-cta-primary hover:bg-aim-cta-primary/90 text-white shadow-lg shadow-aim-cta-primary/20"
              >
                <Link href="/book">Book Your Assessment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-aim-navy/25 bg-white/70 text-aim-navy hover:bg-white"
              >
                <Link href="/get-care" className="flex items-center gap-2">
                  How It Works <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-aim-slate/80">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-aim-teal" aria-hidden="true" />
                Direct billing for WCB and MVA claims
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-aim-teal" aria-hidden="true" />
                Most insurance accepted
              </span>
            </div>
          </div>

          <div className="relative">
            <SiteImage
              image={image('assess-hero')}
              ratio="4/5"
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="lg:ml-auto lg:max-w-[520px]"
            />

            <div className="absolute bottom-4 left-4 z-30 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg shadow-aim-navy/25 backdrop-blur">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-sm leading-tight">
                <div className="font-semibold text-aim-navy">4.9/5</div>
                <div className="text-aim-slate/70">67 Google reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white">
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
            <p className="text-sm font-semibold uppercase tracking-wider text-aim-teal">Programs</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Find the Right Care for You
            </h2>
            <p className="mt-4 text-lg text-aim-slate">
              We treat work injuries, motor vehicle accident injuries, sport injuries, and mobility
              concerns for older adults.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PersonaCTACard
              title="Injured at Work"
              description="WCB rehabilitation and return-to-work programs built around your job demands."
              icon={Briefcase}
              ctaText="Start WCB Care"
              ctaHref="/programs/wcb"
              ctaId="homepage-wcb"
              variant="primary"
              image={image('work-card')}
            />
            <PersonaCTACard
              title="Motor Vehicle Accident"
              description="MVA recovery with direct insurance billing, from whiplash to soft tissue injury."
              icon={Car}
              ctaText="Start MVA Recovery"
              ctaHref="/programs/mva"
              ctaId="homepage-mva"
              variant="primary"
              image={image('assess-card')}
            />
            <PersonaCTACard
              title="Athletes & Active Individuals"
              description="Sport rehabilitation and injury prevention built around your training and competition."
              icon={Trophy}
              ctaText="Optimize Performance"
              ctaHref="/programs/athletic"
              ctaId="homepage-athletic"
              variant="primary"
              image={image('assess-detail')}
            />
            <PersonaCTACard
              title="Seniors & Mobility"
              description="Balance training, strength work, and fall prevention to keep you independent."
              icon={Heart}
              ctaText="Improve Mobility"
              ctaHref="/programs/senior"
              ctaId="homepage-senior"
              variant="secondary"
            />
            <PersonaCTACard
              title="Employers"
              description="Early intervention, workplace injury prevention, and return-to-work coordination."
              icon={Building2}
              ctaText="Partner With Us"
              ctaHref="/employers"
              ctaId="homepage-employer"
              variant="secondary"
              image={image('work-detail')}
            />
            <PersonaCTACard
              title="Insurance Providers"
              description="Case management, functional capacity evaluations, and clear outcome reporting."
              icon={Shield}
              ctaText="Learn More"
              ctaHref="/insurers"
              ctaId="homepage-insurer"
              variant="secondary"
              image={image('refer-card')}
            />
          </div>
        </div>
      </section>

      {/* Proof band: one photograph, one factual statement, one action. */}
      <PhotoBand image={BANDS.homeProof} height="16/9" scrim="navy">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
            WCB &amp; return to work
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Rehab that speaks the language of the job site
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            Functional assessment, modified duties, and progress reports that employers and WCB
            case managers can act on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-aim-navy hover:bg-white/90">
              <Link href="/programs/wcb">Explore WCB Rehabilitation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10"
            >
              <Link href="/employers">For Employers</Link>
            </Button>
          </div>
        </div>
      </PhotoBand>

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="relative">
              <SiteImage
                image={BANDS.homeWhy}
                ratio="3/4"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="lg:max-w-[420px]"
              />
              <div className="absolute bottom-6 right-0 hidden max-w-[210px] rounded-2xl bg-aim-navy px-5 py-4 text-white shadow-xl sm:block">
                <div className="text-2xl font-semibold">24–48 hrs</div>
                <div className="mt-1 text-xs leading-relaxed text-white/70">
                  Typical wait for an initial assessment
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-aim-teal">Why AIM</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
                Care that is measured, not assumed
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-aim-slate">
                Every plan starts with an assessment and a goal you can describe in your own words.
              </p>

              <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                {WHY_AIM.map((item) => (
                  <div key={item.title}>
                    <dt className="flex items-start gap-x-3 text-base font-semibold leading-7 text-aim-navy">
                      <CheckCircle className="mt-1 h-5 w-5 flex-none text-aim-teal" aria-hidden="true" />
                      {item.title}
                    </dt>
                    <dd className="mt-2 pl-8 text-sm leading-relaxed text-aim-slate/85">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-aim-steel-blue">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Ready to Start Your Recovery?
            </h2>
            <p className="mt-4 text-lg text-aim-slate">
              Book an assessment, or speak with our team to find the right program for you.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
                className="border-aim-navy/25 bg-white/70 text-aim-navy hover:bg-white"
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
