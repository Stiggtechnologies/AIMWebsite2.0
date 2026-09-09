'use client';

import { FormEvent, useRef, useState } from 'react';
import { CheckCircle2, Loader2, LockKeyhole } from 'lucide-react';
import { getUtmsForPayload } from '@/lib/utm';
import { useTracking } from '@/components/providers/tracking-provider';
import type { PartnerCategory } from '@/lib/partner-inquiry';

type FormOption = { value: string; label: string };

const INTERESTS: Record<PartnerCategory, FormOption[]> = {
  employer: [
    { value: 'rapid-access', label: 'Rapid access for injured workers' },
    { value: 'return-to-work', label: 'Return-to-work and modified duties' },
    { value: 'onsite-services', label: 'Onsite workplace services' },
    { value: 'ergonomics-prevention', label: 'Ergonomics and injury prevention' },
    { value: 'manager-education', label: 'Manager or workforce education' },
    { value: 'other', label: 'Other employer need' },
  ],
  healthcare: [
    { value: 'referral-pathway', label: 'Patient referral pathway' },
    { value: 'care-coordination', label: 'Care coordination and updates' },
    { value: 'wcb-mva', label: 'WCB or MVA rehabilitation' },
    { value: 'service-information', label: 'Service and provider information' },
    { value: 'education', label: 'Educational collaboration' },
    { value: 'other', label: 'Other referral need' },
  ],
  legal: [
    { value: 'client-referral', label: 'Client rehabilitation referral' },
    { value: 'mva-rehabilitation', label: 'Motor vehicle accident rehabilitation' },
    { value: 'records-reporting', label: 'Records and clinical reporting process' },
    { value: 'functional-assessment', label: 'Functional assessment information' },
    { value: 'billing-coordination', label: 'Billing and authorization coordination' },
    { value: 'other', label: 'Other legal referral need' },
  ],
};

