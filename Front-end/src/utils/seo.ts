import { Article } from '@/types/models';

/**
 * Generate Open Graph tags for social media sharing
 * @param article - Article data for dynamic OG tags
 * @returns Object with Open Graph meta tags
 */
export function generateOpenGraphTags(article?: Article) {
  const baseUrl = 'https://www.kxzhang.online';

  if (article) {
    return {
      'og:title': article.title,
      'og:description': article.excerpt || article.content?.substring(0, 160),
      'og:image': article.featuredImage || `${baseUrl}/og-image.jpg`,
      'og:url': `${baseUrl}/en/article/${article.slug}`,
      'og:type': 'article',
      'og:site_name': 'Personal Blog',
      'og:locale': 'en_US',
      'article:published_time': article.publishedAt,
      'article:modified_time': article.updatedAt,
      'article:author': article.author?.displayName || article.author?.username,
      'twitter:card': 'summary_large_image',
      'twitter:title': article.title,
      'twitter:description': article.excerpt || article.content?.substring(0, 160),
      'twitter:image': article.featuredImage || `${baseUrl}/og-image.jpg`,
      'twitter:site': '@yourtwitterhandle', // Replace with actual Twitter handle
    };
  }

  return {
    'og:title': 'Personal Blog',
    'og:description': 'A trendy blog for web development enthusiasts',
    'og:image': `${baseUrl}/og-image.jpg`,
    'og:url': baseUrl,
    'og:type': 'website',
    'og:site_name': 'Personal Blog',
    'og:locale': 'en_US',
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Personal Blog',
    'twitter:description': 'A trendy blog for web development enthusiasts',
    'twitter:image': `${baseUrl}/og-image.jpg`,
    'twitter:site': '@yourtwitterhandle', // Replace with actual Twitter handle
  };
}

/**
 * Generate JSON-LD structured data for articles
 * @param article - Article data
 * @returns JSON-LD structured data object
 */
export function generateArticleStructuredData(article: Article) {
  const baseUrl = 'https://www.kxzhang.online';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.content?.substring(0, 160),
    image: article.featuredImage || `${baseUrl}/og-image.jpg`,
    author: {
      '@type': 'Person',
      name: article.author?.displayName || article.author?.username || 'Blog Author',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Personal Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/en/article/${article.slug}`,
    },
    wordCount: article.content?.length || 0,
    articleSection: article.categories?.[0]?.name || 'Technology',
    keywords: article.tags?.map(tag => tag.name).join(', ') || 'blog, technology, programming',
  };
}

/**
 * Generate JSON-LD structured data for blog
 * @returns JSON-LD structured data object for the blog
 */
export function generateBlogStructuredData() {
  const baseUrl = 'https://www.kxzhang.online';

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Personal Blog',
    description: 'A trendy blog for web development enthusiasts',
    url: baseUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Personal Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntity: {
      '@type': 'WebPage',
      '@id': baseUrl,
    },
  };
}

/**
 * Generate breadcrumb structured data
 * @param breadcrumbs - Array of breadcrumb items
 * @returns JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  const baseUrl = 'https://www.kxzhang.online';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate organization structured data
 * @returns JSON-LD structured data for the organization
 */
export function generateOrganizationStructuredData() {
  const baseUrl = 'https://www.kxzhang.online';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Personal Blog',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'A trendy blog for web development enthusiasts',
    sameAs: [
      'https://twitter.com/yourtwitterhandle', // Replace with actual social media URLs
      'https://github.com/yourgithubhandle',
    ],
  };
}

/**
 * Generate canonical URL
 * @param path - Current page path
 * @param locale - Current locale
 * @param queryParams - Optional query parameters to include
 * @returns Canonical URL
 */
export function generateCanonicalUrl(
  path: string,
  _locale = 'en',
  queryParams?: Record<string, string>
) {
  const baseUrl = 'https://www.kxzhang.online';

  // Remove locale prefix for canonical URL
  const cleanPath = path.replace(/^\/[a-z]{2}/, '');

  let canonicalUrl = `${baseUrl}${cleanPath}`;

  // Add query parameters if provided
  if (queryParams && Object.keys(queryParams).length > 0) {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    canonicalUrl += `?${params.toString()}`;
  }

  return canonicalUrl;
}

/**
 * Generate hreflang tags for multilingual SEO
 * @param path - Current page path
 * @returns Array of hreflang objects
 */
export function generateHreflangTags(path: string) {
  const baseUrl = 'https://www.kxzhang.online';

  // Remove locale prefix to get clean path
  const cleanPath = path.replace(/^\/[a-z]{2}/, '');

  return [
    {
      rel: 'alternate',
      hreflang: 'en',
      href: `${baseUrl}/en${cleanPath}`,
    },
    {
      rel: 'alternate',
      hreflang: 'zh',
      href: `${baseUrl}/zh${cleanPath}`,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${baseUrl}${cleanPath}`,
    },
  ];
}
