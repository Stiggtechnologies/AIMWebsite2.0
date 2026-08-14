// AIM Website 2.0 — Webinars / Video Guides content module.
// Same pattern as lib/content/blog.ts (typed array + getBySlug helpers), rendered by
// components/blocks/webinar-page.tsx via app/resources/webinars/[slug]/page.tsx.
//
// Webinar lifecycle:
//   'scripted'      → content outline written, no recording yet.  Page renders as
//                     a substantive "Coming soon" with learning objectives + segment
//                     titles + companion PDF outline + Book Now / Contact CTAs.
//   'in-production' → recording underway or in edit.  Same public treatment as
//                     'scripted' (we don't publish half-done pages).
//   'published'     → `video` is populated.  Page renders with embed, JSON-LD
//                     VideoObject, transcript link (when available), companion PDF.
//
// The `segments` array is the shooting script — each segment is a minute-anchored
// section the presenter delivers.  It's authored to be read straight through as
// a teleprompter after minor tightening.  Beats accept the same `**bold**` and
// `[label](/href)` inline markdown that the blog uses (see renderInline).

export type WebinarStatus = 'scripted' | 'in-production' | 'published';

export type WebinarSegment = {
  /** Approximate start time in whole minutes from webinar open. */
  minute: number;
  title: string;
  /** Talking-point bullets. May contain **bold** and [label](/href) inline markdown. */
  beats: string[];
};

export type WebinarPresenter = {
  name: string;
  role: string;
  bio?: string | null;
  photoUrl?: string | null;
};

export type WebinarCompanionPdf = {
  title: string;
  description: string;
  /** Bulleted outline of what the finished PDF should contain. */
  contents: string[];
  /** Absolute URL when produced (e.g. /downloads/whiplash-checklist.pdf). Null until then. */
  url?: string | null;
};

export type WebinarVideo = {
  /** Embed URL (e.g. https://player.vimeo.com/video/<id>). Populated when status='published'. */
  embedUrl: string;
  /** Vimeo hosts video assets — this is what's rendered inside an <iframe>. */
  uploadDate: string;       // ISO date
  thumbnailUrl: string;     // absolute URL, used for VideoObject JSON-LD + og:image
  transcriptUrl?: string | null;
  /** ISO 8601 duration, e.g. PT25M. Populated when status='published'. */
  duration: string;
};

export type Webinar = {
  slug: string;
  status: WebinarStatus;
  title: string;
  description: string;             // <meta description> + OG description
  category: string;
  tags: string[];
  presenter: WebinarPresenter;
  targetRuntimeMinutes: number;
  learningObjectives: string[];
  /** Minute-anchored shooting script — presenter reads this to record. */
  segments: WebinarSegment[];
  companionPdf: WebinarCompanionPdf;
  video: WebinarVideo | null;
  publishedAt: string | null;      // ISO date when status='published'
  lastUpdated: string;             // ISO date, always set
  relatedConditions: string[];     // condition slugs (lib/content/conditions.ts)
  relatedServices: string[];       // service slugs (lib/content/services.ts)
  relatedArticles: string[];       // blog slugs (lib/content/blog.ts)
};

