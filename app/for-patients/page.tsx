import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'For Patients',
  description: 'Patient resources at Alberta Injury Management. Learn what to expect, direct billing options, WCB support, MVA rehabilitation, and more.',
  path: '/for-patients',
});

export default function PatientsPage() {
  return (
    <>
      <HeroBlock
        headline="Patient Care & Support at AIM"
        subheadline="We're here to guide you through every step of your recovery. From your first appointment to returning to the activities you love."
        primaryCta={{ label: 'Book Your Appointment', href: '/book' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />

      <Section heading="Getting Started" subheading="Everything you need to know before your first visit" muted>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-aim-navy">New to AIM?</h3>
            <p className="mb-4 text-aim-slate/85">
              Our comprehensive intake process ensures we understand your condition, goals, and any specific needs before you arrive. We'll prepare your treatment plan ahead of time.
            </p>
            <Link href="/for-patients/new-patient-information" className="inline-flex font-semibold text-aim-teal hover:underline">
              View New Patient Checklist →
            </Link>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold text-aim-navy">What to Expect</h3>
            <p className="mb-4 text-aim-slate/85">
              Our initial assessment is thorough and personalized. We evaluate your condition, discuss your recovery goals, and design a treatment plan tailored to you.
            </p>
            <Link href="/for-patients/what-to-expect" className="inline-flex font-semibold text-aim-teal hover:underline">
              Learn More →
            </Link>
          </div>
        </div>
      </Section>

      <Section heading="Billing & Insurance" subheading="We accept direct billing with most major insurers" center>
        <Prose>
          <p>
            Direct billing simplifies your experience. We submit claims directly to your insurance provider, and you typically only pay your deductible or co-pay at your appointment.
          </p>
          <p>
            We work with Alberta Blue Cross, Canada Life, Green Shield, Manulife, Sun Life, and many other major carriers.
          </p>
        </Prose>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/for-patients/direct-billing" className="inline-flex rounded-lg bg-aim-teal/10 px-6 py-3 font-semibold text-aim-teal hover:bg-aim-teal/20">
            Direct Billing Details →
          </Link>
        </div>
      </Section>

      <Section heading="WCB & MVA Coverage" muted>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">WCB Claims</h3>
            <p className="mb-4 text-aim-slate/85">
              We specialize in WorkSafeBC rehabilitation and return-to-work support. We coordinate directly with your employer and insurance provider.
            </p>
            <Link href="/for-patients/wcb-claims" className="text-aim-teal hover:underline font-semibold">
              WCB Information →
            </Link>
          </div>
          <div className="rounded-xl bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Motor Vehicle Accidents</h3>
            <p className="mb-4 text-aim-slate/85">
              Alberta Section B coverage supports your MVA injury recovery. We guide you through the claims process and provide comprehensive rehabilitation.
            </p>
            <Link href="/for-patients/motor-vehicle-accidents" className="text-aim-teal hover:underline font-semibold">
              MVA Information →
            </Link>
          </div>
        </div>
      </Section>

      <Section heading="Common Questions" subheading="Answers to questions our patients ask most often" center>
        <Prose>
          <p>
            How do referrals work? What if I don't have insurance? Can I cancel my appointment? We have answers to these and many more questions.
          </p>
        </Prose>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/for-patients/faq" className="inline-flex rounded-lg bg-aim-teal/10 px-6 py-3 font-semibold text-aim-teal hover:bg-aim-teal/20">
            View Full FAQ →
          </Link>
        </div>
      </Section>

      <Section heading="Quick Links" muted>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/for-patients/what-to-expect" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">What to Expect</h4>
            <p className="mt-1 text-sm text-aim-slate/70">Initial assessment & treatment planning</p>
          </Link>
          <Link href="/for-patients/direct-billing" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">Direct Billing</h4>
            <p className="mt-1 text-sm text-aim-slate/70">Insurance coverage & accepted providers</p>
          </Link>
          <Link href="/for-patients/new-patient-information" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">New Patient Info</h4>
            <p className="mt-1 text-sm text-aim-slate/70">What to bring & how to prepare</p>
          </Link>
          <Link href="/for-patients/wcb-claims" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">WCB Support</h4>
            <p className="mt-1 text-sm text-aim-slate/70">WorkSafeBC rehabilitation & coordination</p>
          </Link>
          <Link href="/for-patients/motor-vehicle-accidents" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">MVA Rehab</h4>
            <p className="mt-1 text-sm text-aim-slate/70">Section B coverage & injury recovery</p>
          </Link>
          <Link href="/for-patients/faq" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">FAQ</h4>
            <p className="mt-1 text-sm text-aim-slate/70">Answers to common questions</p>
          </Link>
        </div>
      </Section>

      <CtaStrip
        headline="Ready to Start Your Recovery?"
        subheadline="Book your initial assessment today. Most appointments available within 24-48 hours."
        primaryCta={{ label: 'Book Now', href: '/book' }}
        secondaryCta={{ label: 'Call Us', href: 'tel:+17802508188' }}
      />
    </>
  );
}
