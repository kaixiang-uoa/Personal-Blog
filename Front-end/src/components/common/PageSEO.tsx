'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  generateOpenGraphTags,
  generateBlogStructuredData,
  generateOrganizationStructuredData,
  generateCanonicalUrl,
  generateHreflangTags,
} from '@/utils/seo';

interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  locale: string;
  pathname: string;
  type?: 'home' | 'category' | 'tag' | 'search' | 'about' | 'contact';
  category?: { name: string; slug: string };
  tag?: { name: string; slug: string };
  searchQuery?: string;
}

/**
 * PageSEO Component
 *
 * A client-side component that manages SEO-related meta tags and structured data
 * for various page types (home, category, tag, search, etc.).
 *
 * @component
 * @example
 * ```tsx
 * <PageSEO
 *   title="Technology Articles"
 *   description="Latest technology articles"
 *   locale="en"
 *   pathname="/en"
 *   type="home"
 * />
 * ```
 *
 * @returns {null} This component doesn't render anything
 */
export function PageSEO({
  title,
  description,
  keywords = [],
  locale,
  pathname,
  type = 'home',
  category,
  tag,
  searchQuery,
}: PageSEOProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Generate page title
    let pageTitle = title;
    if (!pageTitle) {
      switch (type) {
        case 'category':
          pageTitle = `${category?.name} Articles`;
          break;
        case 'tag':
          pageTitle = `${tag?.name} Articles`;
          break;
        case 'search':
          pageTitle = `Search Results for "${searchQuery}"`;
          break;
        case 'about':
          pageTitle = 'About';
          break;
        case 'contact':
          pageTitle = 'Contact';
          break;
        default:
          pageTitle = 'Personal Blog';
      }
    }

    // Update page title
    document.title = pageTitle;

    // Update description
    let pageDescription = description;
    if (!pageDescription) {
      switch (type) {
        case 'category':
          pageDescription = `Browse all articles in ${category?.name} category`;
          break;
        case 'tag':
          pageDescription = `Browse all articles tagged with ${tag?.name}`;
          break;
        case 'search':
          pageDescription = `Search results for "${searchQuery}"`;
          break;
        case 'about':
          pageDescription = 'Learn more about the author and this blog';
          break;
        case 'contact':
          pageDescription = 'Get in touch with the author';
          break;
        default:
          pageDescription = 'A trendy blog for web development enthusiasts';
      }
    }

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', pageDescription);
    } else {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      descriptionMeta.setAttribute('content', pageDescription);
      document.head.appendChild(descriptionMeta);
    }

    // Update keywords
    if (keywords.length > 0) {
      const keywordsString = keywords.join(', ');
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute('content', keywordsString);
      } else {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        keywordsMeta.setAttribute('content', keywordsString);
        document.head.appendChild(keywordsMeta);
      }
    }

    // Add Open Graph tags
    const ogTags = generateOpenGraphTags();
    // Override with page-specific content
    const pageOgTags = {
      ...ogTags,
      'og:title': pageTitle,
      'og:description': pageDescription,
      'og:url': `https://www.kxzhang.online${pathname}`,
    };

    Object.entries(pageOgTags).forEach(([property, content]) => {
      if (content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (meta) {
          meta.setAttribute('content', content);
        } else {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      }
    });

    // Generate canonical URL with query parameters
    const queryParams: Record<string, string> = {};
    if (searchParams) {
      // Include relevant query parameters for canonical URL
      const relevantParams = ['category', 'tag', 'search', 'sort', 'page'];
      relevantParams.forEach(param => {
        const value = searchParams.get(param);
        if (value) {
          queryParams[param] = value;
        }
      });
    }

    const canonicalUrl = generateCanonicalUrl(pathname, locale, queryParams);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonicalLink);
    }

    // Add hreflang tags
    const hreflangTags = generateHreflangTags(pathname);
    hreflangTags.forEach(tag => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${tag.hreflang}"]`);
      if (link) {
        link.setAttribute('href', tag.href);
      } else {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', tag.hreflang);
        link.setAttribute('href', tag.href);
        document.head.appendChild(link);
      }
    });

    // Add structured data
    const blogStructuredData = generateBlogStructuredData();
    const organizationStructuredData = generateOrganizationStructuredData();

    // Remove existing structured data
    const existingStructuredData = document.querySelectorAll('script[type="application/ld+json"]');
    existingStructuredData.forEach(script => script.remove());

    // Add new structured data
    const structuredDataScript = document.createElement('script');
    structuredDataScript.setAttribute('type', 'application/ld+json');
    structuredDataScript.textContent = JSON.stringify([
      blogStructuredData,
      organizationStructuredData,
    ]);
    document.head.appendChild(structuredDataScript);
  }, [
    title,
    description,
    keywords,
    locale,
    pathname,
    type,
    category,
    tag,
    searchQuery,
    searchParams,
  ]);

  // This component doesn't render anything, it only modifies the document head
  return null;
}
