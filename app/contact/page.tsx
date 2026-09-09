import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, Prose, FeatureList } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import { ContactLeadForm } from '@/components/contact/contact-lead-form';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Alberta Injury Management. Phone, email, contact form, and location information. We respond quickly to all inquiries.',
  path: '/contact',
});

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { interest?: string };
}) {
  return (
    <>
      <HeroBlock
        headline="Get in Touch"
        subheadline="Questions, inquiries, or ready to book? We're here to help and respond quickly to all messages."
      />

      <Section heading="Quick Contact Information" muted center>
        <Prose>
          <p>
            <strong>Phone:</strong> (780) 250-8188
          </p>
          <p>
            <strong>Email:</strong> info@albertainjurymanagement.ca
          </p>
          <p>
            <strong>Hours:</strong> Monday-Friday, 7:00 AM - 6:00 PM | Saturday by appointment
          </p>
        </Prose>
      </Section>

      <Section heading="Contact Form" subheading="Tell us what you need and we'll get back to you within 24 hours">
        <div className="mx-auto max-w-2xl">
          <ContactLeadForm initialInterest={searchParams?.interest} />
        </div>
      </Section>

      <Section heading="Routing & Department Contact" muted center>
        <Prose>
          <p>
            <strong>Patient Bookings:</strong> Call (780) 250-8188 or book online. Most appointments available within 24-48 hours.
          </p>
          <p>
            <strong>Healthcare Referrals:</strong> Email referrals to referrals@albertainjurymanagement.ca or use our online referral form. We contact patients promptly.
          </p>
          <p>
            <strong>Employer Inquiries:</strong> Contact partnerships@albertainjurymanagement.ca to discuss workplace injury management, ergonomic assessment, or return-to-work programs.
          </p>
          <p>
            <strong>Legal Referrals:</strong> Email legal@albertainjurymanagement.ca. We provide expert MVA rehabilitation and detailed medical documentation.
          </p>
          <p>
            <strong>Partnership & Acquisition:</strong> Contact partnerships@albertainjurymanagement.ca to discuss clinic acquisition, employer partnerships, research collaboration, or technology partnerships.
          </p>
          <p>
            <strong>Careers:</strong> Send your resume and cover letter to careers@albertainjurymanagement.ca. We review applications on a rolling basis.
          </p>
        </Prose>
      </Section>

      <Section heading="Quick Links" muted>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/book" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">Book an Appointment</h4>
            <p className="mt-1 text-sm text-aim-slate/70">Schedule your first visit</p>
          </Link>
          <Link href="/for-patients" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">Patient Resources</h4>
            <p className="mt-1 text-sm text-aim-slate/70">What to expect & billing info</p>
          </Link>
          <Link href="/for-referrers" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">For Referrers</h4>
            <p className="mt-1 text-sm text-aim-slate/70">Healthcare referral information</p>
          </Link>
          <Link href="/for-employers" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">For Employers</h4>
            <p className="mt-1 text-sm text-aim-slate/70">Workplace injury management</p>
          </Link>
          <Link href="/careers" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">Careers</h4>
            <p className="mt-1 text-sm text-aim-slate/70">Join our team</p>
          </Link>
          <Link href="/for-patients/faq" className="group rounded-lg border border-aim-divider-gray/40 bg-white p-5 transition hover:border-aim-teal/50 hover:shadow-md">
            <h4 className="font-semibold text-aim-navy group-hover:text-aim-teal">FAQ</h4>
            <p className="mt-1 text-sm text-aim-slate/70">Answers to common questions</p>
          </Link>
        </div>
      </Section>

      <CtaStrip
        headline="Let's Connect"
        subheadline="Whether you're a patient, referrer, employer, or partner, we're ready to help."
        primaryCta={{ label: 'Call (780) 250-8188', href: 'tel:+17802508188' }}
        secondaryCta={{ label: 'Back to Home', href: '/' }}
      />
    </>
  );
}
