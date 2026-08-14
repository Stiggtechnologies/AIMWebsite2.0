// AIM Website 2.0 — Blog / Resources content module.
// Drop-in companion to lib/content/conditions.ts (same shape: typed array + getBySlug).
// Source: 14 clinician-written drafts converted from website-content-drafts/blog/.
// No MDX / no new deps — body is a structured block array rendered by the
// existing Section / Prose / FeatureList components (see handoff for the
// app/resources/[slug]/page.tsx render component + renderInline helper).

export type BlogBlock =
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'p'; text: string }      // text may contain **bold** and [label](/href) inline markdown
  | { kind: 'ul'; items: string[] }  // items may contain inline markdown
  | { kind: 'ol'; items: string[] }
  | { kind: 'hr' };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;          // <meta description> + OG description
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;          // ISO date
  lastUpdated: string;          // ISO date
  readingMinutes: number;
  relatedConditions: string[];  // condition slugs (lib/content/conditions.ts)
  relatedServices: string[];    // service slugs (lib/content/services.ts)
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "sciatica-what-it-is-and-how-its-treated",
    title: "Sciatica: What It Actually Is and How It's Treated",
    description: "Sciatica is a symptom, not a diagnosis. What's behind the leg pain, what helps in the first 6 weeks, and when to escalate.",
    category: "Physiotherapy",
    tags: [
      "sciatica",
      "back pain",
      "nerve pain",
      "physiotherapy"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-10",
    lastUpdated: "2026-05-10",
    readingMinutes: 6,
    relatedConditions: [
      "sciatica",
      "back-pain"
    ],
    relatedServices: [
      "physiotherapy",
      "chiropractic-care",
      "chronic-pain-rehabilitation"
    ],
    body: [
      {
        kind: "h2",
        text: "The short answer"
      },
      {
        kind: "p",
        text: "Sciatica is a symptom — leg pain (often with numbness or tingling) that follows the path of the sciatic nerve — not a diagnosis on its own. The most common driver is irritation of a lumbar nerve root from a disc bulge or herniation. Most cases improve over weeks with structured rehab; surgery is the exception, not the rule."
      },
      {
        kind: "h2",
        text: "What you might feel"
      },
      {
        kind: "p",
        text: "A typical sciatica pattern: pain that runs from the low back or buttock into the back or side of the thigh, sometimes past the knee into the calf or foot. It can be sharp, burning, or electric. You might notice numbness, pins and needles, or weakness in the leg. Symptoms are often worse with sitting, bending forward, sneezing, or coughing — and can be eased by standing, walking, or specific positions."
      },
      {
        kind: "h2",
        text: "Why it usually settles"
      },
      {
        kind: "p",
        text: "Most disc-related nerve irritation calms down as the chemical and mechanical pressure on the nerve resolves. Imaging changes don't have to disappear for symptoms to disappear — many people with old disc findings have no pain at all. The body adapts."
      },
      {
        kind: "h2",
        text: "What rehab focuses on"
      },
      {
        kind: "ul",
        items: [
          "**Calming the irritated nerve:** finding positions and movements that reduce leg symptoms (often called \"centralization\" — moving symptoms back toward the spine and out of the leg)",
          "**Restoring movement:** graded mobility for the spine and hips, manual therapy where helpful",
          "**Building tolerance:** progressive strength work for the trunk, hips, and legs",
          "**Education:** flare management, posture and load through the day, and why \"the disc out of place\" or \"bone-on-bone\" language usually isn't accurate"
        ]
      },
      {
        kind: "h2",
        text: "A reasonable timeline"
      },
      {
        kind: "p",
        text: "Many cases of acute sciatica improve substantially within 6–12 weeks of structured rehab. Some are quicker. Some — particularly with significant nerve compression — take longer and may benefit from co-management with a physician for medication or imaging."
      },
      {
        kind: "h2",
        text: "When to escalate"
      },
      {
        kind: "ul",
        items: [
          "Progressive weakness in the leg (foot drop, difficulty going up on toes or down on heels)",
          "New bowel or bladder changes, or saddle-area numbness — urgent medical assessment",
          "No meaningful improvement after 6–8 weeks of consistent rehab",
          "Pain severe enough that you can't sleep or function despite reasonable medication"
        ]
      },
      {
        kind: "h2",
        text: "What we don't recommend"
      },
      {
        kind: "ul",
        items: [
          "Long bed rest",
          "\"Just stretching it out\" without a plan — random hamstring stretching often aggravates an irritated nerve",
          "Repeated imaging without a clear clinical question — most findings don't change the plan"
        ]
      }
    ]
  },
  {
    slug: "postpartum-pelvic-floor-recovery",
    title: "Postpartum Pelvic Floor Recovery: What's Normal and What Isn't",
    description: "A practical guide to postpartum pelvic floor recovery — what to expect in the first 6–12 weeks, what's not normal, and what pelvic physio actually does.",
    category: "Pelvic Health",
    tags: [
      "pelvic floor",
      "postpartum",
      "women's health",
      "physiotherapy"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-10",
    lastUpdated: "2026-05-10",
    readingMinutes: 6,
    relatedConditions: [
      "pelvic-pain"
    ],
    relatedServices: [
      "pelvic-floor-physiotherapy",
      "physiotherapy"
    ],
    body: [
      {
        kind: "h2",
        text: "The short answer"
      },
      {
        kind: "p",
        text: "Most pelvic floor symptoms after birth — leaking, heaviness, abdominal separation, pain with intercourse, low back or pelvic pain — are common and treatable. They are not something you have to live with. A pelvic floor physiotherapy assessment around the 6-week mark (sometimes earlier with your provider's clearance) is the most useful step you can take."
      },
      {
        kind: "h2",
        text: "What's actually normal in the first 6 weeks"
      },
      {
        kind: "ul",
        items: [
          "Bleeding (lochia) tapering over 4–6 weeks",
          "Some perineal soreness or healing scar tissue",
          "Mild urinary urgency or occasional leaks with sneezing or coughing in the first weeks",
          "A softer-feeling abdomen with visible separation between the rectus muscles",
          "Fatigue, fluid shifts, and a body that doesn't feel like yours yet"
        ]
      },
      {
        kind: "p",
        text: "These usually trend toward better. A pelvic physio's job is to help that trajectory continue and to spot the things that won't resolve on their own."
      },
      {
        kind: "h2",
        text: "What isn't \"just normal\""
      },
      {
        kind: "ul",
        items: [
          "Leaking urine, gas, or stool that persists past 6–8 weeks (or that you don't want to live with)",
          "A sense of heaviness, dragging, or \"something falling out\" — possible pelvic organ prolapse",
          "Pain with intercourse, tampon use, or pelvic exams",
          "Pain in the perineum, pelvis, low back, or hips that isn't improving",
          "A persistent abdominal \"doming\" or gap that limits how you move",
          "Difficulty fully emptying the bladder or bowel",
          "A C-section or perineal scar that feels stuck, painful, or numb"
        ]
      },
      {
        kind: "p",
        text: "These are common — and treatable. Pelvic physio addresses each directly."
      },
      {
        kind: "h2",
        text: "What pelvic floor physio actually does"
      },
      {
        kind: "p",
        text: "A first visit is a thorough conversation, an external assessment of how you breathe, brace, and move, and — with consent — an internal pelvic floor exam to assess strength, coordination, tone, and any scar tissue. From there, your physio builds a plan that may include:"
      },
      {
        kind: "ul",
        items: [
          "Breathing and pressure-management retraining (the \"blow before you go\" idea)",
          "Pelvic floor strengthening and — just as important — down-training when muscles are too tight",
          "Scar mobilization for perineal or C-section scars",
          "Core and hip rehab integrated with daily life and parenting demands",
          "A graded return-to-running or return-to-lifting plan when you're ready (typically not before 12 weeks postpartum, longer for some)"
        ]
      },
      {
        kind: "h2",
        text: "A note on timing"
      },
      {
        kind: "p",
        text: "You can often start gentle pelvic physio earlier than 6 weeks if there's pain, scar concerns, or breathing/pressure work to do. Internal assessment is usually deferred until your provider clears it. Your physio will guide what's appropriate at each stage."
      }
    ]
  },
  {
    slug: "mva-physio-claim-guide-alberta",
    title: "Physiotherapy After a Motor Vehicle Accident in Alberta — Claim Guide",
    description: "How MVA physiotherapy claims work in Alberta under the DTPR — the first 90 days, what's covered, and how AIM handles it for you.",
    category: "Insurance & Claims",
    tags: [
      "MVA",
      "motor vehicle accident",
      "DTPR",
      "insurance",
      "physiotherapy"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-10",
    lastUpdated: "2026-05-10",
    readingMinutes: 7,
    relatedConditions: [
      "whiplash",
      "neck-pain",
      "back-pain",
      "concussion"
    ],
    relatedServices: [
      "mva-rehabilitation",
      "physiotherapy",
      "concussion-rehabilitation",
      "massage-therapy"
    ],
    body: [
      {
        kind: "h2",
        text: "The short answer"
      },
      {
        kind: "p",
        text: "In Alberta, motor vehicle accident (MVA) injuries are typically handled under the Diagnostic and Treatment Protocols Regulation (DTPR). Most soft tissue injuries qualify for an initial period of rehabilitation funded directly by the auto insurer — at no out-of-pocket cost to you, in most cases. AIM handles the paperwork on your end so you can focus on recovery. *General information only — your individual claim is governed by the regulation, your insurer's adjuster, and your treating clinician's findings.*"
      },
      {
        kind: "h2",
        text: "What the DTPR is, in plain language"
      },
      {
        kind: "p",
        text: "The DTPR is the Alberta framework that classifies common MVA injuries into categories — typically referred to as **WAD I, WAD II, and WAD III** for whiplash-associated disorders, plus sprain and strain categories for other body regions. Each category has a defined protocol of approved treatment and a timeframe in which insurer-funded care is available without you needing to argue for it."
      },
      {
        kind: "h2",
        text: "What you should do in the first 7–14 days"
      },
      {
        kind: "ol",
        items: [
          "See a physician (family doctor, urgent care, or ER if warranted) so injuries are documented in the medical record.",
          "Report the accident to your auto insurer and get a claim number.",
          "Book a physiotherapy assessment — most clinics, including AIM, can start treatment under the DTPR with just your claim number, adjuster's name, and date of accident.",
          "Bring your claim details to your first visit. You don't need to figure out which WAD category you fit — your physio will assess and document that."
        ]
      },
      {
        kind: "h2",
        text: "What's typically covered"
      },
      {
        kind: "p",
        text: "Under the protocols, common MVA presentations (whiplash, soft tissue strains, joint sprains) qualify for an initial period of insurer-funded care that may include:"
      },
      {
        kind: "ul",
        items: [
          "Physiotherapy assessment and treatment",
          "Massage therapy (when delivered as part of an integrated rehab plan)",
          "Chiropractic care (where part of the plan)",
          "Concussion-specific rehabilitation if a concussion was sustained",
          "Vestibular rehabilitation for accident-related dizziness or balance issues"
        ]
      },
      {
        kind: "p",
        text: "If your symptoms are more severe or don't fit the protocols, your treating clinician can request additional treatment beyond the standard funding window — this often involves an injury management consultation with a physician or specialist."
      },
      {
        kind: "h2",
        text: "What if my injuries are more complex?"
      },
      {
        kind: "p",
        text: "Concussions, more significant whiplash injuries, fractures, surgeries, and persistent symptoms past the standard DTPR window are common. They're not a problem — they just route slightly differently. Your physiotherapist coordinates with your physician and the insurer to keep care moving without gaps."
      },
      {
        kind: "h2",
        text: "What AIM handles for you"
      },
      {
        kind: "ul",
        items: [
          "Insurer billing — direct billed wherever the auto insurer permits",
          "DTPR documentation and category assessment",
          "Coordination with your family physician and any specialists involved",
          "Communication with your adjuster about progress and treatment plans",
          "Referral within AIM to massage, chiro, vestibular, or concussion rehab where indicated"
        ]
      },
      {
        kind: "h2",
        text: "What you should bring to your first appointment"
      },
      {
        kind: "ul",
        items: [
          "Photo ID",
          "Your auto insurance claim number",
          "Your adjuster's name and contact info",
          "Date and brief description of the accident",
          "Any imaging or hospital paperwork from the day of the accident",
          "A list of current symptoms and any medications"
        ]
      }
    ]
  },
  {
    slug: "knee-pain-when-to-rest-when-to-train",
    title: "Knee Pain: When to Rest, When to Keep Training",
    description: "Most knee pain doesn't need full rest. A practical guide to load-managing through it — and when to back off and book an assessment.",
    category: "Physiotherapy",
    tags: [
      "knee pain",
      "running",
      "load management",
      "physiotherapy"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-10",
    lastUpdated: "2026-05-10",
    readingMinutes: 6,
    relatedConditions: [
      "knee-pain",
      "sports-injuries",
      "post-surgical-recovery"
    ],
    relatedServices: [
      "physiotherapy",
      "sports-injury-rehabilitation"
    ],
    body: [
      {
        kind: "h2",
        text: "The short answer"
      },
      {
        kind: "p",
        text: "Most knee pain doesn't need full rest. The right answer is usually load management — adjusting how much, how often, and how hard you load the knee while you build the strength and tissue tolerance to handle more. Full rest tends to delay recovery for the majority of common knee complaints."
      },
      {
        kind: "h2",
        text: "A simple traffic-light rule"
      },
      {
        kind: "p",
        text: "Use pain during and 24 hours after activity to guide your load:"
      },
      {
        kind: "ul",
        items: [
          "**Green (0–3/10):** Continue. The knee is tolerating what you're asking of it.",
          "**Yellow (4–5/10):** Modify — drop volume, intensity, or impact. Don't stop.",
          "**Red (6+/10, or pain that lingers >24 hours):** Back off, substitute, and reassess. If it stays red across multiple sessions, book an assessment."
        ]
      },
      {
        kind: "p",
        text: "This rule isn't perfect for every diagnosis (acute injuries with swelling are different — see below), but it's a reasonable default for the most common patellofemoral, tendon-related, and overuse presentations."
      },
      {
        kind: "h2",
        text: "What good \"active rest\" looks like"
      },
      {
        kind: "p",
        text: "If you usually run, that might mean cycling, swimming, or rowing for a couple of weeks. If you usually lift heavy, drop the working weights and add tempo or single-leg work. Keep moving — deconditioned tissue is more sensitive, not less."
      },
      {
        kind: "h2",
        text: "When to actually back off"
      },
      {
        kind: "ul",
        items: [
          "A clear injury moment (twist, pop, fall) followed by swelling within hours",
          "The knee gives way or locks",
          "Pain at rest, at night, or pain that's getting worse week over week",
          "Inability to bear weight or fully straighten the knee",
          "Post-surgical knees with new pain or swelling outside your rehab plan"
        ]
      },
      {
        kind: "p",
        text: "These warrant an assessment before you experiment with load on your own."
      },
      {
        kind: "h2",
        text: "What an assessment changes"
      },
      {
        kind: "p",
        text: "A physiotherapist will sort the most likely drivers — joint, tendon, muscle, biomechanics, training error — and give you a specific load plan instead of a generic one. For runners, that often means cadence and volume tweaks plus targeted strength. For lifters, it's usually movement variation plus a 6–12 week strength build for the hips, quads, and calves. For athletes returning from injury, it's a structured return-to-sport progression with clear criteria."
      },
      {
        kind: "h2",
        text: "Common knee patterns we see"
      },
      {
        kind: "ul",
        items: [
          "**Patellofemoral pain** — front-of-knee, worse with stairs, squats, prolonged sitting",
          "**Patellar / quadriceps tendinopathy** — point-tender just below or above the kneecap, jumps and decelerations are provocative",
          "**IT band-related lateral knee pain** — common in runners ramping mileage",
          "**Medial joint line pain** — meniscal-type irritation, often respond well to rehab without surgery",
          "**Post-arthroscopy / post-ACL reconstruction** — structured rehab is the rule, not the exception"
        ]
      }
    ]
  },
  {
    slug: "first-appointment-checklist",
    title: "Your First Appointment: A Simple Checklist",
    description: "A simple checklist for your first physiotherapy or rehab visit at AIM — what to bring, what to wear, and what to expect.",
    category: "Patient Information",
    tags: [
      "new patient",
      "first visit",
      "what to expect"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-06",
    lastUpdated: "2026-05-06",
    readingMinutes: 4,
    relatedConditions: [],
    relatedServices: [
      "physiotherapy"
    ],
    body: [
      {
        kind: "h2",
        text: "Before your visit"
      },
      {
        kind: "ul",
        items: [
          "**Insurance info** — card, member ID, plan and group number, date of birth.",
          "**Imaging or reports** — anything from your physician or specialist that's relevant.",
          "**A short symptom timeline** — when symptoms started, what's helped, what's made it worse.",
          "**What success looks like** — one or two specific things you'd like to do again."
        ]
      },
      {
        kind: "h2",
        text: "What to wear"
      },
      {
        kind: "p",
        text: "Comfortable clothing you can move in. For lower-body assessments, athletic shorts help. For shoulder or neck, a tank top or t-shirt. Pelvic floor visits are private — wear what's comfortable."
      },
      {
        kind: "h2",
        text: "At the clinic"
      },
      {
        kind: "p",
        text: "Arrive 10–15 minutes early to complete intake. Your therapist will take a thorough history, assess movement and relevant tests, and discuss findings and a plan with you. Most first visits are 45–60 minutes."
      },
      {
        kind: "h2",
        text: "After the visit"
      },
      {
        kind: "p",
        text: "You'll typically leave with a plan — exercises, expectations, and a follow-up cadence. We aim to give you a clear sense of trajectory so you know what to expect."
      }
    ]
  },
  {
    slug: "whiplash-recovery-timeline",
    title: "Whiplash Recovery Timeline: What to Expect",
    description: "Realistic timelines, what helps, what slows recovery, and when to be concerned about persistent whiplash symptoms.",
    category: "MVA",
    tags: [
      "whiplash",
      "MVA",
      "neck pain",
      "rehab"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-06",
    lastUpdated: "2026-05-06",
    readingMinutes: 6,
    relatedConditions: [
      "whiplash",
      "neck-pain",
      "concussion"
    ],
    relatedServices: [
      "mva-rehabilitation",
      "physiotherapy"
    ],
    body: [
      {
        kind: "h2",
        text: "A typical trajectory"
      },
      {
        kind: "p",
        text: "Most people with whiplash improve substantially within 6–12 weeks of structured rehab. Symptoms often peak in the first 24–72 hours, then settle steadily with appropriate care. Persistent cases benefit from a more layered approach."
      },
      {
        kind: "h2",
        text: "Week-by-week (roughly)"
      },
      {
        kind: "ul",
        items: [
          "**Week 1:** Symptoms peak. Goal is gentle range of motion, sleep, and pain management. Avoid prolonged immobilization.",
          "**Weeks 2–4:** Manual therapy, graded movement, and beginning loading. Headache and dizziness work where present.",
          "**Weeks 4–8:** Return to most daily and recreational activities. Strengthening, postural endurance, return to driving.",
          "**Weeks 8–12:** Full return to demanding activities for most patients. Persistent symptoms get a more layered plan."
        ]
      },
      {
        kind: "h2",
        text: "What helps"
      },
      {
        kind: "p",
        text: "Early structured care, staying gently active, sleep, addressing concurrent symptoms (headache, vestibular, jaw), and consistent rehab attendance."
      },
      {
        kind: "h2",
        text: "What slows recovery"
      },
      {
        kind: "p",
        text: "Avoiding movement out of fear, prolonged collar use, expecting a single treatment to fix the issue, and ignoring concurrent symptoms (e.g., concussion)."
      },
      {
        kind: "h2",
        text: "Insurance and paperwork"
      },
      {
        kind: "p",
        text: "Alberta's Diagnostic and Treatment Protocols (DTPR / Minor Injury Regulation) cover many MVA-related injuries. AIM bills most major auto insurers directly. See [MVA Rehab](/services/mva-rehabilitation)."
      }
    ]
  },
  {
    slug: "when-to-see-a-physio-for-back-pain",
    title: "When to See a Physiotherapist for Back Pain",
    description: "Most back pain settles with a few days of normal activity. Here's when an early physiotherapy assessment changes the trajectory.",
    category: "Physiotherapy",
    tags: [
      "back pain",
      "physiotherapy",
      "self-care"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-06",
    lastUpdated: "2026-05-06",
    readingMinutes: 5,
    relatedConditions: [
      "back-pain",
      "sciatica"
    ],
    relatedServices: [
      "physiotherapy",
      "chiropractic-care"
    ],
    body: [
      {
        kind: "h2",
        text: "The short answer"
      },
      {
        kind: "p",
        text: "If your back pain is severe, isn't improving after about a week, is interfering with sleep or work, or comes with leg symptoms — book a physiotherapy assessment. Earlier, structured care typically shortens recovery."
      },
      {
        kind: "h2",
        text: "What \"normal\" looks like in the first week"
      },
      {
        kind: "p",
        text: "Most acute back pain episodes start improving within a few days of normal, gentle activity. Walking helps. Some stiffness is expected. Pain that's worse in the morning and eases with movement is common."
      },
      {
        kind: "h2",
        text: "Five signs to book sooner"
      },
      {
        kind: "ol",
        items: [
          "Pain isn't trending down after 5–7 days.",
          "Leg pain, numbness, or weakness alongside back pain.",
          "Sleep is disrupted multiple nights in a row.",
          "You're missing work, training, or activities you care about.",
          "The episode is the second or third in a year — patterns matter."
        ]
      },
      {
        kind: "h2",
        text: "Red flags — when to go beyond physio"
      },
      {
        kind: "p",
        text: "New bowel or bladder changes, saddle-area numbness, progressive bilateral leg weakness, unexplained weight loss, fever, or a history of cancer with new back pain — see your physician or an emergency department promptly. These are uncommon but warrant urgent assessment."
      },
      {
        kind: "h2",
        text: "What an assessment actually does"
      },
      {
        kind: "p",
        text: "A physiotherapist will take a careful history, observe how you move, test relevant joints and nerves, and give you a working hypothesis. From there, you'll get a plan — usually a mix of hands-on care, exercise, and education tailored to your situation. We're not interested in keeping you coming forever; the goal is to give you tools and a clear trajectory."
      }
    ]
  },
  {
    slug: "what-to-expect-after-a-concussion",
    title: "What to Expect After a Concussion",
    description: "Concussion recovery isn't dark-room rest. Here's what current evidence says about activity, return-to-learn, and return-to-sport.",
    category: "Concussion",
    tags: [
      "concussion",
      "return-to-sport",
      "return-to-learn"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-06",
    lastUpdated: "2026-05-06",
    readingMinutes: 6,
    relatedConditions: [
      "concussion",
      "vertigo-dizziness",
      "neck-pain"
    ],
    relatedServices: [
      "concussion-rehabilitation",
      "vestibular-rehabilitation"
    ],
    body: [
      {
        kind: "h2",
        text: "The first 24–48 hours"
      },
      {
        kind: "p",
        text: "Brief relative rest helps. Most current guidelines recommend gradual reintroduction of cognitive and physical activity within tolerance, rather than extended dark-room rest."
      },
      {
        kind: "h2",
        text: "What current care looks like"
      },
      {
        kind: "p",
        text: "Concussion care has shifted toward active rehabilitation: cervical work, vestibular and ocular rehab, sub-symptom-threshold aerobic exercise, and graded return-to-learn / work / sport progressions. Symptoms guide the pace; activity is rarely paused entirely."
      },
      {
        kind: "h2",
        text: "Symptoms that are common (and treatable)"
      },
      {
        kind: "p",
        text: "Headache, dizziness, fogginess, light/sound sensitivity, sleep disruption, mood changes, and exertion intolerance. Most people improve within a few weeks. When symptoms persist beyond 4 weeks (kids/teens) or 2 weeks (adults), system-specific assessment helps identify the drivers."
      },
      {
        kind: "h2",
        text: "Return-to-learn and return-to-sport"
      },
      {
        kind: "p",
        text: "Graded steps, with monitoring of symptoms at each level. The pace differs per person — and is usually faster than people fear once a structured plan is in place."
      },
      {
        kind: "h2",
        text: "When to seek further care"
      },
      {
        kind: "p",
        text: "Worsening or severe headache, repeated vomiting, escalating drowsiness, vision changes, or unusual neurological symptoms warrant immediate medical assessment."
      }
    ]
  },
  {
    slug: "what-vestibular-rehab-treats",
    title: "What Vestibular Rehabilitation Actually Treats",
    description: "Vestibular rehab covers more than vertigo. Here's a clear breakdown of what it treats — and how the assessment narrows down your case.",
    category: "Vestibular",
    tags: [
      "vestibular",
      "vertigo",
      "dizziness",
      "BPPV"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-06",
    lastUpdated: "2026-05-06",
    readingMinutes: 6,
    relatedConditions: [
      "vertigo-dizziness",
      "concussion"
    ],
    relatedServices: [
      "vestibular-rehabilitation",
      "concussion-rehabilitation"
    ],
    body: [
      {
        kind: "h2",
        text: "What it covers"
      },
      {
        kind: "p",
        text: "Vestibular rehabilitation isn't a single technique — it's a category of care for problems with the inner-ear, brain, and visual systems that keep you oriented and balanced."
      },
      {
        kind: "h2",
        text: "Five common reasons people come in"
      },
      {
        kind: "ol",
        items: [
          "**BPPV** — brief, intense vertigo with position changes. Often resolved in 1–3 visits with repositioning maneuvers.",
          "**Vestibular neuritis or labyrinthitis recovery** — after the initial illness, the brain often needs help re-calibrating.",
          "**Persistent dizziness after concussion** — vestibular and ocular systems are commonly affected.",
          "**Motion sensitivity and visual-motion intolerance** — busy environments, scrolling, driving feel overwhelming.",
          "**Falls and balance concerns in older adults** — targeted vestibular and balance training reduces fall risk."
        ]
      },
      {
        kind: "h2",
        text: "How assessment narrows the case"
      },
      {
        kind: "p",
        text: "The system causing your symptoms changes the plan. Vertigo with specific head positions points to BPPV. Dizziness with eye movement points to oculomotor and vestibular pathways. Neck-driven dizziness behaves differently from inner-ear dizziness. Assessment isolates the driver so the plan targets it."
      },
      {
        kind: "h2",
        text: "What treatment looks like"
      },
      {
        kind: "p",
        text: "Repositioning maneuvers (BPPV), gaze stabilization (VOR) exercises, habituation training for motion sensitivity, balance and gait training, and cervical work where relevant. Some habituation exercises temporarily provoke mild symptoms — that's how the brain learns to tolerate input."
      }
    ]
  },
  {
    slug: "shoulder-pain-causes",
    title: "Shoulder Pain: The Most Common Causes (and What to Do)",
    description: "A clear overview of the most common shoulder problems we see — and how each one is typically treated.",
    category: "Physiotherapy",
    tags: [
      "shoulder pain",
      "rotator cuff",
      "frozen shoulder"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-06",
    lastUpdated: "2026-05-06",
    readingMinutes: 6,
    relatedConditions: [
      "shoulder-pain",
      "post-surgical-recovery"
    ],
    relatedServices: [
      "physiotherapy",
      "sports-injury-rehabilitation",
      "post-surgical-rehabilitation"
    ],
    body: [
      {
        kind: "h2",
        text: "The usual suspects"
      },
      {
        kind: "ul",
        items: [
          "**Rotator cuff tendinopathy** — gradual onset, painful arc with reaching, weakness with elevation. Loading-based rehab is the foundation.",
          "**Subacromial pain** — pain with overhead and across-body motions. Often responds to scapular and shoulder-girdle strengthening.",
          "**Frozen shoulder (adhesive capsulitis)** — significant stiffness with pain, often without a clear injury. Phases over 12–24 months; treatment shortens phases.",
          "**Rotator cuff tears** — partial or full thickness. Many do well with rehab; surgical decision-making depends on tear size, function, age, and goals.",
          "**AC joint sprains** — direct trauma, point tenderness over the joint. Most resolve with structured rehab.",
          "**Instability and labral issues** — often in younger, active populations. Strength and motor-control programs are central."
        ]
      },
      {
        kind: "h2",
        text: "What rehab typically includes"
      },
      {
        kind: "p",
        text: "Range-of-motion work, manual therapy, modalities for early symptom relief, progressive strengthening (the cornerstone of shoulder rehab), and education on dose and posture. Surgical cases follow protocol-aligned plans."
      },
      {
        kind: "h2",
        text: "When to seek care"
      },
      {
        kind: "p",
        text: "Persistent pain past 2–3 weeks, weakness, sleep disruption from shoulder pain, or recent trauma with significant bruising or deformity."
      }
    ]
  },
  {
    slug: "wcb-physio",
    title: "Physiotherapy and WCB-Alberta: How It Works",
    description: "Reporting an injury, getting your claim approved, and what to expect from physiotherapy under a WCB-Alberta claim.",
    category: "WCB",
    tags: [
      "WCB",
      "workplace injury",
      "alberta"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-06",
    lastUpdated: "2026-05-06",
    readingMinutes: 5,
    relatedConditions: [],
    relatedServices: [
      "wcb-rehabilitation"
    ],
    body: [
      {
        kind: "h2",
        text: "The basic flow"
      },
      {
        kind: "ol",
        items: [
          "**Report the injury** to your employer and WCB-Alberta.",
          "**Seek medical attention** as needed; your physician or first-care provider files a report.",
          "**Receive a claim number** from WCB.",
          "**Book a physiotherapy assessment** — bring your claim number.",
          "**Begin treatment** under WCB's approval, with progress reporting and modified-work suggestions as appropriate."
        ]
      },
      {
        kind: "h2",
        text: "What's covered"
      },
      {
        kind: "p",
        text: "For accepted claims, WCB-Alberta covers approved physiotherapy and rehabilitation services. AIM bills WCB directly — you don't pay out of pocket for approved treatment."
      },
      {
        kind: "h2",
        text: "Communication with your employer"
      },
      {
        kind: "p",
        text: "With your consent, we share progress reports and modified-work recommendations so your return-to-work is realistic and supported. Modified duties are part of most plans."
      },
      {
        kind: "h2",
        text: "What success looks like"
      },
      {
        kind: "p",
        text: "Return to your role (or modified role) with capacity, confidence, and durability. We track functional milestones, not just pain levels."
      }
    ]
  },
  {
    slug: "physio-after-surgery",
    title: "Physiotherapy After Surgery: Getting the Most From Recovery",
    description: "Why post-surgical rehab matters, how to time it, and how to work with your surgeon's plan.",
    category: "Post-Surgical",
    tags: [
      "post-surgical",
      "rehab",
      "recovery"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-06",
    lastUpdated: "2026-05-06",
    readingMinutes: 5,
    relatedConditions: [
      "post-surgical-recovery",
      "knee-pain",
      "shoulder-pain",
      "hip-pain"
    ],
    relatedServices: [
      "post-surgical-rehabilitation",
      "physiotherapy"
    ],
    body: [
      {
        kind: "h2",
        text: "Why timing matters"
      },
      {
        kind: "p",
        text: "Surgery creates a window where tissue is healing and movement patterns reset. Early, well-staged rehab helps you protect the repair, prevent stiffness, and rebuild capacity efficiently."
      },
      {
        kind: "h2",
        text: "Working with your surgeon's protocol"
      },
      {
        kind: "p",
        text: "If your surgeon has provided a protocol, your physiotherapist should follow it carefully — and adapt to how your tissue is actually responding. Where there's no protocol, evidence-based timelines guide the plan."
      },
      {
        kind: "h2",
        text: "Phases of recovery"
      },
      {
        kind: "ol",
        items: [
          "**Protect** — manage swelling, pain, and movement within safe ranges.",
          "**Restore** — regain range of motion and basic strength.",
          "**Build** — progressive strengthening and motor control.",
          "**Return** — sport- or task-specific demands, return-to-work or return-to-sport criteria."
        ]
      },
      {
        kind: "h2",
        text: "Common procedures we rehab"
      },
      {
        kind: "p",
        text: "Knee (ACL, meniscus, total knee replacement), hip (total hip replacement, labral repair), shoulder (rotator cuff repair, labral repair, total shoulder), ankle stabilization, spinal procedures, abdominal and pelvic surgeries."
      },
      {
        kind: "h2",
        text: "Setbacks happen"
      },
      {
        kind: "p",
        text: "A flare or setback isn't a sign you've failed — it's a sign to adjust the plan. We expect some bumps in any recovery."
      }
    ]
  },
  {
    slug: "massage-for-recovery",
    title: "Massage Therapy as Part of Recovery (Not Instead of It)",
    description: "Why we use massage strategically alongside physiotherapy and chiropractic — and what good integrated care looks like.",
    category: "Massage",
    tags: [
      "massage",
      "RMT",
      "recovery"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-06",
    lastUpdated: "2026-05-06",
    readingMinutes: 4,
    relatedConditions: [],
    relatedServices: [
      "massage-therapy",
      "physiotherapy",
      "chiropractic-care"
    ],
    body: [
      {
        kind: "h2",
        text: "Where massage fits"
      },
      {
        kind: "p",
        text: "Massage therapy is a powerful tool for soft-tissue recovery, pain management, headache relief, and stress reduction. It's most effective when integrated with active rehab — not used as a stand-alone fix for problems that require loading and movement."
      },
      {
        kind: "h2",
        text: "What makes integration work"
      },
      {
        kind: "ul",
        items: [
          "Therapists communicate (RMT, physio, chiro) and align on the goal.",
          "Treatment frequency is set by the goal, not by habit.",
          "Self-care strategies (mobility, breathing, sleep) come along with hands-on care."
        ]
      },
      {
        kind: "h2",
        text: "Common reasons to add massage"
      },
      {
        kind: "p",
        text: "Active rehab plans, recovery from injury or surgery, athletes managing training load, office workers with neck and shoulder strain, tension headache management, and pregnancy."
      },
      {
        kind: "h2",
        text: "What about \"deep tissue\"?"
      },
      {
        kind: "p",
        text: "Pressure should be productive, not punishing. Tell your RMT what works — depth and technique should be tuned to your tissue and goals."
      }
    ]
  },
  {
    slug: "referrals-in-alberta",
    title: "Do You Need a Referral for Physiotherapy in Alberta?",
    description: "Most extended health plans don't require a doctor's referral, but a few do. Here's how to check before your visit.",
    category: "Patient Information",
    tags: [
      "referral",
      "insurance",
      "alberta"
    ],
    author: "AIM Clinical Team",
    publishedAt: "2026-05-06",
    lastUpdated: "2026-05-06",
    readingMinutes: 4,
    relatedConditions: [],
    relatedServices: [
      "physiotherapy",
      "direct-billing"
    ],
    body: [
      {
        kind: "h2",
        text: "The short answer"
      },
      {
        kind: "p",
        text: "Physiotherapy, massage therapy, and chiropractic are primary care services in Alberta. You can typically book without a doctor's referral. A few extended health plans request a referral for reimbursement — that's an insurer requirement, not a clinical one."
      },
      {
        kind: "h2",
        text: "How to check your plan"
      },
      {
        kind: "ol",
        items: [
          "Call your insurer or check your member portal.",
          "Ask about coverage limits (per-visit max, annual cap).",
          "Ask whether a physician referral is required for reimbursement.",
          "Confirm whether direct billing is supported."
        ]
      },
      {
        kind: "h2",
        text: "When a referral does help"
      },
      {
        kind: "p",
        text: "WCB-Alberta and motor vehicle accident claims have their own intake processes — your assessor or referring physician usually starts these. AIM can help you navigate paperwork."
      },
      {
        kind: "h2",
        text: "What to bring to your first visit"
      },
      {
        kind: "p",
        text: "Your insurance card or member ID, plan and group number, date of birth, and any relevant imaging or specialist reports."
      }
    ]
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
