import { SITE } from '@/lib/site';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/en/*', '/zh/*', '/sitemap.xml'],
        disallow: [
          '/api/*',
          '/admin/*',
          '/_next/*',
          '/*?*', // Disallow pages with query parameters
          '/404',
          '/500',
        ],
      },
    ],
    sitemap: `${SITE.baseUrl}/sitemap.xml`,
    host: SITE.baseUrl,
  };
}
