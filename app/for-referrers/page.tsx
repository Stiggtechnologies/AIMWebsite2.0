import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import { PartnerInquiryForm } from '@/components/partners/partner-inquiry-form';

export const metadata = buildMetadata({
  title: 'For Physicians & Healthcare Referrers',
  description: 'A clear referral and communication pathway for Alberta physicians, nurse practitioners and allied healthcare providers.',
  path: '/for-referrers',
});

export default function ReferrersPage() {
  return (
    <>
      <HeroBlock
        eyebrow="For physicians and healthcare referrers"
        headline="A referral pathway that is easy for your practice and clear for your patient"
        subheadline="Timely access, accurately identified providers and concise care communication—with patient consent and no referral inducements."
        primaryCta={{ label: 'Establish a Referral Pathway', href: '#partner-inquiry' }}
        secondaryCta={{ label: 'Call (780) 250-8188', href: 'tel:+17802508188' }}
        image={{
          src: '/partners/healthcare-referrers-hero.webp',
          alt: 'Physician and rehabilitation clinician reviewing a referral document in a clinic',
          priority: true,
        }}
      />

      <Section heading="Built around the information referrers actually need" center>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['Access', 'A clear contact route, current service information and appointment timing that is communicated honestly.'],
            ['Clinical fit', 'Each service and provider type is identified accurately so the patient is routed to an appropriate regulated or non-regulated practitioner.'],
            ['Communication', 'Receipt, progress and discharge communication can be coordinated according to clinical need, consent and the referrer’s preference.'],
          ].map(([title, detail]) => (
            <article key={title} className="rounded-2xl border border-aim-divider-gray/60 bg-white p-6 text-left shadow-sm">
              <h3 className="text-lg font-semibold text-aim-navy">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-aim-slate/80">{detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section heading="Referral-appropriate services" muted>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6">
            <h3 className="text-lg font-semibold text-aim-navy">Primary rehabilitation pathways</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-aim-slate/85">
              <li>• Physiotherapy</li>
              <li>• Chiropractic care</li>
              <li>• WCB and return-to-work rehabilitation</li>
              <li>• Motor vehicle accident rehabilitation</li>
              <li>• Post-surgical, vestibular, concussion and pelvic health pathways when provider availability and scope apply</li>
            </ul>
          </div>
          <div className="rounded-xl bg-white p-6">
            <h3 className="text-lg font-semibold text-aim-navy">Complementary services</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-aim-slate/85">
              <li>• Registered massage therapy</li>
              <li>• Manual osteopathic therapy, clearly identified by practitioner credential</li>
              <li>• Orthotics following an appropriate assessment and coverage check</li>
              <li>• Functional and work-related assessments when the service is available and clinically appropriate</li>
            </ul>
          </div>
        </div>
        <Prose>
          <p>
            AIM does not represent a practitioner as a specialist unless the applicable regulator authorizes that designation. Manual osteopathic therapy is not presented as physician-provided osteopathic medicine.
          </p>
        </Prose>
      </Section>

      <Section heading="The referral communication loop" subheading="Four clear handoffs">
        <FeatureList
          items={[
            'Practice-level referral preferences are documented before rollout',
            'The patient is contacted using an approved clinic workflow',
            'Clinically relevant updates are shared only with appropriate authority or consent',
            'A concise discharge or transition summary closes the loop when indicated',
          ]}
          columns={2}
        />
        <div className="mt-8 rounded-xl border border-aim-teal/25 bg-aim-steel-blue/50 p-5 text-sm leading-6 text-aim-slate">
          Patients can generally book physiotherapy directly in Alberta, although an insurer, employer program or other payer may have its own referral requirements. <Link href="/resources/referrals-in-alberta" className="font-semibold text-aim-teal hover:underline">Read AIM’s patient referral guidance.</Link>
        </div>
      </Section>

      <Section heading="Measured without creating another system" muted>
        <Prose>
          <p>
            Website inquiries enter AIM OS’s existing lead queue with a healthcare-referral classification and source attribution. Practice Perfect remains the operational record used to confirm scheduled and attended care. No diagnosis or clinical record is sent to advertising platforms.
          </p>
        </Prose>
      </Section>

      <Section
        id="partner-inquiry"
        heading="Set up a referral relationship"
        subheading="This public form is for practice-level coordination only—not patient information"
      >
        <div className="mx-auto max-w-3xl">
          <PartnerInquiryForm category="healthcare" />
        </div>
      </Section>

      <CtaStrip
        headline="Need to discuss an individual patient?"
        subheadline="Call AIM so the team can direct you to the appropriate secure clinical workflow."
        primaryCta={{ label: 'Call (780) 250-8188', href: 'tel:+17802508188' }}
        secondaryCta={{ label: 'View Clinical Services', href: '/get-care' }}
      />
    </>
  );
}
