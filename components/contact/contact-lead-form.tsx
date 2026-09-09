'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useTracking } from '@/components/providers/tracking-provider';
import { contactInterestSchema, type ContactInterest } from '@/lib/contact-lead';
import { getUtmsForPayload } from '@/lib/utm';

interface ContactLeadFormProps {
  initialInterest?: string;
}

export function ContactLeadForm({ initialInterest }: ContactLeadFormProps) {
  const parsedInterest = contactInterestSchema.safeParse(initialInterest);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState<ContactInterest>(
    parsedInterest.success ? parsedInterest.data : 'general',
  );
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { trackFormStart, trackFormSubmit } = useTracking();
  const [started, setStarted] = useState(false);

  const markStarted = () => {
    if (started) return;
    setStarted(true);
    trackFormStart('website-contact', interest);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          interest,
          message,
          consent_given: consent,
          page_path: '/contact',
          ...getUtmsForPayload(),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'We could not send your message.');
      }

      trackFormSubmit('website-contact', interest, true);
      setReference(result.reference);
    } catch (submissionError) {
      trackFormSubmit('website-contact', interest, false);
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'We could not send your message. Please call (780) 250-8188.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (reference) {
    return (
      <div className="rounded-2xl border border-aim-teal/30 bg-aim-teal/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-aim-teal" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold text-aim-navy">Your message is in the clinic queue.</h3>
        <p className="mt-3 text-aim-slate">
          It is saved in AIM OS and the clinic team has been notified. Reference: <strong>{reference}</strong>
        </p>
      </div>
    );
  }

  const inputClass = 'mt-2 w-full rounded-lg border border-aim-divider-gray bg-white px-4 py-2.5 text-aim-navy placeholder-aim-slate/50 focus:border-aim-teal focus:outline-none focus:ring-1 focus:ring-aim-teal';

  return (
    <form className="space-y-6" onFocus={markStarted} onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-aim-navy">Full Name</label>
          <input
            type="text"
            id="contact-name"
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-aim-navy">Email</label>
          <input
            type="email"
            id="contact-email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-semibold text-aim-navy">Phone</label>
        <input
          type="tel"
          id="contact-phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className={inputClass}
          placeholder="(780) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="contact-interest" className="block text-sm font-semibold text-aim-navy">What&apos;s This About?</label>
        <select
          id="contact-interest"
          value={interest}
          onChange={(event) => setInterest(event.target.value as ContactInterest)}
          className={inputClass}
        >
          <option value="patient">Patient Booking</option>
          <option value="referral">Healthcare Referral</option>
          <option value="employer">Employer Inquiry</option>
          <option value="legal">Legal Referral</option>
          <option value="partnerships">Partnership Inquiry</option>
          <option value="careers">Career Opportunity</option>
          <option value="general">General Question</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-aim-navy">Message</label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={inputClass}
          placeholder="Tell us what you need. Do not include medical, claim, or other sensitive details."
        />
        <p className="mt-2 text-xs text-aim-slate/75">
          Please keep this to contact and routing information. The clinic will collect health and claim details securely.
        </p>
      </div>

      <label className="flex items-start gap-3 text-sm text-aim-slate">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-aim-divider-gray text-aim-teal focus:ring-aim-teal"
        />
        <span>I consent to AIM contacting me about this request.</span>
      </label>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-aim-teal px-6 py-3 text-center font-semibold text-white transition hover:bg-aim-teal/90 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-65"
      >
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        {submitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
