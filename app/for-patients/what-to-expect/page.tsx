import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';

export const metadata = buildMetadata({
  title: 'What to Expect at Your First Appointment',
  description: 'Learn about the initial assessment process at AIM. What happens, what to bring, what to wear, and how long your appointment takes.',
  path: '/for-patients/what-to-expect',
});

export default function WhatToExpectPage() {
  return (
    <>
      <HeroBlock
        headline="What to Expect at Your First Appointment"
        subheadline="Our initial assessment is comprehensive, personalized, and designed to understand your unique needs and recovery goals."
      />

      <Section heading="The Assessment Process" subheading="A typical first appointment takes 60-75 minutes and includes:">
        <Prose>
          <p>
            <strong>Initial Consultation (10-15 min):</strong> We discuss your injury history, what caused your condition, how it affects your daily activities, and your recovery goals.
          </p>
          <p>
            <strong>Physical Assessment (20-30 min):</strong> Our clinician performs detailed movement testing, strength evaluation, and functional testing to understand your current abilities and limitations.
          </p>
          <p>
            <strong>Treatment Planning (15-20 min):</strong> Based on the assessment, we develop a personalized treatment plan that outlines your diagnosis, rehabilitation goals, frequency of visits, and expected timeline to recovery.
          </p>
          <p>
            <strong>First Treatment (if appropriate):</strong> Depending on your condition, we may begin treatment during your first visit or schedule this for your second appointment.
          </p>
        </Prose>
      </Section>

      <Section heading="What to Bring" muted center>
        <FeatureList
          items={[
            'Photo ID and health card (for verification and insurance)',
            'Insurance card or benefits paperwork',
            'Any imaging reports (X-rays, MRI, ultrasound)',
            'List of current medications',
            'Referral from your doctor (if required by insurance)',
            'Brief notes about your symptoms and when they started',
          ]}
        />
      </Section>

      <Section heading="How to Prepare" subheading="Simple steps to make your appointment as effective as possible">
        <Prose>
          <p>
            <strong>What to Wear:</strong> Wear comfortable, loose-fitting clothing that allows you to move freely. You should be able to expose the area being treated (shoulders, knees, back, etc.). We provide private change areas if needed.
          </p>
          <p>
            <strong>Timing:</strong> Arrive 10 minutes early to complete any final paperwork. If you completed your intake form online, you'll just need to sign in.
          </p>
          <p>
            <strong>Pain Management:</strong> If you typically take pain medication, it's fine to take it before your appointment. Let us know what you've taken so we can account for it during assessment.
          </p>
          <p>
            <strong>Hydration:</strong> Drink water before your appointment. Staying hydrated helps with recovery and flexibility.
          </p>
          <p>
            <strong>Questions:</strong> Write down any questions you have. We'll have time to address them during your appointment.
          </p>
        </Prose>
      </Section>

      <Section heading="Intake Forms" muted center>
        <Prose>
          <p>
            We typically have you complete intake forms before your appointment. This saves time and allows us to prepare better. Our online intake takes about 10-15 minutes and covers your medical history, insurance information, and current symptoms.
          </p>
        </Prose>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="/intake" className="inline-flex rounded-lg bg-aim-teal px-6 py-3 font-semibold text-white hover:bg-aim-teal/90">
            Start Your Intake Form →
          </a>
        </div>
      </Section>

      <Section heading="What Happens After Your First Visit" subheading="Your personalized treatment plan guides your next steps">
        <Prose>
          <p>
            <strong>Treatment Plan Review:</strong> We'll provide you with a written treatment plan detailing the frequency and duration of your recommended treatment.
          </p>
          <p>
            <strong>Home Exercise Program:</strong> Most patients receive exercises to perform at home between appointments. These are critical to your recovery and help you progress faster.
          </p>
          <p>
            <strong>Progress Tracking:</strong> We track your progress at every visit with measurements and functional tests. This helps us adjust your treatment to keep you improving.
          </p>
          <p>
            <strong>Insurance Coordination:</strong> If you have insurance, we handle direct billing. We'll contact your provider to confirm coverage and submit your claims.
          </p>
        </Prose>
      </Section>

      <Section heading="Appointment Cancellations" muted center>
        <Prose>
          <p>
            We understand that life happens. We ask for 24 hours notice if you need to reschedule. Cancellations made with less than 24 hours notice may incur a fee to respect our clinicians' time.
          </p>
        </Prose>
      </Section>

      <CtaStrip
        headline="Ready to Book Your Assessment?"
        subheadline="Get started on your recovery journey today. Most appointments available within 24-48 hours."
        primaryCta={{ label: 'Book Appointment', href: '/book' }}
        secondaryCta={{ label: 'Call Us', href: 'tel:+17802508188' }}
      />
    </>
  );
}
