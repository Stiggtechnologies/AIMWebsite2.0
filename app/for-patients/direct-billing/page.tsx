import { buildMetadata } from '@/lib/seo';
import { HeroBlock } from '@/components/blocks/hero-block';
import { Section, FeatureList, Prose } from '@/components/blocks/section';
import { CtaStrip } from '@/components/blocks/cta-strip';

export const metadata = buildMetadata({
  title: 'Direct Billing & Insurance Coverage',
  description: 'Learn about direct billing at AIM. We work with major insurers including Alberta Blue Cross, Manulife, Canada Life, Green Shield, and more.',
  path: '/for-patients/direct-billing',
});

export default function DirectBillingPage() {
  return (
    <>
      <HeroBlock
        headline="Direct Billing & Insurance Coverage"
        subheadline="We submit claims directly to your insurance provider. You typically pay only your deductible or co-pay."
      />

      <Section heading="How Direct Billing Works" subheading="Simplified claims processing that saves you time and money">
        <Prose>
          <p>
            <strong>We Handle the Paperwork:</strong> We collect your insurance information and submit your claims directly to your provider. This saves you the hassle of filing claims yourself.
          </p>
          <p>
            <strong>Pay Your Cost at Appointment:</strong> You pay any deductible or co-pay that your plan requires. The rest goes directly to us from your insurance.
          </p>
          <p>
            <strong>Coverage Confirmation:</strong> We verify your coverage before your appointment whenever possible, so you know exactly what you'll owe.
          </p>
          <p>
            <strong>Real-Time Updates:</strong> If your insurance hasn't paid us yet, we'll contact you to discuss payment options or payment plans.
          </p>
        </Prose>
      </Section>

      <Section heading="Accepted Insurance Providers" muted center subheading="We work with most major Canadian insurers">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg bg-white p-4">
            <h3 className="mb-3 font-semibold text-aim-navy">Major Providers</h3>
            <ul className="space-y-2 text-sm text-aim-slate/85">
              <li>• Alberta Blue Cross</li>
              <li>• Canada Life</li>
              <li>• Green Shield</li>
              <li>• Manulife</li>
              <li>• Sun Life</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-4">
            <h3 className="mb-3 font-semibold text-aim-navy">Additional Carriers</h3>
            <ul className="space-y-2 text-sm text-aim-slate/85">
              <li>• Pacific Blue Cross</li>
              <li>• Medavie Blue Cross</li>
              <li>• Desjardins</li>
              <li>• Chambers of Commerce Plans</li>
              <li>• Industrial Alliance</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-4">
            <h3 className="mb-3 font-semibold text-aim-navy">Other Carriers</h3>
            <ul className="space-y-2 text-sm text-aim-slate/85">
              <li>• Equitable Life</li>
              <li>• GMS</li>
              <li>• Johnson Insurance</li>
              <li>• First Canadian</li>
              <li>• Beneva</li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-4">
            <h3 className="mb-3 font-semibold text-aim-navy">Claims Support</h3>
            <ul className="space-y-2 text-sm text-aim-slate/85">
              <li>• Claimsecure</li>
              <li>• WorkSafeBC (WCB Alberta)</li>
              <li>• Motor Vehicle Accident (Section B)</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-aim-slate/80">
          Don't see your insurer listed? Call us at (780) 250-8188 to verify coverage.
        </p>
      </Section>

      <Section heading="Understanding Your Coverage" subheading="What physiotherapy benefits typically cover">
        <Prose>
          <p>
            <strong>What's Usually Covered:</strong> Most insurance plans cover physiotherapy, massage therapy, and chiropractic services. Coverage typically includes assessment, treatment, and therapeutic exercises.
          </p>
          <p>
            <strong>Common Plan Features:</strong> Many plans cover 80-100% of charges after your deductible, up to an annual maximum. Some plans require a referral from your doctor.
          </p>
          <p>
            <strong>Deductibles:</strong> Your deductible is the amount you pay before insurance coverage begins. This typically ranges from $0 to $500 annually.
          </p>
          <p>
            <strong>Co-pays:</strong> Some plans have a co-pay (flat fee per visit) rather than a percentage of costs covered.
          </p>
          <p>
            <strong>Annual Maximums:</strong> Plans often have an annual maximum benefit (for example, $2,000/year). Once you reach this, you're responsible for additional charges.
          </p>
        </Prose>
      </Section>

      <Section heading="Partial Coverage & Out-of-Pocket Costs" muted>
        <Prose>
          <p>
            <strong>What if I've Used My Benefits?</strong> Once your annual maximum is reached, you can still continue treatment with us. We work with you on flexible payment arrangements.
          </p>
          <p>
            <strong>No Insurance?</strong> We offer direct pay rates and flexible payment plans. Call us to discuss options that fit your budget.
          </p>
          <p>
            <strong>Maximize Your Benefits:</strong> We help you understand your coverage and plan your treatment to use your benefits effectively. We always inform you when you're approaching your maximum.
          </p>
        </Prose>
      </Section>

      <Section heading="WCB & MVA Direct Billing" subheading="Special coverage for workplace and motor vehicle injuries" center>
        <Prose>
          <p>
            <strong>WorkSafeBC (WCB Alberta):</strong> We're experienced in WCB claims. We coordinate directly with WCB and your employer to manage your rehabilitation and return-to-work plan.
          </p>
          <p>
            <strong>Motor Vehicle Accidents (Section B):</strong> Alberta's Section B coverage supports MVA injury recovery. We guide you through the claims process and bill directly to the system.
          </p>
        </Prose>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="/for-patients/wcb-claims" className="inline-flex rounded-lg bg-aim-teal/10 px-6 py-3 font-semibold text-aim-teal hover:bg-aim-teal/20">
            WCB Information →
          </a>
          <a href="/for-patients/motor-vehicle-accidents" className="inline-flex rounded-lg bg-aim-teal/10 px-6 py-3 font-semibold text-aim-teal hover:bg-aim-teal/20">
            MVA Information →
          </a>
        </div>
      </Section>

      <CtaStrip
        headline="Have Questions About Coverage?"
        subheadline="Our team is happy to help clarify your benefits and verify your coverage."
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
        secondaryCta={{ label: 'Book Appointment', href: '/book' }}
      />
    </>
  );
}
