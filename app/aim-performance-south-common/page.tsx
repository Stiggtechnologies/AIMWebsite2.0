import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  ClipboardCheck,
  Dumbbell,
  Footprints,
  HardHat,
  HeartPulse,
  MapPin,
  Phone,
  Rocket,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import { JsonLd } from '@/lib/seo';
import { RegistrationPaused } from './registration-paused';

// AIM Performance South Common — premium launch landing page.
//
// Compliance: reviewed against College of Physiotherapists of Alberta
// advertising expectations. Do not introduce "free", "discount", "save",
// "deal", "promo", "guaranteed results", "specialist" (no formal
// authorization), invented testimonials, or outcome claims.
//
// TODOs (separate work):
//   - /images/aim-performance-south-common-og.jpg (branded OG image)
//   - app/aim-performance-south-common/thank-you/page.tsx (clean
//     conversion landing URL for Google Ads / Meta / GA4)

const SITE_URL = 'https://aimphysiotherapy.ca';
const PAGE_PATH = '/aim-performance-south-common';
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

// Placeholders — replace with real business details before going live.
const CONTACT = {
  phoneDisplay: '[INSERT_PHONE_NUMBER]',
  phoneTel: '[INSERT_PHONE_NUMBER]',
  email: '[INSERT_EMAIL]',
  bookingUrl: '[INSERT_BOOKING_URL]',
  address: 'AIM Performance South Common, inside Evolve Strength South Common, Edmonton, Alberta',
  fullAddress: '[INSERT_FULL_ADDRESS]',
  openingDate: 'Coming soon',
  privacyUrl: '/privacy',
} as const;

// -----------------------------------------------------------------------------
// SEO + metadata
// -----------------------------------------------------------------------------
export const metadata: Metadata = {
  title:
    'AIM Performance South Common | Physiotherapy-Led Recovery Inside Evolve Strength',
  description:
    'AIM Performance South Common is launching inside Evolve Strength in Edmonton. Join Founder Access for performance education, recovery resources, launch workshops, and priority access. Paid physiotherapy assessments available separately.',
  alternates: { canonical: PAGE_URL },
  // South Common is paused, so this page must not be advertised. It stays
  // reachable by direct link for anyone who already has one (Evolve Strength
  // materials, existing shares) but is out of search and out of the sitemap.
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: PAGE_URL,
    siteName: 'Alberta Injury Management',
    title: 'AIM Performance South Common',
    description:
      'Physiotherapy-led recovery, movement, and performance care inside Evolve Strength South Common.',
    images: [{ url: '/images/aim-performance-south-common-og.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIM Performance South Common',
    description:
      'Physiotherapy-led recovery, movement, and performance care inside Evolve Strength South Common.',
    images: ['/images/aim-performance-south-common-og.jpg'],
  },
};

// -----------------------------------------------------------------------------
// Page-level navigation (sticky brand strip + anchor links to sections)
// -----------------------------------------------------------------------------
const PAGE_NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#founder-access', label: 'Founder Access' },
  { href: '#workshops', label: 'Workshops' },
  { href: '#location', label: 'Location' },
  { href: '#faq', label: 'FAQ' },
  { href: '#lead-form', label: 'Book' },
] as const;

// -----------------------------------------------------------------------------
// Reusable content arrays (kept here per project preference for one-file pages)
// -----------------------------------------------------------------------------

const TRUST_CARDS = [
  { icon: HeartPulse, title: 'Physiotherapy-led care', body: 'Every program is grounded in physiotherapy clinical reasoning.' },
  { icon: Building2, title: 'Inside Evolve Strength', body: 'Located inside Evolve Strength South Common in Edmonton.' },
  { icon: Activity, title: 'Built for active adults', body: 'Designed for gym members, athletes, professionals, and active families.' },
  { icon: Trophy, title: 'Recovery to performance', body: 'From pain or injury back to confident training and active living.' },
];

const EXPERIENCE_PILLARS = [
  {
    step: '01',
    icon: ClipboardCheck,
    title: 'Assess',
    body: 'Clinical physiotherapy assessment and recovery planning where appropriate.',
  },
  {
    step: '02',
    icon: HeartPulse,
    title: 'Recover',
    body: 'Treatment, education, and movement support to help clients progress safely.',
  },
  {
    step: '03',
    icon: Wrench,
    title: 'Rebuild',
    body: 'Return-to-gym and return-to-activity programming connected to real-world movement.',
  },
  {
    step: '04',
    icon: Zap,
    title: 'Perform',
    body: 'Ongoing performance education, mobility, and recovery habits for active living.',
  },
];

