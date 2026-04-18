import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, Prose, FeatureList } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Alberta Injury Management. Phone, email, contact form, and location information. We respond quickly to all inquiries.',
  path: '/contact',
});

export default function ContactPage() {
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
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-aim-navy">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-2 w-full rounded-lg border border-aim-divider-gray bg-white px-4 py-2.5 text-aim-navy placeholder-aim-slate/50 focus:border-aim-teal focus:outline-none focus:ring-1 focus:ring-aim-teal"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-aim-navy">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-lg border border-aim-divider-gray bg-white px-4 py-2.5 text-aim-navy placeholder-aim-slate/50 focus:border-aim-teal focus:outline-none focus:ring-1 focus:ring-aim-teal"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-aim-navy">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-2 w-full rounded-lg border border-aim-divider-gray bg-white px-4 py-2.5 text-aim-navy placeholder-aim-slate/50 focus:border-aim-teal focus:outline-none focus:ring-1 focus:ring-aim-teal"
                placeholder="(780) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="interest" className="block text-sm font-semibold text-aim-navy">
                What's This About?
              </label>
              <select
                id="interest"
                name="interest"
                className="mt-2 w-full rounded-lg border border-aim-divider-gray bg-white px-4 py-2.5 text-aim-navy focus:border-aim-teal focus:outline-none focus:ring-1 focus:ring-aim-teal"
              >
                <option value="">Select an option</option>
                <option value="patient">Patient Booking</option>
                <option value="referral">Healthcare Referral</option>
                <option value="employer">Employer Inquiry</option>
                <option value="legal">Legal Referral</option>
                <option value="partnerships">Partnership Inquiry</option>
                <option value="careers">Career Opportunity</option>
                <option value="general">General Question</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-aim-navy">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full rounded-lg border border-aim-divider-gray bg-white px-4 py-2.5 text-aim-navy placeholder-aim-slate/50 focus:border-aim-teal focus:outline-none focus:ring-1 focus:ring-aim-teal"
                placeholder="Tell us what you need..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-aim-teal px-6 py-3 text-center font-semibold text-white transition hover:bg-aim-teal/90 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
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
