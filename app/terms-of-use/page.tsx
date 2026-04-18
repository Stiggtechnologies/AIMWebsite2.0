import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'Terms of use for Alberta Injury Management website. Please read our terms carefully.',
  path: '/terms-of-use',
});

export default function TermsOfUsePage() {
  return (
    <>
      <HeroBlock
        headline="Terms of Use"
        subheadline="Please read these terms carefully before using our website and services."
      />

      <Section heading="1. Acceptance of Terms" subheading="By using this website, you agree to these terms">
        <Prose>
          <p>
            By accessing and using the Alberta Injury Management website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our website or services.
          </p>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the website following notification of changes constitutes your acceptance of the updated terms.
          </p>
        </Prose>
      </Section>

      <Section heading="2. Use of Site" muted>
        <Prose>
          <p>
            You agree to use this website for lawful purposes only and in a way that does not infringe on the rights of others or restrict their use and enjoyment of the website. Prohibited behavior includes:
          </p>
          <p>
            Harassing or causing distress or inconvenience to any person; transmitting obscene or offensive content; disrupting the normal flow of dialogue within our website; attempting to gain unauthorized access to our systems; and interfering with the proper functioning of the website.
          </p>
          <p>
            We reserve the right to suspend or terminate your access if you violate these terms.
          </p>
        </Prose>
      </Section>

      <Section heading="3. Medical Disclaimer" center>
        <Prose>
          <p>
            <strong>Important:</strong> The information on this website is for educational and informational purposes only. It does not constitute medical advice, diagnosis, or treatment. The content is not a substitute for professional medical advice from a qualified healthcare provider.
          </p>
          <p>
            Never rely on information from this website as a substitute for professional medical consultation. Always consult with a qualified healthcare provider regarding any health concerns, symptoms, or before starting any new treatment.
          </p>
          <p>
            If you believe you have a medical emergency, please call emergency services (911) or go to the nearest emergency department.
          </p>
        </Prose>
      </Section>

      <Section heading="4. Privacy & Data Protection" muted>
        <Prose>
          <p>
            Your privacy is important to us. We collect and process personal information only as described in our Privacy Policy. By using this website, you consent to our collection and use of personal information as outlined in our Privacy Policy.
          </p>
          <p>
            We are committed to protecting your health information and comply with applicable privacy legislation including the Health Information Act.
          </p>
        </Prose>
      </Section>

      <Section heading="5. Intellectual Property Rights" center>
        <Prose>
          <p>
            All content on this website, including text, graphics, logos, images, audio, and video, is the property of Alberta Injury Management or our content providers and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, transmit, modify, or use any content from this website without our prior written permission, except for your personal, non-commercial use.
          </p>
        </Prose>
      </Section>

      <Section heading="6. Third-Party Links" muted>
        <Prose>
          <p>
            This website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of external websites. Your use of third-party websites is governed by their own terms of use and privacy policies.
          </p>
          <p>
            We do not endorse or warrant any third-party content, products, or services unless explicitly stated.
          </p>
        </Prose>
      </Section>

      <Section heading="7. Disclaimers" center>
        <Prose>
          <p>
            This website is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the website will be error-free, uninterrupted, or free from viruses or other harmful components.
          </p>
          <p>
            We make no representations or warranties regarding the accuracy, completeness, or reliability of any content on this website. Use of this website is at your own risk.
          </p>
        </Prose>
      </Section>

      <Section heading="8. Limitation of Liability" muted>
        <Prose>
          <p>
            To the maximum extent permitted by law, Alberta Injury Management shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or services, regardless of the cause or theory of liability.
          </p>
          <p>
            Our total liability shall not exceed the amount you have paid to us, if any, for services rendered.
          </p>
        </Prose>
      </Section>

      <Section heading="9. Indemnification" center>
        <Prose>
          <p>
            You agree to indemnify and hold harmless Alberta Injury Management, its officers, directors, employees, and agents from any claims, damages, or costs arising from your use of this website or violation of these terms.
          </p>
        </Prose>
      </Section>

      <Section heading="10. Governing Law" muted>
        <Prose>
          <p>
            These Terms of Use are governed by and construed in accordance with the laws of the Province of Alberta, Canada, and the federal laws of Canada applicable therein.
          </p>
          <p>
            You irrevocably consent to the exclusive jurisdiction of the courts of Alberta for any disputes or claims arising from your use of this website.
          </p>
        </Prose>
      </Section>

      <Section heading="11. Changes to Terms" center>
        <Prose>
          <p>
            We reserve the right to update or modify these Terms of Use at any time without prior notice. Changes become effective immediately upon posting to the website.
          </p>
          <p>
            Your continued use of the website following the posting of revised terms means you accept and agree to the changes.
          </p>
        </Prose>
      </Section>

      <Section heading="12. Contact Information" muted center>
        <Prose>
          <p>
            If you have questions about these Terms of Use or need to report a concern, please contact us at:
          </p>
          <p>
            <strong>Alberta Injury Management</strong><br />
            Phone: (780) 250-8188<br />
            Email: info@albertainjurymanagement.ca
          </p>
        </Prose>
      </Section>

      <CtaStrip
        headline="Questions About Our Terms?"
        subheadline="Get in touch with our team if you have any questions about these terms of use."
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
        secondaryCta={{ label: 'Privacy Policy', href: '/' }}
      />
    </>
  );
}
