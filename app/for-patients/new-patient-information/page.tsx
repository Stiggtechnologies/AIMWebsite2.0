import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'New Patient Information & Checklist',
  description: 'New patient information for Alberta Injury Management. What to bring, intake forms, parking, and what to expect at your first visit.',
  path: '/for-patients/new-patient-information',
});

export default function NewPatientInfoPage() {
  return (
    <>
      <HeroBlock
        headline="New Patient Information & Checklist"
        subheadline="Everything you need to know before your first appointment at AIM."
      />

      <Section heading="Pre-Appointment Checklist" subheading="Make sure you have these items ready">
        <FeatureList
          items={[
            'Photo ID and health card',
            'Insurance card and policy information',
            'Referral from your doctor (if required by insurance)',
            'Any medical imaging reports (X-rays, MRI, ultrasound, CT)',
            'List of current medications and supplements',
            'Previous physiotherapy or treatment records if available',
            'Contact information for your doctor',
            'Details about your injury and when it occurred',
          ]}
          columns={1}
        />
      </Section>

      <Section heading="Intake Forms" muted center>
        <Prose>
          <p>
            We have an online intake form that takes about 10-15 minutes to complete. This form helps us understand your medical history, current symptoms, insurance information, and recovery goals.
          </p>
          <p>
            Complete this before your appointment to save time and allow us to prepare your treatment plan ahead of your visit.
          </p>
        </Prose>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/intake" className="inline-flex rounded-lg bg-aim-teal px-6 py-3 font-semibold text-white hover:bg-aim-teal/90">
            Start Intake Form →
          </Link>
        </div>
      </Section>

      <Section heading="Arrival & Parking" subheading="What to expect when you arrive">
        <Prose>
          <p>
            <strong>Parking:</strong> Free parking is available at our location. When you arrive, ask staff where to park if you need directions.
          </p>
          <p>
            <strong>Early Arrival:</strong> Please arrive 10-15 minutes early to allow time for check-in, especially if this is your first visit. If you completed your intake online, check-in will be quick.
          </p>
          <p>
            <strong>Check-In:</strong> When you arrive, check in at the front desk. Provide your ID and insurance information. If you haven't completed the online intake, you may be asked to complete forms on arrival.
          </p>
          <p>
            <strong>Comfort:</strong> Our clinic has a comfortable waiting area. Feel free to ask staff for water or directions to facilities.
          </p>
        </Prose>
      </Section>

      <Section heading="What to Bring" muted>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-aim-divider-gray/40 p-6">
            <h3 className="mb-4 text-lg font-semibold text-aim-navy">Documentation</h3>
            <FeatureList
              items={[
                'Photo ID',
                'Health card',
                'Insurance card',
                'Referral letter (if needed)',
                'Medical imaging reports',
                'Previous treatment records',
              ]}
              columns={1}
            />
          </div>
          <div className="rounded-lg border border-aim-divider-gray/40 p-6">
            <h3 className="mb-4 text-lg font-semibold text-aim-navy">What to Wear</h3>
            <Prose>
              <p>
                Wear comfortable, loose-fitting clothing that allows freedom of movement. You should be able to expose the area being treated.
              </p>
              <p>
                We provide private change areas if needed, and you can change into comfortable clothing for your appointment.
              </p>
            </Prose>
          </div>
        </div>
      </Section>

      <Section heading="Your First Visit" subheading="What happens during your initial assessment" center>
        <Prose>
          <p>
            <strong>Duration:</strong> Plan for 60-75 minutes for your first appointment.
          </p>
          <p>
            <strong>Initial Consultation (10-15 min):</strong> We discuss your injury history, what brought you in, and your recovery goals.
          </p>
          <p>
            <strong>Physical Assessment (20-30 min):</strong> We perform movement testing, strength evaluation, and other assessments to understand your function and limitations.
          </p>
          <p>
            <strong>Treatment Planning (15-20 min):</strong> We explain our findings and create a personalized treatment plan with frequency, duration, and expected timeline.
          </p>
          <p>
            <strong>First Treatment (if appropriate):</strong> We may begin treatment during your first visit or schedule it for your second appointment.
          </p>
        </Prose>
      </Section>

      <Section heading="After Your First Visit" muted subheading="What happens next">
        <Prose>
          <p>
            <strong>Home Exercise Program:</strong> You'll receive exercises to perform between appointments. These are critical to your recovery and help you progress faster.
          </p>
          <p>
            <strong>Next Appointment:</strong> Your clinician will discuss the recommended frequency and schedule your next appointment (typically within a few days).
          </p>
          <p>
            <strong>Insurance Claims:</strong> If you have insurance, we'll submit your claims for direct billing. You'll receive a summary of what was billed and any costs you're responsible for.
          </p>
          <p>
            <strong>Progress Tracking:</strong> At each visit, we measure your progress using objective tests and assessments. You'll see improvements in function, pain, and mobility.
          </p>
          <p>
            <strong>Communication:</strong> If you have questions between appointments, feel free to call us. We're here to support your recovery.
          </p>
        </Prose>
      </Section>

      <Section heading="Contact & Location Information"  center>
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

      <CtaStrip
        headline="Ready for Your First Appointment?"
        subheadline="Complete your intake form and book your appointment today."
        primaryCta={{ label: 'Book Now', href: '/book' }}
        secondaryCta={{ label: 'Start Intake Form', href: '/intake' }}
      />
    </>
  );
}
