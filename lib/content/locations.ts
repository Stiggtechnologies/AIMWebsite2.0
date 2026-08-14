export type Location = {
  slug: string;
  name: string;
  status: 'open' | 'coming-soon';
  shortDescriptor: string;
  area: string;
  streetAddress: string;
  city: string;
  region: string;
  postalCode: string;
  phone: string;
  email?: string;
  hours: { [day: string]: string };
  services: string[]; // service slugs offered here
  parking: string;
  accessibility: string;
  opening?: string; // for coming-soon
  latitude?: number;
  longitude?: number;
  existing?: boolean;
};

export const locations: Location[] = [
  {
    slug: 'south-common',
    name: 'AIM South Common',
    status: 'open',
    shortDescriptor: 'Modern physiotherapy and multidisciplinary rehabilitation serving South Edmonton and surrounding communities.',
    area: 'South Edmonton',
    streetAddress: '[Clinic Address]',
    city: 'Edmonton',
    region: 'AB',
    postalCode: '[Postal Code]',
    phone: '[Clinic Phone]',
    email: '[Clinic Email]',
    hours: {
      Monday: '7:00 AM – 7:00 PM',
      Tuesday: '7:00 AM – 7:00 PM',
      Wednesday: '7:00 AM – 7:00 PM',
      Thursday: '7:00 AM – 7:00 PM',
      Friday: '7:00 AM – 5:00 PM',
      Saturday: '9:00 AM – 2:00 PM',
      Sunday: 'Closed',
    },
    services: [
      'physiotherapy',
      'sports-injury-rehabilitation',
      'concussion-rehabilitation',
      'vestibular-rehabilitation',
      'pelvic-floor-physiotherapy',
      'post-surgical-rehabilitation',
      'mva-rehabilitation',
      'wcb-rehabilitation',
      'massage-therapy',
      'chiropractic-care',
      'direct-billing',
    ],
    parking: 'Free surface parking on site',
    accessibility: 'Wheelchair accessible, accessible washroom, ground-floor treatment rooms',
    existing: true,
  },
  {
    slug: 'st-paul',
    name: 'AIM St. Paul',
    status: 'coming-soon',
    shortDescriptor: 'Physiotherapy and rehabilitation services for St. Paul and surrounding communities.',
    area: 'St. Paul, AB',
    streetAddress: '[Clinic Address]',
    city: 'St. Paul',
    region: 'AB',
    postalCode: '[Postal Code]',
    phone: '[Clinic Phone]',
    hours: {
      Monday: '8:00 AM – 6:00 PM',
      Tuesday: '8:00 AM – 6:00 PM',
      Wednesday: '8:00 AM – 6:00 PM',
      Thursday: '8:00 AM – 6:00 PM',
      Friday: '8:00 AM – 4:00 PM',
      Saturday: 'By appointment',
      Sunday: 'Closed',
    },
    services: [
      'physiotherapy',
      'sports-injury-rehabilitation',
      'mva-rehabilitation',
      'wcb-rehabilitation',
      'massage-therapy',
      'direct-billing',
    ],
    parking: 'Free parking',
    accessibility: 'Wheelchair accessible',
    opening: 'Fall 2026',
  },
  {
    slug: 'edmonton-main-hub',
    name: 'AIM Edmonton Main Hub',
    status: 'open',
    shortDescriptor: 'Our flagship Edmonton clinic offering the full AIM service lineup.',
    area: 'Central Edmonton',
    streetAddress: '[Clinic Address]',
    city: 'Edmonton',
    region: 'AB',
    postalCode: '[Postal Code]',
    phone: '[Clinic Phone]',
    hours: {
      Monday: '7:00 AM – 7:00 PM',
      Tuesday: '7:00 AM – 7:00 PM',
      Wednesday: '7:00 AM – 7:00 PM',
      Thursday: '7:00 AM – 7:00 PM',
      Friday: '7:00 AM – 5:00 PM',
      Saturday: '9:00 AM – 2:00 PM',
      Sunday: 'Closed',
    },
    services: [
      'physiotherapy',
      'sports-injury-rehabilitation',
      'concussion-rehabilitation',
      'vestibular-rehabilitation',
      'pelvic-floor-physiotherapy',
      'post-surgical-rehabilitation',
      'chronic-pain-rehabilitation',
      'mva-rehabilitation',
      'wcb-rehabilitation',
      'massage-therapy',
      'chiropractic-care',
      'direct-billing',
    ],
    parking: 'Free surface parking',
    accessibility: 'Wheelchair accessible',
    existing: true,
  },
  {
    slug: 'edmonton-west',
    name: 'AIM Edmonton West',
    status: 'open',
    shortDescriptor: 'West Edmonton clinic serving the west end with physiotherapy and rehab.',
    area: 'West Edmonton',
    streetAddress: '[Clinic Address]',
    city: 'Edmonton',
    region: 'AB',
    postalCode: '[Postal Code]',
    phone: '[Clinic Phone]',
    hours: {
      Monday: '8:00 AM – 7:00 PM',
      Tuesday: '8:00 AM – 7:00 PM',
      Wednesday: '8:00 AM – 7:00 PM',
      Thursday: '8:00 AM – 7:00 PM',
      Friday: '8:00 AM – 5:00 PM',
      Saturday: '9:00 AM – 2:00 PM',
      Sunday: 'Closed',
    },
    services: [
      'physiotherapy',
      'sports-injury-rehabilitation',
      'mva-rehabilitation',
      'wcb-rehabilitation',
      'massage-therapy',
      'direct-billing',
    ],
    parking: 'Free parking',
    accessibility: 'Wheelchair accessible',
    existing: true,
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function openLocations() {
  return locations.filter((l) => l.status === 'open');
}

export function comingSoonLocations() {
  return locations.filter((l) => l.status === 'coming-soon');
}

/**
 * Locations that should appear in intake / booking selectors.
 * Today this matches openLocations(); kept as a separate helper so that
 * intake-availability can diverge from public-page status (e.g. a clinic
 * that is bookable while its public page still says "coming soon").
 */
export function bookableLocations() {
  return locations.filter((l) => l.status === 'open');
}
