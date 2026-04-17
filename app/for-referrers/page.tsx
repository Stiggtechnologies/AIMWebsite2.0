import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'For Physicians & Referrers',
  description: 'Referral partners at Alberta Injury Management. For family physicians, specialists, nurse practitioners, chiropractors, and RMTs.',
  path: '/for-referrers',
});

export default function ReferrersPage() {
  return (
    <>
      <HeroBlock
        headline="For Physicians & Healthcare Referrers"
        subheadline="Partner with AIM for specialized rehabilitation. We provide expert assessment, detailed reporting, and direct patient booking."
        primaryCta={{ label: 'Submit a Referral', href: '/contact?interest=referral' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />

      <Section heading="Who We Work With" subheading="Healthcare providers across Alberta">
        <FeatureList
          items={[
            'Family physicians',
            'Orthopedic specialists',
            'Neurologists',
            'Nurse practitioners',
            'Chiropractors',
            'Registered massage therapists',
            'Occupational therapists',
            'Other allied health professionals',
          ]}
          columns={2}
        />
      </Section>

      <Section heading="How AIM Helps Your Patients" muted>
        <Prose>
          <p>
            <strong>Specialty Rehabilitation:</strong> Our experienced clinicians provide evidence-based rehabilitation for complex musculoskeletal and neurological conditions. We specialize in post-surgical recovery, sports injuries, concussion management, and chronic pain.
          </p>
          <p>
            <strong>Detailed Clinical Reporting:</strong> We provide comprehensive progress reports and final outcome summaries. Reports include objective measurements, functional improvements, and discharge recommendations.
          </p>
          <p>
            <strong>Direct Patient Booking:</strong> Patients can book directly online without navigating referral paperwork. We verify referral requirements based on insurance.
          </p>
          <p>
            <strong>Seamless Communication:</strong> We communicate with you throughout the patient's care and provide updates on progress, any concerns, or changes to the treatment plan.
          </p>
        </Prose>
      </Section>

      <Section heading="Our Clinical Expertise" subheading="Services and conditions we treat" center>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-aim-divider-gray/40 p-5 bg-white">
            <h4 className="mb-2 font-semibold text-aim-navy">Core Services</h4>
            <ul className="space-y-1 text-sm text-aim-slate/85">
              <li>• Physiotherapy</li>
              <li>• Massage therapy</li>
              <li>• Chiropractic care</li>
              <li>• Functional capacity evaluations</li>
              <li>• Work conditioning</li>
            </ul>
          </div>
          <div className="rounded-lg border border-aim-divider-gray/40 p-5 bg-white">
            <h4 className="mb-2 font-semibold text-aim-navy">Specializations</h4>
            <ul className="space-y-1 text-sm text-aim-slate/85">
              <li>• Vestibular rehabilitation</li>
              <li>• Pelvic floor physiotherapy</li>
              <li>• Sports injury recovery</li>
              <li>• Post-surgical rehabilitation</li>
              <li>• Return-to-work programs</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section heading="The Referral Process" muted>
        <Prose>
          <p>
            <strong>Easy Submission:</strong> Referrals can be submitted via our online form, fax, or email. Provide your patient's details, diagnosis, and any specific treatment goals.
          </p>
          <p>
            <strong>Quick Patient Booking:</strong> Once we receive your referral, we contact your patient to schedule an appointment. Most patients are booked within 1-2 business days.
          </p>
          <p>
            <strong>Confirmation:</strong> We confirm receipt of your referral and notify you once your patient has been scheduled.
          </p>
          <p>
            <strong>Regular Updates:</strong> We provide progress reports at key milestones and discharge summaries with outcome data.
          </p>
        </Prose>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact?interest=referral" className="inline-flex rounded-lg bg-aim-teal px-6 py-3 font-semibold text-white hover:bg-aim-teal/90">
            Submit a Referral →
          </Link>
        </div>
      </Section>

      <Section heading="Why Refer to AIM" subheading="Benefits for you and your patients" center>
        <FeatureList
          items={[
            'Expert clinicians with advanced training in rehabilitation',
            'Comprehensive assessment and detailed clinical reporting',
            'Patient-centered approach with clear communication',
            'Evidence-based treatment protocols',
            'Experienced WCB and MVA claim coordination',
            'Direct insurance billing minimizing patient barriers',
            'Commitment to continuity of care and outcomes',
            'Accessible locations with extended hours',
          ]}
          columns={2}
        />
      </Section>

      <CtaStrip
        headline="Ready to Refer Your Patients?"
        subheadline="Submit a referral or contact us with questions about our services."
        primaryCta={{ label: 'Submit Referral', href: '/contact?interest=referral' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
