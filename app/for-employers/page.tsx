import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';

export const metadata = buildMetadata({
  title: 'For Employers',
  description: 'Workplace injury management and rehabilitation services for Alberta employers. Injury triage, ergonomic assessments, return-to-work programs, and more.',
  path: '/for-employers',
});

export default function EmployersPage() {
  return (
    <>
      <HeroBlock
        headline="Workplace Injury Management for Alberta Employers"
        subheadline="Partner with AIM to reduce injury costs, improve worker safety, and accelerate return-to-work outcomes."
        primaryCta={{ label: 'Schedule a Consultation', href: '/contact?interest=employer' }}
        secondaryCta={{ label: 'Learn More', href: '#services' }}
      />

      <Section heading="Who This Is For" subheading="HR leaders, safety managers, and benefits decision-makers" center>
        <Prose>
          <p>
            Whether you're a small business looking to manage occasional workplace injuries or a large organization seeking to reduce workers' compensation costs, AIM provides specialized solutions tailored to your needs.
          </p>
        </Prose>
      </Section>

      <Section heading="How AIM Helps Employers" muted>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Workplace Injury Triage</h3>
            <p className="text-aim-slate/85">
              Fast, expert assessment of workplace injuries to determine severity, treatment needs, and return-to-work timeline. Early intervention prevents complications and long-term disability.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Ergonomic Assessments</h3>
            <p className="text-aim-slate/85">
              Evaluate workstations and job tasks to identify injury risks. We recommend modifications and provide staff training to prevent future injuries.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Functional Capacity Evaluations</h3>
            <p className="text-aim-slate/85">
              Comprehensive assessment of worker physical abilities compared to job demands. Essential for return-to-work planning and WCB coordination.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Return-to-Work Programs</h3>
            <p className="text-aim-slate/85">
              Structured rehabilitation with work conditioning and gradual duty progression. We coordinate with workers and WCB to achieve timely, sustainable return-to-work.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Early Intervention</h3>
            <p className="text-aim-slate/85">
              Prompt treatment of workplace injuries reduces severity, prevents chronic problems, and shortens recovery timelines. We prioritize injured workers quickly.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">WCB Coordination</h3>
            <p className="text-aim-slate/85">
              Expert navigation of WorkSafeBC claims. We communicate with WCB and your organization to ensure proper documentation, claim management, and claim resolution.
            </p>
          </div>
        </div>
      </Section>

      <Section heading="Partnership Workflow" subheading="How we work together to achieve your goals" center>
        <Prose>
          <p>
            <strong>Step 1: Assessment</strong> — When a workplace injury occurs, your employee contacts us for rapid assessment and treatment initiation.
          </p>
          <p>
            <strong>Step 2: Coordination</strong> — We communicate with you, the worker, and WCB to ensure alignment on the rehabilitation plan and return-to-work timeline.
          </p>
          <p>
            <strong>Step 3: Treatment & Monitoring</strong> — Specialized treatment is provided with regular progress reporting to all stakeholders.
          </p>
          <p>
            <strong>Step 4: Return-to-Work</strong> — We guide workers through gradual duty progression and work conditioning to achieve sustainable return-to-work.
          </p>
          <p>
            <strong>Step 5: Prevention</strong> — We identify injury risks through ergonomic assessment and provide recommendations to prevent future incidents.
          </p>
        </Prose>
      </Section>

      <Section heading="Key Benefits for Your Organization" muted>
        <FeatureList
          items={[
            'Reduced worker compensation insurance premiums through better injury management',
            'Faster return-to-work timelines and reduced lost-time claims',
            'Improved employee morale and retention through responsive injury care',
            'Expert WCB coordination reducing claim complications',
            'Ergonomic expertise reducing future injury risk',
            'Detailed documentation supporting claims and preventing disputes',
            'Direct communication and transparent reporting',
            'Flexible programs scaled to your organization\'s size and needs',
          ]}
          columns={2}
        />
      </Section>

      <CtaStrip
        headline="Ready to Transform Workplace Injury Management?"
        subheadline="Schedule a consultation to discuss how AIM can help your organization reduce injury costs and support worker recovery."
        primaryCta={{ label: 'Schedule Consultation', href: '/contact?interest=employer' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
