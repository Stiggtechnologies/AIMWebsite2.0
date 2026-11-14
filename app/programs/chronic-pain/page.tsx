import Link from 'next/link';
import { HeroBlock } from '@/components/blocks/hero-block';
import { CtaStrip } from '@/components/blocks/cta-strip';
import { FaqSection } from '@/components/blocks/faq-section';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { buildMetadata, JsonLd, faqSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Chronic Pain Program | Cognitive Functional Therapy in Edmonton',
  description:
    'A physiotherapist-led chronic pain program built on Cognitive Functional Therapy (CFT) and team-based care. Understand your pain, move with confidence and get back to work and life.',
  path: '/programs/chronic-pain',
});

const cftPillars = [
  {
    title: 'Making sense of your pain',
    body: 'We listen to your full story and help you understand what is really driving your pain. Many people have been told their back is "damaged", "out" or "worn" — beliefs that create fear and often do not match the evidence. A clear, personal explanation makes movement feel safe again.',
  },
  {
    title: 'Exposure with control',
    body: 'With your physiotherapist coaching you, you gradually return to the movements and activities you have been avoiding or bracing against — bending, lifting, sitting, sleeping, working — while learning to relax protective tension and move normally.',
  },
  {
    title: 'Lifestyle change',
    body: 'We build habits that calm a sensitised system: regular physical activity you enjoy, better sleep, stress management, and staying connected to work and the people around you.',
  },
];

const comparison: { typical: string; program: string }[] = [
  { typical: 'Focuses on the painful body part', program: 'Looks at the whole person — beliefs, movement, sleep, stress and work' },
  { typical: 'Treatment is done to you (passive)', program: 'You are coached to take charge of your pain (active)' },
  { typical: 'Protect, brace and avoid painful movements', program: 'Gradually and safely return to the movements you fear' },
  { typical: 'Standard exercise sheet', program: 'A plan built around your own goals and valued activities' },
  { typical: 'Open-ended, symptom-driven visits', program: 'A structured program with a clear endpoint and a long-term self-management plan' },
];

const steps = [
  {
    title: 'In-depth assessment',
    body: 'Your story, what you believe about your pain, a movement assessment, and screening for anything that needs medical attention. We measure pain, function, sleep and mood, and set goals that matter to you.',
  },
  {
    title: 'One-to-one CFT coaching',
    body: 'Longer sessions over about 12 weeks working through the three parts of CFT, practising your own feared or painful activities until they feel safe.',
  },
  {
    title: 'Home practice',
    body: 'A short, personalised daily plan between sessions so progress carries into everyday life.',
  },
  {
    title: 'Team support where needed',
    body: 'Manual therapy, massage or osteopathy in a supporting role, and coordination with your family physician, pain specialists or psychologists for medication review or mental-health support.',
  },
  {
    title: 'Return-to-work planning',
    body: 'Work-specific movement retraining, work conditioning and graduated return-to-work plans, coordinated with your employer, physician and case manager.',
  },
  {
    title: 'Review and booster',
    body: 'Outcomes are re-measured and shared with your physician or case manager on request. A follow-up booster helps you keep your progress and plan for flare-ups.',
  },
];

const faqs = [
  {
    q: 'What is Cognitive Functional Therapy?',
    a: 'CFT is a physiotherapist-led approach to persistent pain developed by Professor Peter O\'Sullivan and colleagues. It identifies the specific things keeping your pain going — how you think about it, how you move and how you live — and coaches you to change them.',
  },
  {
    q: 'Is CFT a form of psychology or counselling?',
    a: 'No. It is physiotherapy. It combines hands-on movement coaching with a clear understanding of how thoughts, emotions and habits influence pain. If you would benefit from psychological support as well, we coordinate that with you.',
  },
  {
    q: 'Are you saying the pain is in my head?',
    a: 'Not at all. Your pain is real. Pain is shaped by the body, the nervous system and daily life together, and this program works on all three.',
  },
  {
    q: 'Will this program make my pain go away?',
    a: 'Some people\'s pain reduces significantly; for others the main gains are doing more with less interference from pain. We cannot promise a specific result, but we track your progress so you can see what is changing.',
  },
  {
    q: 'Is it safe to move into painful activities?',
    a: 'Yes, when it is guided and gradual. You are screened first and you stay in control of the pace. Hurt does not always mean harm.',
  },
  {
    q: 'Do I have to stop my medication?',
    a: 'No. Medication decisions stay with your physician. With your consent we share your progress with them.',
  },
  {
    q: 'I have already tried physiotherapy. How is this different?',
    a: 'Standard injury treatment usually focuses on the sore area and passive care. This program is structured, longer per session, and focused on changing what keeps your pain going — so you leave with skills you can use for life.',
  },
  {
    q: 'Is the program covered by WCB, MVA or my benefits?',
    a: 'Sessions are physiotherapy, so they are often covered. AIM direct bills WCB Alberta, MVA (Section B) insurers and most major extended health plans. Bring your claim or policy details to your first visit and we will confirm your coverage.',
  },
];

