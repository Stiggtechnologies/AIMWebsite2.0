import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import { PartnerInquiryForm } from '@/components/partners/partner-inquiry-form';

export const metadata = buildMetadata({
  title: 'Workplace Injury & Return-to-Work Services for Alberta Employers',
  description: 'Rapid-access injury rehabilitation, return-to-work coordination, onsite services and remote employer support across Alberta.',
  path: '/for-employers',
});

const footprint = [
  {
    title: 'Clinic-based care',
    detail: 'Physiotherapy, chiropractic care and clinically indicated services at AIM’s Edmonton clinic for workers in Edmonton and surrounding communities.',
  },
  {
    title: 'Greater Edmonton onsite',
    detail: 'Workplace education, ergonomic support and agreed onsite services in Edmonton, Nisku/Leduc, Sherwood Park, Beaumont and St. Albert.',
  },
  {
    title: 'Alberta-wide support',
    detail: 'Remote return-to-work coordination and manager education across Alberta, with onsite delivery elsewhere when engagement size and travel are practical.',
  },
];

export default function EmployersPage() {
  return (
    <>
      <HeroBlock
        eyebrow="For employers, safety teams and disability managers"
        headline="Keep injured workers connected to safe, productive work"
        subheadline="A practical Alberta-wide employer pathway combining Edmonton clinical care, regional onsite support and remote return-to-work coordination."
        primaryCta={{ label: 'Discuss an Employer Program', href: '#partner-inquiry' }}
        secondaryCta={{ label: 'Call (780) 250-8188', href: 'tel:+17802508188' }}
        image={{
          src: '/partners/employer-return-to-work-hero.webp',
          alt: 'Industrial worker, safety manager and rehabilitation clinician reviewing a return-to-work plan',
          priority: true,
        }}
      />

      <Section
        heading="One employer relationship, the right delivery model"
        subheading="The program footprint expands without overpromising travel or clinical availability"
        center
      >
        <div className="grid gap-5 md:grid-cols-3">
          {footprint.map((item) => (
            <article key={item.title} className="rounded-2xl border border-aim-divider-gray/60 bg-white p-6 text-left shadow-sm">
              <h3 className="text-lg font-semibold text-aim-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-aim-slate/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section heading="The AIM Rapid Recovery & Return-to-Work pathway" muted>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            ['Rapid access', 'Priority assessment targets can be established with the employer, subject to clinical capacity and the appropriate payer or WCB process.'],
            ['Functional communication', 'With appropriate authority or consent, stakeholders receive practical information about abilities, restrictions and next steps—not unnecessary clinical details.'],
            ['Modified-work support', 'Clinicians can support suitable, progressive duties based on the worker’s presentation, job demands and applicable program requirements.'],
            ['WCB coordination', 'AIM supports Alberta WCB reporting, treatment and return-to-work workflows within the provider’s role and current WCB requirements.'],
            ['Onsite prevention', 'Paid ergonomic, job-demand and workforce education services can be scoped for the organization and delivered where practical.'],
            ['Measured service', 'AIM OS tracks inquiry source, response, booking and attendance. Practice Perfect confirms visits and collected revenue.'],
          ].map(([title, detail]) => (
            <article key={title} className="rounded-xl border border-aim-divider-gray/50 bg-white p-6">
              <h3 className="text-lg font-semibold text-aim-navy">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-aim-slate/80">{detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section heading="A straightforward operating workflow" subheading="Built for HR, safety and WCB coordinators">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            ['1', 'Set up', 'Agree on contacts, service area, payer processes and response expectations.'],
            ['2', 'Refer', 'The worker uses the approved clinic pathway; private health information is not sent through this public form.'],
            ['3', 'Coordinate', 'AIM provides authorized functional updates and supports an appropriate return-to-work plan.'],
            ['4', 'Review', 'The employer receives aggregate service measures without patient-level health information.'],
          ].map(([number, title, detail]) => (
            <article key={number} className="rounded-xl bg-aim-steel-blue/55 p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-aim-navy font-bold text-white">{number}</div>
              <h3 className="mt-4 font-semibold text-aim-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-aim-slate/80">{detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section heading="What AIM measures" muted>
        <FeatureList
          items={[
            'Time from inquiry or referral to first contact',
            'Booked and attended first appointments',
            'Service line and payer pathway',
            'No-show and cancellation rate',
            'Collected revenue and accounts-receivable age',
            'Return-to-work milestones reported only in appropriate aggregate or authorized form',
          ]}
          columns={2}
        />
        <Prose>
          <p>
            AIM does not promise a particular recovery date, claim result or premium reduction. The program is designed to improve access, coordination and measurement while preserving clinical independence and worker choice.
          </p>
        </Prose>
      </Section>

      <Section
        id="partner-inquiry"
        heading="Build the right employer pathway"
        subheading="Start with the organization—not an individual worker’s medical information"
      >
        <div className="mx-auto max-w-3xl">
          <PartnerInquiryForm category="employer" />
        </div>
      </Section>

      <CtaStrip
        headline="A workplace injury should not become an administrative maze"
        subheadline="Call AIM to discuss rapid access, return-to-work coordination or a regional employer program."
        primaryCta={{ label: 'Call (780) 250-8188', href: 'tel:+17802508188' }}
        secondaryCta={{ label: 'Review WCB Services', href: '/services/wcb-rehabilitation' }}
      />
    </>
  );
}
