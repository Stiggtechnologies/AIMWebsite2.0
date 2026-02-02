export const metadata = {
  title: 'AI Disclosure | Alberta Injury Management',
  description: 'How AIM uses AI technology to enhance patient care and service delivery while maintaining human oversight and healthcare standards.',
};

export default function AIDisclosurePage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl mb-8">
          AI Disclosure
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Our Use of AI Technology</h2>
            <p className="text-aim-slate mb-4">
              Alberta Injury Management uses artificial intelligence (AI) technology to enhance patient experience and streamline administrative processes. This disclosure explains how we use AI, its limitations, and the safeguards we have in place.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">AI-Powered Chat Assistant</h2>
            <p className="text-aim-slate mb-4">
              Our website features an AI-powered chat assistant designed to help you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Navigate our services and programs</li>
              <li>Answer frequently asked questions</li>
              <li>Guide you through the booking and intake process</li>
              <li>Provide general information about injury management</li>
              <li>Connect you with the appropriate human staff member when needed</li>
            </ul>
          </section>

          <section className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Important Limitations</h2>
            <p className="text-amber-900 mb-4 font-medium">
              The AI assistant is NOT a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-amber-900">
              <li>It cannot diagnose medical conditions</li>
              <li>It cannot recommend specific treatments or medications</li>
              <li>It cannot provide emergency medical guidance</li>
              <li>It cannot access your personal health records</li>
              <li>It is not a replacement for consultation with healthcare professionals</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Human Oversight</h2>
            <p className="text-aim-slate mb-4">
              All AI interactions are subject to human oversight:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Qualified healthcare professionals review AI recommendations before implementation</li>
              <li>The AI is programmed to escalate complex or urgent matters to human staff</li>
              <li>All medical decisions are made by licensed healthcare providers</li>
              <li>AI outputs are logged and reviewed for quality assurance</li>
              <li>You can always request to speak with a human team member</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Automatic Escalation</h2>
            <p className="text-aim-slate mb-4">
              The AI assistant automatically escalates conversations to human staff when it detects:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Emergency situations requiring immediate medical attention</li>
              <li>Complex medical questions beyond its scope</li>
              <li>Requests for medical advice, diagnosis, or treatment recommendations</li>
              <li>Expressions of dissatisfaction or complaints</li>
              <li>Legal or liability concerns</li>
              <li>Situations requiring clinical judgment</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Data and Privacy</h2>
            <p className="text-aim-slate mb-4">
              AI interactions are subject to our Privacy Policy:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Conversations are encrypted and securely stored</li>
              <li>Data is used only to improve service delivery and patient experience</li>
              <li>No personal health information is used to train AI models</li>
              <li>All data handling complies with PIPEDA and healthcare privacy regulations</li>
              <li>You can request deletion of your AI conversation history</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">AI Provider</h2>
            <p className="text-aim-slate mb-4">
              Our AI assistant is powered by OpenAI's GPT-4 technology, a state-of-the-art language model. We have implemented additional safeguards and customizations specific to healthcare settings to ensure appropriate and safe interactions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Your Choice</h2>
            <p className="text-aim-slate mb-4">
              Use of the AI assistant is entirely optional. You can always choose to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Call us directly at (780) 250-8188</li>
              <li>Email us at info@albertainjurymanagement.ca</li>
              <li>Visit our clinic in person</li>
              <li>Request human assistance at any time during an AI conversation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Feedback</h2>
            <p className="text-aim-slate mb-4">
              We welcome your feedback on our use of AI technology. If you have concerns, suggestions, or questions about AI interactions:
            </p>
            <div className="bg-aim-steel-blue p-6 rounded-lg">
              <p className="text-aim-slate">Email: ai-feedback@albertainjurymanagement.ca</p>
              <p className="text-aim-slate">Phone: (780) 250-8188</p>
            </div>
          </section>

          <section className="mb-12 bg-aim-steel-blue p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Emergency Situations</h2>
            <p className="text-aim-slate font-medium">
              If you are experiencing a medical emergency, do not use the AI assistant. Call 911 or go to your nearest emergency department immediately.
            </p>
          </section>

          <p className="text-sm text-aim-slate/60 mt-12">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
