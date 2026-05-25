import type { MetadataRoute } from 'next';
import { services } from '@/lib/content/services';
import { conditions } from '@/lib/content/conditions';
import { locations } from '@/lib/content/locations';
import { blogPosts } from '@/lib/content/blog';

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

  return [...staticRoutes, ...serviceRoutes, ...conditionRoutes, ...locationRoutes, ...resourceRoutes];
}
