import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import { FaqSection } from '@/components/blocks/faq-section';

export const metadata = buildMetadata({
  title: 'Patient FAQ',
  description: 'Frequently asked questions about Alberta Injury Management. Booking, insurance, billing, WCB, MVA, cancellations, and more.',
  path: '/for-patients/faq',
});

const patientFaqs = [
  {
    q: 'How do I book an appointment?',
    a: 'You can book online at our website, call us at (780) 250-8188, or complete your intake form and we\'ll contact you to schedule. Most appointments are available within 24-48 hours.',
  },
  {
    q: 'Do I need a referral from my doctor?',
    a: 'It depends on your insurance plan. Some plans require a referral, while others don\'t. We recommend checking with your insurance provider. If you need a referral, your doctor can fax it to us or you can provide it at your first appointment.',
  },
  {
    q: 'What if I don\'t have insurance?',
    a: 'We offer direct pay rates and flexible payment plans for patients without insurance. Call us to discuss options that work for your budget. Many patients find our rates affordable, especially compared to paying full price elsewhere.',
  },
  {
    q: 'How much does a visit cost?',
    a: 'Cost depends on whether you have insurance and what your plan covers. With direct billing, you typically pay only your deductible or co-pay. Without insurance, call us for our rate sheet. Initial assessments may cost more than follow-up visits.',
  },
  {
    q: 'Do you accept direct billing?',
    a: 'Yes, we accept direct billing with most major insurers including Alberta Blue Cross, Canada Life, Green Shield, Manulife, Sun Life, and many others. We verify your coverage before your appointment when possible.',
  },
  {
    q: 'What if I\'ve used my insurance benefits?',
    a: 'Once your annual maximum is reached, you\'re responsible for additional costs. We offer direct pay rates and payment plans. Many patients continue treatment because they value the results.',
  },
  {
    q: 'How much notice do I need to give for cancellations?',
    a: 'Please provide 24 hours notice if you need to cancel or reschedule. Cancellations with less than 24 hours notice may incur a cancellation fee. Life happens—just let us know as soon as possible.',
  },
  {
    q: 'What should I wear to my appointment?',
    a: 'Wear comfortable, loose-fitting clothing that allows freedom of movement. You should be able to expose the area being treated. We provide private change areas if needed.',
  },
  {
    q: 'What happens at my first visit?',
    a: 'Your first appointment (60-75 minutes) includes a detailed history, physical assessment, and treatment planning. We develop a personalized treatment plan based on your needs and recovery goals.',
  },
  {
    q: 'How often will I need to come in?',
    a: 'Frequency depends on your condition and recovery goals. Acute injuries typically require 2-3 visits weekly initially, tapering as you improve. We\'ll discuss the recommended frequency at your first appointment.',
  },
  {
    q: 'Do I need to fill out forms?',
    a: 'Yes, we collect information about your medical history, insurance, and symptoms. You can complete these online before your appointment or on arrival. This helps us prepare and speeds up your first visit.',
  },
  {
    q: 'Is my information kept private?',
    a: 'Absolutely. We follow strict privacy protocols and comply with all healthcare privacy laws. Your information is only shared with insurance providers when necessary for claims processing, and only with your consent.',
  },
  {
    q: 'Do you offer virtual or online appointments?',
    a: 'We primarily offer in-person appointments for clinical assessment and treatment. However, ask us about options for follow-up consultations or exercise instruction via video call.',
  },
  {
    q: 'Is there parking available?',
    a: 'Yes, we have ample parking at our location. Parking is free for patients. Ask staff where to park when you arrive.',
  },
  {
    q: 'How long does recovery typically take?',
    a: 'Recovery time varies significantly depending on your injury, severity, and how well you follow your home exercise program. Most acute injuries show improvement within 4-8 weeks, but complex cases may take longer. We\'ll give you a realistic timeline at your first appointment.',
  },
  {
    q: 'Will I get a copy of my treatment plan?',
    a: 'Yes, we provide a written treatment plan outlining your diagnosis, goals, frequency, expected duration, and home exercises. We also give you progress reports at regular intervals.',
  },
  {
    q: 'Can I see the same clinician every visit?',
    a: 'We try to match you with the same clinician for continuity of care. If your primary clinician is unavailable, we ensure seamless handoff with detailed notes.',
  },
  {
    q: 'What if my condition isn\'t improving?',
    a: 'We continuously assess your progress and adjust your treatment plan as needed. If progress plateaus, we may recommend imaging, specialist consultation, or a modified treatment approach. Your recovery is our priority.',
  },
  {
    q: 'Can I claim treatment on my taxes?',
    a: 'Physiotherapy and related services may be deductible under medical expenses on your taxes, depending on your jurisdiction and income level. Consult your accountant for specifics.',
  },
];

export default function PatientFaqPage() {
  return (
    <>
      <HeroBlock
        headline="Patient FAQ"
        subheadline="Answers to the questions our patients ask most often about booking, insurance, and care."
      />

      <Section center>
        <FaqSection faqs={patientFaqs} />
      </Section>

      <CtaStrip
        headline="Still Have Questions?"
        subheadline="Our team is happy to help. Call or contact us directly."
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
        secondaryCta={{ label: 'Book Appointment', href: '/book' }}
      />
    </>
  );
}