export default function ChronicPainProgramPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      <HeroBlock
        eyebrow="Chronic Pain Program"
        headline="Still in pain after trying everything? There is a different way to treat it."
        subheadline="Our Chronic Pain Program combines Cognitive Functional Therapy (CFT) with team-based care to help you understand your pain, move with confidence again and get back to the work and life that matter to you."
        primaryCta={{ label: 'Book a Chronic Pain Assessment', href: '/book?service=chronic-pain-rehabilitation' }}
        secondaryCta={{ label: 'Call (780) 250-8188', href: 'tel:+17802508188' }}
      />

      <Section heading="What is chronic pain?">
        <Prose>
          <p>
            Chronic pain is pain that persists or keeps coming back for <strong>longer than three months</strong>, often
            beyond the time it normally takes tissues to heal. The World Health Organization recognises it as a health
            condition in its own right (ICD-11).
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Chronic secondary pain</strong> is linked to an identifiable cause, such as a past injury, surgery,
              arthritis or nerve damage.
            </li>
            <li>
              <strong>Chronic primary pain</strong> is pain that is the main problem itself, such as persistent low back
              pain without a clear structural cause, or widespread pain.
            </li>
          </ul>
          <p>
            When pain lasts, the nervous system can become more protective and more sensitive. Fear of movement, guarded
            posture, poor sleep, stress and low mood can all keep pain going — even after tissues have healed. That is
            why effective care treats the <strong>whole person</strong>, not just the sore spot.
          </p>
        </Prose>
      </Section>

      <Section
        muted
        eyebrow="Our approach"
        heading="Cognitive Functional Therapy, backed by a care team"
        subheading="CFT is a physiotherapist-led approach developed by Professor Peter O'Sullivan and colleagues. Your physiotherapist works out what is keeping your pain going and coaches you to change it — with support from the wider AIM team when you need it."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cftPillars.map((p, i) => (
            <div key={p.title} className="rounded-2xl border border-aim-divider-gray/50 bg-white p-6">
              <div className="text-sm font-semibold uppercase tracking-wider text-aim-teal">Part {i + 1}</div>
              <h3 className="mt-2 text-xl font-semibold text-aim-navy">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-aim-slate/85">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section heading="How this differs from typical physiotherapy">
        <div className="overflow-hidden rounded-2xl border border-aim-divider-gray/60">
          <div className="hidden grid-cols-2 bg-aim-navy text-sm font-semibold uppercase tracking-wider text-white md:grid">
            <div className="px-5 py-3">Typical approach</div>
            <div className="px-5 py-3">AIM Chronic Pain Program</div>
          </div>
          {comparison.map((row, i) => (
            <div
              key={row.typical}
              className={`grid grid-cols-1 md:grid-cols-2 ${i % 2 ? 'bg-aim-off-white' : 'bg-white'}`}
            >
              <div className="px-5 pt-4 text-aim-slate/75 md:py-4">
                <span className="mr-2 text-xs font-semibold uppercase tracking-wider md:hidden">Typical:</span>
                {row.typical}
              </div>
              <div className="px-5 pb-4 pt-1 font-medium text-aim-navy md:py-4">
                <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-aim-teal md:hidden">AIM:</span>
                {row.program}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section muted heading="What the research shows">
        <Prose>
          <p>CFT is one of the most closely studied physiotherapy approaches for chronic low back pain.</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              In the <strong>RESTORE trial</strong> (<em>The Lancet</em>, 2023), 492 adults with chronic, disabling low
              back pain were treated in 20 physiotherapy clinics. People who received CFT — up to seven sessions over 12
              weeks plus a booster — had greater improvements in activity limitation and pain than those receiving usual
              care, at lower overall cost to society.
            </li>
            <li>
              A <strong>three-year follow-up</strong> (<em>The Lancet Rheumatology</em>, 2025) found those benefits were
              largely maintained.
            </li>
          </ul>
          <p className="text-[15px] text-aim-slate/70">
            The strongest evidence for CFT is in chronic low back pain; its principles are also applied to other
            persistent musculoskeletal pain. Individual results vary.
          </p>
        </Prose>
      </Section>

      <Section heading="Who the program is for">
        <FeatureList
          columns={2}
          items={[
            'Pain lasting longer than 3 months',
            'Persistent back, neck, shoulder or joint pain that has not settled with standard treatment',
            'Lingering pain after a workplace injury (WCB) or motor vehicle collision',
            'Post-surgical pain that persists beyond expected recovery',
            'Widespread or recurring pain',
            'People who have become fearful of movement or stopped doing things they value',
            'People told "there is nothing more to do"',
            'Anyone wanting lasting self-management skills rather than ongoing passive treatment',
          ]}
        />
      </Section>

      <Section muted heading="How the program works">
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-2xl border border-aim-divider-gray/50 bg-white p-5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-aim-teal text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-aim-navy">{s.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-aim-slate/85">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section heading="Funding and coverage">
        <FeatureList
          columns={2}
          items={[
            'WCB Alberta — direct billing; bring your claim number',
            'Motor vehicle injuries — direct billing to Section B insurers',
            'Extended health benefits — billed as physiotherapy, often covered',
            'No physician referral needed for physiotherapy in Alberta (some insurers require one)',
          ]}
        />
        <p className="mt-6 text-aim-slate/80">
          Questions about coverage? See{' '}
          <Link href="/for-patients/direct-billing" className="font-medium text-aim-teal underline-offset-4 hover:underline">
            direct billing
          </Link>{' '}
          or{' '}
          <Link href="/for-patients/wcb-claims" className="font-medium text-aim-teal underline-offset-4 hover:underline">
            WCB claims
          </Link>
          .
        </p>
      </Section>

      <FaqSection faqs={faqs} />

      <section className="bg-white pb-12">
        <p className="mx-auto max-w-3xl px-6 text-sm text-aim-slate/60 md:px-8">
          Information on this page is general and is not a substitute for individual medical advice. If you have new,
          severe or worsening pain, contact your physician.
        </p>
      </section>

      <CtaStrip
        headline="Take the first step toward getting your life back"
        subheadline="Book a chronic pain assessment at the AIM clinic nearest you."
        primaryCta={{ label: 'Book a Chronic Pain Assessment', href: '/book?service=chronic-pain-rehabilitation' }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />

      <LazyChatWidget />
    </>
  );
}
