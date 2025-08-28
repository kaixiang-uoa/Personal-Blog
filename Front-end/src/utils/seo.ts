import { Article } from '@/types/models';
import { SocialLinks } from '@/types/models';
import { SITE } from '@/lib/site';

/**
 * Generate Open Graph tags for social media sharing
 * @param article - Article data for dynamic OG tags
 * @param socialLinks - Optional social media links from settings
 * @param siteName - Optional site name from settings
 * @param siteDescription - Optional site description from settings
 * @returns Object with Open Graph meta tags
 */
export function generateOpenGraphTags(
  article?: Article,
  socialLinks?: SocialLinks,
  siteName = 'Personal Blog',
  siteDescription = 'A trendy blog for web development enthusiasts'
) {
  const baseUrl = SITE.baseUrl;

  // Extract Twitter handle from social links if available
  const twitterHandle = socialLinks?.twitter
    ? socialLinks.twitter.split('/').pop()?.replace('@', '')
    : undefined;

  if (article) {
    return {
      'og:title': article.title,
      'og:description': article.excerpt || article.content?.substring(0, 160),
      'og:image': article.featuredImage || `${baseUrl}/og-image.jpg`,
      'og:url': `${baseUrl}/en/article/${article.slug}`,
      'og:type': 'article',
      'og:site_name': siteName,
      'og:locale': 'en_US',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': article.title,
      'article:published_time': article.publishedAt,
      'article:modified_time': article.updatedAt,
      'article:author': article.author?.displayName || article.author?.username,
      'article:section': article.categories?.[0]?.name || 'Technology',
      'article:tag': article.tags?.map(tag => tag.name).join(', ') || '',
      'twitter:card': 'summary_large_image',
      'twitter:title': article.title,
      'twitter:description': article.excerpt || article.content?.substring(0, 160),
      'twitter:image': article.featuredImage || `${baseUrl}/og-image.jpg`,
      'twitter:image:alt': article.title,
      ...(twitterHandle && { 'twitter:site': `@${twitterHandle}` }),
      ...(twitterHandle && { 'twitter:creator': `@${twitterHandle}` }),
    };
  }

  return {
    'og:title': siteName,
    'og:description': siteDescription,
    'og:image': `${baseUrl}/og-image.jpg`,
    'og:url': baseUrl,
    'og:type': 'website',
    'og:site_name': siteName,
    'og:locale': 'en_US',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': siteName,
    'twitter:card': 'summary_large_image',
    'twitter:title': siteName,
    'twitter:description': siteDescription,
    'twitter:image': `${baseUrl}/og-image.jpg`,
    'twitter:image:alt': siteName,
    ...(twitterHandle && { 'twitter:site': `@${twitterHandle}` }),
    ...(twitterHandle && { 'twitter:creator': `@${twitterHandle}` }),
  };
}

/**
 * Generate JSON-LD structured data for articles
 * @param article - Article data
 * @param siteName - Optional site name from settings
 * @param authorName - Optional author name from settings
 * @returns JSON-LD structured data object
 */
export function generateArticleStructuredData(
  article: Article,
  siteName = 'Personal Blog',
  authorName = 'Blog Author'
) {
  const baseUrl = SITE.baseUrl;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.content?.substring(0, 160),
    image: article.featuredImage || `${baseUrl}/og-image.jpg`,
    author: {
      '@type': 'Person',
      name: article.author?.displayName || article.author?.username || authorName,
      url: `${baseUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 512,
        height: 512,
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
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  };
}

/**
 * Generate JSON-LD structured data for blog
 * @param siteName - Optional site name from settings
 * @param siteDescription - Optional site description from settings
 * @returns JSON-LD structured data object for the blog
 */
export function generateBlogStructuredData(
  siteName = 'Personal Blog',
  siteDescription = 'A trendy blog for web development enthusiasts'
) {
  const baseUrl = SITE.baseUrl;

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteName,
    description: siteDescription,
    url: baseUrl,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntity: {
      '@type': 'WebPage',
      '@id': baseUrl,
    },
    inLanguage: 'en-US',
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
  const baseUrl = SITE.baseUrl;

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
 * @param socialLinks - Optional social media links from settings
 * @param siteName - Optional site name from settings
 * @param siteDescription - Optional site description from settings
 * @returns JSON-LD structured data for the organization
 */
export function generateOrganizationStructuredData(
  socialLinks?: SocialLinks,
  siteName = 'Personal Blog',
  siteDescription = 'A trendy blog for web development enthusiasts'
) {
  const baseUrl = SITE.baseUrl;

  // Filter valid social media links
  const validSocialLinks = socialLinks
    ? Object.values(socialLinks).filter(url => url && typeof url === 'string' && url.trim() !== '')
    : [];

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    description: siteDescription,
    ...(validSocialLinks.length > 0 && { sameAs: validSocialLinks }),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${baseUrl}/contact`,
    },
  };
}

/**
 * Generate WebSite structured data
 * @param siteName - Optional site name from settings
 * @param siteDescription - Optional site description from settings
 * @returns JSON-LD structured data for the website
 */
export function generateWebsiteStructuredData(
  siteName = 'Personal Blog',
  siteDescription = 'A trendy blog for web development enthusiasts'
) {
  const baseUrl = SITE.baseUrl;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    description: siteDescription,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/en?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  };
}

/**
 * Generate Person structured data for author
 * @param author - Author information
 * @param siteName - Optional site name from settings
 * @returns JSON-LD structured data for the author
 */
export function generatePersonStructuredData(
  author: { displayName?: string; username?: string; bio?: string },
  siteName = 'Personal Blog'
) {
  const baseUrl = SITE.baseUrl;
  const authorName = author.displayName || author.username || 'Blog Author';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: authorName,
    description: author.bio || `Author at ${siteName}`,
    url: `${baseUrl}/about`,
    worksFor: {
      '@type': 'Organization',
      name: siteName,
    },
    sameAs: [`${baseUrl}/author/${author.username}`],
  };
}

/**
 * Generate canonical URL
 * @param path - Current page path (including locale)
 * @param queryParams - Optional query parameters to include
 * @returns Canonical URL
 */
export function generateCanonicalUrl(path: string, queryParams?: Record<string, string>) {
  // Keep the full path including locale for canonical URL
  let canonicalUrl = `${SITE.baseUrl}${path}`;

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
 * @param path - Current page path (including locale)
 * @returns Array of hreflang objects
 */
export function generateHreflangTags(path: string) {
  // Remove locale prefix to get clean path
  const cleanPath = path.replace(/^\/[a-z]{2}/, '');

  return [
    {
      rel: 'alternate',
      hreflang: 'en',
      href: `${SITE.baseUrl}/en${cleanPath}`,
    },
    {
      rel: 'alternate',
      hreflang: 'zh',
      href: `${SITE.baseUrl}/zh${cleanPath}`,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${SITE.baseUrl}/en${cleanPath}`,
    },
  ];
}
