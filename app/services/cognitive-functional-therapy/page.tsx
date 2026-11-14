import Link from 'next/link';
import { HeroBlock } from '@/components/blocks/hero-block';
import { CtaStrip } from '@/components/blocks/cta-strip';
import { FaqSection } from '@/components/blocks/faq-section';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { buildMetadata, JsonLd, faqSchema } from '@/lib/seo';

const SLUG = 'cognitive-functional-therapy';
// Every booking link on this page carries this service tag so CFT demand can be
// counted on its own (intake submissions + GA4 `service_lead` events).
const BOOK_HREF = `/intake/form?service=${SLUG}`;

export const metadata = buildMetadata({
  title: 'Cognitive Functional Therapy (CFT) in Edmonton',
  description:
    'Cognitive Functional Therapy (CFT) at Alberta Injury Management: an evidence-based, physiotherapist-led treatment for persistent back pain and other long-lasting musculoskeletal pain.',
  path: `/services/${SLUG}`,
});

const parts = [
  {
    title: 'Making sense of your pain',
    body: 'Your physiotherapist listens to your whole story and uses what they find in the assessment to explain, in plain language, what is keeping your pain going. Unhelpful beliefs such as "my spine is fragile" or "pain means damage" are gently tested against the evidence and against your own experience.',
    session: 'You leave the first sessions with a clear, personal explanation of your pain — not a generic handout.',
  },
  {
    title: 'Exposure with control',
    body: 'You practise the movements and activities you fear or avoid — bending, lifting, sitting, running, sleeping positions — with your physiotherapist coaching how you breathe, relax and move. Protective bracing and guarding are replaced with relaxed, confident movement.',
    session: 'Sessions are hands-on and practical: you work on your own problem activities, not a generic exercise list.',
  },
  {
    title: 'Lifestyle change',
    body: 'Sleep, stress, physical activity, work demands and social life all affect a sensitised nervous system. Together you set practical goals — an enjoyable form of daily activity, a better sleep routine, strategies for busy or stressful periods.',
    session: 'You build habits that keep progress going long after treatment ends.',
  },
];

const assessed = [
  'Your story: how the pain started, how it has changed, and what you have tried',
  'What you believe is wrong, and what you fear might happen',
  'How you move — including protective bracing, guarding and avoidance',
  'Activities you have stopped or find difficult',
  'Sleep, stress, mood, activity levels and work',
  'Screening for anything that needs medical review first',
];

const faqs = [
  {
    q: 'Who developed Cognitive Functional Therapy?',
    a: 'CFT was developed by Professor Peter O\'Sullivan and colleagues in Australia, and has been studied in randomised controlled trials, most notably the RESTORE trial published in The Lancet in 2023.',
  },
  {
    q: 'What conditions is CFT used for?',
    a: 'The strongest evidence is for persistent (chronic) low back pain. Its principles are also used for other long-lasting musculoskeletal pain such as neck, shoulder and pelvic pain. Your physiotherapist will tell you whether CFT suits your situation after your assessment.',
  },
  {
    q: 'How many sessions will I need?',
    a: 'It depends on you. In the RESTORE trial, people received up to seven sessions over 12 weeks plus a booster session. Sessions are usually longer than standard physiotherapy appointments, with practice at home in between.',
  },
  {
    q: 'Do I need a scan or X-ray first?',
    a: 'Usually not. Most persistent back pain is not explained by imaging findings. If your assessment suggests something needs further investigation, we will refer you to your physician.',
  },
  {
    q: 'How is CFT different from the Chronic Pain Program?',
    a: 'CFT is the treatment method. Our Chronic Pain Program is built around CFT and adds team-based support — such as manual therapy, massage, return-to-work planning and coordination with your physician or psychologist — where you need it.',
  },
  {
    q: 'Is CFT covered by insurance?',
    a: 'CFT is delivered by physiotherapists, so it is usually billed as physiotherapy. AIM direct bills WCB Alberta, MVA (Section B) insurers and most major extended health plans. We will confirm your coverage before you start.',
  },
];

export default function CognitiveFunctionalTherapyPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      <HeroBlock
        eyebrow="Service"
        headline="Cognitive Functional Therapy (CFT)"
        subheadline="An evidence-based, physiotherapist-led approach for persistent back pain and other long-lasting musculoskeletal pain. CFT helps you understand your pain, move without fear and change the habits that keep pain going."
        primaryCta={{ label: 'Request a CFT Assessment', href: BOOK_HREF }}
        secondaryCta={{ label: 'Call (780) 250-8188', href: 'tel:+17802508188' }}
      />

      <Section heading="What is Cognitive Functional Therapy?">
        <Prose>
          <p>
            Cognitive Functional Therapy is an individualised physiotherapy approach developed by Professor Peter
            O&apos;Sullivan and colleagues. It is built on a simple idea: persistent pain is rarely explained by one
            damaged structure. It is shaped by how you understand your pain, how you move and protect yourself, and how
            you live — and all of these can change.
          </p>
          <p>
            Rather than treating you passively, your physiotherapist acts as a coach. Together you identify what is
            keeping your pain going and work on it directly, so you leave with the understanding and skills to manage your
            pain yourself.
          </p>
        </Prose>
      </Section>

      <Section muted heading="What your CFT assessment looks at">
        <FeatureList items={assessed} columns={2} />
      </Section>

      <Section heading="The three parts of CFT" subheading="Your physiotherapist tailors each part to you.">
        <div className="space-y-6">
          {parts.map((p, i) => (
            <div key={p.title} className="grid gap-4 rounded-2xl border border-aim-divider-gray/50 bg-white p-6 md:grid-cols-[auto_1fr]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-aim-teal text-base font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-aim-navy">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-aim-slate/85">{p.body}</p>
                <p className="mt-3 rounded-xl bg-aim-steel-blue/50 px-4 py-3 text-[15px] text-aim-navy">
                  <span className="font-semibold">In practice: </span>
                  {p.session}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section muted heading="The evidence behind CFT">
        <Prose>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>RESTORE trial</strong> (<em>The Lancet</em>, 2023): 492 adults with chronic, disabling low back pain
              across 20 physiotherapy clinics. CFT led to greater improvements in activity limitation and pain than usual
              care, at lower overall cost to society.
            </li>
            <li>
              <strong>Three-year follow-up</strong> (<em>The Lancet Rheumatology</em>, 2025): the benefits were largely
              maintained.
            </li>
          </ul>
          <p className="text-[15px] text-aim-slate/70">
            Evidence is strongest for chronic low back pain. Individual results vary, and we cannot promise a specific
            outcome.
          </p>
        </Prose>
      </Section>

      <Section heading="CFT as part of our Chronic Pain Program">
        <Prose>
          <p>
            CFT is at the core of the AIM{' '}
            <Link href="/programs/chronic-pain" className="font-medium text-aim-teal underline-offset-4 hover:underline">
              Chronic Pain Program
            </Link>
            , which adds team-based support — manual therapy, massage, return-to-work planning and coordination with your
            physician or psychologist — for people who need more than one kind of help.
          </p>
        </Prose>
      </Section>

      <FaqSection faqs={faqs} />

      <section className="bg-white pb-12">
        <p className="mx-auto max-w-3xl px-6 text-sm text-aim-slate/60 md:px-8">
          Information on this page is general and is not a substitute for individual medical advice. If you have new,
          severe or worsening pain, contact your physician.
        </p>
      </section>

      <CtaStrip
        headline="Find out whether CFT is right for you"
        subheadline="Request an assessment and our team will call you to book."
        primaryCta={{ label: 'Request a CFT Assessment', href: BOOK_HREF }}
        secondaryCta={{ label: 'Contact Us', href: '/contact' }}
      />

      <LazyChatWidget />
    </>
  );
}
