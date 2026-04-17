import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import { FaqSection } from '@/components/blocks/faq-section';

export const metadata = buildMetadata({
  title: 'WCB Rehabilitation & Support',
  description: 'WorkSafeBC rehabilitation services at AIM. WCB-approved clinicians, direct billing, return-to-work support, and functional capacity evaluations.',
  path: '/for-patients/wcb-claims',
});

const wcbFaqs = [
  {
    q: 'Do I need a referral from WCB to start treatment?',
    a: 'In most cases, your WCB claim must be accepted before we can begin treatment. Once accepted, you can book with us. If you have a claim number, we can start the intake process.',
  },
  {
    q: 'How do you coordinate with WCB and my employer?',
    a: 'We communicate directly with WCB and your employer to ensure alignment on your rehabilitation plan and return-to-work timeline. We provide regular progress reports and participate in coordination meetings as needed.',
  },
  {
    q: 'What is a Functional Capacity Evaluation (FCE)?',
    a: 'An FCE is a comprehensive assessment of your physical abilities in relation to work demands. We evaluate your capacity for lifting, carrying, pushing, pulling, bending, and other work-related activities. This helps guide your return-to-work plan.',
  },
  {
    q: 'How long does WCB rehabilitation typically take?',
    a: 'Duration depends on your injury severity and recovery rate. Most acute injuries are rehabilitated over 4-12 weeks, while complex cases may take longer. We work with WCB to adjust timelines based on your progress.',
  },
  {
    q: "What if my employer has no work available when I'm ready to return?",
    a: 'We work with WCB and your employer on a gradual return-to-work plan. This may include modified duties, part-time hours, or work conditioning programs to prepare you for full duties.',
  },
];

export default function WcbClaimsPage() {
  return (
    <>
      <HeroBlock
        headline="WCB Rehabilitation & Return-to-Work Support"
        subheadline="We're experienced in WorkSafeBC claims and dedicated to helping you safely return to work."
      />

      <Section heading="WCB-Approved Rehabilitation" subheading="Comprehensive treatment and coordination for workplace injuries">
        <Prose>
          <p>
            Alberta Injury Management is an approved WCB provider with clinicians trained in occupational rehabilitation. We specialize in helping injured workers recover and return to meaningful employment.
          </p>
          <p>
            Whether your injury is acute (recent) or chronic (long-standing), we develop individualized rehabilitation plans that focus on your functional recovery and work capacity.
          </p>
        </Prose>
      </Section>

      <Section heading="What We Offer for WCB Patients" muted>
        <FeatureList
          items={[
            'Comprehensive initial assessment and diagnosis',
            'Evidence-based rehabilitation treatment',
            'Work conditioning and work hardening programs',
            'Functional capacity evaluations (FCE)',
            'Direct coordination with WCB and your employer',
            'Return-to-work planning and support',
            'Progress reporting and documentation',
            'Modified duty guidance and activity modification',
          ]}
        />
      </Section>

      <Section heading="What to Bring to Your First Appointment" subheading="Please have the following information ready">
        <FeatureList
          items={[
            'Your WCB claim number',
            'Date of injury',
            'Details about how the injury occurred',
            'List of any medical treatment received to date',
            'Current medications',
            'Imaging reports (X-rays, MRI, CT scans if available)',
            'Employer contact information',
            'Your job duties and physical demands',
          ]}
          columns={1}
        />
      </Section>

      <Section heading="Return-to-Work Support" muted>
        <Prose>
          <p>
            <strong>Gradual Return Program:</strong> We work with your employer to create a phased return-to-work plan that progresses from modified duties to full duties as your capacity improves.
          </p>
          <p>
            <strong>Work Conditioning:</strong> Targeted exercises designed to build the specific strength, endurance, and mobility required for your job.
          </p>
          <p>
            <strong>Work Hardening:</strong> Simulated work activities that prepare you for the physical demands of your actual job in a controlled setting.
          </p>
          <p>
            <strong>Functional Capacity Evaluation:</strong> A comprehensive assessment of your physical abilities in relation to your job demands, helping WCB and your employer make informed decisions about your return-to-work timeline.
          </p>
        </Prose>
      </Section>

      <Section heading="Claim Coordination with Your Employer" subheading="We keep everyone informed and aligned" center>
        <Prose>
          <p>
            Clear communication between healthcare, WCB, and the employer is essential for successful return-to-work outcomes. We provide regular progress reports to WCB and participate in coordination meetings.
          </p>
          <p>
            We also provide your employer with modified duty recommendations and communicate any restrictions or precautions related to your recovery.
          </p>
        </Prose>
      </Section>

      <FaqSection heading="WCB Questions" faqs={wcbFaqs} />

      <CtaStrip
        headline="Let's Get You Back to Work"
        subheadline="Book your WCB rehabilitation assessment today and start your journey back to full function."
        primaryCta={{ label: 'Book Now', href: '/book' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
