import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';

export const metadata = buildMetadata({
  title: 'For Lawyers & Legal Referrals',
  description: 'Medical documentation and rehabilitation services for lawyers. MVA claims, injury assessments, functional capacity evaluations, and expert rehabilitation coordination.',
  path: '/for-lawyers',
});

export default function LawyersPage() {
  return (
    <>
      <HeroBlock
        headline="Legal Referrals & Medical Documentation"
        subheadline="Comprehensive rehabilitation and expert documentation for MVA and personal injury claims."
        primaryCta={{ label: 'Refer a Client', href: '/contact?interest=legal' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />

      <Section heading="Motor Vehicle Accident Rehabilitation" subheading="Section B coverage and comprehensive injury recovery">
        <Prose>
          <p>
            We specialize in MVA rehabilitation under Alberta's Section B coverage. We understand the legal and medical complexities of accident claims and provide detailed documentation to support your case.
          </p>
          <p>
            Our clinicians assess and treat common MVA injuries including whiplash, soft tissue injuries, concussions, and post-accident headaches. We document injury severity, treatment progress, and functional outcomes.
          </p>
        </Prose>
      </Section>

      <Section heading="Injury Assessment & Documentation" muted center>
        <Prose>
          <p>
            <strong>Comprehensive Initial Assessment:</strong> Detailed evaluation of injury severity, functional limitations, and impact on activities of daily living. Assessment includes objective testing and measurements.
          </p>
          <p>
            <strong>Ongoing Documentation:</strong> Regular progress notes document treatment provided, clinical findings, and functional improvements. Clear objective measures track recovery.
          </p>
          <p>
            <strong>Expert Reports:</strong> We provide detailed written reports including diagnosis, treatment provided, outcomes, and prognosis. Reports are suitable for legal proceedings.
          </p>
        </Prose>
      </Section>

      <Section heading="Functional Capacity Evaluations" subheading="Objective assessment of work and activity capacity">
        <Prose>
          <p>
            Functional Capacity Evaluations (FCEs) assess a client's physical abilities in relation to job demands or desired activities. FCEs are valuable for establishing injury impact and recovery trajectory.
          </p>
          <p>
            Our FCEs are comprehensive, objective, and defensible in legal proceedings. We measure strength, endurance, mobility, and functional capacity across multiple activities.
          </p>
        </Prose>
      </Section>

      <Section heading="Coordinated Rehabilitation Teams" muted center>
        <Prose>
          <p>
            For complex cases, we coordinate care with physicians, specialists, and other healthcare providers. This ensures comprehensive treatment and facilitates clear communication about the client's recovery and prognosis.
          </p>
        </Prose>
      </Section>

      <Section heading="Alberta Section B & Insurance Navigation" subheading="Expert guidance through the claims process">
        <FeatureList
          items={[
            'Section B coverage explanation and patient education',
            'Direct billing with insurance providers',
            'Coverage verification and benefit tracking',
            'Claims coordination and dispute resolution support',
            'Documentation of injuries and treatment outcomes',
            'Progress reporting throughout rehabilitation',
            'Expert guidance on reasonable recovery timelines',
          ]}
          columns={1}
        />
      </Section>

      <Section heading="Why Refer to AIM" muted center>
        <Prose>
          <p>
            <strong>Expert Clinical Team:</strong> Experienced clinicians skilled in MVA injury assessment and rehabilitation.
          </p>
          <p>
            <strong>Detailed Documentation:</strong> Comprehensive progress notes, reports, and expert opinions suitable for legal proceedings.
          </p>
          <p>
            <strong>Objective Measurements:</strong> Standardized testing and functional assessments provide defensible outcome data.
          </p>
          <p>
            <strong>Clear Communication:</strong> We explain medical findings and prognosis in language accessible to legal professionals and clients.
          </p>
          <p>
            <strong>Timely Reporting:</strong> We provide reports and documentation in a timely manner to support your case needs.
          </p>
        </Prose>
      </Section>

      <CtaStrip
        headline="Refer Your Clients for Rehabilitation & Documentation"
        subheadline="Let us help establish injury severity, treatment outcomes, and functional recovery."
        primaryCta={{ label: 'Refer a Client', href: '/contact?interest=legal' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />
    </>
  );
}