export const webinars: Webinar[] = [
  {
    slug: 'whiplash-mva-recovery-first-12-weeks',
    status: 'scripted',
    title: 'Whiplash & MVA Recovery: The First 12 Weeks',
    description:
      'A step-by-step walkthrough of what to expect in the first 12 weeks after a motor vehicle accident in Alberta — the DTPR framework, week-by-week milestones, and when to escalate.',
    category: 'MVA',
    tags: ['whiplash', 'MVA', 'DTPR', 'insurance', 'physiotherapy'],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'Physiotherapy & MVA Rehabilitation',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 25,
    learningObjectives: [
      'Explain the Alberta Diagnostic and Treatment Protocols Regulation (DTPR) in plain language.',
      'List the four things a patient should do in the first 7–14 days after an MVA.',
      'Describe a realistic week-by-week whiplash recovery trajectory.',
      'Identify red flags that warrant escalation beyond routine physiotherapy.',
      'Explain how AIM handles adjuster communication and paperwork on the patient\'s behalf.',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          'One-sentence hook: "Most people recover from whiplash within 12 weeks — but the first two weeks decide how the next 10 go."',
          'Name and credential; two-sentence positioning (AIM sees MVA cases every day; direct-billed to auto insurers).',
          'Preview what the session covers and who it\'s for (anyone in the first 12 weeks post-MVA in Alberta).',
        ],
      },
      {
        minute: 1,
        title: 'The DTPR framework, in plain language',
        beats: [
          'Alberta\'s Diagnostic and Treatment Protocols Regulation classifies common MVA soft-tissue injuries into WAD I / II / III (plus sprains/strains for other regions).',
          'Each category has a defined protocol of insurer-funded treatment with no out-of-pocket cost, in most cases.',
          'Patients don\'t need to figure out their category — the treating physio does that in the assessment.',
          'What the framework does **not** cover well: concussions and more severe injuries — those route slightly differently but still work.',
        ],
      },
      {
        minute: 4,
        title: 'The first 7–14 days: four moves that matter',
        beats: [
          '**See a physician** (family doc, urgent care, or ER if warranted) so injuries are in the medical record.',
          '**Report the accident** to your auto insurer and get a claim number.',
          '**Book a physio assessment** — most clinics can start under the DTPR with just the claim number, adjuster name, and date of accident.',
          '**Move gently.** Bed rest tends to delay recovery. Walking, gentle range-of-motion, and normal light activity is the goal from day one.',
        ],
      },
      {
        minute: 8,
        title: 'A typical week-by-week trajectory',
        beats: [
          '**Week 1:** Symptoms peak in the first 24–72 hours. Focus is sleep, gentle ROM, pain management.',
          '**Weeks 2–4:** Manual therapy, graded movement, starting to load. Headache / dizziness work if present.',
          '**Weeks 4–8:** Return to most daily and recreational activities. Progressive strength, driving, longer sitting tolerance.',
          '**Weeks 8–12:** Full return to demanding activities for most patients. Persistent symptoms get a more layered plan.',
          'Explain that this is a bell curve — some are faster, some are slower, and each timeline is a plan not a promise.',
        ],
      },
      {
        minute: 14,
        title: 'What slows recovery down',
        beats: [
          'Avoidance out of fear ("I don\'t want to hurt it more") — gentle movement is almost always the right call.',
          'Prolonged collar use — outdated advice, associated with slower recovery.',
          'Expecting one treatment to fix it — whiplash rehab is a progression, not an event.',
          'Ignoring concurrent symptoms — headaches, dizziness, jaw pain, cognitive fog all deserve attention.',
        ],
      },
      {
        minute: 18,
        title: 'When to escalate',
        beats: [
          'New or progressive neurological symptoms (weakness, sensory changes) — see a physician promptly.',
          'Severe headache patterns changing in character or intensity — assessment before continuing.',
          'No meaningful improvement after 6–8 weeks of consistent rehab — plan needs to change.',
          'Concussion symptoms that aren\'t settling — dedicated [concussion rehab](/services/concussion-rehabilitation) may be needed.',
        ],
      },
      {
        minute: 21,
        title: 'What AIM handles for you',
        beats: [
          'Insurer billing — direct-billed wherever the auto insurer permits.',
          'DTPR documentation and category assessment.',
          'Adjuster communication about progress and treatment plans.',
          'Coordination with your physician and any specialists.',
          'Internal referral to [massage](/services/massage-therapy), [chiro](/services/chiropractic-care), [vestibular](/services/vestibular-rehabilitation), or concussion rehab when indicated.',
        ],
      },
      {
        minute: 24,
        title: 'Wrap + CTA',
        beats: [
          'Recap: three things — see your doctor, get a claim number, book an assessment. Do those in the first two weeks.',
          'Direct viewers to the companion PDF (12-week checklist) and the [MVA claim guide article](/resources/mva-physio-claim-guide-alberta).',
          'Two clear CTAs: **Book an assessment** and **Book Now**. Both direct-billed to your auto insurer for eligible claims.',
        ],
      },
    ],
    companionPdf: {
      title: '12-Week Whiplash Recovery Checklist',
      description:
        'Printable one-page tracker patients can use week-by-week, with milestones, red-flag prompts, and a place to log symptoms.',
      contents: [
        'What to do in the first 7–14 days (numbered checklist)',
        'Week-by-week milestones with checkboxes',
        'Red-flag prompts (when to call your physician)',
        'Space to record insurer + claim number + adjuster contact',
        'Symptom-tracking grid (sleep, headache, pain 0–10, neck ROM)',
        'AIM contact + direct-billing info',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-13',
    relatedConditions: ['whiplash', 'neck-pain', 'concussion'],
    relatedServices: ['mva-rehabilitation', 'physiotherapy', 'concussion-rehabilitation', 'massage-therapy'],
    relatedArticles: ['whiplash-recovery-timeline', 'mva-physio-claim-guide-alberta'],
  },

  {
    slug: 'post-op-knee-rehab-week-by-week',
    status: 'scripted',
    title: 'Post-Op Knee Rehab, Week by Week (ACL / Meniscus / TKR)',
    description:
      'A practical week-by-week walkthrough of post-operative knee rehabilitation — what the phases look like, how ACL, meniscus, and total knee replacement rehab differ, and how to recognize setbacks early.',
    category: 'Post-Surgical',
    tags: ['knee', 'post-surgical', 'ACL', 'meniscus', 'TKR'],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'Post-Surgical & Sports Injury Rehabilitation',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 30,
    learningObjectives: [
      'Describe the four phases of post-operative knee rehabilitation.',
      'Contrast the rehab trajectories for ACL reconstruction, meniscus repair, and total knee replacement.',
      'Explain why range-of-motion in the first six weeks predicts long-term outcome.',
      'Identify common setbacks and describe how to respond without derailing the plan.',
      'State the criteria that gate return-to-run and return-to-sport.',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          'Hook: "Post-op knee rehab is a marathon paced as a series of short sprints — miss the phase you\'re in and you pay for it three months later."',
          'Presenter positioning: AIM rehabs knee surgeries every week, in close coordination with surgeons.',
          'Who this is for: anyone with knee surgery scheduled, freshly post-op, or navigating a slower-than-expected recovery.',
        ],
      },
      {
        minute: 1,
        title: 'The four phases (framework everyone shares)',
        beats: [
          '**Protect.** Manage swelling, pain, and load. Restore basic knee straightening.',
          '**Restore.** Reclaim full range of motion, walking pattern, basic strength.',
          '**Build.** Progressive strengthening, motor control, single-leg loading.',
          '**Return.** Sport- or task-specific demands with objective criteria to progress.',
          'These apply to almost every knee surgery — the pace and details differ, the framework doesn\'t.',
        ],
      },
      {
        minute: 5,
        title: 'ACL reconstruction — the shape of the year',
        beats: [
          '**Weeks 0–2:** Swelling control, full knee extension, quad activation. Non-negotiable milestones.',
          '**Weeks 2–6:** Gait normalization, ROM progressing to full flexion, stationary bike.',
          '**Months 2–4:** Strength build, single-leg control, gym-based hinges and squats.',
          '**Months 4–6:** Running progression once strength benchmarks hit (typically ≥80% quad symmetry).',
          '**Months 6–9+:** Sport-specific plyometrics, cutting, contact — objective return-to-sport testing before clearance.',
          'Emphasize: **time alone doesn\'t clear you.** Criteria do.',
        ],
      },
      {
        minute: 11,
        title: 'Meniscus repair vs meniscectomy — different animals',
        beats: [
          '**Meniscectomy** (partial removal): often protected weight-bearing for 1–2 weeks, back to normal activity in ~6–8 weeks.',
          '**Meniscus repair** (sutured): protected weight-bearing and ROM restrictions typically for 4–6 weeks per surgeon protocol. Return-to-sport 4–6 months.',
          'Same knee, same-day surgeries — very different first six weeks. Always follow the surgeon\'s protocol; a physio\'s job is to execute it precisely.',
          'Signs that the meniscus repair isn\'t tolerating load: catching, effusion after activity — worth a check-in with the surgeon.',
        ],
      },
      {
        minute: 15,
        title: 'Total knee replacement (TKR) — the underrated priority is ROM',
        beats: [
          '**Weeks 0–2:** Swelling, straightening the knee, walking with aid, early flexion.',
          '**Weeks 2–6:** Push flexion (target 110–120° by week 6 depending on protocol), gait, stairs.',
          '**Weeks 6–12:** Confidence, endurance, real-life demands (groceries, gardening, walking distances).',
          '**Months 3–12:** Slow steady improvement — TKR results keep improving for a full year.',
          'The single most important predictor of long-term satisfaction: **flexion range achieved in the first 6 weeks.** Aggressive early ROM matters.',
        ],
      },
      {
        minute: 20,
        title: 'Common setbacks — and how to respond',
        beats: [
          '**A flare after a big session** — normal. Down-regulate load 20–30%, don\'t stop.',
          '**Persistent swelling** — the joint\'s "you\'re asking too much" signal. Reduce and reassess.',
          '**Sudden new pain or giving-way** — pause, contact your physio and surgeon.',
          '**Motivation dip at month 3** — real and predictable; the plateau always feels like failure and rarely is.',
        ],
      },
      {
        minute: 24,
        title: 'Return-to-run / return-to-sport — the criteria that matter',
        beats: [
          '**Quad strength symmetry** (≥80% of the uninjured side) — usually the first bottleneck.',
          '**Single-leg hop tests** — 90% symmetry as a rule of thumb.',
          '**Movement quality** on landings — no valgus collapse, no compensations.',
          '**Confidence** — measured, not assumed. Fear of re-injury has to come down before sport clearance.',
          'These criteria protect against re-tear far better than a calendar date.',
        ],
      },
      {
        minute: 28,
        title: 'Wrap + CTA',
        beats: [
          'Recap the four phases and the "criteria over calendar" principle.',
          'Point to the companion PDF (phase checklist per procedure type) and the [post-surgical rehab article](/resources/physio-after-surgery).',
          'CTAs: **Book a post-op assessment** and **Book Now** — most extended health plans cover post-surgical physiotherapy.',
        ],
      },
    ],
    companionPdf: {
      title: 'Post-Op Knee Rehab Phase Checklist (ACL / Meniscus / TKR)',
      description:
        'Three-column checklist — one column per procedure — with milestones per phase and prompts to trigger a physio check-in.',
      contents: [
        'One-line explanation of each phase (Protect / Restore / Build / Return)',
        'Per-phase milestones for ACL reconstruction',
        'Per-phase milestones for meniscus repair (and separately, meniscectomy)',
        'Per-phase milestones for TKR (with special emphasis on 6-week flexion goal)',
        'Common setback signs and the recommended response for each',
        'Return-to-run / return-to-sport criteria list',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-13',
    relatedConditions: ['knee-pain', 'post-surgical-recovery', 'sports-injuries'],
    relatedServices: ['post-surgical-rehabilitation', 'physiotherapy', 'sports-injury-rehabilitation'],
    relatedArticles: ['knee-pain-when-to-rest-when-to-train', 'physio-after-surgery'],
  },

  {
    slug: 'postpartum-pelvic-floor-first-12-weeks',
    status: 'scripted',
    title: 'Postpartum Pelvic Floor: The First 12 Weeks',
    description:
      'What\'s normal and what isn\'t in the first 12 weeks postpartum — a candid, clinician-led walkthrough of pelvic floor recovery, what a first visit looks like, and when to seek care.',
    category: 'Pelvic Health',
    tags: ['pelvic floor', 'postpartum', 'women\'s health', 'physiotherapy'],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'Pelvic Floor Physiotherapy',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 25,
    learningObjectives: [
      'Distinguish common postpartum symptoms that resolve on their own from those that warrant assessment.',
      'Describe what a pelvic floor physiotherapy assessment involves, and what internal exam consent looks like.',
      'Explain breathing and pressure-management retraining ("blow before you go").',
      'Outline realistic return-to-run and return-to-lifting timelines postpartum.',
      'Recognize when C-section or perineal scar work is indicated.',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          'Hook: "Most postpartum pelvic floor symptoms — leaking, heaviness, pain — are common and treatable. You don\'t have to live with them."',
          'Presenter positioning: AIM pelvic floor physio, sees postpartum patients daily.',
          'Who this is for: pregnant, freshly postpartum, or years postpartum with symptoms nobody\'s addressed.',
        ],
      },
      {
        minute: 1,
        title: 'What\'s actually normal in the first 6 weeks',
        beats: [
          'Bleeding (lochia) tapering over 4–6 weeks.',
          'Perineal soreness or a healing scar; some initial pelvic heaviness.',
          'Mild urinary urgency or the occasional cough-sneeze leak early on.',
          'Visible abdominal separation (diastasis) — extremely common at 6 weeks and often improves.',
          'A body that doesn\'t feel like yours yet — expected and time-limited.',
        ],
      },
      {
        minute: 5,
        title: 'What isn\'t "just normal"',
        beats: [
          'Leaking urine / gas / stool that persists past 6–8 weeks — or that you simply don\'t want to live with.',
          'Heaviness, dragging, or "something falling out" — possible pelvic organ prolapse; worth assessing.',
          'Pain with intercourse, tampon use, or a pelvic exam.',
          'A C-section or perineal scar that feels stuck, tethered, painful, or numb.',
          'Doming or a gap in the abdomen that limits movement.',
          'None of these are "just what happens." All are treatable.',
        ],
      },
      {
        minute: 10,
        title: 'What a pelvic floor physio assessment actually involves',
        beats: [
          'A thorough conversation — history, symptoms, birth, hopes.',
          'External assessment of breathing, posture, movement, abdominal wall.',
          'With **your consent**, an internal exam to assess pelvic floor strength, coordination, tone, and any scar tissue.',
          'You are always in control — internal exam is optional, deferred, or declined without your care being reduced.',
          'Plan built from findings, not from a template.',
        ],
      },
      {
        minute: 14,
        title: 'Breathing and pressure management — "blow before you go"',
        beats: [
          'The core, diaphragm, and pelvic floor are one pressure system.',
          'On effort — lifting the baby, standing up, coughing — exhale gently before or during the effort so the pressure doesn\'t bear down on the pelvic floor.',
          'This is the single most impactful skill most postpartum bodies learn in the first month.',
          'Demonstrate: inhale into the ribs, exhale on the lift.',
        ],
      },
      {
        minute: 17,
        title: 'Kegels aren\'t always the answer',
        beats: [
          'Some pelvic floors are weak — those benefit from strengthening.',
          'Others are too tight — those need to learn to relax before they can strengthen.',
          'Without an assessment, "just do more Kegels" can make the wrong muscle work harder.',
          'Down-training (relaxation) is a real, evidence-based intervention.',
        ],
      },
      {
        minute: 19,
        title: 'Return-to-run and return-to-lifting',
        beats: [
          'Return-to-run: typically **not before 12 weeks postpartum**, sometimes later. Symptom-guided, not calendar-driven.',
          'Progression: walking → walk-jog intervals → continuous jog → running with progressions.',
          'Return-to-lifting: same principle — progressive load, symptom-guided, with breathing/bracing skills in place.',
          'The number that matters is your body\'s response, not the date on the calendar.',
        ],
      },
      {
        minute: 22,
        title: 'Wrap + CTA',
        beats: [
          'Recap: what\'s normal, what isn\'t, and that everything on the "isn\'t" list is treatable.',
          'Point to the [postpartum article](/resources/postpartum-pelvic-floor-recovery) and the companion PDF (first-12-weeks tracker).',
          'CTAs: **Book a pelvic floor assessment** and **Book Now**. Direct-billed to most extended health plans.',
        ],
      },
    ],
    companionPdf: {
      title: 'Postpartum Pelvic Floor: First 12 Weeks Tracker',
      description:
        'A gentle, judgment-free tracker for the first 12 weeks — what to notice, what to raise with your provider, and how to phase return to movement.',
      contents: [
        '"Normal vs. not-normal" cheat sheet for the first 6 weeks',
        'Breathing-and-brace ("blow before you go") illustrated in 3 steps',
        'Weekly symptom check-in (leaking, heaviness, scar, pain 0–10)',
        'Return-to-walking / running / lifting progression cards',
        'When to book a pelvic floor physio assessment',
        'Discreet notes-to-self space for the first appointment',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-13',
    relatedConditions: ['pelvic-pain'],
    relatedServices: ['pelvic-floor-physiotherapy', 'physiotherapy'],
    relatedArticles: ['postpartum-pelvic-floor-recovery'],
  },

  {
    slug: 'concussion-return-to-work-and-sport',
    status: 'scripted',
    title: 'Concussion Recovery: Return to Work & Return to Sport',
    description:
      'Modern concussion care isn\'t dark-room rest. A clinician walks through active rehabilitation, graded return-to-learn / work / sport, and how to recognize when symptoms need a system-specific plan.',
    category: 'Concussion',
    tags: ['concussion', 'return-to-sport', 'return-to-work', 'vestibular'],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'Concussion & Vestibular Rehabilitation',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 30,
    learningObjectives: [
      'Describe the current active-rehabilitation approach to concussion care.',
      'Explain the graded return-to-learn, return-to-work, and return-to-sport progressions.',
      'Identify vestibular, ocular, and cervical contributions to persistent symptoms.',
      'Recognize when symptoms warrant a system-specific assessment or physician escalation.',
      'Describe sub-symptom-threshold aerobic exercise and why it accelerates recovery.',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          'Hook: "The old advice for concussion — dark room, no screens, wait it out — is gone. Modern care gets you moving as soon as tolerated, and it works better."',
          'Presenter positioning: AIM concussion clinician; sees post-concussion cases from sport, MVA, and workplace.',
          'Who this is for: recently concussed, or someone whose symptoms aren\'t settling as expected.',
        ],
      },
      {
        minute: 1,
        title: 'What\'s changed in concussion care',
        beats: [
          'Old model: extended cognitive and physical rest. Newer evidence: brief relative rest (24–48 hrs), then graded reintroduction.',
          'Active rehabilitation — cervical, vestibular, ocular, aerobic — accelerates recovery for many people.',
          'Symptoms guide the pace; activity is rarely paused entirely for more than a day or two.',
          'This is not fringe — it\'s the current guideline direction.',
        ],
      },
      {
        minute: 5,
        title: 'What symptoms actually mean',
        beats: [
          'Headache — sometimes cervical (neck-driven), sometimes vestibular, sometimes primary.',
          'Dizziness / fogginess — vestibular and ocular systems most often.',
          'Sensitivity to light and sound — common early, treatable when persistent.',
          'Fatigue / cognitive load intolerance — the exertion-intolerance signal.',
          'Sleep disruption / mood changes — real, common, and part of what recovery addresses.',
          'The point: symptoms map to systems that can be tested and treated.',
        ],
      },
      {
        minute: 10,
        title: 'Sub-symptom-threshold aerobic exercise',
        beats: [
          'Buffalo Concussion Treadmill Test–style principle: find a heart-rate ceiling that just brings symptoms on, then train below it.',
          'Typical starting point: 15–20 min moderate walking or bike, 5–6 days a week.',
          'Why it works: aerobic exercise helps normalize autonomic regulation and cerebral blood flow after concussion.',
          'Progression rules: increase intensity or duration only when symptoms tolerate the current dose.',
        ],
      },
      {
        minute: 14,
        title: 'Return-to-learn / work — graded steps',
        beats: [
          '**Stage 1:** Symptom-limited daily activities at home.',
          '**Stage 2:** Cognitive activity in short blocks (10–30 min).',
          '**Stage 3:** Return to school/work part-time or modified.',
          '**Stage 4:** Full days with accommodations.',
          '**Stage 5:** Full return, no accommodations.',
          'Progress a stage when the previous stage is tolerated without symptom worsening for 24 hours.',
        ],
      },
      {
        minute: 18,
        title: 'Return-to-sport — graded steps',
        beats: [
          '**Stage 1:** Symptom-limited activity (light daily activities).',
          '**Stage 2:** Light aerobic (walking, stationary bike).',
          '**Stage 3:** Sport-specific exercise, no head impact risk.',
          '**Stage 4:** Non-contact training drills.',
          '**Stage 5:** Full-contact practice after medical clearance.',
          '**Stage 6:** Return to competition.',
          '24 hours symptom-free at each stage before advancing.',
        ],
      },
      {
        minute: 22,
        title: 'When symptoms aren\'t settling',
        beats: [
          'Persistent past 4 weeks (kids/teens) or 2 weeks (adults) — worth system-specific assessment.',
          'Cervicogenic contribution? — cervical spine assessment and treatment.',
          'Vestibular / ocular contribution? — see [vestibular rehab](/services/vestibular-rehabilitation) segment / topic.',
          'Autonomic dysregulation? — Buffalo-style aerobic prescription.',
          'These aren\'t alternative theories — they\'re the layers a good clinician tests through.',
        ],
      },
      {
        minute: 26,
        title: 'When to escalate to a physician',
        beats: [
          'Worsening or severe headache, repeated vomiting, escalating drowsiness — immediate medical assessment.',
          'Vision changes, unusual neurological symptoms, loss of consciousness that wasn\'t witnessed — same.',
          'These are uncommon but not to be missed.',
        ],
      },
      {
        minute: 28,
        title: 'Wrap + CTA',
        beats: [
          'Recap: brief rest, then active graded return. Symptoms are signals, not stop signs.',
          'Point to the [concussion article](/resources/what-to-expect-after-a-concussion) and companion PDF (RTL/RTS trackers).',
          'CTAs: **Book a concussion assessment** and **Book Now**. Covered under MVA (DTPR), WCB, and most extended health plans.',
        ],
      },
    ],
    companionPdf: {
      title: 'Concussion Return-to-Learn / Work / Sport Trackers',
      description:
        'Three trackers on one printable — RTL for students, RTW for workers, RTS for athletes — each with staged milestones and 24-hour progression rules.',
      contents: [
        'One-page overview: brief rest → active graded return',
        'Return-to-learn 5-stage tracker with symptom checklist per stage',
        'Return-to-work 5-stage tracker with accommodation examples',
        'Return-to-sport 6-stage tracker with medical clearance step highlighted',
        'Red-flag symptom list (when to seek immediate medical care)',
        'Space to log daily symptom score and activity notes',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-13',
    relatedConditions: ['concussion', 'vertigo-dizziness', 'neck-pain'],
    relatedServices: ['concussion-rehabilitation', 'vestibular-rehabilitation'],
    relatedArticles: ['what-to-expect-after-a-concussion', 'what-vestibular-rehab-treats'],
  },

  {
    slug: 'navigating-a-wcb-physio-claim-in-alberta',
    status: 'scripted',
    title: 'Navigating a WCB Physio Claim in Alberta',
    description:
      'A no-jargon walkthrough of the WCB-Alberta physiotherapy claim process — reporting, approval, treatment, modified work, and what the clinic handles for you.',
    category: 'WCB',
    tags: ['WCB', 'workplace injury', 'Alberta', 'return-to-work'],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'WCB Rehabilitation & Return-to-Work',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 20,
    learningObjectives: [
      'List the four steps to start a WCB-Alberta physiotherapy claim.',
      'Explain what WCB covers for physiotherapy and what direct-billing means for the worker.',
      'Describe how modified-work recommendations are made and shared with employers.',
      'Recognize the touchpoints where AIM coordinates on the worker\'s behalf.',
      'Identify signs a claim needs escalated coordination (specialist involvement, functional capacity evaluation).',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          'Hook: "WCB physio in Alberta is one of the most under-explained processes patients navigate. It doesn\'t have to be complicated."',
          'Presenter positioning: AIM sees WCB claims every day; direct-bills to WCB-Alberta.',
          'Who this is for: any Alberta worker with a workplace injury, and any employer or referrer coordinating one.',
        ],
      },
      {
        minute: 1,
        title: 'The four steps to start',
        beats: [
          '**Report the injury** to your employer and to WCB-Alberta.',
          '**Seek medical attention** — physician, urgent care, or ER if warranted. The provider files a report.',
          '**Receive a claim number** from WCB.',
          '**Book a physiotherapy assessment** — bring the claim number, the employer name, and the date of injury.',
          'Treatment can begin under WCB with just those details in hand.',
        ],
      },
      {
        minute: 4,
        title: 'What WCB covers',
        beats: [
          'For accepted claims: approved physiotherapy assessment and treatment.',
          'AIM bills WCB **directly** — you don\'t pay out of pocket for approved treatment.',
          'Related services (massage, chiro, functional capacity evaluations) can be coordinated when clinically indicated and approved.',
          'You don\'t need to negotiate this — the clinic handles the billing conversation.',
        ],
      },
      {
        minute: 7,
        title: 'Modified work and return-to-work planning',
        beats: [
          'Modified duties are part of most WCB rehabilitation plans — not a punishment, not a demotion.',
          'With your consent, we share progress reports and specific modified-work recommendations with your employer.',
          'Modified duties are progressive — the goal is durable return to your regular role, not a permanent workaround.',
          'Employers benefit too: earlier return-to-work reduces claim costs and helps team stability.',
        ],
      },
      {
        minute: 11,
        title: 'What "progress" looks like on a WCB claim',
        beats: [
          'We track functional milestones, not just pain scores — can you lift, carry, stand, twist through your workday?',
          'Regular progress reports go to WCB, keeping your case open and treatment authorized.',
          'Plateaus happen — plateaus prompt a plan change, not a stop.',
          'Milestones we celebrate: back to full modified duties, back to regular duties, discharged.',
        ],
      },
      {
        minute: 14,
        title: 'When claims escalate beyond routine physio',
        beats: [
          'Persistent symptoms past expected timeline → specialist referral, imaging, or advanced modalities.',
          'Complex return-to-work planning → [functional capacity evaluation](/services/functional-capacity-evaluations).',
          'Extended cases → [work conditioning](/services/work-conditioning) or [work hardening](/services/work-hardening).',
          'None of this is failure — it\'s the layered response WCB is designed to support.',
        ],
      },
      {
        minute: 17,
        title: 'What AIM handles for you',
        beats: [
          'Direct billing to WCB — no out-of-pocket on approved treatment.',
          'Progress reporting to WCB and (with consent) your employer.',
          'Modified-work letter drafting.',
          'Referral coordination to specialty services within the clinic.',
          'You focus on recovery. We do the paperwork.',
        ],
      },
      {
        minute: 19,
        title: 'Wrap + CTA',
        beats: [
          'Recap: report → medical attention → claim number → book physio. Four steps.',
          'Point to the [WCB physio article](/resources/wcb-physio) and companion PDF (claim checklist).',
          'CTAs: **Book a WCB assessment** and **Book Now**. Bring your claim number, we\'ll do the rest.',
        ],
      },
    ],
    companionPdf: {
      title: 'WCB Physio Claim Checklist (Alberta)',
      description:
        'One-page checklist a worker or employer can print, listing the four claim-start steps, what to bring, and what happens at each visit.',
      contents: [
        'Four-step start checklist with checkboxes',
        'What to bring to your first visit',
        'What "progress" looks like on a WCB claim',
        'Modified-work explainer for workers and employers',
        'When to expect specialty referrals (FCE, work conditioning)',
        'AIM direct-billing statement and contact info',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-13',
    relatedConditions: ['back-pain', 'shoulder-pain', 'knee-pain'],
    relatedServices: ['wcb-rehabilitation', 'physiotherapy', 'direct-billing'],
    relatedArticles: ['wcb-physio'],
  },

  {
    slug: 'vestibular-rehab-bppv-concussion-motion',
    status: 'scripted',
    title: 'Vestibular Rehab: BPPV, Post-Concussion Dizziness, and Motion Sensitivity',
    description:
      'A clinician-led explainer of what vestibular rehabilitation actually treats — from the 60-second fix for BPPV to habituation training for stubborn motion sensitivity.',
    category: 'Vestibular',
    tags: ['vestibular', 'BPPV', 'vertigo', 'dizziness', 'concussion'],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'Vestibular Rehabilitation',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 25,
    learningObjectives: [
      'Explain the three systems that keep you oriented and how vestibular problems arise.',
      'Distinguish BPPV from other causes of dizziness by history and provocation.',
      'Describe what a vestibular assessment involves and why the assessment shapes the plan.',
      'Explain how gaze stabilization, habituation, and balance training each work.',
      'Recognize when dizziness has cervical, ocular, or autonomic contributions and needs a broader plan.',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          'Hook: "One of the most common vertigo diagnoses in the world — BPPV — can often be resolved in a single visit with a repositioning maneuver. Most people don\'t know that."',
          'Presenter positioning: AIM vestibular physio; treats dizziness from many causes.',
          'Who this is for: anyone dizzy, spinning, off-balance, or foggy — recent or persistent.',
        ],
      },
      {
        minute: 1,
        title: 'How you stay upright (and why you sometimes don\'t)',
        beats: [
          'Three systems: **inner ear** (vestibular), **eyes** (vision), and **body sense** (proprioception).',
          'Your brain integrates all three. When the signals conflict, the result is dizziness.',
          'Vestibular problems can come from any layer — the inner ear itself, the pathways into the brain, or the way the brain interprets them.',
        ],
      },
      {
        minute: 4,
        title: 'BPPV — the most treatable vertigo',
        beats: [
          'Benign paroxysmal positional vertigo — brief, intense spinning triggered by head position changes (rolling over in bed, looking up, bending down).',
          'Caused by loose crystals (otoconia) drifting into the wrong canal in the inner ear.',
          '**Diagnosed** with position-provocation tests (e.g., Dix-Hallpike).',
          '**Treated** with a repositioning maneuver (e.g., Epley) — often 1–3 visits to resolution.',
          'This is the closest thing physiotherapy has to a "magic trick" — and it\'s just physics + anatomy.',
        ],
      },
      {
        minute: 9,
        title: 'Vestibular neuritis / labyrinthitis recovery',
        beats: [
          'After an inner-ear infection, the vestibular signal on one side is often diminished.',
          'The brain has to re-calibrate — this is called central compensation.',
          'Rehab accelerates it: gaze stabilization exercises, balance training, graded head movement.',
          'Recovery timelines: weeks to months, but the trajectory is almost always upward.',
        ],
      },
      {
        minute: 12,
        title: 'Post-concussion dizziness',
        beats: [
          'Very common after concussion — vestibular and ocular systems are frequently affected.',
          'Symptoms: dizziness with head movement, difficulty in busy environments, reading fatigue.',
          'Assessment sorts vestibular vs ocular vs cervical vs autonomic contributions.',
          'Treatment integrates with concussion care — see [concussion rehab](/services/concussion-rehabilitation).',
        ],
      },
      {
        minute: 15,
        title: 'Motion sensitivity and visual-motion intolerance',
        beats: [
          'Scrolling on your phone, driving in the passenger seat, walking through a busy grocery aisle — all provoke symptoms.',
          'Habituation training: **controlled, repeated exposure** to provoking movement.',
          'Some habituation exercises briefly worsen symptoms — that\'s how the brain learns tolerance.',
          'Progression is gradual, structured, and monitored.',
        ],
      },
      {
        minute: 18,
        title: 'What a vestibular assessment involves',
        beats: [
          'History — timing, triggers, associated symptoms.',
          'Oculomotor testing — smooth pursuit, saccades, gaze stability, positional testing.',
          'Cervical spine, balance, and gait screens.',
          'Autonomic screen if relevant (orthostatic changes, exercise intolerance).',
          'The assessment narrows the case; the plan targets what\'s found.',
        ],
      },
      {
        minute: 21,
        title: 'When dizziness isn\'t "just vestibular"',
        beats: [
          'Cervicogenic dizziness — neck-driven; treated with cervical work.',
          'Ocular / oculomotor — treated with vision-training exercises, sometimes co-managed with a neuro-optometrist.',
          'Autonomic dysregulation (post-concussion, POTS, etc.) — graded exercise protocols.',
          'Anxiety and PPPD (persistent postural-perceptual dizziness) — layered plan; not "in your head."',
        ],
      },
      {
        minute: 23,
        title: 'Wrap + CTA',
        beats: [
          'Recap: dizziness has many causes and most are treatable. Assessment is the point of entry.',
          'Point to the [vestibular article](/resources/what-vestibular-rehab-treats) and companion PDF.',
          'CTAs: **Book a vestibular assessment** and **Book Now**. Covered by most extended health plans; also under MVA (DTPR) and WCB for accident- or work-related cases.',
        ],
      },
    ],
    companionPdf: {
      title: 'Vestibular Symptoms: Where to Start',
      description:
        'A patient-facing decision aid: describe your symptoms → likely category → what an assessment will look at → what treatment involves.',
      contents: [
        '"What kind of dizziness is this?" symptom-mapping table',
        'BPPV explainer with what to expect at first visit',
        'When dizziness came after a fall, MVA, or concussion',
        'Motion sensitivity vs true vertigo — how to tell them apart',
        'What to bring to your first vestibular assessment',
        'When to seek immediate medical care (red flags)',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-13',
    relatedConditions: ['vertigo-dizziness', 'concussion'],
    relatedServices: ['vestibular-rehabilitation', 'concussion-rehabilitation', 'physiotherapy'],
    relatedArticles: ['what-vestibular-rehab-treats', 'what-to-expect-after-a-concussion'],
  },

  {
    slug: 'chronic-back-pain-what-works',
    status: 'scripted',
    title: 'Chronic Back Pain: What Actually Works',
    description:
      'A clinician\'s honest walkthrough of chronic back pain — why imaging often misleads, why movement matters more than rest, and what modern rehabilitation really looks like.',
    category: 'Physiotherapy',
    tags: ['back pain', 'chronic pain', 'physiotherapy', 'evidence-based care'],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'Physiotherapy & Chronic Pain Rehabilitation',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 25,
    learningObjectives: [
      'Explain why imaging findings often don\'t correlate with symptoms.',
      'Describe the biopsychosocial model of persistent pain in plain language.',
      'List the evidence-based components of chronic back pain rehabilitation.',
      'Recognize red flags that warrant physician escalation.',
      'Explain what "graded exposure" and "load management" mean and why they work.',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          'Hook: "If back imaging came back with \'disc bulge, degenerative changes, arthritis\' — that\'s not necessarily bad news. It may not be why you hurt."',
          'Presenter positioning: AIM physio; sees chronic back pain across every age and profile.',
          'Who this is for: anyone whose back pain has lasted longer than 3 months or has recurred.',
        ],
      },
      {
        minute: 1,
        title: 'What imaging actually tells us',
        beats: [
          'MRI studies of pain-free adults regularly show disc bulges, degenerative changes, and arthritis findings — in people with **zero pain**.',
          'Imaging is a snapshot of anatomy, not a story about pain.',
          'When imaging is useful: red-flag situations, pre-surgical planning, symptoms not matching a clinical picture.',
          'When it\'s often misleading: routine chronic low back pain — imaging findings often don\'t change the treatment plan.',
        ],
      },
      {
        minute: 5,
        title: 'Why pain persists — a plain-language model',
        beats: [
          'Acute pain: tissue signal, body\'s alarm.',
          'Persistent pain: the alarm becomes more sensitive over time — the nervous system amplifies signals.',
          'Contributing factors: stress, sleep, fear of movement, deconditioning, previous injury patterns.',
          'This isn\'t "in your head" — it\'s a well-documented pattern in the nervous system.',
          'The good news: sensitivity is trainable in both directions.',
        ],
      },
      {
        minute: 10,
        title: 'What the evidence supports',
        beats: [
          '**Movement, in almost any form** — walking, gym, yoga, tai chi — outperforms rest.',
          '**Graded exercise** — progressive loading of the spine and hips builds tolerance.',
          '**Manual therapy** — helpful for symptom relief, best paired with active work.',
          '**Pain education** — understanding pain reduces fear and improves outcomes measurably.',
          '**Sleep and stress management** — direct impact on pain sensitivity.',
          'What\'s **less** supported: extended bed rest, passive-only care, repeated imaging without a clinical question, "cracking it into place" as a stand-alone solution.',
        ],
      },
      {
        minute: 15,
        title: 'Graded exposure and load management, illustrated',
        beats: [
          'Load management: adjust volume, intensity, or frequency so the tissue and nervous system can adapt.',
          'Graded exposure: reintroduce the movements you\'ve been avoiding, in doses your body tolerates.',
          'Example — sitting: 10 min before flare → 12 min → 15 min. Progression, not avoidance.',
          'Example — lifting: light objects first, gradually loading, technique refined along the way.',
          'The point: build tolerance, don\'t hide from movement.',
        ],
      },
      {
        minute: 19,
        title: 'Red flags — when to see a physician first',
        beats: [
          'New bowel or bladder changes, saddle-area numbness — urgent.',
          'Progressive bilateral leg weakness — urgent.',
          'Unexplained weight loss, fever, or a history of cancer with new back pain — physician evaluation before continuing.',
          'Uncommon, but not to be missed.',
        ],
      },
      {
        minute: 21,
        title: 'What a rehab plan looks like',
        beats: [
          'Assessment — history, movement, relevant tests, working hypothesis.',
          'Plan — mix of manual therapy, movement retraining, progressive strengthening, and education.',
          'Frequency — often front-loaded, then spaced out; not a long-term dependency.',
          'Goal — you leave with tools, not with a lifetime appointment.',
        ],
      },
      {
        minute: 23,
        title: 'Wrap + CTA',
        beats: [
          'Recap: imaging isn\'t destiny, movement beats rest, and graded exposure builds tolerance.',
          'Point to the [when-to-see-a-physio article](/resources/when-to-see-a-physio-for-back-pain) and companion PDF.',
          'CTAs: **Book a back pain assessment** and **Book Now**. Direct-billed to most extended health plans.',
        ],
      },
    ],
    companionPdf: {
      title: 'Chronic Back Pain: What Actually Works',
      description:
        'A one-page evidence summary for patients — what the research supports, what it doesn\'t, and where to start if you want to change the pattern.',
      contents: [
        '"Imaging vs pain" plain-language explainer',
        'Evidence-supported components (movement, graded exercise, manual therapy, education, sleep, stress)',
        'What has weak evidence (extended rest, passive-only care, repeated imaging)',
        'Graded-exposure example (sitting / lifting / walking)',
        'Red-flag checklist',
        'When and why to book a physiotherapy assessment',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-13',
    relatedConditions: ['back-pain', 'sciatica'],
    relatedServices: ['physiotherapy', 'chiropractic-care', 'chronic-pain-rehabilitation'],
    relatedArticles: ['when-to-see-a-physio-for-back-pain', 'sciatica-what-it-is-and-how-its-treated'],
  },
  {
    slug: 'hip-knee-arthritis-managing-oa-without-surgery',
    status: 'scripted',
    title: 'Hip & Knee Arthritis: Managing Osteoarthritis Without (or Before) Surgery',
    description:
      'Told it\'s "bone-on-bone"? A clinician-led walkthrough of hip and knee osteoarthritis — what exercise can really do, the GLA:D program, an honest look at injections and braces, and when replacement truly is the right call.',
    category: 'Arthritis & Joint Health',
    tags: [
      'osteoarthritis',
      'knee',
      'hip',
      'glad program',
      'exercise therapy',
    ],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'Physiotherapy & Arthritis Rehabilitation',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 35,
    learningObjectives: [
      'Explain osteoarthritis as a whole-joint process rather than simple "wear and tear."',
      'Describe why X-ray severity correlates poorly with pain and function.',
      'List the components of a structured education-and-exercise program such as GLA:D, and the outcomes it typically produces.',
      'Recognize the role of injections, braces, and walking aids as adjuncts rather than fixes.',
      'Identify when joint replacement is the right choice and explain how prehab improves surgical recovery.',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          'Hook: "\'Bone-on-bone\' is a description of an X-ray — it is not a verdict on your knee, and it is not a referral for surgery."',
          'Name and credential; presenter positioning: AIM treats hip and knee osteoarthritis every single day, and direct-bills most extended health plans.',
          'Who this is for: Alberta adults 55-plus — and active people in their 40s — who\'ve been told "it\'s arthritis," "it\'s bone-on-bone," or "you\'ll need a replacement eventually."',
          'Preview the session: what osteoarthritis actually is, what the evidence says exercise can do, an honest look at injections and braces, and when a replacement genuinely is the right call — plus how to go into it strong.',
        ],
      },
      {
        minute: 1,
        title: 'What osteoarthritis actually is (and isn\'t)',
        beats: [
          'Osteoarthritis is a **whole-joint process** — cartilage, bone, the joint capsule, the surrounding muscles, and the nervous system are all involved. It is not your joint sanding itself down like a brake pad.',
          'The old "wear and tear" story implies every step uses up a fixed allowance. Modern evidence says the opposite: joints are living tissue, and like muscle and bone they **adapt to the loads we give them**.',
          'It\'s also extremely common — most adults over 55 show some osteoarthritis on imaging of the [knee](/conditions/knee-pain) or [hip](/conditions/hip-pain), many with no symptoms at all.',
          'Symptoms naturally fluctuate. Flares and quiet stretches are part of the condition — a bad month is not proof of a downhill slide.',
          'What drives pain day to day is more than structure: muscle strength, activity spikes, sleep, stress, and body weight all move the needle — and most of those are things we can work with.',
          'The theme for this whole session: osteoarthritis is common, it\'s manageable, and it is **not a destiny**.',
        ],
      },
      {
        minute: 5,
        title: 'The X-ray trap: what "bone-on-bone" does and doesn\'t mean',
        beats: [
          'The finding that surprises most people: **X-ray severity correlates poorly with symptoms**. Some people with "severe" changes have little pain; some with mild changes hurt a lot.',
          'Studies of adults with knee osteoarthritis on X-ray consistently find a large share — in some studies close to half — report no significant pain at all.',
          'Words matter. When people hear "bone-on-bone," the natural response is to protect the joint — move less, avoid stairs, stop walking. Less movement means weaker muscles, stiffer joints, and usually **more** pain. The label can do damage the joint hasn\'t.',
          'What imaging is genuinely for: planning surgery, and ruling out other explanations when the clinical picture doesn\'t fit. Routine repeat X-rays to "watch it get worse" rarely change the plan.',
          'Progression isn\'t a straight line either — for many people, X-ray changes creep along slowly for years while symptoms stay stable or even improve with the right program.',
          'One sentence to keep from this section: **your X-ray is not your pain** — and it doesn\'t get to make your decisions for you.',
        ],
      },
      {
        minute: 9,
        title: 'Myth-busting: "exercise will wear the joint out"',
        beats: [
          'This is the most consequential myth in arthritis care — and it\'s false. Studies following people through structured exercise programs do not show accelerated cartilage loss; if anything, cartilage appears to need **regular, cyclical loading** to stay healthy.',
          'The payoff is measurable: across trials and program registries, structured exercise reduces osteoarthritis pain by roughly **25–30% on average** — in the same range as common painkillers for many people, without the side effects.',
          'Some research even suggests recreational runners have no higher — possibly lower — rates of knee osteoarthritis than non-runners. Load, dosed sensibly, is a friend.',
          'Two related myths, quickly: "rest until it stops hurting" — rest beyond a brief flare feeds a deconditioning spiral. And "clicks and grinding mean damage" — joint noises are common at every age and usually benign.',
          'The rule we actually use — the **acceptable pain scale**: on a 0–10 scale, pain up to about 5 during exercise is acceptable, provided it settles back to your usual level by the next morning. If it does, the dose was fine.',
          'Pain during exercise is not the sound of the joint being damaged — it\'s a sensitive joint reporting load. The response to a bad day is to adjust the dose, not abandon the plan.',
        ],
      },
      {
        minute: 14,
        title: 'GLA:D — the structured program with a track record',
        beats: [
          'GLA:D stands for **Good Life with osteoArthritis: Denmark** — an education-and-exercise program developed by Danish researchers, running in Canada since 2016 and offered at trained clinics across Alberta.',
          'What it actually is, plainly: two or three education sessions on how osteoarthritis works and how to manage it, plus **twelve supervised group exercise sessions over about eight weeks** — typically twice a week — led by [physiotherapists](/services/physiotherapy) with GLA:D training.',
          'The exercise style is "neuromuscular" — strength and control in the positions life demands: sit-to-stands, step-ups, balance work, controlled squats. Every exercise scales to your starting point; nobody is thrown into a bootcamp.',
          'The results are tracked in national registries across tens of thousands of participants: pain down roughly 25–30% on average, walking speed up, painkiller use down — and a meaningful share of participants who expected surgery report they no longer feel they need it, at least in the near term.',
          'It works for hips and knees, and X-ray severity doesn\'t exclude you — "bone-on-bone" participants improve too.',
          'It\'s not magic. It\'s dose, consistency, and confidence — and the point of the eight weeks is to leave you with skills and a routine that carry on long after.',
        ],
      },
      {
        minute: 19,
        title: 'The three levers you control: strength, weight, dosing',
        beats: [
          '**Strength.** The quads and glutes are the joint\'s shock absorbers — stronger muscle typically means a less symptomatic joint. Progressive strength work twice a week is the backbone of every good arthritis program, and it\'s trainable at any age; people in their 80s build muscle in supervised programs.',
          '**Weight.** Each extra kilogram of body weight transmits roughly three to four kilograms of load through the knee with every step. For many people, losing 5–10% of body weight brings a meaningful drop in symptoms.',
          'A respectful note on weight: it\'s one lever among several, not a moral judgment — and strength training helps at any weight. We meet people where they are.',
          '**Dosing.** Most flares are a dose error — too much, too soon, too fast — not new damage. The fix is to trim volume for a few days and keep moving, not to stop.',
          'Alberta reality: winter ice is a legitimate barrier. Plan for it — indoor walking, pool sessions, a stationary bike, walking poles for grip and confidence. The program that survives January is the one that works.',
          'Sleep and general activity round out the picture — a poorly slept week is very often a more painful week.',
        ],
      },
      {
        minute: 24,
        title: 'Injections and braces — an honest guide',
        beats: [
          '**Cortisone injections** can settle a genuinely hot, swollen flare for weeks to a few months. Used occasionally as a bridge — calming things enough to start exercising — they\'re reasonable. They don\'t change the course of the arthritis, and frequent repeat injections are generally discouraged.',
          '**Hyaluronic acid ("gel") injections:** the evidence is mixed, guideline support is lukewarm, and they\'re often paid out of pocket. Some individuals feel benefit — go in with clear eyes about the odds and the cost.',
          '**PRP and "stem cell" injections:** the research is still evolving, costs are high, and marketing routinely outruns the evidence. Be cautious of any clinic promising regeneration.',
          '**Braces and walking aids:** an unloader brace helps some knee patterns, especially arthritis concentrated on one side of the joint. A cane or walking poles reduce joint load and — just as importantly — restore the confidence to walk further. Using one is strategy, not surrender.',
          'The common thread: these are **adjuncts, not fixes**. At their best they buy you a more comfortable window — and the window is for building strength.',
        ],
      },
      {
        minute: 28,
        title: 'When replacement IS the right call — and how to arrive strong',
        beats: [
          'Joint replacement is a genuinely good operation for the right person at the right time. The broad markers: significant pain despite a real conservative trial, pain that wakes you at night despite medication, and function or quality of life you\'re no longer willing to accept.',
          'A "real conservative trial" means a structured exercise program actually completed — typically three to six months — not two weeks of walking that hurt. Surgeons increasingly want to see this first, and for good reason.',
          'The honest numbers: hip replacements carry very high satisfaction; for knees, up to roughly one in five patients report some ongoing pain or dissatisfaction afterward. Exhausting conservative care first is how you make sure surgery was the right call — and it identifies the many people who turn out not to need it yet.',
          '**Prehab pays.** Strength going into surgery is one of the better predictors of how smoothly the early recovery goes. The same program that might delay your surgery is the one that prepares you for it — nothing you build is wasted.',
          'Alberta reality: surgical waitlists commonly run months. That wait is not dead time — it is the prehab window.',
          'And on the other side, [post-surgical rehabilitation](/services/post-surgical-rehabilitation) picks up the same principles — early range of motion, progressive strengthening — from day one.',
        ],
      },
      {
        minute: 33,
        title: 'Wrap + CTA',
        beats: [
          'Recap: osteoarthritis is a whole-joint, modifiable condition — not "wear and tear destiny." Your X-ray is not your pain. Structured exercise is the best-supported first-line treatment, injections and braces are adjuncts that buy windows, and when replacement is right, you want to arrive strong.',
          'Point viewers to the companion PDF (the Hip & Knee Osteoarthritis Action Plan) and the [knee pain: when to rest, when to train article](/resources/knee-pain-when-to-rest-when-to-train); if a first visit feels daunting, the [first appointment checklist](/resources/first-appointment-checklist) covers exactly what to bring.',
          'Alberta note: you do **not** need a doctor\'s referral to see a physiotherapist — you can self-refer and be assessed this week.',
          'Two clear CTAs: **Book an arthritis assessment** and **Book Now**. Direct-billed to most extended health plans — and if you\'re on a seniors\' plan, ask our front desk to check your coverage before your first visit.',
        ],
      },
    ],
    companionPdf: {
      title: 'Hip & Knee Osteoarthritis Action Plan',
      description:
        'A printable one-page action plan for hip and knee osteoarthritis — the myths to drop, the program to start, and the questions to ask before saying yes to surgery.',
      contents: [
        'Myth vs. fact cheat sheet ("bone-on-bone," "exercise wears it out," "noises mean damage")',
        'The acceptable-pain scale (0–10) and the next-morning rule, illustrated',
        'What an 8-week structured program (GLA:D-style) looks like, week by week',
        'Flare plan: what to trim, what to keep, and when to check in',
        'Injections, braces, and walking aids quick-reference — what each does and for how long',
        '"Is replacement right for me?" question list + Alberta self-referral and coverage notes',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-14',
    relatedConditions: ['knee-pain', 'hip-pain', 'post-surgical-recovery'],
    relatedServices: [
      'physiotherapy',
      'chronic-pain-rehabilitation',
      'post-surgical-rehabilitation',
      'direct-billing',
    ],
    relatedArticles: [
      'knee-pain-when-to-rest-when-to-train',
      'physio-after-surgery',
      'first-appointment-checklist',
    ],
  },

  {
    slug: 'sciatica-relief-what-works-what-to-avoid',
    status: 'scripted',
    title: 'Sciatica: What Works, What to Avoid',
    description:
      'An honest walkthrough of sciatica — why it\'s a symptom, not a diagnosis, what centralization tells you, the first-six-weeks playbook, and the real answer to "which exercises should I avoid?"',
    category: 'Physiotherapy',
    tags: [
      'sciatica',
      'leg pain',
      'nerve pain',
      'physiotherapy',
      'evidence-based care',
    ],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'Physiotherapy & Chronic Pain Rehabilitation',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 30,
    learningObjectives: [
      'Explain why "sciatica" is a symptom description rather than a diagnosis, and name its most common cause.',
      'Describe centralization and why symptoms retreating toward the spine signals progress.',
      'List the components of a first-six-weeks self-management playbook, including positions of relief.',
      'Recognize the red flags — cauda equina symptoms and progressive weakness — that need urgent medical care.',
      'Explain when imaging and a surgical consult are actually warranted for leg-dominant nerve pain.',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          'Hook: "If you\'ve typed \'sciatica exercises to avoid\' into a search bar, here\'s the honest answer up front — the forbidden list is much shorter than the internet claims, and dosage matters more than the exercise."',
          'Presenter positioning: AIM physiotherapist; we see leg-dominant nerve pain every week across our Edmonton-area clinics, and we direct-bill most extended health plans.',
          'Who this is for: anyone with shooting, burning, or electric pain down one leg — with or without back pain — plus tingling or numbness in the foot, who suspects "sciatica."',
          'Promise for the session: separate what the evidence supports from the "5 INSTANT sciatica fixes" genre — and give you a compass you can use on your own symptoms.',
        ],
      },
      {
        minute: 1,
        title: '"Sciatica" is a symptom, not a diagnosis',
        beats: [
          'Sciatica describes leg-dominant nerve pain along the sciatic nerve\'s territory — the buttock, back of the thigh, calf, sometimes into the foot. It tells us **where** it hurts, not **why**.',
          'In most cases the source is a nerve root in the lower back — most commonly a disc bulge or herniation contacting or chemically irritating one of the L4, L5, or S1 nerve roots.',
          'Less common contributors: narrowing around the nerve root (stenosis — typically older adults, often walking-related), and a handful of rarer causes. "Piriformis syndrome" gets enormous airtime online, but confirmed cases are far less common than social media suggests.',
          'Why the distinction matters: treatment targets the source — usually the back — even though the leg is where you feel it. Many people with significant sciatica have little or **no** back pain at all.',
          'Where the tingling or numbness lands in the foot tends to map to a specific nerve root — that mapping is part of what a physiotherapy assessment sorts out. For a written primer, see our [sciatica article](/resources/sciatica-what-it-is-and-how-its-treated).',
        ],
      },
      {
        minute: 5,
        title: 'Centralization — the progress signal that matters',
        beats: [
          'Key concept of the whole session: as an irritated nerve root settles, symptoms typically **retreat toward the spine** — foot to calf, calf to thigh, thigh to buttock, buttock to back. That\'s called centralization.',
          'It\'s counterintuitive, but a bit **more** back pain paired with **less** leg pain is usually a good trade. Centralization is one of the better-studied favourable signs in this whole area.',
          'The opposite — peripheralization — is symptoms marching **further down** the leg with certain movements, positions, or over time. That\'s the signal that the current activity or dose needs to change.',
          'This gives you a personal compass: a movement or position that centralizes your symptoms is likely right for you right now; one that consistently pushes them down the leg is wrong for you right now — regardless of what a YouTube title claims.',
          'Practical tip: track the **end point** of your symptoms each day — how far down the leg they reach — not just how intense they feel. The end point is the more useful trend line.',
        ],
      },
      {
        minute: 9,
        title: 'The first six weeks — the playbook',
        beats: [
          'Start with the base rate, because it\'s genuinely reassuring: most disc-related sciatica improves substantially within about 6–12 weeks with conservative care — no surgery involved.',
          '**Keep moving.** Walking in tolerable doses and frequent position changes typically beat rest. More than a day or two of bed rest tends to slow recovery, not protect it.',
          '**Relative rest, not absolute rest.** In an irritable phase, temporarily trim the things that flare the leg — prolonged sitting, heavy lifting, long car rides — and reintroduce them gradually as symptoms centralize.',
          '**Sleep and pain control matter.** Use the relief positions we\'ll cover next; for short-term medication options, talk to your physician or pharmacist — that\'s their lane, not physiotherapy\'s.',
          '**Book an assessment early.** In one or two visits a physio can usually establish your direction preference, screen for red flags, and give you a personalized roadmap instead of generic internet advice. Our [first appointment checklist](/resources/first-appointment-checklist) covers what to bring.',
          '**Expect flares.** Recovery is sawtooth-shaped, not a straight line. A flare usually means the nerve got irritated — in most cases it does not mean you\'ve re-injured anything.',
        ],
      },
      {
        minute: 14,
        title: 'Positions of relief',
        beats: [
          'Frame these honestly: relief positions are calm-down tools for irritable phases, not the cure. Their job is to turn the volume down so you can keep moving and sleep.',
          '**Lying face down**, or propped on elbows for a few minutes at a time — gentle extension helps many people with the disc-related pattern, though not everyone.',
          '**The 90/90 position** — lying on your back with hips and knees bent, calves resting on a chair or ottoman — offloads the spine and is a reliable flare-day option for many.',
          '**Side-lying with a pillow between the knees** for sleep. Which side is your relief side varies person to person — test both and keep the winner.',
          '**Short, frequent walks** often beat one long walk. If long walks build the leg symptoms, cut the distance and raise the frequency.',
          'Apply the compass from earlier: whichever position eases the leg symptoms or draws them up toward the spine is **your** relief position. If a position pushes symptoms further down the leg, it\'s not for you right now.',
        ],
      },
      {
        minute: 17,
        title: '"Exercises to avoid" — the honest answer',
        beats: [
          'Let\'s answer the phrase people actually search. Honestly: there is no universal forbidden list, and almost no exercise is inherently dangerous for sciatica. What matters is **dose**, **direction**, and **timing**.',
          'That said, some things commonly flare an irritable nerve root in the early weeks: heavy loaded bending first thing in the morning, long-lever sit-ups, and pushing through movements that are clearly peripheralizing your symptoms.',
          'The biggest trap we un-teach: **aggressive hamstring stretching**. That "tight hamstring" is often a sensitized nerve, not a short muscle — and yanking on an irritated nerve typically makes the leg worse, not better.',
          'Direction preference is the real story. Many people have a movement direction — often extension, sometimes flexion or a sideways shift — that centralizes their symptoms. Matching it tends to help; loading the opposite direction too early tends to flare.',
          'Reframe "avoid": it\'s temporary and personal, not a lifetime ban. As the nerve settles, the flexion, lifting, and stretching all come back — usually within weeks, reintroduced gradually.',
          'The clickbait test: any video promising instant fixes for everyone is ignoring that sciatica has different drivers and different direction preferences in different people. If it worked instantly for everyone, you wouldn\'t still be searching.',
        ],
      },
      {
        minute: 22,
        title: 'Red flags, imaging, and when surgery is actually on the table',
        beats: [
          '**Cauda equina syndrome — emergency.** New difficulty starting or controlling urination, loss of bowel control, numbness in the saddle area (the part of you that would touch a bike seat), often with symptoms in both legs. That\'s an emergency department visit **now** — not a physio booking, not wait-and-see.',
          '**Progressive weakness — prompt physician review.** A foot that drags or drops more each week, or a leg buckling more over time, needs medical assessment. Distinguish this from mild, stable weakness, which is fairly common and usually recovers.',
          '**Imaging:** not needed to start rehab for a typical presentation. Disc bulges show up on MRIs of many pain-free adults, and for most people early imaging doesn\'t change first-line care — it just adds scary-sounding words.',
          'When imaging **is** warranted: red flags, a progressive neurological deficit, or when an injection or surgery is genuinely being considered and the scan will guide it.',
          'When a surgical consult makes sense: cauda equina (emergency), significant progressive weakness, or severe leg-dominant pain that hasn\'t meaningfully responded to 6–12 weeks of good conservative care. For the right candidate, surgery mainly buys faster leg-pain relief — longer-term results often converge with non-surgical care. More context in our [back pain article](/resources/when-to-see-a-physio-for-back-pain).',
        ],
      },
      {
        minute: 26,
        title: 'Realistic recovery arcs — and what rehab at AIM looks like',
        beats: [
          'Typical arcs: many people are substantially better in 6–12 weeks; a smaller group takes three to six months; a small minority takes longer or ends up weighing a surgical opinion. All of those are recognized arcs — a slower one is not failure.',
          'A patch of numbness on the foot often outlasts the pain and can keep improving for months after everything else settles. Nerves heal slowly — that lingering patch is usually the last thing to go.',
          'What rehab looks like here: an assessment that finds your direction preference and screens the nerves; then a plan mixing graded movement, nerve-mobility work as tolerated, progressive strengthening of the hips and back, and education — front-loaded early, spaced out as you improve. That\'s our core [physiotherapy](/services/physiotherapy) model.',
          'The end goal isn\'t just "pain gone" — it\'s a back and leg more resilient than before the episode, because a previous episode is one of the main risk factors for the next one.',
          'For the minority whose symptoms persist well beyond the usual arc, a broader [chronic pain rehabilitation](/services/chronic-pain-rehabilitation) approach — addressing sensitivity, sleep, and graded exposure — has better evidence than simply repeating more of the same.',
        ],
      },
      {
        minute: 28,
        title: 'Wrap + CTA',
        beats: [
          'Recap: sciatica is a symptom, not a diagnosis; centralization is your compass; keep moving in tolerable doses; the "avoid" list is personal and temporary; and know the red flags cold — cauda equina symptoms and progressive weakness mean medical care now.',
          'Direct viewers to the companion PDF — the First Six Weeks Playbook — and to the [sciatica article](/resources/sciatica-what-it-is-and-how-its-treated) for the written version of today\'s material.',
          'Two clear CTAs: **Book an assessment** and **Book Now**. Direct-billed to most extended health plans, and we also handle WCB and MVA claims where the episode is work- or collision-related.',
        ],
      },
    ],
    companionPdf: {
      title: 'Sciatica: First Six Weeks Playbook',
      description:
        'A printable one-pager for the first six weeks of leg-dominant nerve pain — your daily compass, relief positions, activity guidance, and the red flags that mean medical care now.',
      contents: [
        'Symptom map: is your leg pain likely nerve-root related?',
        'Centralization tracker — chart how far down the leg symptoms reach each week',
        'Positions of relief for flare days (illustrated)',
        'First-six-weeks activity guide: what to keep doing, what to dose down temporarily',
        'Red-flag checklist — cauda equina symptoms and progressive weakness (ER / physician now)',
        'When imaging is and isn\'t warranted + AIM direct-billing info',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-14',
    relatedConditions: ['sciatica', 'back-pain', 'hip-pain'],
    relatedServices: [
      'physiotherapy',
      'chronic-pain-rehabilitation',
      'chiropractic-care',
      'massage-therapy',
    ],
    relatedArticles: [
      'sciatica-what-it-is-and-how-its-treated',
      'when-to-see-a-physio-for-back-pain',
      'first-appointment-checklist',
    ],
  },

  {
    slug: 'rotator-cuff-tear-physio-vs-surgery',
    status: 'scripted',
    title: 'Rotator Cuff Tear — Physio vs Surgery: How to Decide',
    description:
      'A plain-language decision guide for adults weighing rotator cuff surgery against physiotherapy — what the evidence shows, the four factors that actually decide it, and why either path runs through structured rehab.',
    category: 'Shoulder',
    tags: [
      'rotator cuff',
      'shoulder pain',
      'surgery decision',
      'physiotherapy',
      'shoulder rehab',
    ],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'Physiotherapy & Post-Surgical Rehabilitation',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 25,
    learningObjectives: [
      'Explain the difference between traumatic and degenerative (atraumatic) rotator cuff tears and why it changes the treatment conversation.',
      'Describe what the evidence shows about structured physiotherapy for atraumatic tears — including that roughly 3 in 4 people do well without surgery.',
      'List the four decision factors used to weigh physio against surgery: how the tear happened, age and activity demands, weakness versus pain, and response to a proper rehab trial.',
      'Recognize why a tear on an MRI or ultrasound report does not automatically mean surgery — many pain-free shoulders show tears on imaging.',
      'Describe what a 12-week structured loading trial involves and why a trial that doesn\'t succeed does not close the surgical door.',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          '"You\'ve been told you have a rotator cuff tear — and now you\'re supposed to choose between surgery and physio, and nobody has actually explained how to make that call." If that\'s you, this session is the conversation you were probably hoping to have in the ten-minute appointment where you got the diagnosis.',
          'I\'m a physiotherapist with AIM Physiotherapy here in the Edmonton area, and this exact decision walks through our doors every week — someone holding an ultrasound or MRI report with the word \'tear\' on it, worried they\'re one wrong move away from needing an operation.',
          'This video is for adults — mostly 40 and up — with a diagnosed or suspected rotator cuff tear who are weighing their options. If you search this topic online, you mostly find research papers written for surgeons. Over the next 25 minutes we\'re going to translate that research into an actual decision guide.',
          'One thing up front: we are not anti-surgery, and we\'re not here to sell you physio. AIM works alongside Edmonton-area surgeons and family doctors, we [direct-bill most extended health plans](/services/direct-billing), and our job today is to help you understand which path fits your shoulder — because as you\'ll see, both paths run through rehab anyway.',
        ],
      },
      {
        minute: 2,
        title: 'What a rotator cuff tear actually is — and what imaging can\'t tell you',
        beats: [
          'Your rotator cuff is four muscles and their tendons that wrap the ball of your shoulder joint like a cuff on a sleeve. They don\'t just move the arm — they hold the ball centred in the socket while the bigger muscles do the heavy lifting.',
          'A \'tear\' means some of that tendon tissue has frayed or pulled apart. **Partial-thickness** means the tendon is damaged but still continuous; **full-thickness** means the tear goes all the way through — though even then, the rest of the cuff usually keeps working.',
          'Here\'s the sentence I most want you to remember tonight: **how the tear looks on imaging matters less than how your shoulder works.** Studies that scan completely pain-free adults consistently find rotator cuff tears in people with zero symptoms, and in adults over 60, some degree of cuff tearing on a scan is common even with no symptoms at all.',
          'That doesn\'t mean your tear isn\'t real or your pain isn\'t real. It means the scan alone can\'t tell us whether surgery will help. We have to look at the whole picture: how the tear happened, what you can and can\'t do, and how the shoulder responds to loading — which is exactly the framework we\'ll build in this session.',
          'One more reason not to treat the report as the whole story: [shoulder pain](/conditions/shoulder-pain) is rarely just one thing. Tears often coexist with bursitis, stiffness, and referred neck pain — our article on [common causes of shoulder pain](/resources/shoulder-pain-causes) is a good companion read on that.',
        ],
      },
      {
        minute: 5,
        title: 'What the evidence actually says',
        beats: [
          'Let\'s put the headline numbers on the table. For **atraumatic tears** — the degenerative kind that develop gradually with age and use — roughly **3 in 4 people do well with structured physiotherapy alone**, without ever needing surgery. That figure comes from multi-year follow-up research, not wishful thinking.',
          'And those studies followed people for years: most who were doing well after the initial rehab period were still doing well five-plus years later. For most degenerative tears, choosing physio first is not choosing a temporary fix.',
          'The picture shifts for **traumatic full-thickness tears** — a fall, a wrenching injury, a shoulder that was fine on Tuesday and couldn\'t lift on Wednesday. In younger, active patients, especially with genuine weakness, the evidence leans toward earlier surgical consultation, because these tears can retract over time and tend to repair well when addressed sooner.',
          'Here\'s the finding that surprises people most: whether your tear is partial or full-thickness matters **less** for this decision than how your shoulder functions. A small full-thickness tear in a strong, improving shoulder is often a better physio candidate than a partial tear in a weak, worsening one.',
          'And randomized trials comparing surgery to structured exercise for degenerative tears have generally found small or no differences in pain and function a year or two out. That\'s not a knock on surgeons — it\'s evidence that for the right tear, the rehab pathway is genuinely competitive.',
        ],
      },
      {
        minute: 9,
        title: 'Decision factors 1 and 2: how it happened, and what you need from the arm',
        beats: [
          'First question we ask in the assessment room: **how did this tear happen?** A gradual ache that crept in over months points to a degenerative tear — the kind that mostly does well with rehab. A specific injury with immediate weakness points traumatic — the kind where we get a surgical opinion moving early, usually in parallel with starting rehab.',
          'Second factor: **your age and what you demand from the shoulder.** A 45-year-old electrician who works overhead all day and a 68-year-old who wants to garden and golf are different conversations — not because one matters more, but because tendon healing capacity and daily demands genuinely change the math.',
          'Typically, younger patients with traumatic full-thickness tears and high overhead demands sit closest to the surgical end of the spectrum. Older patients with gradual-onset tears and everyday demands sit closest to the physio-first end. Most people land somewhere in between — which is exactly why this is an assessment, not a flowchart.',
          'One Alberta-specific note: if the tear happened at work, the funding picture changes too. [WCB claims](/services/wcb-rehabilitation) cover physiotherapy for accepted shoulder injuries, and we manage that process routinely — the clinical decision framework stays exactly the same.',
        ],
      },
      {
        minute: 12,
        title: 'Decision factor 3: weakness-dominant vs pain-dominant',
        beats: [
          'If I had to rank the factors, this one sits near the top: is your problem mainly **pain**, or mainly **weakness?** Pain with reasonably preserved strength usually responds well to rehab, because pain has many drivers we can change — irritated tissue, guarded movement patterns, deconditioning.',
          'True weakness is different. If you genuinely cannot lift the arm against light resistance — not \'it hurts to lift\' but \'the signal doesn\'t seem to get through\' — that raises the odds of a larger or retracted tear, and it moves the surgical conversation up the priority list.',
          'The catch is that pain can masquerade as weakness: a shoulder that hurts enough will test weak on the day. Part of a proper physiotherapy assessment is teasing those two apart — sometimes over two or three visits as the irritability settles.',
          'So here\'s a practical self-check — a rough guide, not a diagnosis. Can you get the arm overhead in some fashion, even with discomfort? Can you hold it up against gravity when someone helps it there? If yes to both, you most likely have time to trial rehab properly. If no to either, get assessed sooner rather than later.',
        ],
      },
      {
        minute: 15,
        title: 'The 12-week structured loading trial',
        beats: [
          'The standard conservative pathway — the one actually used in the research trials — is a **12-week structured loading program**. Not a printout of three exercises, not \'rest it and see how it feels\': a progressive, monitored program that starts by restoring motion and calming irritability, then rebuilds cuff and shoulder-blade strength week over week.',
          'Roughly speaking: weeks one to four are about motion and control — getting the shoulder blade moving well, restoring reach, using isometrics that load the tendon without flaring it. Weeks five to eight add progressive resistance through range. Weeks nine to twelve push toward your actual demands — overhead reach, lifting, sport- or job-specific tasks.',
          '\'Structured\' also means **measured**. We track strength, range, and function against a baseline, so at the twelve-week mark you\'re not guessing whether it worked — you have numbers. Most people who are going to respond show meaningful change somewhere between weeks six and twelve.',
          'Two honest caveats. Doing half the program tells us nothing — an unfinished trial is the most common reason people end up in surgery believing physio \'failed\' when it was never really tried. And a proper trial needs supervision and progression, which is what [structured physiotherapy](/services/physiotherapy) actually is.',
          'And the question everyone asks: **does trying physio first burn the surgical bridge?** For degenerative tears, the evidence says no — outcomes after later surgery are generally comparable when a conservative trial came first. Those twelve weeks are information gained, not time lost.',
        ],
      },
      {
        minute: 19,
        title: 'What surgical recovery actually involves',
        beats: [
          'Now the part that gets skipped in a lot of consultations: what saying \'yes\' to surgery actually commits you to. Rotator cuff repair is typically followed by around **six weeks in a sling**, then months of progressive rehab — most people are looking at **six months or more** before the shoulder is genuinely useful again, and often close to a year for full overhead strength.',
          'That timeline exists to protect the repair. The reattached tendon has to biologically heal to bone before it can be loaded, and rushing that process is how repairs re-tear. So early on you\'re doing passive motion, then gradually earning back active use, then strength — under a physiotherapist\'s supervision the entire way.',
          'Hold the two timelines side by side. Physio-first: you\'re active from week one and you have a meaningful answer by week twelve. Surgery-first: sling, then a rehab program that looks a lot like the physio pathway anyway — just starting later and running longer. **Surgery is not the shortcut.** For the right tear it\'s the right call, but it\'s the longer road, not the faster one.',
          'Either way, you end up in rehab — the only question is whether an operation comes first. That\'s why we tell patients the real decision isn\'t \'physio or surgery\'; it\'s \'rehab now, or surgery then rehab.\' Our [post-surgical rehabilitation](/services/post-surgical-rehabilitation) team runs that second path routinely, so if you do have surgery, the plan is ready before the sling comes off.',
          'If surgery is looking likely for you, our article on [physio after surgery](/resources/physio-after-surgery) walks through the post-op timeline in more detail — worth reading before your surgical consult, not after.',
        ],
      },
      {
        minute: 22,
        title: 'Putting it together: your decision snapshot',
        beats: [
          'Let\'s compress everything into a snapshot you can hold onto. **Leaning physio-first:** gradual onset, roughly 50-plus, pain-dominant with usable strength, everyday demands, and no proper rehab trial yet. That describes the majority of rotator cuff tears we see — and roughly three-quarters of that group does well without an operation.',
          '**Leaning toward a surgical consult sooner:** a distinct injury with immediate loss of strength, younger and high-demand, true weakness on testing, or a shoulder that got a genuine 12-week structured trial and clearly hasn\'t moved. Even in that group, starting rehab while you wait for the consult is standard practice — it\'s not either-or.',
          '**And in every case:** the imaging report alone doesn\'t make this decision, the partial-versus-full label matters less than how the shoulder functions, and trying rehab first doesn\'t cost you the surgical option later.',
          'Here\'s what an AIM assessment adds: we take the history that sorts traumatic from degenerative, test strength properly to separate true weakness from pain, review your imaging in context, and give you a straight answer about which pathway we\'d start — including \'go see a surgeon\' when that\'s the honest answer. We put it in writing for your family doctor, and in Alberta you can [see a physiotherapist without a referral](/resources/referrals-in-alberta).',
        ],
      },
      {
        minute: 24,
        title: 'Wrap + CTA',
        beats: [
          'Quick recap. Most degenerative rotator cuff tears — about 3 in 4 — do well with structured physiotherapy alone. Traumatic full-thickness tears in younger, active people lean surgical. The decision turns on how it happened, your demands, weakness versus pain, and how the shoulder responds to a real 12-week loading trial. And surgery, when it\'s the right call, is the longer road — not the shortcut.',
          'Download the companion PDF below — the **Rotator Cuff Tear Decision Worksheet** puts the four factors on one printable page, with the questions worth bringing to your physiotherapist or surgeon. For background reading, start with our guide to [common causes of shoulder pain](/resources/shoulder-pain-causes).',
          'If you\'re holding a tear diagnosis and genuinely don\'t know which way to go, [book an assessment](/book). We\'ll help you decide — and since either path runs through structured rehab, nothing about that visit is wasted whichever way it goes.',
          'We have [clinics across the Edmonton area](/locations), we [direct-bill most extended health plans](/services/direct-billing), and if your tear happened at work we handle WCB claims routinely. No referral needed to start. [Book now](/book) — the first step in either pathway is the same one.',
        ],
      },
    ],
    companionPdf: {
      title: 'Rotator Cuff Tear Decision Worksheet',
      description:
        'A printable one-page worksheet that walks you through the four decision factors with your own answers, so you bring a clearer picture to your physiotherapist, family doctor, or surgeon.',
      contents: [
        'The four decision factors as fill-in prompts: how it happened, age and demands, weakness vs pain, rehab response so far',
        'Traumatic vs degenerative tear comparison table at a glance',
        'What a 12-week structured loading trial looks like, phase by phase',
        'Side-by-side recovery timelines: physio-first vs surgery-then-rehab',
        'Signs that should move the surgical conversation up sooner',
        'Questions to bring to your physiotherapy or surgical consult',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-14',
    relatedConditions: ['shoulder-pain', 'post-surgical-recovery', 'sports-injuries'],
    relatedServices: [
      'physiotherapy',
      'post-surgical-rehabilitation',
      'wcb-rehabilitation',
      'direct-billing',
    ],
    relatedArticles: [
      'shoulder-pain-causes',
      'physio-after-surgery',
      'first-appointment-checklist',
    ],
  },

  {
    slug: 'frozen-shoulder-timeline-how-to-shorten-it',
    status: 'scripted',
    title: 'Frozen Shoulder: The 6-Month to 2-Year Journey (and How to Shorten It)',
    description:
      'An honest, phase-by-phase guide to frozen shoulder — how long freezing, frozen, and thawing really take, what physiotherapy can change at each stage, and when injections or surgery are worth discussing.',
    category: 'Shoulder',
    tags: [
      'frozen shoulder',
      'adhesive capsulitis',
      'shoulder',
      'physiotherapy',
      'injections',
    ],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'Physiotherapy & Shoulder Rehabilitation',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 25,
    learningObjectives: [
      'Explain what adhesive capsulitis is — capsule inflammation followed by fibrosis — in plain language.',
      'Describe the freezing, frozen, and thawing phases with realistic duration ranges for each.',
      'Recognize the risk factors (diabetes, thyroid conditions, post-immobilization) that make frozen shoulder more likely and sometimes longer.',
      'Distinguish frozen shoulder from rotator cuff problems using the loss of both passive and active range.',
      'List what physiotherapy can and cannot change at each phase, and when corticosteroid injection, hydrodilatation, or surgery is worth discussing.',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          'One-sentence hook: "Frozen shoulder is one of the few conditions where the honest timeline is measured in months to years — and knowing that upfront changes everything about how you get through it."',
          'Name and credential; two-sentence positioning (AIM treats frozen shoulder every week across our Edmonton-area clinics; visits are direct-billed to most extended health plans).',
          'Who this is for: adults roughly 40–60 — more often women — who\'ve been told they have frozen shoulder, or suspect it, and are frustrated that nothing seems to be moving.',
          'The promise of this session: an honest map of the whole journey — what physiotherapy can genuinely change at each phase, what it can\'t, and where injections and surgery fit. No vague promises.',
        ],
      },
      {
        minute: 1,
        title: 'What adhesive capsulitis actually is',
        beats: [
          'The medical name is **adhesive capsulitis**. The capsule is the envelope of connective tissue that wraps the ball-and-socket joint of your shoulder.',
          'It\'s a two-step process: first the capsule becomes **inflamed** — that\'s the painful stage — and then it **thickens and scars down** (fibrosis), physically shrinking the space the joint has to move in.',
          'That\'s why it behaves nothing like a pulled muscle. The problem isn\'t damaged tissue that needs rest — it\'s a contracted capsule. And stretching a hot, inflamed capsule aggressively typically just makes it angrier.',
          'It usually affects one shoulder. A minority of people — figures around 10–20% are often quoted — develop it in the other shoulder later, usually not at the same time.',
          'The whole arc runs a long, largely self-limiting course. We\'ll put real numbers on it in a few minutes — that timeline is the heart of this session.',
        ],
      },
      {
        minute: 4,
        title: 'Who gets it — and why that matters',
        beats: [
          'The classic profile: age 40–60, somewhat more common in women. It\'s rare under 40, and a "frozen shoulder" diagnosis in a 25-year-old deserves a second look.',
          '**Diabetes** is the strongest known link. Frozen shoulder is notably more common in people with diabetes, tends to run more severe and slower to resolve, and affects both shoulders more often.',
          '**Thyroid conditions** — both underactive and overactive — are also associated. If you have frozen shoulder and haven\'t had routine bloodwork recently, it\'s a reasonable conversation to have with your family doctor.',
          '**Immobilization** is the third trigger: after a fracture, a surgery, or a long stretch in a sling, the capsule can stiffen into a true frozen shoulder. This is exactly why physios push early gentle movement after shoulder injuries.',
          'That said, most cases arrive with **no obvious trigger** — what\'s called primary or idiopathic frozen shoulder. It is not something you did wrong, and it isn\'t caused by sleeping position or a bad workout.',
          'Why risk factors matter: they shape honest expectations. If you have diabetes, we plan openly for a potentially longer arc rather than over-promising and disappointing you at month six.',
        ],
      },
      {
        minute: 7,
        title: 'Is it actually frozen shoulder? Ruling out the rotator cuff',
        beats: [
          'Most shoulder pain is **not** frozen shoulder — rotator cuff–related pain is far more common. Getting this call right early matters, because the two conditions need almost opposite plans.',
          'The distinguishing feature: in rotator cuff problems, someone else can usually move your arm through most of its range even when you can\'t lift it yourself — passive range is largely preserved. In frozen shoulder, **both active and passive range are lost**. The joint is mechanically blocked no matter who\'s moving it.',
          'The classic tell is **external rotation** — reaching for the seatbelt, putting your hand behind your head. That direction is typically the first and worst to go.',
          'Night pain and pain reaching behind your back show up in both conditions — which is why self-diagnosis from a search engine is so unreliable for shoulders. We cover the common culprits in our [shoulder pain causes guide](/resources/shoulder-pain-causes).',
          'Imaging plays a supporting role: the diagnosis is clinical, made by examining range. An X-ray mainly rules out other causes — in frozen shoulder the joint usually looks normal on film, which surprises many patients.',
          'Why the distinction matters: cuff-related pain often improves in weeks with the right loading program. A frozen shoulder mislabeled as a cuff problem sets up months of wrong expectations — and vice versa.',
        ],
      },
      {
        minute: 10,
        title: 'The honest timeline: freezing, frozen, thawing',
        beats: [
          'Most clinic websites promise frozen shoulder "resolves with treatment" and leave it there. We\'d rather give you real numbers, because the timeline is the single thing patients tell us they wish someone had explained.',
          '**Phase 1 — Freezing.** Pain-dominant. Typically **2–9 months**. Pain at rest, pain at night, and range quietly slipping away. This is usually when people seek help, and often when they\'re most frustrated.',
          '**Phase 2 — Frozen.** Stiffness-dominant. Typically **4–12 months**. The pain eases, especially at rest — genuinely good news — but the shoulder is at its stiffest. Dressing, reaching overhead, and the back-seat reach are the daily battles.',
          '**Phase 3 — Thawing.** Range gradually returns. Typically **6 months to 2 years**. Progress is slow but real, and this is where rehab pays its biggest dividends.',
          'The phases overlap and blur — nobody wakes up one morning in a new phase. Think of it as a slow arc, not three switches.',
          'Untreated, the whole journey most commonly runs **1 to 2.5 years**. Treatment aims to make it shorter and — just as importantly — far more livable while it runs.',
          'Here\'s the genuinely reassuring part, and it\'s reassuring because it\'s true: **frozen shoulder ends.** Most people return to normal or near-normal function. A minority keep some mild residual stiffness, and it rarely limits daily life.',
        ],
      },
      {
        minute: 13,
        title: 'Phase by phase: what physio can and cannot change',
        beats: [
          '**Freezing phase — what physio cannot do:** stretch you out of it. Aggressive stretching of an inflamed capsule typically flares pain for days and gains nothing. Any clinic promising to "break it free" at this stage should raise an eyebrow.',
          '**Freezing phase — what physio can do:** calm pain with manual therapy, gentle mobilization within tolerance, and heat; protect your sleep with positioning strategies; keep the shoulder blade and the rest of the arm strong; and adapt your work and daily tasks. The success metric in this phase is pain and sleep — not degrees of motion.',
          '**Frozen phase:** we cannot rush the capsule\'s remodelling schedule. What we can do is hold the range you have, introduce more sustained stretching as irritability drops, strengthen within the available range, and keep you functioning at work and at home.',
          '**Thawing phase:** this is where physiotherapy genuinely earns range. Progressive stretching, joint mobilization, and graded strengthening accelerate and complete the recovery — untreated shoulders often plateau short of full motion, and guided loading helps reclaim that end range.',
          'Two supporting pieces: [massage therapy](/services/massage-therapy) helps with the neck and upper-back tension that builds from months of guarding, and a structured [physiotherapy](/services/physiotherapy) plan gets re-matched to your phase at every re-assessment. Matching the plan to the phase is what "shortening the journey" actually means in practice.',
        ],
      },
      {
        minute: 17,
        title: 'Injections: the best-evidenced early lever',
        beats: [
          'Here\'s something many patients are never told plainly: a **corticosteroid injection into the joint, early in the freezing phase**, has good evidence for reducing pain — and for many people it appears to shorten the painful phase. We say that honestly because it\'s true, and because the benefit is greatest early. Waiting until month eight blunts it.',
          'An injection is not a cure. The capsule still remodels on its own schedule. But it can buy a window of comfort — and physiotherapy in that window is far more productive than physiotherapy against a wall of pain.',
          'Alberta logistics: physiotherapists don\'t inject — you\'ll need a physician (your family doctor or a sports medicine clinic). You don\'t need a referral to start physio, and we routinely send a letter that speeds the injection conversation up. Here\'s [how referrals work in Alberta](/resources/referrals-in-alberta).',
          'The pattern we most often suggest discussing with your doctor: consider the injection early when night pain is wrecking your sleep, then use the more comfortable weeks that follow for focused movement work.',
        ],
      },
      {
        minute: 20,
        title: 'Refractory cases: hydrodilatation and surgery',
        beats: [
          'Most people watching this will never need this section — but knowing the escalation options exist is part of the honest map.',
          '**Hydrodilatation** (distension injection): sterile saline, usually with steroid, injected into the joint under imaging to stretch the capsule from the inside. It\'s a day procedure. Evidence compared with steroid injection alone is mixed, but some people get a meaningful jump in range — and it should be followed promptly by physiotherapy to keep what was gained.',
          '**Surgery** — most commonly arthroscopic capsular release, less commonly manipulation under anaesthesia — is reserved for shoulders still severely restricted after roughly 6–12 months of well-executed conservative care. It\'s followed by early, intensive physio, and that rehab commitment is part of the decision.',
          'People with diabetes are over-represented among refractory cases — one more reason we set honest expectations from the first visit rather than discovering them at month ten.',
          'Escalating is not failure. It\'s a timeline decision you make with your physician when the trajectory isn\'t acceptable for your life — and your physio\'s range measurements over time are exactly the evidence that conversation needs.',
        ],
      },
      {
        minute: 23,
        title: 'Wrap + CTA',
        beats: [
          'Recap the map: frozen shoulder is a capsule problem with three overlapping phases; physiotherapy\'s job changes with each phase — pain and sleep early, function in the middle, range in the thaw; an early corticosteroid injection is the best-evidenced way to shorten the painful stage; and above all, **it ends**.',
          'Direct viewers to the companion PDF — the phase guide and monthly range tracker — and to the [shoulder pain causes article](/resources/shoulder-pain-causes) if they\'re not yet sure this is frozen shoulder. First visit nerves? There\'s a [first appointment checklist](/resources/first-appointment-checklist) too.',
          'Two clear CTAs: **Book an assessment** and **Book Now**. No physician referral needed to start physiotherapy in Alberta, and visits are direct-billed to most extended health plans.',
        ],
      },
    ],
    companionPdf: {
      title: 'Frozen Shoulder Phase Guide & Range Tracker',
      description:
        'A printable one-pager that maps the freezing, frozen, and thawing phases with honest duration ranges, what helps at each stage, and a monthly tracker so progress that feels invisible becomes visible.',
      contents: [
        'The three phases at a glance, with realistic duration ranges for each',
        '"Is it frozen shoulder?" quick self-check — how it differs from rotator cuff pain',
        'What physio can and cannot change at each phase (summary table)',
        'Sleep positioning and daily-task strategies for the painful phase',
        'Questions to ask your physician about corticosteroid injection and hydrodilatation',
        'Monthly range-of-motion, sleep, and pain tracker grid',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-14',
    relatedConditions: ['shoulder-pain'],
    relatedServices: ['physiotherapy', 'massage-therapy', 'direct-billing'],
    relatedArticles: [
      'shoulder-pain-causes',
      'referrals-in-alberta',
      'first-appointment-checklist',
    ],
  },

  {
    slug: 'male-pelvic-floor-post-prostatectomy-recovery',
    status: 'scripted',
    title: 'Male Pelvic Floor & Post-Prostatectomy Recovery: Regaining Control',
    description:
      'Why leaking happens after prostate surgery, how quickly it typically improves, and how pelvic floor physiotherapy — ideally started before your surgery date — speeds the return of bladder control. Matter-of-fact, for men.',
    category: 'Pelvic Health',
    tags: [
      'pelvic floor',
      'prostatectomy',
      'men\'s health',
      'incontinence',
      'physiotherapy',
    ],
    presenter: {
      name: 'AIM Clinical Team',
      role: 'Pelvic Floor Physiotherapy',
      bio: null,
      photoUrl: null,
    },
    targetRuntimeMinutes: 25,
    learningObjectives: [
      'Explain, in plain language, why urinary leakage is expected after prostatectomy and which structures take over continence.',
      'Describe a realistic continence recovery arc (most men improve substantially over 3–12 months) and the factors that speed it up.',
      'Explain why pelvic floor training should ideally start before the surgery date, and what prehab involves.',
      'Describe what a male pelvic floor physiotherapy assessment involves — external by default, internal only with consent and often unnecessary.',
      'Recognize other treatable male pelvic floor problems: post-void dribble, urgency, and chronic pelvic pain.',
    ],
    segments: [
      {
        minute: 0,
        title: 'Cold open',
        beats: [
          'Hook: "Leaking urine after prostate surgery isn\'t a complication — it\'s the expected starting point. And the muscles that fix it are trainable."',
          'Presenter positioning: AIM\'s pelvic floor physiotherapists work with men before and after prostate surgery regularly — this is routine clinical work for us, and it\'s direct-billed to most extended health plans.',
          'Who this is for: men with prostate surgery on the calendar, men in the weeks or months after it, and frankly any man with pelvic floor symptoms nobody has ever offered to treat.',
          'One ground rule for the next 25 minutes: no euphemisms. We\'ll talk about leaking, pads, erections, and rectal exams in plain language, because that\'s how you actually get help.',
        ],
      },
      {
        minute: 1,
        title: 'Why leaking happens — the anatomy in plain language',
        beats: [
          'The prostate sits like a donut around the urethra, just below the bladder. Before surgery, you have **two** continence mechanisms: an internal valve at the bladder neck, and an external sphincter below the prostate, backed up by your pelvic floor muscles.',
          'Removing the prostate typically disrupts that internal mechanism. What\'s left is the external sphincter and the pelvic floor — **one valve doing a two-valve job.**',
          'That\'s why leaking after surgery is so common: it\'s mechanics, not something you did wrong, and usually not a sign the surgery went badly.',
          'The good news inside that anatomy: the external sphincter and pelvic floor are **skeletal muscle** — the same tissue type as your biceps. Trainable, strengthenable, coachable.',
          'The typical pattern is **stress incontinence**: leaking with cough, sneeze, lifting, or standing up from a chair — moments when pressure spikes and the single remaining valve gets overwhelmed.',
          'Nerve handling during surgery also matters — nerve-sparing techniques, where the tumour allows them, tend to help both continence and erectile recovery. That part is your surgeon\'s domain; ours starts with the muscles.',
        ],
      },
      {
        minute: 5,
        title: 'The typical recovery arc: catheter out to twelve months',
        beats: [
          'When the catheter comes out — usually one to two weeks after surgery — most men leak, often a lot. That first week can be discouraging. It is also the worst it will typically be.',
          '**Most men improve substantially over 3–12 months.** Many are down to a light pad or pad-free within the first several months, and improvement typically continues through the first year.',
          'Progress is front-loaded but not linear. Mornings are usually better than evenings; rested days better than fatigued ones; desk days better than yard-work days. That fluctuation is normal, not backsliding.',
          'Track progress with **pads per day**, not perfect dryness. Going from five pads to two is a major win even though you\'re still leaking.',
          'Here\'s where physio earns its place: research consistently finds that men doing structured pelvic floor training regain continence **measurably sooner** than men left to figure it out alone.',
          'A minority of men still have significant leakage at twelve months. That\'s not the end of the road — continued rehab helps some, and urology has surgical options for persistent cases. If that\'s you, you have a pathway, not a verdict.',
        ],
      },
      {
        minute: 9,
        title: 'Prehab: the best time to start is before your surgery date',
        beats: [
          'Learning to find and control these muscles is far easier **before** surgery — while sensation is normal, there\'s no pain, and there\'s no leaking to feel discouraged about.',
          'The evidence points the same way: men who train before surgery typically regain continence faster afterwards. You walk out of hospital already knowing what to do and how to do it correctly.',
          'Here\'s the gap we see constantly: very few urologists have a physio pathway to hand their patients. You get a surgery date and a pamphlet. So be the patient who asks: **"Should I do pelvic floor prehab before my surgery date?"**',
          'You don\'t need to wait for an answer, either — in Alberta you can [self-refer to physiotherapy](/resources/referrals-in-alberta). No physician referral needed to book a [pelvic floor assessment](/services/pelvic-floor-physiotherapy).',
          'Even one or two sessions before surgery is worthwhile: a baseline assessment, correct technique confirmed, and a written plan for what to do once the catheter is out.',
          'Surgery next week? Still worth it. Surgery already behind you? The window hasn\'t closed — start now. Later is simply the second-best time.',
        ],
      },
      {
        minute: 12,
        title: 'What a male pelvic floor assessment actually involves',
        beats: [
          'First, a conversation: your surgery and pathology details, symptoms, pads per day, what you\'ve tried, and what matters to you — getting back to golf, work, the gym, intimacy.',
          'Then an **external** assessment: how you breathe, how you brace, posture, abdominal wall, and whether you can actually find and contract the right muscles on cue. For most men, most of this happens fully clothed.',
          'An internal (rectal) exam can give useful detail about muscle strength and tone — but it happens **only with your explicit consent, and it\'s often unnecessary.** External assessment and good coaching get most men where they need to go.',
          'You\'re in control of that decision at every visit. Declining it doesn\'t reduce the quality of your care or your program.',
          'Practical notes: private treatment room, direct answers, discreet booking — the online form doesn\'t ask you to announce anything to a waiting room. Our [first appointment checklist](/resources/first-appointment-checklist) covers what to bring.',
          'What you leave with: a clear picture of how your pelvic floor is working, a program matched to your findings — not a generic Kegel handout — and targets to beat at the next visit.',
        ],
      },
      {
        minute: 15,
        title: 'The training progression: awareness → endurance → bracing under load',
        beats: [
          '**Stage one — awareness.** Finding the right muscles. The cue that works for most men: the gentle lift you\'d use to stop the flow of urine, or to shorten the penis slightly. It\'s a subtle lift-and-squeeze, not a strain.',
          'The classic mistakes: holding your breath, clenching your glutes, or bracing your abs instead. If your whole body is working, the pelvic floor probably isn\'t. This is exactly what a physio\'s coaching fixes in one or two sessions.',
          '**Stage two — endurance and speed.** The sphincter needs two gears: quick reflexive squeezes to catch a cough, and longer sustained holds for all-day support. We train both — quick flicks and endurance holds, progressed over weeks.',
          '**Stage three — bracing under load.** The skill that actually stops leaks in real life: contracting **just before** the cough, the lift, or standing up — then building that reflex into sit-to-stand, carrying, walking, and eventually the gym.',
          'More is not better. An exhausted pelvic floor leaks **more**, not less. Quality contractions in planned doses beat squeezing all day — this is a training program, not a nervous habit.',
          'Progress is measured in pads and confidence: fewer pads, drier evenings, and the day you leave the house without checking where the bathrooms are.',
        ],
      },
      {
        minute: 19,
        title: 'Erectile function: the honest version',
        beats: [
          'Erectile changes after prostatectomy are common, and the biggest driver is how the nerves fared during surgery. Physio cannot change that, and anyone who implies otherwise is overselling.',
          'The honest, limited-but-real role: pelvic floor muscles contribute to rigidity and to keeping blood in the penis during erection. Training them may help some men — as an **adjunct** to the medical management your urologist leads, never a replacement for it.',
          'One problem where pelvic floor work has a more direct role: **climacturia** — leaking urine at orgasm. It\'s common after prostatectomy, rarely discussed, and often improves with the same training and timing strategies.',
          'The takeaway: your urologist leads erectile recovery; we work alongside. Bring it up in either office — it\'s a standard clinical topic in both.',
        ],
      },
      {
        minute: 21,
        title: 'Beyond the prostate: other male pelvic floor problems',
        beats: [
          '**Post-void dribble** — a few drops arriving after you\'ve finished and zipped up. Extremely common at every age, almost never talked about, and it responds well to a simple technique plus targeted training.',
          '**Urgency and frequency** — the bladder that demands attention every hour, or the key-in-the-door sprint. Bladder retraining plus pelvic floor work helps many men considerably.',
          '**Chronic pelvic pain** — often labelled chronic prostatitis, and frequently not an infection at all but an overactive, guarded pelvic floor. These muscles typically need to learn to **relax**, not to do more Kegels. [Pelvic pain](/conditions/pelvic-pain) in men is assessable and treatable.',
          'The common thread: none of this is rare, and none of it is something you just live with. Men simply aren\'t told that pelvic floor physiotherapy exists for them. It does.',
        ],
      },
      {
        minute: 23,
        title: 'Wrap + CTA',
        beats: [
          'Recap: leaking after prostate surgery is mechanics, not failure. Most men improve substantially over 3–12 months, structured training measurably speeds that up, and the single highest-leverage move is starting **before** your surgery date — so ask your urologist about prehab, or self-refer.',
          'Grab the companion PDF — the Prostate Surgery Pelvic Floor Game Plan — and read the [physio after surgery article](/resources/physio-after-surgery) for the broader post-op picture.',
          'Two clear CTAs: **Book a pelvic floor assessment** and **Book Now** at [/book](/book). No referral needed in Alberta, discreet booking, and [direct-billed](/services/direct-billing) to most extended health plans.',
        ],
      },
    ],
    companionPdf: {
      title: 'Prostate Surgery Pelvic Floor Game Plan',
      description:
        'A printable one-pager covering the weeks before surgery through the first year after — how to find the right muscles, when to train, and how to track progress in pads per day.',
      contents: [
        'Plain-language anatomy diagram: why leaking happens after prostatectomy',
        'Finding the right muscles: three cues and the three classic mistakes',
        'Prehab mini-program for the weeks before your surgery date',
        'Restart plan for after catheter removal (awareness → endurance → bracing under load)',
        'Pads-per-day tracker with monthly milestones for the first year',
        'When to book / when to call your urologist, plus AIM contact and direct-billing info',
      ],
      url: null,
    },
    video: null,
    publishedAt: null,
    lastUpdated: '2026-08-14',
    relatedConditions: ['pelvic-pain', 'post-surgical-recovery'],
    relatedServices: [
      'pelvic-floor-physiotherapy',
      'post-surgical-rehabilitation',
      'physiotherapy',
      'direct-billing',
    ],
    relatedArticles: [
      'physio-after-surgery',
      'first-appointment-checklist',
      'referrals-in-alberta',
    ],
  },
];

export function getWebinarBySlug(slug: string): Webinar | undefined {
  return webinars.find((w) => w.slug === slug);
}

export function getAllWebinarSlugs(): string[] {
  return webinars.map((w) => w.slug);
}
