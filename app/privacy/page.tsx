export const metadata = {
  title: 'Privacy Policy | Alberta Injury Management',
  description: 'AIM privacy policy and commitment to protecting your personal health information in accordance with HIPAA and PIPEDA regulations.',
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-aim-slate mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Our Commitment to Privacy</h2>
            <p className="text-aim-slate mb-4">
              Alberta Injury Management (AIM) is committed to protecting the privacy and confidentiality of your personal health information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA), Health Information Act (HIA) of Alberta, and applicable healthcare privacy regulations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Information We Collect</h2>
            <p className="text-aim-slate mb-4">We collect information necessary to provide you with quality healthcare services:</p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Personal identification information (name, date of birth, contact information)</li>
              <li>Insurance information (WCB claim numbers, MVA insurance details, private insurance)</li>
              <li>Medical history and health information</li>
              <li>Treatment records and progress notes</li>
              <li>Payment and billing information</li>
              <li>Communication records (appointments, messages, calls)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">How We Use Your Information</h2>
            <p className="text-aim-slate mb-4">We use your personal health information for:</p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Providing and coordinating your healthcare treatment</li>
              <li>Communicating with you about your care</li>
              <li>Processing insurance claims and billing</li>
              <li>Coordinating with other healthcare providers (with your consent)</li>
              <li>Meeting legal and regulatory requirements</li>
              <li>Improving our services and quality of care</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Information Disclosure</h2>
            <p className="text-aim-slate mb-4">
              We do not sell, rent, or trade your personal health information. We may disclose your information only:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>With your explicit consent</li>
              <li>To insurance companies for claim processing and authorization</li>
              <li>To other healthcare providers involved in your care (with consent)</li>
              <li>When required by law or legal process</li>
              <li>To employers when coordinating return-to-work (limited to necessary information with consent)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Data Security</h2>
            <p className="text-aim-slate mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Encrypted data transmission and storage</li>
              <li>Secure, password-protected electronic health records</li>
              <li>Limited access to information based on role and necessity</li>
              <li>Regular security audits and updates</li>
              <li>Staff training on privacy and security protocols</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Your Rights</h2>
            <p className="text-aim-slate mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Access your personal health information</li>
              <li>Request corrections to your information</li>
              <li>Request restrictions on certain uses or disclosures</li>
              <li>Receive an accounting of disclosures</li>
              <li>File a complaint if you believe your privacy rights have been violated</li>
              <li>Withdraw consent for certain uses (subject to legal requirements)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">AI and Technology Use</h2>
            <p className="text-aim-slate mb-4">
              We use AI-assisted tools to improve service delivery and patient experience. All AI interactions are:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Subject to the same privacy protections as other health information</li>
              <li>Logged and secured in accordance with healthcare privacy regulations</li>
              <li>Never used for medical diagnosis or treatment decisions</li>
              <li>Supervised by qualified healthcare professionals</li>
            </ul>
            <p className="text-aim-slate mt-4">
              See our <a href="/ai-disclosure" className="text-aim-teal hover:underline">AI Disclosure</a> for more information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Contact Us</h2>
            <p className="text-aim-slate mb-4">
              For questions about this Privacy Policy or to exercise your privacy rights, contact our Privacy Officer:
            </p>
            <div className="bg-aim-steel-blue p-6 rounded-lg">
              <p className="font-medium text-aim-navy">Alberta Injury Management</p>
              <p className="text-aim-slate">Privacy Officer</p>
              <p className="text-aim-slate">11420 170 St NW, Edmonton, AB T5S 1J7</p>
              <p className="text-aim-slate">Email: privacy@albertainjurymanagement.ca</p>
              <p className="text-aim-slate">Phone: (780) 250-8188</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Changes to This Policy</h2>
            <p className="text-aim-slate">
              We may update this Privacy Policy from time to time. Material changes will be posted on our website and, where appropriate, communicated to you directly. Your continued use of our services after changes are posted constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
