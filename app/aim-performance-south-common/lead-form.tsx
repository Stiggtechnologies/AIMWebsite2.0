'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

// =============================================================================
// Lead form for the AIM Performance South Common landing page.
//
// Frontend-only on purpose for this first launch. The page is built to be
// safely deployed before any backend integration. Submission today logs the
// payload + tracking events to the console and shows a success state.
//
// Future integrations (see TODO blocks below):
//   - Supabase insert into `aim_performance_leads`
//   - HubSpot / GoHighLevel CRM task creation
//   - Email notification to AIM admin
//   - SMS notification for high-intent paid-assessment / WCB / employer leads
//   - GA4 + Meta Pixel + Google Ads conversion events
// =============================================================================

type InterestValue =
  | 'founder-access'
  | 'paid-physio-assessment'
  | 'return-to-gym'
  | 'mobility-performance'
  | 'workshops'
  | 'employer-program'
  | 'claim-coverage';

type InterestOption = {
  value: InterestValue;
  label: string;
  conversionEvent?: string;
};

const INTEREST_OPTIONS: readonly InterestOption[] = [
  { value: 'founder-access', label: 'Founder Access', conversionEvent: 'aim_founder_access_submit' },
  { value: 'paid-physio-assessment', label: 'Paid physiotherapy assessment', conversionEvent: 'aim_paid_assessment_interest' },
  { value: 'return-to-gym', label: 'Return-to-gym recovery' },
  { value: 'mobility-performance', label: 'Mobility / performance classes' },
  { value: 'workshops', label: 'Education workshops', conversionEvent: 'aim_workshop_interest' },
  { value: 'employer-program', label: 'Employer / workplace program', conversionEvent: 'aim_employer_program_interest' },
  { value: 'claim-coverage', label: 'WCB / insurance / motor vehicle injury support', conversionEvent: 'aim_claim_coverage_interest' },
];

const EVOLVE_MEMBER_OPTIONS = ['Yes', 'No', 'Not yet'] as const;
const CONTACT_METHOD_OPTIONS = ['Phone', 'Email', 'Text'] as const;

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
type UtmKey = (typeof UTM_KEYS)[number];
type Utm = Partial<Record<UtmKey, string>>;

interface Errors {
  firstName?: string;
  email?: string;
  interests?: string;
  consent?: string;
}

const PHONE_FALLBACK = '(780) 250-8188';

const inputBase =
  'w-full rounded-lg border border-aim-divider-gray bg-white px-4 py-3 text-sm text-aim-navy placeholder:text-aim-slate/50 focus:border-aim-teal focus:outline-none focus:ring-2 focus:ring-aim-teal/30';

const labelBase = 'block text-sm font-semibold text-aim-navy';

