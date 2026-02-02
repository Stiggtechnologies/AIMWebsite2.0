export const metadata = {
  title: 'Accessibility Statement | Alberta Injury Management',
  description: 'AIM commitment to accessibility and compliance with WCAG 2.1 Level AA standards.',
};

export default function AccessibilityPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl mb-8">
          Accessibility Statement
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Our Commitment</h2>
            <p className="text-aim-slate mb-4">
              Alberta Injury Management is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Standards Compliance</h2>
            <p className="text-aim-slate mb-4">
              This website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible for people with disabilities and user-friendly for everyone.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Accessibility Features</h2>
            <p className="text-aim-slate mb-4">Our website includes the following accessibility features:</p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Semantic HTML for better screen reader compatibility</li>
              <li>Keyboard navigation support for all interactive elements</li>
              <li>Visible focus indicators for keyboard users</li>
              <li>ARIA labels and landmarks for improved navigation</li>
              <li>Sufficient color contrast ratios meeting WCAG AA standards</li>
              <li>Responsive design that works across devices and screen sizes</li>
              <li>Alternative text for images and graphics</li>
              <li>Accessible forms with clear labels and error messages</li>
              <li>Skip-to-content links for efficient navigation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">AI Assistant Accessibility</h2>
            <p className="text-aim-slate mb-4">
              Our AI chat assistant is designed with accessibility in mind:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Fully keyboard accessible</li>
              <li>Screen reader compatible with ARIA announcements</li>
              <li>Clear focus management and navigation</li>
              <li>Alternative contact methods available (phone, email)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Physical Accessibility</h2>
            <p className="text-aim-slate mb-4">
              Our clinic locations are designed to be accessible to all patients:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-aim-slate">
              <li>Wheelchair accessible entrances and facilities</li>
              <li>Accessible parking spaces</li>
              <li>Elevator access where applicable</li>
              <li>Accessible washrooms</li>
              <li>Clear pathways and navigation</li>
              <li>Service animals welcome</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Feedback and Contact</h2>
            <p className="text-aim-slate mb-4">
              We welcome your feedback on the accessibility of this website. If you encounter any accessibility barriers or have suggestions for improvement:
            </p>
            <div className="bg-aim-steel-blue p-6 rounded-lg">
              <p className="font-medium text-aim-navy mb-2">Contact Us:</p>
              <p className="text-aim-slate">Email: accessibility@albertainjurymanagement.ca</p>
              <p className="text-aim-slate">Phone: (780) 250-8188</p>
              <p className="text-aim-slate mt-4">
                We aim to respond to accessibility feedback within 3 business days.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Ongoing Improvements</h2>
            <p className="text-aim-slate">
              Accessibility is an ongoing effort. We regularly review our website and services to identify and address accessibility issues. We are committed to maintaining and improving the accessibility of our digital and physical spaces.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Third-Party Content</h2>
            <p className="text-aim-slate">
              While we strive to ensure accessibility across our entire website, some third-party content may not be fully within our control. We work with vendors and partners who share our commitment to accessibility.
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
