/**
 * Site Configuration Constants
 * Centralized configuration for SEO, internationalization, and site metadata
 */

export const SITE = {
  baseUrl: 'https://www.kxzhang.online',
  locales: ['en', 'zh'] as const,
  defaultLocale: 'en',
  name: 'Personal Blog',
  description: 'A trendy blog for web development enthusiasts',
  author: 'KaiXiang Zhang',
} as const;

export type Locale = (typeof SITE.locales)[number];

/**
 * Generate URL for a specific locale and path
 * @param locale - The locale (en | zh)
 * @param path - The path without locale prefix
 * @returns Full URL with locale
 */
export function getLocaleUrl(locale: Locale, path = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.baseUrl}/${locale}${cleanPath}`;
}

/**
 * Generate canonical URL for a page
 * @param path - The full path including locale
 * @returns Canonical URL
 */
export function getCanonicalUrl(path: string): string {
  return `${SITE.baseUrl}${path}`;
}

/**
 * Generate hreflang URLs for a page
 * @param path - The path without locale prefix
 * @returns Object with hreflang URLs
 */
export function getHreflangUrls(path = ''): Record<string, string> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return {
    en: getLocaleUrl('en', cleanPath),
    zh: getLocaleUrl('zh', cleanPath),
    'x-default': `${SITE.baseUrl}${cleanPath}`,
  };
}
