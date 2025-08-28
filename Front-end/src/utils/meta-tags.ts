import { SITE } from '@/lib/site';

export interface MetaTag {
  name?: string;
  property?: string;
  rel?: string;
  href?: string;
  content: string;
}

export interface MetaTagsConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

/**
 * Generate meta tags for a page
 * @param config - Meta tags configuration
 * @returns Array of meta tag objects
 */
export function generateMetaTags(config: MetaTagsConfig): MetaTag[] {
  const tags: MetaTag[] = [];

  // Basic meta tags
  if (config.title) {
    tags.push({ name: 'title', content: config.title });
  }

  if (config.description) {
    tags.push({ name: 'description', content: config.description });
  }

  if (config.keywords && config.keywords.length > 0) {
    tags.push({ name: 'keywords', content: config.keywords.join(', ') });
  }

  // Robots meta tags
  const robots: string[] = [];
  if (config.noindex) {
    robots.push('noindex');
  }
  if (config.nofollow) {
    robots.push('nofollow');
  }
  if (robots.length > 0) {
    tags.push({ name: 'robots', content: robots.join(', ') });
  }

  // Canonical URL
  if (config.canonical) {
    tags.push({ rel: 'canonical', href: config.canonical, content: config.canonical });
  }

  // Open Graph tags
  if (config.title) {
    tags.push({ property: 'og:title', content: config.title });
  }

  if (config.description) {
    tags.push({ property: 'og:description', content: config.description });
  }

  if (config.canonical) {
    tags.push({ property: 'og:url', content: config.canonical });
  }

  if (config.ogImage) {
    tags.push({ property: 'og:image', content: config.ogImage });
  }

  if (config.ogType) {
    tags.push({ property: 'og:type', content: config.ogType });
  }

  // Twitter Card tags
  if (config.twitterCard) {
    tags.push({ name: 'twitter:card', content: config.twitterCard });
  }

  if (config.title) {
    tags.push({ name: 'twitter:title', content: config.title });
  }

  if (config.description) {
    tags.push({ name: 'twitter:description', content: config.description });
  }

  return tags;
}

/**
 * Check if current page should be noindexed
 * @param pathname - Current page pathname
 * @param searchParams - Current page search parameters
 * @returns True if page should be noindexed
 */
export function shouldNoindex(pathname: string, searchParams?: URLSearchParams): boolean {
  // Check for query parameters that should be noindexed
  if (searchParams) {
    const hasCategory = searchParams.has('category');
    const hasTag = searchParams.has('tag');
    const hasSearch = searchParams.has('search');
    const hasPage = searchParams.has('page') && searchParams.get('page') !== '1';

    // Noindex pages with category, tag, search, or pagination (except page 1)
    if (hasCategory || hasTag || hasSearch || hasPage) {
      return true;
    }
  }

  // Check for paths that should be noindexed
  const noindexPaths = ['/api', '/admin', '/_next', '/404', '/500'];

  return noindexPaths.some(path => pathname.startsWith(path));
}

/**
 * Generate meta tags for query parameter pages (category, tag, search)
 * @param pathname - Current page pathname
 * @param searchParams - Current page search parameters
 * @param locale - Current locale
 * @returns Meta tags configuration
 */
export function generateQueryPageMetaTags(
  pathname: string,
  searchParams: URLSearchParams,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _locale: string
): MetaTagsConfig {
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const page = searchParams.get('page');

  let title = '';
  let description = '';

  if (category) {
    title = `${category} - ${SITE.name}`;
    description = `Browse articles in the ${category} category`;
  } else if (tag) {
    title = `#${tag} - ${SITE.name}`;
    description = `Browse articles tagged with ${tag}`;
  } else if (search) {
    title = `Search: ${search} - ${SITE.name}`;
    description = `Search results for "${search}"`;
  }

  // Add page number to title if not page 1
  if (page && page !== '1') {
    title += ` (Page ${page})`;
  }

  return {
    title,
    description,
    noindex: true, // Always noindex query parameter pages
    nofollow: true, // Also nofollow to prevent crawling
    canonical: `${SITE.baseUrl}${pathname}`, // Canonical without query params
  };
}