const AUDIENCE_CARDS = [
  { icon: Dumbbell, title: 'Gym members returning after pain or injury' },
  { icon: Activity, title: 'Lifters dealing with back, shoulder, hip, or knee issues' },
  { icon: Footprints, title: 'Runners and active adults managing recurring discomfort' },
  { icon: Briefcase, title: 'Professionals and entrepreneurs dealing with desk, travel, and stress-related pain' },
  { icon: HardHat, title: 'People recovering from workplace or motor vehicle injuries' },
  { icon: Sparkles, title: 'Adults who want to move, train, and age with confidence' },
];

const SERVICES = [
  {
    icon: ClipboardCheck,
    title: 'Performance Physiotherapy Assessment',
    body: 'A paid clinical assessment for pain, injury, function, movement limitations, and recovery planning.',
    cta: { href: '#lead-form', label: 'Request a Paid Physiotherapy Assessment' },
  },
  {
    icon: HeartPulse,
    title: 'Return-to-Gym Recovery Program',
    body: 'Structured physiotherapy-led care for people returning to training, work, or daily activity after pain, injury, or time away.',
    cta: { href: '#lead-form', label: 'Ask About This Program' },
  },
  {
    icon: Dumbbell,
    title: 'Lifter’s Back, Hip & Shoulder Program',
    body: 'Support for active people who want to train with better movement, strength, and recovery habits.',
    cta: { href: '#lead-form', label: 'Ask About This Program' },
  },
  {
    icon: Footprints,
    title: 'Runner’s Knee, Foot & Ankle Program',
    body: 'Assessment and care planning for running, walking, court sport, and active lifestyle-related concerns.',
    cta: { href: '#lead-form', label: 'Ask About This Program' },
  },
  {
    icon: Briefcase,
    title: 'Executive Mobility & Pain Prevention',
    body: 'For business owners, professionals, and high performers who sit, travel, train, and need to stay productive.',
    cta: { href: '#lead-form', label: 'Ask About This Program' },
  },
  {
    icon: Award,
    title: 'Performance Education Workshops',
    body: 'General education sessions on movement, recovery, injury prevention, and active living. Workshops do not include physiotherapy assessment, diagnosis, or treatment.',
    cta: { href: '#workshops', label: 'See Workshop Topics' },
  },
];

const FOUNDER_BENEFITS = [
  'Priority booking access at AIM Performance South Common',
  'Launch education workshop access',
  'Digital mobility and recovery resources',
  'Early access to small-group performance classes',
  'Founder-only updates and event invitations',
  'First access to opening week programming',
];

const WORKSHOPS = [
  { icon: Dumbbell, title: 'Back Health for Lifters' },
  { icon: Activity, title: 'Shoulder Strength & Mobility Basics' },
  { icon: Rocket, title: 'Return-to-Gym After Injury' },
  { icon: Briefcase, title: 'Desk Pain and Executive Mobility' },
  { icon: Footprints, title: 'Knee, Hip & Ankle Resilience for Active Adults' },
];

const OPENING_WEEK_ITEMS = [
  'Meet the AIM Performance team',
  'Learn about performance physiotherapy',
  'Attend general education sessions',
  'Explore recovery and movement resources',
  'Join the Founder Access list',
  'Ask about paid physiotherapy assessment booking',
];

const WHY_EVOLVE_COLUMNS = [
  { label: 'Train', icon: Dumbbell, body: 'Continue training in a premium South Edmonton facility you already know.' },
  { label: 'Recover', icon: HeartPulse, body: 'Access physiotherapy-led recovery without leaving your training environment.' },
  { label: 'Rebuild', icon: Wrench, body: 'Move from limitation back to confident movement with clinical support.' },
  { label: 'Perform', icon: Zap, body: 'Build long-term performance, mobility, and recovery habits.' },
];

const INSURANCE_CARDS = [
  { icon: HardHat, title: 'Workplace injury support', body: 'Experience supporting WCB-related rehabilitation pathways.' },
  { icon: Car, title: 'Motor vehicle accident recovery', body: 'Care planning for MVA-related injury and return-to-activity.' },
  { icon: ShieldCheck, title: 'Insurance-related rehabilitation', body: 'Coordination with private insurance and extended health plans.' },
  { icon: Target, title: 'Return-to-work and return-to-activity planning', body: 'Clinical and functional progression toward daily life and work demands.' },
];

const EMPLOYER_BULLETS = [
  'Workplace movement education',
  'Injury prevention education',
  'Return-to-work support',
  'Executive mobility and pain prevention',
  'Team workshops',
  'Employer inquiry pathway',
];