export function LeadForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [evolveMember, setEvolveMember] = useState<string>('');
  const [interests, setInterests] = useState<Set<InterestValue>>(new Set());
  const [contactMethod, setContactMethod] = useState<string>('Phone');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [utm, setUtm] = useState<Utm>({});
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Capture UTM parameters from the URL so they can be attributed on submit.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const captured: Utm = {};
    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) captured[key] = value;
    });
    setUtm(captured);
  }, []);

  const toggleInterest = (value: InterestValue) => {
    setInterests((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!firstName.trim()) next.firstName = 'First name is required.';
    if (!email.trim()) {
      next.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    if (interests.size === 0) {
      next.interests = 'Select at least one area of interest.';
    }
    if (!consent) {
      next.consent = 'Consent is required to submit this form.';
    }
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Focus the first invalid field for keyboard / screen-reader users.
      const firstFieldId =
        (nextErrors.firstName && 'firstName') ||
        (nextErrors.email && 'email') ||
        (nextErrors.interests && 'interests-error') ||
        (nextErrors.consent && 'consent-error') ||
        null;
      if (firstFieldId && typeof document !== 'undefined') {
        const el = document.getElementById(firstFieldId) as HTMLElement | null;
        if (el && typeof el.focus === 'function') el.focus();
      }
      return;
    }

    setIsSubmitting(true);

    const selectedInterests = Array.from(interests);
    const payload = {
      first_name: firstName.trim(),
      last_name: lastName.trim() || null,
      email: email.trim(),
      phone: phone.trim() || null,
      is_evolve_member: evolveMember || null,
      interests: selectedInterests,
      preferred_contact_method: contactMethod || null,
      message: message.trim() || null,
      consent_given: consent,
      source: 'aim-performance-south-common-landing-page',
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
      utm_content: utm.utm_content ?? null,
      utm_term: utm.utm_term ?? null,
    };

    try {
      const response = await fetch('/api/aim-performance/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 400) {
          // Map server-side field errors back to inline form errors.
          const data = (await response.json().catch(() => null)) as
            | { details?: Record<string, string[] | undefined> }
            | null;
          const d = data?.details;
          const mapped: Errors = {};
          if (d?.first_name?.[0]) mapped.firstName = d.first_name[0];
          if (d?.email?.[0]) mapped.email = d.email[0];
          if (d?.interests?.[0]) mapped.interests = d.interests[0];
          if (d?.consent_given?.[0]) mapped.consent = d.consent_given[0];
          if (Object.keys(mapped).length > 0) {
            setErrors(mapped);
          } else {
            setSubmitError(
              `We couldn't process your submission. Please call ${PHONE_FALLBACK} for assistance.`
            );
          }
        } else if (response.status === 429) {
          setSubmitError('Too many submissions from this network — please try again in a moment.');
        } else {
          setSubmitError(
            `Something went wrong on our end. Please try again or call ${PHONE_FALLBACK}.`
          );
        }
        return;
      }

      // Successful insert. Fire conversion events on success only.
      // TODO: swap these console logs for real GA4 / Meta Pixel / Google Ads
      // calls once Ads conversion actions and Pixel are configured.
      //   - GA4:        gtag('event', 'aim_founder_access_submit', { ... })
      //   - Google Ads: gtag('event', 'conversion', { send_to: 'AW-XXX/label' })
      //   - Meta Pixel: fbq('trackCustom', 'AIMFounderAccessSubmit', { ... })
      console.info('[aim_founder_access_submit]', { interests: selectedInterests });
      INTEREST_OPTIONS.forEach((opt) => {
        if (!opt.conversionEvent) return;
        if (interests.has(opt.value)) {
          console.info(`[${opt.conversionEvent}]`, { interest: opt.value });
        }
      });

      setSuccess(true);
      // TODO: optionally redirect to /aim-performance-south-common/thank-you
      //       once that route exists, so GA4 / Meta / Google Ads can fire a
      //       conversion against a dedicated URL.
    } catch (err) {
      console.error('Lead submit failed:', err);
      setSubmitError(
        `We couldn't reach our servers. Please check your connection or call ${PHONE_FALLBACK}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const interestErrorId = errors.interests ? 'interests-error' : undefined;
  const utmDebug = useMemo(
    () => Object.entries(utm).map(([k, v]) => `${k}=${v}`).join(' '),
    [utm]
  );

  if (success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-aim-teal/40 bg-white p-8 shadow-xl sm:p-10"
      >
        <div className="flex items-start gap-4">
          <CheckCircle2 className="mt-1 h-8 w-8 flex-shrink-0 text-aim-teal" aria-hidden="true" />
          <div>
            <h3 className="text-2xl font-bold text-aim-navy">Thank you.</h3>
            <p className="mt-3 text-base leading-relaxed text-aim-slate">
              Your interest has been received. The AIM Performance team will contact you with next steps.
            </p>
            <p className="mt-4 text-sm text-aim-slate/80">
              Founder Access does not include physiotherapy assessment, diagnosis, or treatment.
              Physiotherapy services are available separately by appointment and are billed according
              to AIM&rsquo;s published fee schedule.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-aim-divider-gray/60 bg-white p-6 shadow-xl sm:p-10"
      aria-labelledby="lead-form-heading"
    >
      {submitError && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div
          role="alert"
          aria-labelledby="form-error-summary-heading"
          className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4"
        >
          <h3
            id="form-error-summary-heading"
            className="flex items-center gap-2 text-sm font-semibold text-red-900"
          >
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            Please fix the following before submitting:
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-9 text-sm text-red-800">
            {errors.firstName && (
              <li>
                <a href="#firstName" className="underline hover:no-underline">
                  {errors.firstName}
                </a>
              </li>
            )}
            {errors.email && (
              <li>
                <a href="#email" className="underline hover:no-underline">
                  {errors.email}
                </a>
              </li>
            )}
            {errors.interests && (
              <li>
                <a href="#interests-error" className="underline hover:no-underline">
                  {errors.interests}
                </a>
              </li>
            )}
            {errors.consent && (
              <li>
                <a href="#consent-error" className="underline hover:no-underline">
                  {errors.consent}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelBase}>
            First name <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            className={`${inputBase} mt-2`}
          />
          {errors.firstName && (
            <p id="firstName-error" className="mt-1 text-sm text-red-700">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={labelBase}>
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`${inputBase} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelBase}>
            Email <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${inputBase} mt-2`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-700">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelBase}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${inputBase} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="evolveMember" className={labelBase}>
            Are you an Evolve Strength member?
          </label>
          <select
            id="evolveMember"
            name="evolveMember"
            value={evolveMember}
            onChange={(e) => setEvolveMember(e.target.value)}
            className={`${inputBase} mt-2`}
          >
            <option value="">Select an option</option>
            {EVOLVE_MEMBER_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className={labelBase}>Preferred contact method</span>
          <div className="mt-2 flex flex-wrap gap-3" role="radiogroup" aria-label="Preferred contact method">
            {CONTACT_METHOD_OPTIONS.map((opt) => {
              const selected = contactMethod === opt;
              return (
                <label
                  key={opt}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    selected
                      ? 'border-aim-teal bg-aim-teal/10 text-aim-navy'
                      : 'border-aim-divider-gray bg-white text-aim-slate hover:border-aim-teal/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value={opt}
                    checked={selected}
                    onChange={() => setContactMethod(opt)}
                    className="sr-only"
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <fieldset
        className="mt-6"
        aria-describedby={interestErrorId}
        aria-invalid={Boolean(errors.interests)}
      >
        <legend className={labelBase}>
          What are you interested in? <span className="text-red-600" aria-hidden="true">*</span>
        </legend>
        <p className="mt-1 text-xs text-aim-slate/70">Select all that apply.</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {INTEREST_OPTIONS.map((opt) => {
            const checked = interests.has(opt.value);
            return (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${
                  checked
                    ? 'border-aim-teal bg-aim-teal/5'
                    : 'border-aim-divider-gray bg-white hover:border-aim-teal/50'
                }`}
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={checked}
                  onChange={() => toggleInterest(opt.value)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-aim-divider-gray text-aim-teal focus:ring-aim-teal"
                />
                <span className="text-aim-slate">{opt.label}</span>
              </label>
            );
          })}
        </div>
        {errors.interests && (
          <p id="interests-error" className="mt-2 text-sm text-red-700">
            {errors.interests}
          </p>
        )}
      </fieldset>

      <div className="mt-6">
        <label htmlFor="message" className={labelBase}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Briefly tell us what you would like help with. Please do not include sensitive medical details."
          className={`${inputBase} mt-2 resize-y`}
        />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-aim-slate">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 flex-shrink-0 rounded border-aim-divider-gray text-aim-teal focus:ring-aim-teal"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
          />
          <span>
            I consent to be contacted by AIM Performance / Alberta Injury Management about my
            inquiry. I understand Founder Access does not include physiotherapy assessment,
            diagnosis, or treatment.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-2 text-sm text-red-700">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        data-tracking-event="aim_cta_click"
        data-cta-id="lead-form-submit"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-aim-navy px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-aim-navy/90 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending&hellip;
          </>
        ) : (
          'Submit My Interest'
        )}
      </button>

      <p className="mt-4 text-sm leading-relaxed text-aim-slate">
        After you submit, the AIM Performance team will follow up by your preferred contact method
        within one business day to share next steps.
      </p>

      <p className="mt-6 text-xs leading-relaxed text-aim-slate/70">
        By submitting this form, you consent to Alberta Injury Management / AIM Performance contacting
        you about your inquiry. Do not submit urgent medical information through this form. If you
        have a medical emergency, call 911 or seek urgent care.
      </p>

      {/* UTM debug aid for QA. Hidden visually; useful when copying campaign URLs. */}
      {utmDebug && (
        <span className="sr-only" aria-hidden="true" data-utm={utmDebug} />
      )}
    </form>
  );
}
