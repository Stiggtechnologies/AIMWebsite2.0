import type { Metadata } from 'next';

const SITE_URL = 'https://albertainjurymanagement.ca';
const SITE_NAME = 'Alberta Injury Management';

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: `${opts.title} | ${SITE_NAME}`,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_CA',
      url,
      siteName: SITE_NAME,
      title: opts.title,
      description: opts.description,
      images: opts.image ? [{ url: opts.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
    },
  };
}

export function medicalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    areaServed: { '@type': 'AdministrativeArea', name: 'Alberta, Canada' },
    medicalSpecialty: [
      'PhysicalTherapy',
      'SportsMedicine',
      'Rehabilitation',
    ],
    priceRange: '$$',
    telephone: '+1-780-XXX-XXXX',
  };
}

export function localBusinessSchema(loc: {
  name: string;
  slug: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
  phone: string;
  latitude?: number;
  longitude?: number;
  openingHours?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physiotherapy',
    name: loc.name,
    url: `${SITE_URL}/locations/${loc.slug}`,
    telephone: loc.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.streetAddress,
      addressLocality: loc.city,
      addressRegion: loc.region,
      postalCode: loc.postalCode,
      addressCountry: 'CA',
    },
    ...(loc.latitude && loc.longitude
      ? { geo: { '@type': 'GeoCoordinates', latitude: loc.latitude, longitude: loc.longitude } }
      : {}),
    ...(loc.openingHours ? { openingHoursSpecification: loc.openingHours } : {}),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
