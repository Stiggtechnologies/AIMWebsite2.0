export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  positioning: string;
  helps: string[];
  treatmentMay: string[];
  whoFor: string[];
  whyAim: string[];
  faqs: { q: string; a: string }[];
  icon: string;
  category: 'rehab' | 'specialty' | 'complementary';
  existing?: boolean;
};

export const services: Service[] = [
  {
    slug: 'physiotherapy',
    name: 'Physiotherapy',
    shortDescription: 'General physiotherapy for pain, injury, mobility, and function.',
    positioning:
      'Personalized physiotherapy designed to reduce pain, improve mobility, and help you return to daily life, work, and sport with confidence.',
    helps: ['Back pain', 'Neck pain', 'Joint pain', 'Sports injuries', 'Post-surgical recovery', 'Mobility loss', 'Chronic pain'],
    treatmentMay: ['Movement assessment', 'Manual therapy', 'Exercise rehabilitation', 'Movement retraining', 'Pain science education', 'Mobility and strength work'],
    whoFor: ['Active adults', 'Athletes', 'Injured workers', 'Post-operative patients', 'Seniors', 'People with recurring pain'],
    whyAim: ['Evidence-based care', 'Individualized treatment plans', 'Experienced clinicians', 'Modern clinics', 'Multidisciplinary collaboration'],
    faqs: [
      { q: 'Do I need a referral?', a: 'No referral is required for physiotherapy in Alberta. Most patients book directly; some insurance plans or employer programs require a referral, so check your coverage.' },
      { q: 'How many sessions will I need?', a: 'Most patients need 4–12 sessions depending on injury severity and goals. Your clinician provides an estimate after your initial assessment.' },
      { q: 'Do you offer direct billing?', a: 'Yes — AIM direct bills to most major Alberta insurers, WCB, and MVA claims. Bring your policy details to your first visit.' },
      { q: 'What should I bring?', a: 'Bring ID, insurance or claim details, any relevant imaging or medical reports, and wear comfortable clothing you can move in.' },
    ],
    icon: 'Activity',
    category: 'rehab',
    existing: true,
  },
  {
    slug: 'sports-injury-rehabilitation',
    name: 'Sports Injury Rehabilitation',
    shortDescription: 'Recovery and performance-focused rehab for athletes and active people.',
    positioning: 'Return-to-sport rehabilitation built around your sport, your injury, and your performance goals — so you come back stronger, not just healed.',
    helps: ['ACL tears', 'Rotator cuff injuries', 'Running injuries', 'Overuse injuries', 'Sprains and strains', 'Sport-specific limitations'],
    treatmentMay: ['Biomechanical analysis', 'Return-to-play testing', 'Sport-specific programming', 'Taping and bracing', 'Strength and conditioning', 'Movement retraining'],
    whoFor: ['Competitive athletes', 'Weekend warriors', 'Youth athletes', 'Masters athletes', 'Active adults recovering from injury'],
    whyAim: ['Sport-specific return-to-play testing', 'Integrated strength and rehab programming', 'Objective progression criteria', 'Performance-oriented outcomes'],
    faqs: [
      { q: 'When should I start sports rehab after an injury?', a: 'Earlier is almost always better. Starting within days of an acute injury reduces recovery time and lowers re-injury risk.' },
      { q: 'Do you do return-to-play testing?', a: 'Yes. We use objective criteria (strength symmetry, hop tests, sport-specific movement) to clear you for return to sport safely.' },
      { q: 'Can you treat concussions too?', a: 'Yes — see our Concussion Rehabilitation service for structured return-to-sport after head injury.' },
    ],
    icon: 'Zap',
    category: 'rehab',
  },
  {
    slug: 'concussion-rehabilitation',
    name: 'Concussion Rehabilitation',
    shortDescription: 'Structured care for concussion recovery, symptom management, and return to activity.',
    positioning: 'Evidence-based concussion rehabilitation guiding you through symptom management, cognitive recovery, and safe return to work, school, and sport.',
    helps: ['Headaches after injury', 'Dizziness and balance issues', 'Difficulty concentrating', 'Light and sound sensitivity', 'Neck pain from whiplash', 'Sleep and mood changes'],
    treatmentMay: ['Concussion assessment', 'Vestibular-ocular therapy', 'Sub-symptom threshold exercise', 'Cervical spine treatment', 'Return-to-learn planning', 'Return-to-work pacing', 'Graduated return-to-sport'],
    whoFor: ['Anyone recovering from a concussion', 'MVA patients with head injury', 'Athletes post-concussion', 'Workers injured on the job', 'Students returning to school'],
    whyAim: ['Certified concussion clinicians', 'Integrated vestibular and exercise care', 'Return-to-activity protocols aligned with Consensus Statement on Concussion', 'Coordination with physicians and employers'],
    faqs: [
      { q: 'How soon after a concussion should I start rehab?', a: 'Current evidence supports starting active rehabilitation within days of injury rather than prolonged rest. Book an assessment as soon as you feel ready.' },
      { q: 'Do you support return-to-work and return-to-sport?', a: 'Yes. We provide staged return-to-learn, return-to-work, and return-to-sport plans with documentation for employers, schools, and coaches.' },
      { q: 'Will my WCB or MVA cover concussion treatment?', a: 'Yes, in most cases. We handle direct billing for WCB and coordinate with MVA insurers.' },
    ],
    icon: 'Brain',
    category: 'specialty',
  },
  {
    slug: 'vestibular-rehabilitation',
    name: 'Vestibular Rehabilitation',
    shortDescription: 'Treatment for vertigo, dizziness, balance issues, and vestibular dysfunction.',
    positioning: 'Targeted rehabilitation for vertigo, dizziness, and balance disorders — restoring confidence in everyday movement.',
    helps: ['BPPV (positional vertigo)', 'Dizziness and imbalance', 'Vestibular neuritis', 'Post-concussion dizziness', 'Motion sensitivity', 'Falls and fear of falling'],
    treatmentMay: ['BPPV repositioning maneuvers (Epley, Semont)', 'Gaze stabilization exercises', 'Balance and gait retraining', 'Habituation exercises', 'Canalith repositioning', 'Education on symptom management'],
    whoFor: ['Adults with vertigo', 'Seniors at risk of falls', 'Post-concussion patients', 'Post-surgical vestibular patients', 'Anyone with chronic dizziness'],
    whyAim: ['Trained vestibular clinicians', 'Full suite of assessment tools', 'Integrated concussion and neck care', 'Clear home exercise programs'],
    faqs: [
      { q: 'What is BPPV?', a: 'Benign Paroxysmal Positional Vertigo is dizziness triggered by head position changes. It is the most common cause of vertigo and usually responds to 1–3 repositioning treatments.' },
      { q: 'Will I feel worse before I feel better?', a: 'Some exercises provoke mild symptoms on purpose to retrain your brain. Your clinician keeps this within tolerable limits and progresses you gradually.' },
      { q: 'Do you need a doctor\'s referral?', a: 'No referral required, but if you have not been evaluated by a physician we may recommend one for symptoms like sudden hearing loss or severe headache.' },
    ],
    icon: 'Ear',
    category: 'specialty',
  },
  {
    slug: 'pelvic-floor-physiotherapy',
    name: 'Pelvic Floor Physiotherapy',
    shortDescription: 'Private, specialized care for pelvic floor dysfunction, prenatal/postpartum recovery, and pelvic pain.',
    positioning: 'Discreet, compassionate pelvic health physiotherapy — because pelvic symptoms deserve specialized care, not silence.',
    helps: ['Urinary incontinence', 'Pelvic pain', 'Prenatal aches and preparation for birth', 'Postpartum recovery', 'Diastasis recti', 'Prolapse management', 'Painful intercourse', 'Post-surgical pelvic recovery'],
    treatmentMay: ['External and (when appropriate) internal assessment', 'Pelvic floor muscle training', 'Breathing and pressure management', 'Postural and core retraining', 'Manual therapy', 'Home exercise program'],
    whoFor: ['Prenatal patients', 'Postpartum patients (any time after birth)', 'Menopausal patients', 'Anyone with pelvic pain or dysfunction', 'Patients recovering from pelvic or abdominal surgery'],
    whyAim: ['Certified pelvic health physiotherapists', 'Private treatment rooms', 'Judgment-free, patient-led pace', 'Coordination with OB/GYNs and midwives'],
    faqs: [
      { q: 'Is an internal exam required?', a: 'No. Internal assessment is the gold standard for evaluating pelvic floor function, but it is always your choice. External assessment and care are available if you prefer.' },
      { q: 'How soon after birth can I start?', a: 'You can start gentle postpartum physio as early as a few weeks after an uncomplicated delivery. A 6-week postpartum check is standard before more intensive work.' },
      { q: 'Will insurance cover it?', a: 'Most extended health plans cover pelvic floor physiotherapy as physiotherapy. We direct bill where possible.' },
    ],
    icon: 'Heart',
    category: 'specialty',
  },
  {
    slug: 'post-surgical-rehabilitation',
    name: 'Post-Surgical Rehabilitation',
    shortDescription: 'Personalized rehab after orthopedic and other surgeries to restore strength, mobility, and function.',
    positioning: 'Structured post-operative rehabilitation aligned with your surgeon\'s protocol — so you heal well, move confidently, and return to the life you had planned.',
    helps: ['Knee replacement (TKA)', 'Hip replacement (THA)', 'ACL reconstruction', 'Shoulder surgery (rotator cuff, labrum)', 'Spinal surgery', 'Fracture recovery', 'Arthroscopic procedures'],
    treatmentMay: ['Scar mobility work', 'Swelling and edema management', 'Progressive range of motion', 'Strength rebuilding', 'Functional retraining', 'Gait and balance retraining'],
    whoFor: ['Patients post-orthopedic surgery', 'Patients pre-surgery (prehab)', 'Anyone recovering from a procedure with mobility limitations'],
    whyAim: ['Surgeon-protocol aligned progressions', 'Coordination with your surgical team', 'Modern rehab gym and equipment', 'Objective milestones and testing'],
    faqs: [
      { q: 'When should I start post-surgical physio?', a: 'Most surgeons recommend starting within days to a few weeks post-op. Earlier rehab generally leads to better outcomes.' },
      { q: 'Do you follow my surgeon\'s protocol?', a: 'Yes. We align closely with your surgeon\'s protocol and communicate with their office as needed.' },
      { q: 'What is prehab?', a: 'Pre-surgical rehabilitation to build strength and mobility before surgery, which consistently improves post-surgical outcomes.' },
    ],
    icon: 'Bandage',
    category: 'rehab',
  },
  {
    slug: 'chronic-pain-rehabilitation',
    name: 'Chronic Pain Rehabilitation',
    shortDescription: 'Evidence-based, function-focused support for persistent pain and movement limitations.',
    positioning: 'Modern chronic pain care built on pain science, graded movement, and rebuilding what matters — work, activity, and quality of life.',
    helps: ['Persistent back or neck pain', 'Fibromyalgia', 'Long COVID with pain', 'Complex regional pain syndrome', 'Post-injury pain that won\'t resolve'],
    treatmentMay: ['Pain neuroscience education', 'Graded movement and exposure', 'Activity pacing', 'Strength and mobility work', 'Self-management coaching', 'Multidisciplinary coordination'],
    whoFor: ['Anyone with pain lasting longer than 3 months', 'People told "there\'s nothing more to do"', 'Patients interested in active self-management'],
    whyAim: ['Pain-science informed clinicians', 'No quick-fix promises', 'Focus on function and life, not just pain scores', 'Coordination with physicians and psychologists'],
    faqs: [
      { q: 'Can physiotherapy help if my pain is chronic?', a: 'Yes. Chronic pain responds well to graded movement, education, and active rehabilitation — even when imaging looks unchanged.' },
      { q: 'Will I be told to just "push through"?', a: 'No. Modern chronic pain care is paced, not punishing. We build capacity gradually within your tolerance.' },
    ],
    icon: 'HeartPulse',
    category: 'rehab',
  },
  {
    slug: 'mva-rehabilitation',
    name: 'Motor Vehicle Accident Rehabilitation',
    shortDescription: 'Rehab support after collisions for whiplash, pain, mobility issues, and post-accident recovery.',
    positioning: 'Comprehensive rehabilitation after a motor vehicle collision — with direct billing and claim coordination so you can focus on recovery.',
    helps: ['Whiplash-associated disorder', 'Neck and back pain after collision', 'Soft tissue injuries', 'Post-accident concussion', 'Headaches after collision', 'Anxiety and reduced function'],
    treatmentMay: ['Whiplash-focused assessment', 'Cervical spine treatment', 'Concussion screening and care', 'Manual therapy', 'Graded exercise', 'Documentation for your claim'],
    whoFor: ['Drivers and passengers recently in a collision', 'Patients whose injuries have persisted after an accident', 'People navigating Alberta MVA insurance'],
    whyAim: ['Direct billing to MVA insurers', 'Documentation that meets Alberta Section B requirements', 'Coordinated concussion and whiplash care', 'No up-front payment for covered treatment'],
    faqs: [
      { q: 'Do I need to pay for MVA treatment?', a: 'In most cases, no. Section B coverage in Alberta covers physiotherapy under the diagnostic and treatment protocols. We bill directly.' },
      { q: 'How soon should I start treatment?', a: 'Within days of the accident ideally. Early rehab improves outcomes and is covered under the Diagnostic and Treatment Protocols.' },
      { q: 'What if my symptoms start weeks later?', a: 'Delayed onset is common. Book an assessment and we\'ll help you navigate claim timing.' },
    ],
    icon: 'Car',
    category: 'specialty',
  },
  {
    slug: 'wcb-rehabilitation',
    name: 'WCB / Workplace Injury Rehabilitation',
    shortDescription: 'Structured rehabilitation for injured workers and return-to-work recovery.',
    positioning: 'WCB-approved rehabilitation focused on durable return to work — from assessment through work conditioning, work hardening, and functional capacity evaluation.',
    helps: ['Acute workplace injuries', 'Repetitive strain injuries', 'Return-to-work transitions', 'Modified duty planning', 'Functional capacity evaluation needs'],
    treatmentMay: ['WCB assessment and reporting', 'Active rehabilitation', 'Work conditioning and work hardening', 'Functional capacity evaluation', 'Ergonomic review', 'Return-to-work planning with employer'],
    whoFor: ['Injured workers with active WCB claims', 'Employers managing injury cases', 'Case managers and adjudicators'],
    whyAim: ['WCB-recognized providers', 'Full rehabilitation pathway under one roof', 'Structured return-to-work programs', 'Timely reporting and communication'],
    faqs: [
      { q: 'Is WCB treatment covered?', a: 'Yes, fully. WCB covers assessment, treatment, work conditioning, work hardening, and functional capacity evaluations for approved claims.' },
      { q: 'Do I need a referral?', a: 'You can self-refer for initial assessment. WCB treatment beyond assessment typically requires claim approval.' },
      { q: 'How long does WCB rehab take?', a: 'Varies widely. Simple injuries may resolve in 4–6 weeks; complex cases with work hardening can extend several months.' },
    ],
    icon: 'HardHat',
    category: 'specialty',
    existing: true,
  },
  {
    slug: 'massage-therapy',
    name: 'Massage Therapy',
    shortDescription: 'Therapeutic massage as part of a complete recovery and wellness plan.',
    positioning: 'Registered massage therapy integrated into your rehabilitation plan — so treatment is coordinated, not fragmented.',
    helps: ['Muscle tension and pain', 'Post-workout recovery', 'Stress-related tightness', 'Headaches', 'Support alongside physiotherapy'],
    treatmentMay: ['Therapeutic / deep tissue massage', 'Sports massage', 'Myofascial release', 'Trigger point therapy', 'Relaxation massage'],
    whoFor: ['Active adults', 'Office workers with tension', 'Athletes in recovery', 'Post-injury patients', 'Anyone seeking registered massage therapy'],
    whyAim: ['Registered Massage Therapists', 'Coordinated with your physio or chiro care', 'Direct billing to most insurers', 'Evidence-informed techniques'],
    faqs: [
      { q: 'Do I need a referral?', a: 'No referral needed. Most extended health plans cover RMT services.' },
      { q: 'How is massage different from physio?', a: 'Massage focuses on soft tissue and nervous system regulation. Physio adds assessment, exercise, and movement retraining. Many patients benefit from both.' },
    ],
    icon: 'Hand',
    category: 'complementary',
  },
  {
    slug: 'chiropractic-care',
    name: 'Chiropractic Care',
    shortDescription: 'Hands-on care to support mobility, joint function, pain reduction, and movement quality.',
    positioning: 'Evidence-informed chiropractic care integrated with rehabilitation — because joint care works better alongside exercise and movement.',
    helps: ['Neck and back pain', 'Joint stiffness', 'Headaches', 'Mobility restrictions', 'Posture-related complaints'],
    treatmentMay: ['Spinal assessment', 'Joint manipulation and mobilization', 'Soft tissue therapy', 'Rehabilitation exercise', 'Ergonomic guidance'],
    whoFor: ['Adults with recurring back or neck issues', 'Patients combining chiro with physio or massage', 'Active individuals maintaining mobility'],
    whyAim: ['Chiros who work alongside physios and RMTs, not in isolation', 'Exercise-forward approach', 'Clear treatment plans, not unlimited visits'],
    faqs: [
      { q: 'Is chiropractic care covered by insurance?', a: 'Most extended health plans cover chiropractic care. We direct bill where possible.' },
      { q: 'Do I need X-rays first?', a: 'Not routinely. Your chiropractor will recommend imaging only if clinically indicated.' },
    ],
    icon: 'Spine',
    category: 'complementary',
  },
  {
    slug: 'direct-billing',
    name: 'Direct Billing',
    shortDescription: 'We handle the paperwork so you can focus on recovery.',
    positioning: 'Direct billing to major Alberta insurers, WCB, and MVA claims — no up-front payment for covered treatment where possible.',
    helps: ['Reducing out-of-pocket cost', 'Managing insurance paperwork', 'WCB claim coordination', 'MVA Section B claims', 'Extended health plan coordination'],
    treatmentMay: ['Verification of benefits at first visit', 'Electronic submission to insurer', 'Direct-billed amount applied immediately', 'Itemized invoice for anything not covered', 'Ongoing claim support'],
    whoFor: ['Insured patients', 'Injured workers', 'MVA patients', 'Employer benefit plan members', 'Anyone wanting billing simplicity'],
    whyAim: ['Direct billing to Alberta Blue Cross, Canada Life, Green Shield, Manulife, Sun Life, Pacific Blue Cross, and more', 'WCB-approved provider', 'MVA Section B claims handled', 'Clear estimates before treatment'],
    faqs: [
      { q: 'Which insurers do you direct bill?', a: 'Most major Alberta insurers including Alberta Blue Cross, Canada Life, Green Shield, Manulife, Sun Life, and Pacific Blue Cross. We verify coverage at your first visit.' },
      { q: 'What if my insurance only partially covers?', a: 'We bill the covered amount directly and invoice you only for the remainder — never a surprise balance.' },
      { q: 'Do I need to pay upfront?', a: 'For direct-billed treatment, no. Bring your insurance details to the first visit and we handle the rest.' },
    ],
    icon: 'CreditCard',
    category: 'complementary',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
