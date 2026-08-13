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
    relatedServices: [
      'wcb-rehabilitation',
      'physiotherapy',
      'functional-capacity-evaluations',
      'work-conditioning',
      'work-hardening',
      'return-to-work',
    ],
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
];

export function getWebinarBySlug(slug: string): Webinar | undefined {
  return webinars.find((w) => w.slug === slug);
}

export function getAllWebinarSlugs(): string[] {
  return webinars.map((w) => w.slug);
}
