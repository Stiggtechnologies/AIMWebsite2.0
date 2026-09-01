export type Location = {
  slug: string;
  name: string;
  /**
   * 'open'        — trading today; bookable; shown as "Open Now".
   * 'coming-soon' — announced with a date we stand behind; shown, not bookable.
   * 'paused'      — planned but not going ahead on any date we can name.
   *                 Excluded from the locations index, the sitemap and every
   *                 booking selector. See the note on `south-common` below.
   */
  status: 'open' | 'coming-soon' | 'paused';
  shortDescriptor: string;
  area: string;
  // Optional on purpose. A location we have not signed a lease for has no
  // address or phone, and printing "[Clinic Address]" on a live page is worse
  // than printing nothing — see LocationPage, which omits what is absent.
  streetAddress?: string;
  city: string;
  region: string;
  postalCode?: string;
  phone?: string;
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
    slug: 'st-paul',
    name: 'AIM St. Paul',
    status: 'coming-soon',
    shortDescriptor: 'Physiotherapy and rehabilitation services for St. Paul and surrounding communities.',
    area: 'St. Paul, AB',
    // No lease signed yet, so no address or phone. Deliberately absent rather
    // than a placeholder token; LocationPage omits the contact lines it lacks.
    city: 'St. Paul',
    region: 'AB',
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
    streetAddress: 'Unit 100, 4936 87 Street NW',
    city: 'Edmonton',
    region: 'AB',
    postalCode: 'T6E 5W3',
    phone: '780-250-8188',
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
    streetAddress: '11420 170 St NW',
    city: 'Edmonton',
    region: 'AB',
    postalCode: '',
    phone: '780-250-8188',
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
  {
    // PAUSED 2026-09-01. Orville: "delayed for now and may not go on."
    //
    // It was previously status:'open' with existing:true. Because
    // bookableLocations() selects status==='open' and this was the FIRST entry
    // in the array, "South Common" was the default-selected clinic on the live
    // intake form — every patient who did not touch the dropdown filed an
    // intake against a clinic that does not exist. That is the reason this
    // entry is ordered last now and why 'paused' exists as a status.
    slug: 'south-common',
    name: 'AIM South Common',
    status: 'paused',
    shortDescriptor: 'A future AIM location in South Edmonton. Not open, and no opening date is confirmed.',
    area: 'South Edmonton',
    city: 'Edmonton',
    region: 'AB',
    hours: {},
    services: [],
    parking: '',
    accessibility: '',
  },
];

/** Locations that may appear on public index pages and in the sitemap. */
export function publicLocations() {
  return locations.filter((l) => l.status !== 'paused');
}

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
