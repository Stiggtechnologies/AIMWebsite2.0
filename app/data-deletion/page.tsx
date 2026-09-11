import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, Prose } from '@/components/blocks/section';

export const metadata = buildMetadata({
  title: 'Data Deletion Instructions',
  description: 'How to request deletion of personal information held by Alberta Injury Management.',
  path: '/data-deletion',
});

export default function DataDeletionPage() {
  return (
    <>
      <HeroBlock
        headline="Data Deletion Instructions"
        subheadline="You can ask Alberta Injury Management to delete personal information associated with a website or social-media inquiry."
      />

      <Section heading="How to request deletion">
        <Prose>
          <p>
            Email <a href="mailto:privacy@albertainjurymanagement.ca">privacy@albertainjurymanagement.ca</a> with
            the subject line <strong>Data deletion request</strong>. Include the name, email address, and telephone
            number used in your inquiry so that we can locate the correct record. Do not include medical details in
            the email.
          </p>
          <p>
            We will verify your identity before deleting information. We will acknowledge the request and explain
            when deletion is complete. Information that must be retained under Alberta health, tax, insurance, or
            other legal requirements will be restricted and retained only for the required period.
          </p>
          <p>
            You may also contact our Privacy Officer by telephone at <a href="tel:+17802508188">(780) 250-8188</a>.
            For more information about how we handle personal information, read our{' '}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </Prose>
      </Section>
    </>
  );
}
