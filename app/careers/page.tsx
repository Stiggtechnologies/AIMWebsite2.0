import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'Careers at AIM',
  description: 'Join Alberta Injury Management. We\'re hiring physiotherapists, chiropractors, massage therapists, clinic managers, and administrative staff.',
  path: '/careers',
});

export default function CareersPage() {
  return (
    <>
      <HeroBlock
        headline="Careers at Alberta Injury Management"
        subheadline="Join a growing, modern rehabilitation platform where your clinical skills matter and your voice is heard."
        primaryCta={{ label: 'View Open Positions', href: '#open-roles' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact?interest=careers' }}
      />

      <Section heading="Why Work at AIM" subheading="Our culture and commitment to clinicians">
        <Prose>
          <p>
            We're building something different in Alberta's rehabilitation landscape. We combine modern, evidence-based clinical practice with a genuine commitment to our team's growth, autonomy, and job satisfaction.
          </p>
        </Prose>
      </Section>

      <Section heading="Our Culture" muted>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Modern Clinic</h3>
            <p className="text-aim-slate/85">
              We leverage current technology, evidence-based protocols, and modern business practices. No outdated systems or old-school management approaches.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Multidisciplinary Team</h3>
            <p className="text-aim-slate/85">
              Collaborate with physiotherapists, chiropractors, massage therapists, and other specialists. Share knowledge, learn from colleagues, and provide comprehensive patient care.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Clinician-Owned Mentality</h3>
            <p className="text-aim-slate/85">
              Your input matters. We make decisions collaboratively and value clinician perspectives on patient care, operations, and growth.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Growth Trajectory</h3>
            <p className="text-aim-slate/85">
              Join us during an exciting growth phase. Opportunities for professional development, clinical specialization, and leadership roles.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Patient Outcomes Focus</h3>
            <p className="text-aim-slate/85">
              We measure success by patient outcomes, not just productivity metrics. You have time to provide quality care and see results.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Work-Life Balance</h3>
            <p className="text-aim-slate/85">
              Reasonable schedules, manageable caseloads, and genuine support for your wellbeing. We believe happy clinicians provide better care.
            </p>
          </div>
        </div>
      </Section>

      <Section heading="We're Hiring" subheading="Join our growing team" center id="open-roles">
        <FeatureList
          items={[
            'Physiotherapists (entry-level to experienced)',
            'Chiropractors',
            'Registered Massage Therapists',
            'Clinic Managers',
            'Administrative & Front Desk Staff',
          ]}
          columns={1}
        />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact?interest=careers" className="inline-flex rounded-lg bg-aim-teal px-6 py-3 font-semibold text-white hover:bg-aim-teal/90">
            Submit Your Resume →
          </Link>
        </div>
      </Section>

      <Section heading="What We Offer" muted>
        <Prose>
          <p>
            <strong>Competitive Compensation:</strong> Salaries and benefits competitive with Alberta market standards. Physio and RMT positions include performance bonuses based on outcomes.
          </p>
          <p>
            <strong>Professional Development:</strong> Support for continuing education, certifications, and specialization. Budget allocated for courses and conferences.
          </p>
          <p>
            <strong>Flexible Scheduling:</strong> We work with you on schedules that suit your life. Options for part-time, full-time, and flexible arrangements.
          </p>
          <p>
            <strong>Modern Equipment:</strong> Access to current rehabilitation equipment, exercise facilities, and technology.
          </p>
          <p>
            <strong>Team Support:</strong> Collegial work environment where clinicians support each other and collaborate on complex cases.
          </p>
        </Prose>
      </Section>

      <Section heading="Apply Today" subheading="Ready to join the AIM team?" center>
        <Prose>
          <p>
            We review applications on a rolling basis and move quickly in our hiring process. Send your resume, cover letter, and any relevant credentials to careers@albertainjurymanagement.ca, or use our online application form.
          </p>
          <p>
            Questions about a specific role or the application process? Contact us—we're happy to discuss opportunities.
          </p>
        </Prose>
      </Section>

      <CtaStrip
        headline="Ready to Join Our Team?"
        subheadline="Submit your application and let's talk about your next career move."
        primaryCta={{ label: 'Apply Now', href: '/contact?interest=careers' }}
        secondaryCta={{ label: 'Learn More', href: '/contact' }}
      />
    </>
  );
}
