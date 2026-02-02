export interface MedicalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  image?: string[];
  telephone?: string;
  email?: string;
  address?: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: Array<{
    '@type': string;
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
  }>;
  areaServed?: string;
  medicalSpecialty?: string | string[];
  priceRange?: string;
}

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  description?: string;
  url?: string;
  telephone?: string;
  address?: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification?: Array<{
    '@type': string;
    dayOfWeek: string | string[];
    opens: string;
    closes: string;
  }>;
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
  };
  areaServed?: string;
  serviceType?: string;
  offers?: {
    '@type': string;
    availability?: string;
  };
}

export interface TherapeuticProcedureSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  usedToDiagnose?: string;
  procedureType?: string;
}

export interface FAQPageSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export function generateMedicalBusinessSchema(
  location: {
    name: string;
    address: {
      line_1: string;
      city: string;
      province: string;
      postal_code: string;
      country: string;
    };
    phone: string;
    email?: string;
    hours?: Record<string, string>;
    coordinates?: { latitude: number; longitude: number };
  },
  options?: {
    description?: string;
    url?: string;
    logo?: string;
    services?: string[];
  }
): MedicalBusinessSchema {
  const schema: MedicalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: location.name,
    description:
      options?.description ||
      'Professional physiotherapy and injury management services in Alberta',
    url: options?.url,
    logo: options?.logo,
    telephone: location.phone,
    email: location.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.line_1,
      addressLocality: location.address.city,
      addressRegion: location.address.province,
      postalCode: location.address.postal_code,
      addressCountry: 'CA',
    },
    areaServed: `${location.address.city}, ${location.address.province}`,
    medicalSpecialty: options?.services || 'Physiotherapy',
  };

  if (location.coordinates) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    };
  }

  if (location.hours) {
    schema.openingHoursSpecification = convertHoursToSchema(location.hours);
  }

  return schema;
}

export function generateLocalBusinessSchema(location: {
  name: string;
  address: {
    line_1: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
  };
  phone: string;
  hours?: Record<string, string>;
  coordinates?: { latitude: number; longitude: number };
}): LocalBusinessSchema {
  const schema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: location.name,
    telephone: location.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.line_1,
      addressLocality: location.address.city,
      addressRegion: location.address.province,
      postalCode: location.address.postal_code,
      addressCountry: 'CA',
    },
  };

  if (location.coordinates) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    };
  }

  if (location.hours) {
    schema.openingHoursSpecification = convertHoursToSchema(location.hours);
  }

  return schema;
}

export function generateServiceSchema(
  serviceName: string,
  description: string,
  providerName: string = 'Alberta Injury Management'
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    provider: {
      '@type': 'Organization',
      name: providerName,
    },
    areaServed: 'Alberta, Canada',
    serviceType: 'Healthcare',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function generateTherapeuticProcedureSchema(
  name: string,
  description: string,
  usedFor?: string
): TherapeuticProcedureSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'TherapeuticProcedure',
    name,
    description,
    usedToDiagnose: usedFor,
    procedureType: 'Therapeutic',
  };
}

export function generateFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

function convertHoursToSchema(hours: Record<string, string>): Array<{
  '@type': string;
  dayOfWeek: string;
  opens: string;
  closes: string;
}> {
  const dayMap: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  return Object.entries(hours)
    .filter(([_, time]) => time && time.toLowerCase() !== 'closed')
    .map(([day, time]) => {
      const [opens, closes] = time
        .split('–')
        .map((t) => t.trim().replace(/\s+(AM|PM)/i, ' $1'));

      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayMap[day.toLowerCase()] || day,
        opens: convertTo24Hour(opens),
        closes: convertTo24Hour(closes),
      };
    });
}

function convertTo24Hour(time: string): string {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return time;

  let [_, hours, minutes, period] = match;
  let hour = parseInt(hours);

  if (period.toUpperCase() === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }

  return `${hour.toString().padStart(2, '0')}:${minutes}:00`;
}

export function injectSchema(schema: object): string {
  return JSON.stringify(schema);
}
