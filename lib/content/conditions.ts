export type Condition = {
  slug: string;
  name: string;
  shortDescription: string;
  whatItIs: string;
  commonCauses: string[];
  symptoms: string[];
  howAimHelps: string;
  relatedServices: string[];
  faqs: { q: string; a: string }[];
};

export const conditions: Condition[] = [
  {
    slug: 'back-pain',
    name: 'Back Pain',
    shortDescription: 'Modern, active treatment for acute and persistent back pain.',
    whatItIs:
      'Back pain ranges from sudden acute episodes to long-standing discomfort affecting daily life. Most back pain is non-serious and responds well to movement, manual therapy, and targeted strengthening — even when imaging looks concerning.',
    commonCauses: ['Muscle strain or overuse', 'Poor movement patterns', 'Sedentary posture', 'Disc-related pain', 'Arthritis', 'Post-injury or surgical pain'],
    symptoms: ['Aching or sharp pain in the low or mid back', 'Stiffness, especially after sitting', 'Pain that radiates into the buttock or leg', 'Difficulty bending, lifting, or sleeping'],
    howAimHelps:
      'We start with a careful assessment to rule out anything serious, then build a recovery plan combining manual therapy, graded movement, and education. Most patients see meaningful improvement within 4–8 visits.',
    relatedServices: ['physiotherapy', 'chronic-pain-rehabilitation', 'chiropractic-care', 'massage-therapy'],
    faqs: [
      { q: 'Do I need imaging for back pain?', a: 'Usually not. Imaging is reserved for specific red flags — your clinician will advise if it\'s needed.' },
      { q: 'Should I rest or move?', a: 'Gentle movement is almost always better than rest. Prolonged rest tends to delay recovery.' },
    ],
  },
  {
    slug: 'neck-pain',
    name: 'Neck Pain',
    shortDescription: 'Targeted treatment for acute neck pain, tech neck, and post-injury stiffness.',
    whatItIs: 'Neck pain affects most adults at some point. Common causes include prolonged desk work, sleep position, whiplash, and stress-related tension.',
    commonCauses: ['Prolonged screen time', 'Whiplash after MVA', 'Poor sleep position', 'Stress-related muscle tension', 'Cervical disc or joint issues'],
    symptoms: ['Pain or stiffness at rest or with movement', 'Headaches starting at the base of the skull', 'Pain radiating into shoulder or arm', 'Reduced range of motion'],
    howAimHelps: 'Hands-on treatment, postural and movement retraining, and targeted strengthening. For post-accident neck pain we coordinate directly with your MVA claim.',
    relatedServices: ['physiotherapy', 'mva-rehabilitation', 'massage-therapy', 'chiropractic-care'],
    faqs: [
      { q: 'My neck pain started after a car accident — is that covered?', a: 'Yes. Alberta Section B covers early physiotherapy for MVA-related neck injuries.' },
    ],
  },
  {
    slug: 'shoulder-pain',
    name: 'Shoulder Pain',
    shortDescription: 'Rotator cuff, impingement, frozen shoulder, and post-surgical shoulder care.',
    whatItIs: 'The shoulder is the most mobile joint in the body — which also makes it prone to irritation and injury. Most shoulder pain responds to conservative care.',
    commonCauses: ['Rotator cuff strain or tear', 'Impingement syndrome', 'Frozen shoulder (adhesive capsulitis)', 'Labral injuries', 'Post-surgical stiffness'],
    symptoms: ['Pain reaching overhead or behind your back', 'Night pain on the affected side', 'Weakness with lifting', 'Limited range of motion'],
    howAimHelps: 'Detailed assessment identifies the pain generator. Treatment combines manual therapy, graded loading, and targeted strengthening — no one-size-fits-all protocol.',
    relatedServices: ['physiotherapy', 'sports-injury-rehabilitation', 'post-surgical-rehabilitation'],
    faqs: [
      { q: 'Do I need an MRI before physio?', a: 'Usually not. Most shoulder conditions can be diagnosed and treated without imaging.' },
    ],
  },
  {
    slug: 'knee-pain',
    name: 'Knee Pain',
    shortDescription: 'ACL, meniscus, patellofemoral pain, knee replacement rehab, and runner\'s knee.',
    whatItIs: 'Knee pain affects athletes, active adults, and seniors. Cause ranges from acute sports injury to gradual wear — and each responds to different care.',
    commonCauses: ['ACL or meniscus injury', 'Patellofemoral pain (runner\'s knee)', 'Osteoarthritis', 'Post-surgical recovery (TKA, ACL reconstruction)', 'Overuse and training load errors'],
    symptoms: ['Pain with stairs, squatting, or running', 'Swelling or stiffness', 'Instability or giving way', 'Clicking or catching'],
    howAimHelps: 'Comprehensive knee assessment, return-to-activity testing, and evidence-based rehab progressions. We align with your surgeon\'s protocol when post-op.',
    relatedServices: ['physiotherapy', 'sports-injury-rehabilitation', 'post-surgical-rehabilitation'],
    faqs: [
      { q: 'Is surgery necessary for a torn meniscus?', a: 'Often not. Evidence supports a trial of rehab first for most meniscus tears.' },
    ],
  },
  {
    slug: 'hip-pain',
    name: 'Hip Pain',
    shortDescription: 'Hip impingement, bursitis, osteoarthritis, and post-replacement rehab.',
    whatItIs: 'Hip pain may be felt in the groin, side, buttock, or even refer to the knee. Accurate diagnosis guides the right treatment.',
    commonCauses: ['Hip osteoarthritis', 'Femoroacetabular impingement (FAI)', 'Trochanteric bursitis / gluteal tendinopathy', 'Labral tears', 'Post-replacement recovery'],
    symptoms: ['Groin or side-of-hip pain', 'Stiffness after sitting', 'Pain with prolonged standing or walking', 'Difficulty putting on socks/shoes'],
    howAimHelps: 'Targeted strengthening of hip and core stabilizers, manual therapy, and activity modification. For hip replacement patients we follow surgeon protocol closely.',
    relatedServices: ['physiotherapy', 'post-surgical-rehabilitation', 'sports-injury-rehabilitation'],
    faqs: [
      { q: 'How long does hip replacement rehab take?', a: 'Most patients are walking independently within 2–6 weeks and return to most activity within 3 months.' },
    ],
  },
  {
    slug: 'sciatica',
    name: 'Sciatica',
    shortDescription: 'Leg pain, numbness, or weakness from nerve root irritation.',
    whatItIs: 'Sciatica is leg pain caused by irritation of the sciatic nerve or its nerve roots — most commonly from a disc or spinal stenosis.',
    commonCauses: ['Lumbar disc herniation', 'Spinal stenosis', 'Piriformis syndrome', 'Degenerative spine changes'],
    symptoms: ['Pain radiating down the back of the leg', 'Numbness or tingling', 'Weakness in the leg or foot', 'Worse with sitting, coughing, or sneezing'],
    howAimHelps: 'Most sciatica improves with time, targeted exercise, and nerve mobility work. Imaging and medical consultation are coordinated when needed.',
    relatedServices: ['physiotherapy', 'chronic-pain-rehabilitation'],
    faqs: [
      { q: 'Do I need surgery for sciatica?', a: 'Rarely. Most cases resolve with conservative care within 6–12 weeks.' },
    ],
  },
  {
    slug: 'whiplash',
    name: 'Whiplash',
    shortDescription: 'Neck injury after motor vehicle collision — covered under Alberta Section B.',
    whatItIs: 'Whiplash-associated disorder (WAD) occurs when the neck rapidly accelerates and decelerates, commonly in a rear-end collision. Early active rehab is the best evidence-based treatment.',
    commonCauses: ['Motor vehicle collisions', 'Contact sports', 'Falls with neck impact'],
    symptoms: ['Neck pain and stiffness', 'Headaches', 'Shoulder and upper back pain', 'Dizziness', 'Concentration or memory issues'],
    howAimHelps: 'Early, active, evidence-based whiplash care — including concussion screening. We handle direct billing under Section B so you focus on recovery.',
    relatedServices: ['mva-rehabilitation', 'concussion-rehabilitation', 'physiotherapy'],
    faqs: [
      { q: 'Is my whiplash treatment covered?', a: 'Yes. Under Alberta Section B, whiplash treatment is covered with no up-front cost when you follow the Diagnostic and Treatment Protocols.' },
    ],
  },
  {
    slug: 'concussion',
    name: 'Concussion',
    shortDescription: 'Mild traumatic brain injury needing structured recovery — not just rest.',
    whatItIs: 'A concussion is a mild traumatic brain injury. Current evidence supports early active rehabilitation over prolonged rest for most patients.',
    commonCauses: ['Sports impacts', 'Motor vehicle accidents', 'Falls', 'Workplace head injuries'],
    symptoms: ['Headaches', 'Dizziness', 'Difficulty concentrating', 'Light or sound sensitivity', 'Sleep disturbance', 'Mood changes'],
    howAimHelps: 'Certified concussion care including vestibular-ocular rehab, cervical treatment, graded exercise, and return-to-learn/work/sport planning.',
    relatedServices: ['concussion-rehabilitation', 'vestibular-rehabilitation', 'mva-rehabilitation'],
    faqs: [
      { q: 'Should I just rest after a concussion?', a: 'Brief rest (24–48 hours) then gradual return to activity is current best practice. Prolonged rest often prolongs recovery.' },
    ],
  },
  {
    slug: 'vertigo-dizziness',
    name: 'Vertigo & Dizziness',
    shortDescription: 'BPPV, vestibular neuritis, and post-concussion dizziness — assessed and treated.',
    whatItIs: 'Vertigo is the sensation that you or your surroundings are moving. Most causes are peripheral (inner ear) and respond well to vestibular rehabilitation.',
    commonCauses: ['BPPV (positional vertigo)', 'Vestibular neuritis', 'Ménière\'s disease', 'Vestibular migraine', 'Post-concussion dizziness'],
    symptoms: ['Spinning sensation with head movement', 'Imbalance', 'Nausea', 'Difficulty focusing', 'Fear of falling'],
    howAimHelps: 'Full vestibular assessment, repositioning maneuvers for BPPV, gaze stabilization and habituation exercises, and balance training.',
    relatedServices: ['vestibular-rehabilitation', 'concussion-rehabilitation'],
    faqs: [
      { q: 'How many treatments to resolve BPPV?', a: 'Often 1–3 visits. BPPV responds quickly to repositioning maneuvers in most cases.' },
    ],
  },
  {
    slug: 'pelvic-pain',
    name: 'Pelvic Pain',
    shortDescription: 'Discreet, compassionate care for pelvic pain in any form.',
    whatItIs: 'Pelvic pain can arise from the pelvic floor muscles, joints, nerves, or organs. Pelvic health physiotherapy addresses the musculoskeletal contributors.',
    commonCauses: ['Pelvic floor muscle tension or weakness', 'Endometriosis-related pain', 'Post-surgical pelvic pain', 'Postpartum pelvic pain', 'Coccyx (tailbone) pain'],
    symptoms: ['Pelvic or low abdominal pain', 'Pain with intercourse', 'Bladder or bowel symptoms', 'Pain sitting for long periods'],
    howAimHelps: 'Certified pelvic health physios provide private, patient-led assessment and treatment. We coordinate with your physician or OB/GYN when helpful.',
    relatedServices: ['pelvic-floor-physiotherapy', 'chronic-pain-rehabilitation'],
    faqs: [
      { q: 'Is pelvic pain treatment covered?', a: 'Yes — most extended health plans cover it as physiotherapy.' },
    ],
  },
  {
    slug: 'sports-injuries',
    name: 'Sports Injuries',
    shortDescription: 'Acute and overuse injuries in athletes at every level.',
    whatItIs: 'From acute ligament sprains to overuse tendinopathies, sports injuries need sport-specific assessment and return-to-play criteria — not just pain management.',
    commonCauses: ['Acute trauma in sport', 'Training overload', 'Technique and movement errors', 'Inadequate recovery'],
    symptoms: ['Pain with sport-specific movement', 'Loss of strength or speed', 'Swelling', 'Instability'],
    howAimHelps: 'Sport-specific rehab progressions, objective return-to-play testing, and integration with strength and conditioning.',
    relatedServices: ['sports-injury-rehabilitation', 'physiotherapy', 'post-surgical-rehabilitation'],
    faqs: [
      { q: 'When can I return to sport?', a: 'When you pass objective return-to-play criteria — not when pain stops. We use sport-specific testing to clear you safely.' },
    ],
  },
  {
    slug: 'post-surgical-recovery',
    name: 'Post-Surgical Recovery',
    shortDescription: 'Structured rehab following orthopedic and other surgeries.',
    whatItIs: 'Post-surgical rehabilitation restores mobility, strength, and function — critical for outcomes that last long after the incision heals.',
    commonCauses: ['Knee replacement (TKA)', 'Hip replacement (THA)', 'ACL reconstruction', 'Rotator cuff repair', 'Spine surgery', 'Arthroscopic procedures'],
    symptoms: ['Post-op stiffness', 'Weakness', 'Swelling', 'Gait abnormalities', 'Fear of movement'],
    howAimHelps: 'Surgeon-protocol-aligned progressions, early mobilization, progressive strengthening, and objective milestones. Communication with your surgeon\'s office when needed.',
    relatedServices: ['post-surgical-rehabilitation', 'physiotherapy'],
    faqs: [
      { q: 'When should I start post-op rehab?', a: 'Most surgeons recommend starting within days to weeks post-op. Earlier rehab generally leads to better outcomes.' },
    ],
  },
];

export function getConditionBySlug(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}
