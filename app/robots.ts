import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/intake/form'] }],
    sitemap: 'https://albertainjurymanagement.ca/sitemap.xml',
    host: 'https://albertainjurymanagement.ca',
  };
}