const REGIONS: FormOption[] = [
  { value: 'edmonton-clinic', label: 'Edmonton clinic-based care' },
  { value: 'greater-edmonton-onsite', label: 'Greater Edmonton onsite support' },
  { value: 'alberta-remote', label: 'Alberta-wide remote support' },
  { value: 'alberta-onsite', label: 'Onsite elsewhere in Alberta' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const VOLUMES: FormOption[] = [
  { value: 'occasional', label: 'Occasional referrals or cases' },
  { value: '1-5-month', label: 'Approximately 1–5 per month' },
  { value: '6-20-month', label: 'Approximately 6–20 per month' },
  { value: '21-plus-month', label: 'More than 20 per month' },
  { value: 'program-level', label: 'Organization-wide program' },
  { value: 'unknown', label: 'Not sure yet' },
];

const CATEGORY_COPY: Record<PartnerCategory, { title: string; description: string }> = {
  employer: {
    title: 'Discuss an employer program',
    description: 'Tell us about the organization and delivery area. We will respond with the most practical next step.',
  },
  healthcare: {
    title: 'Establish a referral pathway',
    description: 'Use this form for practice-level coordination. For an individual patient, call the clinic and use the secure clinical referral process.',
  },
  legal: {
    title: 'Discuss legal referral coordination',
    description: 'Use this form for firm-level or process questions. Individual client information must be transferred through an approved secure channel.',
  },
};

export function PartnerInquiryForm({ category }: { category: PartnerCategory }) {
  const { trackFormStart, trackFormSubmit } = useTracking();
  const started = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const copy = CATEGORY_COPY[category];
  const formId = `partner-inquiry-${category}`;

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackFormStart(formId, `partner_${category}`);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      category,
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      organization: data.get('organization'),
      role: data.get('role'),
      email: data.get('email'),
      phone: data.get('phone'),
      interest: data.get('interest'),
      service_region: data.get('service_region'),
      expected_volume: data.get('expected_volume'),
      preferred_contact: data.get('preferred_contact'),
      message: data.get('message'),
      consent_given: data.get('consent_given') === 'on',
      page_path: window.location.pathname,
      ...getUtmsForPayload(),
    };

    try {
      const response = await fetch('/api/partner-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Submission failed');

      setReference(result.reference);
      trackFormSubmit(formId, `partner_${category}`, true);
      form.reset();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'We could not save your request. Please call (780) 250-8188.',
      );
      trackFormSubmit(formId, `partner_${category}`, false);
    } finally {
      setSubmitting(false);
    }
  }

  if (reference) {
    return (
      <div className="rounded-2xl border border-aim-teal/30 bg-aim-steel-blue/60 p-8" role="status">
        <CheckCircle2 className="h-10 w-10 text-aim-teal" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold text-aim-navy">Your request is in the AIM OS queue</h3>
        <p className="mt-3 text-aim-slate">
          Our team will review it and follow up using your preferred contact method. Reference: <strong>{reference}</strong>
        </p>
        <p className="mt-3 text-sm text-aim-slate/75">
          Please do not email patient, worker, claim or medical details until the team provides an approved secure channel.
        </p>
      </div>
    );
  }

  const inputClass = 'mt-2 w-full rounded-lg border border-aim-divider-gray bg-white px-4 py-3 text-aim-navy placeholder:text-aim-slate/45 focus:border-aim-teal focus:outline-none focus:ring-2 focus:ring-aim-teal/20';

  return (
    <div className="rounded-2xl border border-aim-divider-gray/60 bg-white p-6 shadow-xl shadow-aim-navy/5 md:p-8">
      <h3 className="text-2xl font-bold text-aim-navy">{copy.title}</h3>
      <p className="mt-2 text-aim-slate/80">{copy.description}</p>

      <form id={formId} className="mt-7 space-y-5" onFocus={markStarted} onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-aim-navy">
            First name
            <input className={inputClass} name="first_name" autoComplete="given-name" required />
          </label>
          <label className="text-sm font-semibold text-aim-navy">
            Last name
            <input className={inputClass} name="last_name" autoComplete="family-name" required />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-aim-navy">
            Organization
            <input className={inputClass} name="organization" autoComplete="organization" required />
          </label>
          <label className="text-sm font-semibold text-aim-navy">
            Role or title <span className="font-normal text-aim-slate/60">(optional)</span>
            <input className={inputClass} name="role" autoComplete="organization-title" />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-aim-navy">
            Work email
            <input className={inputClass} type="email" name="email" autoComplete="email" required />
          </label>
          <label className="text-sm font-semibold text-aim-navy">
            Phone <span className="font-normal text-aim-slate/60">(optional)</span>
            <input className={inputClass} type="tel" name="phone" autoComplete="tel" />
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-aim-navy">
            Area of interest
            <select className={inputClass} name="interest" defaultValue="" required>
              <option value="" disabled>Select one</option>
              {INTERESTS[category].map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-aim-navy">
            Service footprint
            <select className={inputClass} name="service_region" defaultValue="not-sure">
              {REGIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-aim-navy">
            Anticipated volume
            <select className={inputClass} name="expected_volume" defaultValue="unknown">
              {VOLUMES.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-semibold text-aim-navy">
            Preferred contact
            <select className={inputClass} name="preferred_contact" defaultValue="email">
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="either">Either</option>
            </select>
          </label>
        </div>

        <label className="block text-sm font-semibold text-aim-navy">
          Organization-level context <span className="font-normal text-aim-slate/60">(optional)</span>
          <textarea
            className={inputClass}
            name="message"
            rows={4}
            placeholder="Tell us about the service, workflow or coverage area you want to discuss."
          />
        </label>

        <div className="flex items-start gap-3 rounded-lg bg-aim-steel-blue/55 p-4 text-sm text-aim-slate">
          <LockKeyhole className="mt-0.5 h-5 w-5 flex-none text-aim-teal" aria-hidden="true" />
          <p>
            Do not include patient or worker names, diagnoses, claim numbers, dates of birth, medical history or records in this form.
          </p>
        </div>

        <label className="flex items-start gap-3 text-sm text-aim-slate">
          <input className="mt-1 h-4 w-4 rounded border-aim-divider-gray text-aim-teal focus:ring-aim-teal" type="checkbox" name="consent_given" required />
          <span>I authorize AIM to contact me about this organization inquiry.</span>
        </label>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-lg bg-aim-teal px-6 py-3.5 font-semibold text-white transition hover:bg-aim-teal/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending securely…</> : 'Send organization inquiry'}
        </button>
      </form>
    </div>
  );
}
