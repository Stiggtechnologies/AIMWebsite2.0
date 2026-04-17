import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';

export const metadata = buildMetadata({
  title: 'Partnerships & Acquisition Inquiries',
  description: 'Partnership opportunities with AIM. Clinic acquisition, employer partnerships, academic collaboration, and technology partnerships.',
  path: '/partnerships',
});

export default function PartnershipsPage() {
  return (
    <>
      <HeroBlock
        headline="Partnerships & Growth Opportunities"
        subheadline="Join us in building Alberta's leading integrated rehabilitation platform."
        primaryCta={{ label: 'Explore Partnership', href: '/contact?interest=partnerships' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />

      <Section heading="About AIM" subheading="A growing Alberta rehabilitation platform">
        <Prose>
          <p>
            Alberta Injury Management is a modern, multidisciplinary rehabilitation platform serving patients across Alberta. We combine evidence-based clinical care with innovative service delivery and a commitment to clinician excellence.
          </p>
          <p>
            We're expanding strategically and seeking partners who share our commitment to patient outcomes, workplace safety, and healthcare accessibility.
          </p>
        </Prose>
      </Section>

      <Section heading="Partnership Opportunities" muted>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Clinic Acquisition</h3>
            <p className="mb-4 text-aim-slate/85">
              Are you running an independent physiotherapy or rehabilitation clinic? We're interested in acquiring established clinics with strong clinical teams and patient bases.
            </p>
            <p className="text-sm text-aim-slate/70">
              We preserve clinical autonomy while providing operational support, administrative infrastructure, and growth opportunities.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Employer Partnerships</h3>
            <p className="mb-4 text-aim-slate/85">
              Large employers seeking preferred provider relationships for workplace injury management and employee wellness.
            </p>
            <p className="text-sm text-aim-slate/70">
              We offer tailored injury management solutions, ergonomic assessments, return-to-work programs, and premium reporting.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Academic & Research Collaboration</h3>
            <p className="mb-4 text-aim-slate/85">
              Universities and research institutions interested in rehabilitation research, student training, and clinical innovation.
            </p>
            <p className="text-sm text-aim-slate/70">
              We welcome collaborative research projects and clinical training opportunities.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Technology & Vendor Partnerships</h3>
            <p className="mb-4 text-aim-slate/85">
              Software, telehealth, and healthcare technology providers seeking integration with a growing clinical platform.
            </p>
            <p className="text-sm text-aim-slate/70">
              We're building modern technology infrastructure and value partnerships with quality vendors.
            </p>
          </div>
        </div>
      </Section>

      <Section heading="Why Partner With AIM" subheading="What makes us an attractive partner" center>
        <FeatureList
          items={[
            'Growing market presence across Alberta',
            'Experienced clinical leadership and multidisciplinary team',
            'Strong relationships with employers, referrers, and payers',
            'Commitment to clinical excellence and innovation',
            'Modern infrastructure and technology platform',
            'Clinician-owned mentality and autonomy',
            'Strategic growth trajectory and expansion plans',
            'Established reputation in WCB and MVA rehabilitation',
          ]}
          columns={2}
        />
      </Section>

      <Section heading="Our Approach to Partnership" muted>
        <Prose>
          <p>
            <strong>Transparency:</strong> We have open conversations about expectations, terms, and mutual value.
          </p>
          <p>
            <strong>Collaboration:</strong> Partnership success depends on alignment and shared commitment to goals.
          </p>
          <p>
            <strong>Flexibility:</strong> We structure partnerships to meet unique needs and circumstances.
          </p>
          <p>
            <strong>Long-term Thinking:</strong> We make partnership decisions based on long-term success, not short-term gains.
          </p>
        </Prose>
      </Section>

      <CtaStrip
        headline="Let's Explore Partnership Opportunities"
        subheadline="Contact us to discuss how we can work together to expand quality rehabilitation services in Alberta."
        primaryCta={{ label: 'Start Conversation', href: '/contact?interest=partnerships' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
