# Advertising compliance — College of Physiotherapists of Alberta

This repo contains advertising for physiotherapy services in Alberta. That makes the
copy and imagery a regulated activity, not just marketing.

**The College actively screens this website.** It runs an *Advertising Compliance
Verification Tool* that crawls clinic websites and social accounts, flags certain
words and phrases, and sends the report to the Registrar. The College reports that
websites are flagged more often than social accounts, and that **superlative
language is the most common finding**. A physiotherapist is responsible for
correcting any site that promotes their practice, including sites managed by a
third party ([College news, 2023](https://www.cpta.ab.ca/news-and-updates/news/good-practice-what-has-the-advertising-compliance-verification-tool-shown-thus-far-a-must-read-for-pts/)).

There is no College pre-approval service. Compliance is demonstrated by
self-screening against the published standard, and by the registrant reviewing and
approving the content — the standard explicitly requires the physiotherapist to
"review and approve all advertisements, marketing and promotional activities
prepared by a third party".

## Sources

| Source | What it governs |
| --- | --- |
| [Advertising and Marketing Standard of Practice](https://www.cpta.ab.ca/docs/62/Advertising_and_Marketing.pdf) (Jan 2025) | Truthful, accurate, verifiable advertising; superlatives; guarantees; incentives |
| [Titles, Credentials and Specialty Designations Standard](https://www.cpta.ab.ca/docs/272/_CombinedStandards.pdf) | "Clinical Specialist", protected titles, use of "Dr." |
| Health Professions Act s.102 | Shall not advertise in a manner that is untruthful, inaccurate or misleading |
| Health Professions Act s.128(7) | No "Doctor"/"Dr." in connection with providing a health service unless authorised |
| [Social Media Guide](https://www.cpta.ab.ca/docs/235/Social_Media_Guide.pdf) | Client photos, testimonials, privacy, consent |
| [Privacy Guide / HIA](https://www.cpta.ab.ca/for-physiotherapists/resources/privacy/) | Consent before disclosing client information, including images |

Retrieved November 2025.

## What the standard prohibits, and what we do instead

### 1. Superlatives and comparative claims

> "statements such as 'expert', 'best' or 'number 1' are examples of superlative
> statements" — and the College adds "elite, advanced, premier".

| Do not write | Write instead |
| --- | --- |
| Expert physiotherapy | Physiotherapy / registered physiotherapists |
| Expert care for whiplash | Care for whiplash |
| Alberta's leading platform | Alberta's integrated rehabilitation platform |
| The best path to recovery | The right path for you |
| Proven results / proven outcomes | Measurable progress / tracked outcomes |
| Trusted partner *(advisory — a claim of special advantage)* | What we actually do: "we bill WCB directly", "we report to your case manager" |

### 2. Specialisation

Only a physiotherapist authorised by the Registrar may use "Clinical Specialist"
or imply specialist status. "Specialist", "specialized", "specialization" are
treated as both superlative and title problems.

| Do not write | Write instead |
| --- | --- |
| Specialized rehabilitation programs | Rehabilitation programs |
| We specialize in WCB rehabilitation | Our work focuses on WCB rehabilitation |
| Specialized practitioners | Clinicians with focused training |
| Movement specialists | Movement assessment / clinicians who assess movement |
| Sports & conditions we specialize in | Sports & conditions we work with |

**Allowed:** references to *other* professions — "specialist consultation",
"your physician or specialist", "specialists involved". The checker allowlists
these by phrase with a stated reason.

**Practice focus is still allowed** if it is a demonstrated focus of practice with
ongoing professional development — describe the training and the work, not the title.

### 3. Guarantees and outcome promises

No guarantees of outcome, and no unrealistic expectations. Efficacy claims need
evidence that can be readily verified.

- Removed: "gets you back to work, sport, and life faster", "stronger and faster",
  "proven results".
- Keep: descriptions of what is measured, how progress is reviewed, and who the
  service is for.
- If a specific success rate is ever quoted, it must carry a reference — the
  College gives the example of a shockwave success-rate claim needing a citation.

### 4. Inducements

Not permitted: free physiotherapy services advertised as an inducement (free
consultations, screenings, assessments, trials), discounts off the fee schedule,
coupons, gift certificates, time-limited pricing, prizes or gifts of service.
"Free parking" is not a physiotherapy service and is fine.

The `/aim-performance-south-common` FAQ already answers "Is there a free
assessment?" with an explicit no — that pattern is correct and is allowlisted in
the checker.

### 5. Titles

No "Doctor" or "Dr." for a physiotherapist providing services to the public, even
with a DPT or PhD (HPA s.128(7)). Use the protected title and initials as they
appear on the register: Physiotherapist / Physical Therapist / P.T.

### 6. Photography and patient images

The College *discourages* posting client pictures, videos, testimonials or client
stories because of the privacy risk. If they are used, express consent is required
and the client must be told how the image will be shared, where it will be stored,
how long it will be retained, that it may exist online in perpetuity, and the
limits of the clinic's control over it.

Rules this repo enforces in the image layer:

1. **No identifiable patients.** We do not publish photos of patients, with or
   without consent, in the interim library. The images are licensed/AI-assisted
   illustrative scenes.
2. **Nothing may imply the image is our clinic, our team or our patient.** No
   "Meet the team" photo grids built from illustrative images, no names or titles
   attached to an illustrative face, no captions like "our treatment room in
   South Common".
3. **No before/after imagery** and no image paired with an outcome claim.
4. **Illustrative photography is disclosed.** The footer carries a
   photography note, and `/ai-disclosure` explains how imagery is produced.
5. **Alt text is descriptive only.** It lives in `lib/media.ts`, not in the page,
   so a page author cannot attach a claim to a photo.

## Automated gate

```bash
npm run check:copy        # fails on any College-flagged language
npm run check:copy -- --json
```

`scripts/check-advertising-copy.mjs` scans `app/`, `components/` and `lib/content/`,
strips class names and comments, and reports findings by rule with the Standard
each rule comes from. The allowlist is explicit and commented — every exemption
states *why* it is not a claim (for example "best practice" is a clinical term of
art, "specialist consultation" refers to another profession).

The checker was not written speculatively: the first run against `main` produced
**76 findings** — 34 superlative, 39 specialisation, 3 outcome claims — all of
which are fixed in this branch.

## Still the registrant's call

These are judgement items the checker cannot decide:

- **Approval.** A physiotherapist registered with the College must review and
  approve the copy and imagery before launch. Keep a record of who approved what,
  and when.
- **"Trusted" and similar.** Flagged as advisory, not blocking. "Alberta's trusted
  partner" is a claim of special advantage that is hard to verify. Prefer
  describing the service.
- **Practice focus.** If the site says a clinician's work focuses on, say, pelvic
  health or sport, be able to show the continuing education behind it.
- **Testimonials and reviews.** Do not ask clients for reviews or offer anything in
  return. Existing Google reviews may be displayed; do not add patient stories
  with photos.
- **Clinical Specialist.** If any page wants the actual title, the clinician must
  hold the designation and Registrar authorisation.
