import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import { PartnerInquiryForm } from '@/components/partners/partner-inquiry-form';

export const metadata = buildMetadata({
  title: 'Injury Rehabilitation Referrals for Alberta Law Firms',
  description: 'Patient-centred injury rehabilitation, transparent billing processes and organized clinical-record coordination for Alberta legal referrals.',
  path: '/for-lawyers',
});

export default function LawyersPage() {
  return (
    <>
      <HeroBlock
        eyebrow="For law firms and legal case teams"
        headline="Patient-centred rehabilitation with an organized referral process"
        subheadline="A clear pathway for MVA, workplace and other injury clients—built around clinical independence, transparent administration and timely records."
        primaryCta={{ label: 'Discuss Legal Referrals', href: '#partner-inquiry' }}
        secondaryCta={{ label: 'Call (780) 250-8188', href: 'tel:+17802508188' }}
        image={{
          src: '/partners/legal-referrals-hero.webp',
          alt: 'Rehabilitation clinician and legal professional reviewing a referral process document',
          priority: true,
        }}
      />

      <Section heading="What a legal referral relationship should deliver" center>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['Organized intake', 'Clear payer, authorization and contact workflows reduce avoidable delays before care begins.'],
            ['Independent care', 'Assessment, treatment and documentation remain patient-centred and clinically independent from the legal strategy.'],
            ['Reliable administration', 'Transparent fees, attendance records and secure record-release processes help both the client and the firm know what to expect.'],
          ].map(([title, detail]) => (
            <article key={title} className="rounded-2xl border border-aim-divider-gray/60 bg-white p-6 text-left shadow-sm">
              <h3 className="text-lg font-semibold text-aim-navy">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-aim-slate/80">{detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section heading="Appropriate pathways for injury clients" muted>
        <FeatureList
          items={[
            'Physiotherapy and chiropractic assessment within each provider’s scope',
            'Motor vehicle accident rehabilitation under the applicable Alberta process',
            'WCB rehabilitation and return-to-work support',
            'Concussion and other service pathways when clinical findings, scope and availability support them',
            'Functional assessment information when the requested service is available and appropriate',
            'Orthotics or complementary services only when assessed, indicated and covered or authorized',
          ]}
          columns={2}
        />
        <Prose>
          <p>
            Under Alberta’s automobile injury protocols, physicians, chiropractors and physical therapists are identified as primary healthcare practitioners. Manual osteopathic therapy and orthotics are not presented as automatic protocol benefits; coverage and clinical appropriateness must be confirmed.
          </p>
        </Prose>
      </Section>

      <Section heading="Clear boundaries protect everyone">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-aim-divider-gray/60 bg-white p-6">
            <h3 className="font-semibold text-aim-navy">AIM will</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-aim-slate/85">
              <li>• Document care contemporaneously and objectively</li>
              <li>• Explain fees, payer requirements and record processes</li>
              <li>• Release information through an authorized, secure process</li>
              <li>• Separate treating-provider work from any genuinely independent assessment role</li>
            </ul>
          </div>
          <div className="rounded-xl border border-aim-divider-gray/60 bg-white p-6">
            <h3 className="font-semibold text-aim-navy">AIM will not</h3>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-aim-slate/85">
              <li>• Pay per referral or per file</li>
              <li>• Promise a settlement, prognosis or treatment outcome</li>
              <li>• Shape clinical records to fit a litigation narrative</li>
              <li>• Accept patient or case information through this public organization form</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section heading="Measured in AIM OS and confirmed operationally" muted>
        <Prose>
          <p>
            Firm-level inquiries enter AIM OS’s existing lead queue with a legal-referral classification. Once a client is in the approved clinical workflow, Practice Perfect remains the operational source for appointments, attendance and financial records. Partner reporting is limited to authorized or aggregated information.
          </p>
        </Prose>
      </Section>

      <Section
        id="partner-inquiry"
        heading="Establish a legal referral pathway"
        subheading="Start with firm-level coordination; AIM will provide the secure route for individual client information"
      >
        <div className="mx-auto max-w-3xl">
          <PartnerInquiryForm category="legal" />
        </div>
      </Section>

      <CtaStrip
        headline="Have a time-sensitive client referral?"
        subheadline="Call AIM before transmitting client or medical information so the team can provide the appropriate secure route."
        primaryCta={{ label: 'Call (780) 250-8188', href: 'tel:+17802508188' }}
        secondaryCta={{ label: 'Review MVA Services', href: '/services/mva-rehabilitation' }}
      />
    </>
  );
}