const TEAM = [
  {
    name: '[Clinician Name]',
    role: 'Physiotherapist',
    bio: 'Focused on active recovery, movement health, and return-to-activity care.',
  },
  {
    name: '[Clinician Name]',
    role: 'Physiotherapist',
    bio: 'Supports lifters, runners, and active adults with movement and recovery planning.',
  },
  {
    name: '[Clinician Name]',
    role: 'Physiotherapist',
    bio: 'Experience with WCB, MVA, and insurance-related rehabilitation pathways.',
  },
];

const FAQ = [
  {
    q: 'Is Founder Access a physiotherapy service?',
    a: 'No. Founder Access includes education, launch updates, performance resources, and priority access. Physiotherapy assessment, diagnosis, and treatment are separate clinical services booked by appointment.',
  },
  {
    q: 'Can I book physiotherapy at AIM Performance South Common?',
    a: 'Yes. Paid physiotherapy assessment and treatment appointments will be available at AIM Performance South Common and billed according to AIM’s published fee schedule.',
  },
  {
    q: 'Are the workshops physiotherapy appointments?',
    a: 'No. Workshops are general education sessions. They do not include physiotherapy assessment, diagnosis, or treatment.',
  },
  {
    q: 'Do I need to be an Evolve Strength member?',
    a: 'No. AIM Performance South Common is located inside Evolve Strength, but inquiry and booking options can be available to both members and non-members, subject to access rules for the facility.',
  },
  {
    q: 'What conditions can AIM Performance help with?',
    a: 'AIM Performance can support clients with movement limitations, pain, injury recovery, return-to-activity planning, and performance-related concerns where physiotherapy is appropriate. Individual care depends on assessment findings and clinical judgment.',
  },
  {
    q: 'Is there a free assessment?',
    a: 'No. AIM does not advertise free physiotherapy assessments, screenings, consultations, or trial treatments. Physiotherapy services are booked separately and billed according to AIM’s published fee schedule.',
  },
  {
    q: 'What if I have a serious or urgent injury?',
    a: 'If you have severe pain, sudden weakness, loss of sensation, chest pain, shortness of breath, suspected fracture, major trauma, or other urgent symptoms, seek emergency medical care or call 911. This website is not for emergency care.',
  },
  {
    q: 'Can AIM help with WCB, motor vehicle accident, or insurance-related recovery?',
    a: 'AIM has experience supporting clients with workplace injuries, motor vehicle accident recovery, insurance-related rehabilitation, and return-to-activity planning. Coverage and eligibility depend on each client’s situation, insurer, claim status, and clinical assessment.',
  },
  {
    q: 'Can employers work with AIM Performance?',
    a: 'Yes. AIM Performance can support employers and business owners with education, injury prevention, movement health, recovery planning, and return-to-work support. Employer programs can be discussed through the inquiry form.',
  },
];

const FOOTER_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#founder-access', label: 'Founder Access' },
  { href: '#workshops', label: 'Workshops' },
  { href: '#location', label: 'Location' },
  { href: '#faq', label: 'FAQ' },
  { href: CONTACT.privacyUrl, label: 'Privacy Policy' },
  { href: '#lead-form', label: 'Contact' },
];

// -----------------------------------------------------------------------------
// JSON-LD structured data
// -----------------------------------------------------------------------------

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Physiotherapy',
  name: 'AIM Performance South Common',
  url: PAGE_URL,
  // TODO: replace with real /images/aim-performance-logo.png once branded.
  logo: `${SITE_URL}/logo.png`,
  description:
    'Physiotherapy-led recovery, movement, and performance care inside Evolve Strength South Common in Edmonton, Alberta.',
  telephone: CONTACT.phoneDisplay,
  email: CONTACT.email,
  priceRange: '$$',
  parentOrganization: {
    '@type': 'MedicalBusiness',
    name: 'Alberta Injury Management',
    url: SITE_URL,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.fullAddress,
    addressLocality: 'Edmonton',
    addressRegion: 'AB',
    addressCountry: 'CA',
  },
  areaServed: { '@type': 'AdministrativeArea', name: 'Edmonton, Alberta' },
  // TODO: populate with real values once known.
  openingHours: '[INSERT_OPENING_HOURS]',
  sameAs: [
    // TODO: '[INSERT_SOCIAL_LINKS]' — Instagram, Facebook, LinkedIn, etc.
  ],
};

