/**
 * Shown in place of the Founder Access lead form while AIM Performance South
 * Common is paused.
 *
 * The form collected a name, email and phone behind a consent checkbox, and
 * invited people to request a *paid* physiotherapy assessment, for a location
 * that may not go ahead. Collecting contact details and consent against a
 * promise you may not be able to keep is the part that needed stopping — not
 * the page itself, which stays up for anyone holding a direct link.
 *
 * Nobody had submitted the form before it was switched off (checked 2026-09-01:
 * `aim_performance_leads` was empty), so there is no one owed a follow-up.
 *
 * To restore: put <LeadForm /> back in page.tsx and lift the 410 in
 * app/api/aim-performance/leads/route.ts. Both are one-liners; nothing was
 * deleted.
 */
export function RegistrationPaused() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-aim-divider-gray/60 bg-white p-8 text-center">
      <h3 className="text-xl font-semibold text-aim-navy">
        Founder Access registration is closed for now
      </h3>
      <p className="mt-3 text-aim-slate/85">
        AIM Performance South Common has been put on hold, and we are not taking
        registrations or assessment requests for it. We would rather say that
        plainly than keep a sign-up form open for a date we cannot promise.
      </p>
      <p className="mt-3 text-aim-slate/85">
        Our open Edmonton clinics are seeing patients now, usually within the
        week.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href="/locations"
          className="inline-flex items-center rounded-xl bg-aim-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-aim-teal/90"
        >
          See our open locations
        </a>
        <a
          href="/contact"
          className="inline-flex items-center rounded-xl border border-aim-navy/15 bg-aim-off-white px-5 py-2.5 text-sm font-semibold text-aim-navy transition hover:bg-aim-navy/5"
        >
          Contact us
        </a>
      </div>
    </div>
  );
}
