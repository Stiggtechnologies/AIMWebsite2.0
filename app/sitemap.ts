import type { MetadataRoute } from 'next';
import { services } from '@/lib/content/services';
import { conditions } from '@/lib/content/conditions';
import { locations } from '@/lib/content/locations';
import { blogPosts } from '@/lib/content/blog';
import { webinars } from '@/lib/content/webinars';

const BASE = 'https://aimphysiotherapy.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/locations',
    '/conditions',
    '/for-patients',
    '/for-patients/what-to-expect',
    '/for-patients/direct-billing',
    '/for-patients/wcb-claims',
    '/for-patients/motor-vehicle-accidents',
    '/for-patients/faq',
    '/for-patients/new-patient-information',
    '/for-employers',
    '/for-referrers',
    '/for-lawyers',
    '/partnerships',
    '/careers',
    '/contact',
    '/book',
    '/resources',
    '/privacy',
    '/terms-of-use',
    '/accessibility',
    '/aim-performance-south-common',
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1.0 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Service pages that exist as static routes under app/services/ but are not
  // entries in the services data module (so the map above misses them).
  const routeOnlyServicePages = [
    'functional-capacity-evaluations',
    'manual-osteopathy',
    'performance-rehabilitation',
    'return-to-work',
    'work-conditioning',
    'work-hardening',
  ].map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const conditionRoutes = conditions.map((c) => ({
    url: `${BASE}/conditions/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const locationRoutes = locations.map((l) => ({
    url: `${BASE}/locations/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const resourceRoutes = blogPosts.map((p) => ({
    url: `${BASE}/resources/${p.slug}`,
    lastModified: new Date(p.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const webinarIndexRoute = {
    url: `${BASE}/resources/webinars`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  };

  const webinarRoutes = webinars.map((w) => ({
    url: `${BASE}/resources/webinars/${w.slug}`,
    lastModified: new Date(w.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: w.status === 'published' ? 0.7 : 0.5,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...routeOnlyServicePages,
    ...conditionRoutes,
    ...locationRoutes,
    ...resourceRoutes,
    webinarIndexRoute,
    ...webinarRoutes,
  ];
}