// Opening Week event. Dates are placeholders until confirmed; the schema
// still validates without them, and the page makes the "Coming soon"
// status explicit.
const openingWeekJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'AIM Performance South Common Opening Week',
  description:
    'Opening week at AIM Performance South Common: general education sessions, team introductions, recovery resources, and Founder Access information. Educational and informational only; does not include physiotherapy assessment, diagnosis, or treatment.',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  // TODO: replace with real start/end dates once opening week is scheduled.
  startDate: '[INSERT_OPENING_WEEK_START]',
  endDate: '[INSERT_OPENING_WEEK_END]',
  location: {
    '@type': 'Place',
    name: 'AIM Performance South Common (inside Evolve Strength South Common)',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.fullAddress,
      addressLocality: 'Edmonton',
      addressRegion: 'AB',
      addressCountry: 'CA',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Alberta Injury Management',
    url: SITE_URL,
  },
  url: `${PAGE_URL}#opening-week`,
  isAccessibleForFree: true,
};

const medicalBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'AIM Performance South Common',
  url: PAGE_URL,
  medicalSpecialty: ['PhysicalTherapy', 'SportsMedicine', 'Rehabilitation'],
  areaServed: { '@type': 'AdministrativeArea', name: 'Alberta, Canada' },
  parentOrganization: {
    '@type': 'MedicalBusiness',
    name: 'Alberta Injury Management',
    url: SITE_URL,
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// -----------------------------------------------------------------------------
// Page component
// -----------------------------------------------------------------------------

export default function AIMPerformanceSouthCommonPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <JsonLd data={medicalBusinessJsonLd} />
      <JsonLd data={openingWeekJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ====================================================================
          1. Sticky brand header + page nav
          ==================================================================== */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-aim-navy/95 text-white backdrop-blur supports-[backdrop-filter]:bg-aim-navy/85">
        <nav
          aria-label="AIM Performance South Common"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        >
          <Link
            href={PAGE_PATH}
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 focus:ring-offset-aim-navy"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-aim-teal to-aim-cta-primary shadow-lg"
            >
              <Zap className="h-5 w-5 text-white" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight sm:text-lg">
                AIM Performance
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-aim-steel-blue/80 sm:text-xs">
                by Alberta Injury Management
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {PAGE_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-white/85 transition hover:text-aim-teal"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${CONTACT.phoneTel}`}
              data-tracking-event="aim_phone_click"
              data-cta-id="header-phone"
              className="hidden items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-white/90 transition hover:border-aim-teal hover:text-aim-teal sm:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call AIM Performance
            </a>
            <a
              href="#lead-form"
              data-tracking-event="aim_cta_click"
              data-cta-id="header-founder-access"
              className="inline-flex items-center gap-2 rounded-lg bg-aim-teal px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-aim-teal/90 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 focus:ring-offset-aim-navy"
            >
              Join Founder Access
            </a>
          </div>
        </nav>
        {/* Mobile sub-nav: horizontal scrollable section chips, hidden on lg+ */}
        <div className="border-t border-white/5 lg:hidden">
          <ul
            aria-label="Page sections"
            className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden"
          >
            {PAGE_NAV_LINKS.map((link) => (
              <li key={link.href} className="flex-shrink-0">
                <a
                  href={link.href}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/85 transition hover:border-aim-teal hover:text-aim-teal"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ====================================================================
          2. Hero
          ==================================================================== */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-aim-navy via-aim-navy to-[#091d31] text-white"
      >
        {/* Decorative glow + grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(47,164,169,0.25), transparent 45%), radial-gradient(circle at 80% 10%, rgba(30,136,229,0.2), transparent 50%), radial-gradient(circle at 50% 90%, rgba(251,191,36,0.12), transparent 55%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-28">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-amber-200">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Founder Access Now Open
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              AIM Performance South Common is launching{' '}
              <span className="bg-gradient-to-r from-aim-teal to-aim-cta-primary bg-clip-text text-transparent">
                inside Evolve Strength
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
              Physiotherapy-led recovery, movement, and performance care for active adults,
              gym members, athletes, and professionals who want to move better, recover stronger,
              and stay active.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#lead-form"
                data-tracking-event="aim_cta_click"
                data-cta-id="hero-founder-access"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-aim-teal px-6 py-3.5 text-base font-semibold text-white shadow-xl transition hover:bg-aim-teal/90 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 focus:ring-offset-aim-navy"
              >
                Join Founder Access
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#lead-form"
                data-tracking-event="aim_paid_assessment_interest"
                data-cta-id="hero-paid-assessment"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-aim-teal hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 focus:ring-offset-aim-navy"
              >
                Request a Paid Physiotherapy Assessment
              </a>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                data-tracking-event="aim_phone_click"
                data-cta-id="hero-phone"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-base font-semibold text-white/90 transition hover:border-aim-teal hover:text-aim-teal focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 focus:ring-offset-aim-navy"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call AIM Performance
              </a>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70">
              Founder Access includes education, launch updates, performance resources, and
              priority access. It does not include physiotherapy assessment, diagnosis, or
              treatment.
            </p>
          </div>

          {/* Premium brand-card visual */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-aim-teal/30 via-aim-cta-primary/20 to-amber-300/10 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-7 shadow-2xl backdrop-blur-xl sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-aim-teal">
                      AIM Performance
                    </p>
                    <p className="mt-1 text-2xl font-bold leading-tight">South Common</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/60">
                      by Alberta Injury Management
                    </p>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-aim-teal to-aim-cta-primary shadow-lg">
                    <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-aim-navy/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                    Inside Evolve Strength
                  </p>
                  <p className="mt-3 text-xl font-semibold leading-snug">
                    Move Better. <span className="text-aim-teal">Recover Stronger.</span> Stay Active.
                  </p>
                </div>

                <ul className="mt-6 grid grid-cols-1 gap-3 text-sm">
                  {[
                    { icon: HeartPulse, label: 'Performance Physiotherapy' },
                    { icon: Wrench, label: 'Recovery + Movement + Return to Activity' },
                  ].map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-aim-teal/15 text-aim-teal">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="font-medium text-white/90">{label}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm">
                  <span className="font-semibold text-amber-200">Founder Access</span>
                  <span className="text-amber-200/80">Now Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. Trust / positioning strip
          ==================================================================== */}
      <section className="border-y border-aim-divider-gray/50 bg-aim-off-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {TRUST_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="flex items-start gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-aim-teal/10 text-aim-teal">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-aim-navy">{card.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-aim-slate">{card.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          4. The AIM Performance Experience
          ==================================================================== */}
      <section id="experience" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              The Experience
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              The AIM Performance Experience
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-aim-slate">
              From the moment clients see the AIM Performance branding inside Evolve Strength,
              the experience should feel different from a traditional clinic. AIM Performance is
              designed as a performance recovery environment where clinical care, movement
              education, recovery planning, and active living come together.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERIENCE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-2xl border border-aim-divider-gray/40 bg-aim-off-white p-7 transition hover:-translate-y-1 hover:border-aim-teal/40 hover:shadow-lg"
                >
                  <span className="text-xs font-semibold tracking-[0.2em] text-aim-teal">
                    {pillar.step}
                  </span>
                  <span className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-aim-navy text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-aim-navy">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-aim-slate">{pillar.body}</p>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-12 max-w-3xl text-center text-base leading-relaxed text-aim-slate">
            AIM Performance is not just a clinic room inside a gym. It is a branded recovery and
            performance destination built around active people who want to move, train, work, and
            live with confidence.
          </p>
        </div>
      </section>

      {/* ====================================================================
          5. Who it's for
          ==================================================================== */}
      <section id="who-its-for" className="bg-aim-off-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              Who It&rsquo;s For
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Built for people who want to stay active
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex items-start gap-4 rounded-2xl border border-aim-divider-gray/50 bg-white p-6 shadow-sm transition hover:border-aim-teal/40 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-aim-teal/10 text-aim-teal">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-base font-medium leading-snug text-aim-navy">{card.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. Services
          ==================================================================== */}
      <section id="services" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Performance care connected to clinical recovery
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="flex h-full flex-col rounded-2xl border border-aim-divider-gray/50 bg-aim-off-white p-7 transition hover:-translate-y-1 hover:border-aim-teal/40 hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-aim-navy text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold leading-snug text-aim-navy">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-aim-slate">
                    {service.body}
                  </p>
                  <a
                    href={service.cta.href}
                    data-tracking-event="aim_cta_click"
                    data-cta-id={`service-${service.title}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-aim-teal hover:text-aim-navy"
                  >
                    {service.cta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. Founder Access
          ==================================================================== */}
      <section
        id="founder-access"
        className="scroll-mt-24 bg-gradient-to-b from-aim-navy to-[#091d31] py-20 text-white sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-amber-200">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Founder Access
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Founder Access is now open
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Be among the first to join the AIM Performance South Common launch community.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Founders Circle */}
            <article className="relative overflow-hidden rounded-3xl border border-amber-300/30 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-sm">
              <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-amber-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200">
                Founders Circle
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                AIM Performance Founders Circle
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-sm text-white/70">Founder Access Pass</span>
              </div>
              <ul className="mt-8 space-y-3">
                {FOUNDER_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-white/90">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#lead-form"
                data-tracking-event="aim_cta_click"
                data-cta-id="founder-access-card"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 py-3.5 text-base font-semibold text-aim-navy shadow-lg transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-aim-navy"
              >
                Join Founder Access
              </a>
              <p className="mt-5 text-xs leading-relaxed text-white/65">
                Founder Access does not include physiotherapy assessment, diagnosis, or treatment.
                Physiotherapy services are available separately by appointment and are billed
                according to AIM&rsquo;s published fee schedule.
              </p>
            </article>

            {/* Performance Recovery Plan */}
            <article className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-sm">
              <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-aim-teal/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-aim-teal">
                Clinical Pathway
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aim-teal">
                Performance Recovery Plan
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/85">
                A clinical care plan built from AIM&rsquo;s standard published fee schedule.
                Includes a paid initial physiotherapy assessment, follow-up physiotherapy treatment
                visits, recovery planning, and progress review where clinically appropriate.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/85">
                {[
                  'Paid initial physiotherapy assessment',
                  'Follow-up physiotherapy treatment visits',
                  'Recovery planning where clinically appropriate',
                  'Progress review and program adjustments',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-aim-teal" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#lead-form"
                data-tracking-event="aim_paid_assessment_interest"
                data-cta-id="recovery-plan-card"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-aim-teal px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-aim-teal/90 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 focus:ring-offset-aim-navy"
              >
                Request Plan Details
              </a>
              <p className="mt-5 text-xs leading-relaxed text-white/65">
                Billed according to AIM&rsquo;s published fee schedule. Coverage, eligibility, and
                care pathways depend on intake, assessment findings, insurer requirements, and
                clinical judgment.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. Workshops
          ==================================================================== */}
      <section id="workshops" className="scroll-mt-24 bg-aim-off-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              Education
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Launch education workshops
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORKSHOPS.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="flex items-start gap-4 rounded-2xl border border-aim-divider-gray/50 bg-white p-6 shadow-sm transition hover:border-aim-teal/40 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-aim-navy text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug text-aim-navy">{w.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="max-w-2xl text-sm text-aim-slate">
              Workshops are general education sessions and do not include physiotherapy
              assessment, diagnosis, or treatment.
            </p>
            <a
              href="#lead-form"
              data-tracking-event="aim_cta_click"
              data-cta-id="workshops-register"
              className="inline-flex items-center gap-2 rounded-xl bg-aim-navy px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-aim-navy/90 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2"
            >
              Register Interest
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. Opening Week Launch Event
          ==================================================================== */}
      <section id="opening-week" className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              Opening Week
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Opening Week Launch Event
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-aim-slate">
              Join AIM Performance South Common during opening week for general education
              sessions, team introductions, recovery resources, and Founder Access information.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-aim-slate/80">
              Opening week activities are educational and informational. They do not include
              physiotherapy assessment, diagnosis, or treatment unless a separate paid
              physiotherapy appointment is booked.
            </p>
            <a
              href="#lead-form"
              data-tracking-event="aim_cta_click"
              data-cta-id="opening-week"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-aim-navy px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-aim-navy/90 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2"
            >
              Join Opening Week Updates
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <ul className="grid gap-4 rounded-2xl border border-aim-divider-gray/50 bg-aim-off-white p-6 sm:p-8">
            {OPENING_WEEK_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-aim-teal" aria-hidden="true" />
                <span className="text-base text-aim-navy">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ====================================================================
          10. Why Evolve
          ==================================================================== */}
      <section id="why-evolve" className="bg-aim-navy py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              The Location
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Why inside Evolve Strength?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              AIM Performance South Common brings physiotherapy-led recovery and movement care
              directly into a high-performance training environment. That means clients can move
              from pain, injury, or limitation back toward confident training and active living
              in the same ecosystem where they already work on their health.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_EVOLVE_COLUMNS.map((col) => {
              const Icon = col.icon;
              return (
                <div
                  key={col.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-aim-teal/40 hover:bg-white/[0.06]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-aim-teal/15 text-aim-teal">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{col.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{col.body}</p>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-white/60">
            Located inside Evolve Strength South Common. AIM Performance is a separate
            physiotherapy-led service provided by Alberta Injury Management.
          </p>
        </div>
      </section>

      {/* ====================================================================
          11. Insurance / WCB / MVA
          ==================================================================== */}
      <section id="insurance" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              Coverage Pathways
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Insurance, WCB, and Motor Vehicle Injury Support
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-aim-slate">
              AIM has experience supporting clients with workplace injuries, motor vehicle
              accident recovery, insurance-related rehabilitation, and return-to-activity
              planning. Coverage and eligibility depend on each client&rsquo;s situation, insurer,
              claim status, and clinical assessment.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INSURANCE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-aim-divider-gray/50 bg-aim-off-white p-6 transition hover:border-aim-teal/40 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-aim-navy text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-aim-navy">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-aim-slate">{card.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <a
              href="#lead-form"
              data-tracking-event="aim_claim_coverage_interest"
              data-cta-id="claim-coverage"
              className="inline-flex items-center gap-2 rounded-xl bg-aim-navy px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-aim-navy/90 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2"
            >
              Ask About Your Claim or Coverage
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="max-w-2xl text-xs leading-relaxed text-aim-slate/80">
              Eligibility, coverage, treatment recommendations, and care pathways depend on
              intake, assessment findings, insurer requirements, claim status, and clinical
              judgment.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          12. Employer program
          ==================================================================== */}
      <section id="employer-program" className="bg-aim-off-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              Employers &amp; Business Owners
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              For Employers and Business Owners
            </h2>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-aim-teal">
              Employer Movement Health Program
            </p>
            <p className="mt-5 text-lg leading-relaxed text-aim-slate">
              AIM Performance South Common can support employers and business owners with
              education, injury prevention, movement health, recovery planning, and
              return-to-work support.
            </p>
            <a
              href="#lead-form"
              data-tracking-event="aim_employer_program_interest"
              data-cta-id="employer-program"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-aim-navy px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-aim-navy/90 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2"
            >
              Request Employer Program Information
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {EMPLOYER_BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-2xl border border-aim-divider-gray/50 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-aim-teal" aria-hidden="true" />
                <span className="text-sm font-medium text-aim-navy">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ====================================================================
          13. Meet the team
          ==================================================================== */}
      <section id="team" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              The Team
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Meet the AIM Performance Team
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-aim-slate">
              AIM Performance South Common will be supported by a team focused on
              physiotherapy-led recovery, active living, and return-to-activity care.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, idx) => (
              <article
                key={`${member.name}-${idx}`}
                className="overflow-hidden rounded-2xl border border-aim-divider-gray/50 bg-aim-off-white shadow-sm"
              >
                <div
                  aria-hidden="true"
                  className="flex h-44 items-center justify-center bg-gradient-to-br from-aim-navy via-aim-navy/90 to-[#091d31] text-white"
                >
                  <Users className="h-12 w-12 opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-aim-navy">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium uppercase tracking-wide text-aim-teal">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-aim-slate">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          14. Testimonials placeholder
          ==================================================================== */}
      <section id="testimonials" className="bg-aim-off-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
            Coming Soon
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-aim-navy sm:text-3xl">
            Client stories and approved testimonials coming soon
          </h2>
          <p className="mt-4 text-base leading-relaxed text-aim-slate">
            As AIM Performance South Common launches, approved client stories and testimonials
            may be added here in accordance with applicable advertising and privacy requirements.
          </p>
        </div>
      </section>

      {/* ====================================================================
          15. Location
          ==================================================================== */}
      <section id="location" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              Find Us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Launching at South Common
            </h2>
            <address className="mt-6 not-italic text-base leading-relaxed text-aim-slate">
              <strong className="block text-aim-navy">AIM Performance South Common</strong>
              Inside Evolve Strength South Common
              <br />
              Edmonton, Alberta
            </address>

            <ul className="mt-6 space-y-3 text-sm text-aim-slate">
              {[
                'Parking-friendly',
                'Gym-adjacent recovery environment',
                'Easy access for South Edmonton clients',
                `Opening date: ${CONTACT.openingDate}`,
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-aim-teal" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-xl border border-aim-divider-gray/50 bg-aim-off-white p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-aim-slate/70">
                  Address
                </dt>
                <dd className="mt-1 text-aim-navy">{CONTACT.fullAddress}</dd>
              </div>
              <div className="rounded-xl border border-aim-divider-gray/50 bg-aim-off-white p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-aim-slate/70">
                  Phone
                </dt>
                <dd className="mt-1 text-aim-navy">
                  <a
                    href={`tel:${CONTACT.phoneTel}`}
                    data-tracking-event="aim_phone_click"
                    data-cta-id="location-phone"
                    className="hover:text-aim-teal"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="rounded-xl border border-aim-divider-gray/50 bg-aim-off-white p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-aim-slate/70">
                  Email
                </dt>
                <dd className="mt-1 text-aim-navy">{CONTACT.email}</dd>
              </div>
              <div className="rounded-xl border border-aim-divider-gray/50 bg-aim-off-white p-4">
                <dt className="text-xs font-semibold uppercase tracking-wider text-aim-slate/70">
                  Booking link
                </dt>
                <dd className="mt-1 text-aim-navy">{CONTACT.bookingUrl}</dd>
              </div>
            </dl>
          </div>

          {/* Map placeholder */}
          <div className="relative overflow-hidden rounded-2xl border border-aim-divider-gray/60 bg-aim-off-white">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(15,42,68,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,42,68,0.1) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative flex h-full min-h-[24rem] flex-col items-center justify-center gap-3 p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-aim-navy text-white shadow-lg">
                <MapPin className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="text-base font-semibold text-aim-navy">Map embed coming soon</p>
              <p className="max-w-xs text-sm text-aim-slate">
                Inside Evolve Strength South Common, Edmonton
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          16. Lead capture form
          ==================================================================== */}
      <section id="lead-form" className="scroll-mt-24 bg-aim-off-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              Inquiry
            </p>
            <h2
              id="lead-form-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl"
            >
              Join the Founder Access List
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-aim-slate">
              Tell us what you are interested in and the AIM Performance team will contact you
              with next steps.
            </p>
          </div>
          <div className="mt-10">
            {/* Registration is closed while South Common is paused. The form
                is left in the tree, unrendered, so restoring it is one line.
                The API route refuses submissions too — a disabled form is not
                a closed endpoint. */}
            <RegistrationPaused />
          </div>
        </div>
      </section>

      {/* ====================================================================
          17. FAQ
          ==================================================================== */}
      <section id="faq" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aim-teal">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-12 space-y-3">
            {FAQ.map((item, idx) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-aim-divider-gray/50 bg-aim-off-white p-6 transition open:border-aim-teal/40 open:bg-white open:shadow-md"
                {...(idx === 0 ? { open: true } : {})}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-semibold text-aim-navy">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-aim-divider-gray text-aim-slate transition group-open:rotate-45 group-open:border-aim-teal group-open:text-aim-teal"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-aim-slate">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          18. Final CTA
          ==================================================================== */}
      <section className="bg-gradient-to-br from-aim-navy via-aim-navy to-[#091d31] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Move better. <span className="text-aim-teal">Recover stronger.</span> Stay active.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Join the AIM Performance South Common launch community or request information about
            paid physiotherapy assessment booking.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#lead-form"
              data-tracking-event="aim_cta_click"
              data-cta-id="final-cta-founder"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-aim-teal px-6 py-3.5 text-base font-semibold text-white shadow-xl transition hover:bg-aim-teal/90 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 focus:ring-offset-aim-navy"
            >
              Join Founder Access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#lead-form"
              data-tracking-event="aim_paid_assessment_interest"
              data-cta-id="final-cta-paid-assessment"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:border-aim-teal hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 focus:ring-offset-aim-navy"
            >
              Request a Paid Physiotherapy Assessment
            </a>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              data-tracking-event="aim_phone_click"
              data-cta-id="final-cta-phone"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-base font-semibold text-white/90 transition hover:border-aim-teal hover:text-aim-teal focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 focus:ring-offset-aim-navy"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call AIM Performance
            </a>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-white/65">
            Founder Access and workshops do not include physiotherapy assessment, diagnosis,
            or treatment.
          </p>
        </div>
      </section>

      {/* ====================================================================
          19. Page footer (page-specific; global site footer is suppressed
          for this route via site-chrome.tsx)
          ==================================================================== */}
      <footer className="bg-aim-navy py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-aim-teal to-aim-cta-primary shadow-lg"
                >
                  <Zap className="h-5 w-5 text-white" />
                </span>
                <div>
                  <p className="text-lg font-bold">AIM Performance South Common</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-aim-steel-blue/80">
                    by Alberta Injury Management
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/75">
                Edmonton, Alberta
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/75">
                Inside Evolve Strength South Common
              </p>
            </div>

            <nav aria-label="Footer">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aim-teal">
                Explore
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-white/85 transition hover:text-aim-teal"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aim-teal">
                Important
              </p>
              <p className="mt-4 text-xs leading-relaxed text-white/70">
                This page provides general information about AIM Performance South Common.
                Physiotherapy services are provided only after appropriate intake, consent, and
                clinical assessment. Founder Access and workshops do not include physiotherapy
                assessment, diagnosis, or treatment.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/70">
                Information on this page is general and educational. It is not medical advice and
                does not replace assessment by a qualified healthcare professional. Physiotherapy
                care is provided only after appropriate intake, consent, and clinical assessment.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/70">
                This website is not for emergency care. If you have a medical emergency, call 911
                or seek urgent medical attention.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} Alberta Injury Management. All rights reserved.
            </p>
            <p>
              <Link href="/" className="hover:text-aim-teal">
                aimphysiotherapy.ca
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
