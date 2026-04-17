import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';
import { FaqSection } from '@/components/blocks/faq-section';

export const metadata = buildMetadata({
  title: 'MVA Rehabilitation & Section B Coverage',
  description: 'Motor vehicle accident rehabilitation in Alberta. Section B coverage, whiplash treatment, concussion management, and comprehensive injury recovery.',
  path: '/for-patients/motor-vehicle-accidents',
});

const mvaFaqs = [
  {
    q: 'What is Section B coverage?',
    a: 'Section B is part of Alberta\'s auto insurance framework that covers treatment for injuries from motor vehicle accidents. Coverage is available regardless of fault and is billed through your insurance provider. Most Section B claims cover physiotherapy, massage therapy, and chiropractic care.',
  },
  {
    q: 'Do I need to report my accident to get Section B coverage?',
    a: 'Yes, you need to report the accident to your insurance provider to activate Section B coverage. We can help guide you through this process. Once reported, you can begin rehabilitation treatment.',
  },
  {
    q: 'What is whiplash and how is it treated?',
    a: 'Whiplash is a neck injury caused by sudden acceleration-deceleration forces, commonly from rear-end collisions. Treatment includes neck mobilization, strengthening exercises, postural correction, and gradual return to normal activities. Most whiplash injuries improve within 8-12 weeks with proper treatment.',
  },
  {
    q: 'Can I be treated for an MVA injury without a police report?',
    a: 'Even if there\'s no police report, you can still receive treatment. Report the accident to your insurance provider, and we can help you document your injury for Section B coverage purposes.',
  },
  {
    q: 'How long after an accident can I start treatment?',
    a: 'You can start treatment immediately. Some injuries appear or worsen over days or weeks following an accident. If symptoms develop, contact us promptly. Early intervention often leads to better outcomes.',
  },
  {
    q: 'Will treatment affect my insurance rates?',
    a: 'No, using Section B coverage for injury treatment does not affect your insurance premiums. This is separate from fault determination and does not impact your record.',
  },
];

export default function MotorVehicleAccidentsPage() {
  return (
    <>
      <HeroBlock
        headline="MVA Rehabilitation & Section B Coverage"
        subheadline="Comprehensive treatment for motor vehicle accident injuries. We guide you through the claims process and focus on your recovery."
      />

      <Section heading="Understanding Section B Coverage" subheading="Alberta's framework for MVA injury treatment">
        <Prose>
          <p>
            Section B of Alberta's auto insurance coverage provides treatment benefits for injuries sustained in motor vehicle accidents. This coverage is available to any person injured in an accident in Alberta, regardless of who was at fault.
          </p>
          <p>
            Section B typically covers physiotherapy, massage therapy, and chiropractic care. Treatment must be prescribed by a healthcare provider and performed by licensed, qualified professionals—like our team at AIM.
          </p>
          <p>
            <strong>Important:</strong> Report your accident to your insurance provider promptly to activate Section B coverage. Most policies have specific timeframes for reporting.
          </p>
        </Prose>
      </Section>

      <Section heading="Common MVA Injuries We Treat" muted>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Whiplash & Neck Injuries</h3>
            <p className="text-aim-slate/85">
              Sudden acceleration-deceleration forces cause neck strain and muscle damage. Symptoms may include pain, stiffness, headaches, and reduced mobility. Early treatment prevents chronic problems.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Soft Tissue Injuries</h3>
            <p className="text-aim-slate/85">
              Strains and sprains affecting muscles, ligaments, and tendons throughout the body. We use manual therapy, exercise, and modalities to reduce pain and restore function.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Concussion & Head Injuries</h3>
            <p className="text-aim-slate/85">
              MVA concussions require specialized assessment and management. We work with physicians to monitor symptoms and safely progress recovery through vestibular rehabilitation if needed.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-aim-navy">Post-Accident Headaches</h3>
            <p className="text-aim-slate/85">
              Headaches often develop after MVAs due to neck tension, muscle spasm, or concussion. We identify the cause and treat through manual therapy, exercise, and ergonomic modification.
            </p>
          </div>
        </div>
      </Section>

      <Section heading="Your Rehabilitation Journey" subheading="What to expect from assessment to recovery">
        <Prose>
          <p>
            <strong>Initial Assessment (Week 1-2):</strong> We perform a comprehensive evaluation including detailed history of the accident, imaging review, and physical examination. We create a treatment plan and document your baseline function.
          </p>
          <p>
            <strong>Active Treatment Phase (Weeks 2-8):</strong> Regular appointments (typically 2-3 times weekly) focus on pain management, restoring mobility, and rebuilding strength. We progress your exercises as you improve.
          </p>
          <p>
            <strong>Functional Recovery Phase (Weeks 8-12):</strong> Treatment frequency typically decreases as your function improves. Focus shifts to return-to-work activities, driving tolerance, and sport/recreation participation.
          </p>
          <p>
            <strong>Discharge & Prevention (Week 12+):</strong> Once you've returned to your baseline function, we develop a home program to prevent re-injury and long-term problems.
          </p>
        </Prose>
      </Section>

      <Section heading="Insurance & Claim Coordination" muted center>
        <Prose>
          <p>
            We handle Section B billing directly with your insurance provider. You pay any deductible or out-of-pocket costs at your appointment, and we submit your claims for reimbursement.
          </p>
          <p>
            We verify your coverage before your first appointment and keep you informed about your remaining benefits. If you reach your treatment maximum, we discuss options for continuing care.
          </p>
        </Prose>
      </Section>

      <Section heading="What to Bring to Your Appointment" subheading="Documentation that helps us manage your claim">
        <FeatureList
          items={[
            'Insurance information and policy details',
            'Accident report (if available)',
            'Medical records from your doctor or ER visit',
            'Imaging reports (X-rays, CT, MRI)',
            'List of medications you\'re taking',
            'Details about the accident and your injuries',
            'Any previous medical history relevant to your injury',
          ]}
          columns={1}
        />
      </Section>

      <FaqSection heading="MVA Coverage Questions" faqs={mvaFaqs} />

      <CtaStrip
        headline="Start Your MVA Recovery Today"
        subheadline="Book your assessment and let us help guide you through the rehabilitation process."
        primaryCta={{ label: 'Book Now', href: '/book' }}
        secondaryCta={{ label: 'Call Us', href: 'tel:+17802508188' }}
      />
    </>
  );
}
