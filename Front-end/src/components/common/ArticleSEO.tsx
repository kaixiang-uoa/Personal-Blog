'use client';

import { useEffect } from 'react';
import { Article } from '@/types/models';
import {
  generateOpenGraphTags,
  generateArticleStructuredData,
  generateBreadcrumbStructuredData,
  generatePersonStructuredData,
  generateCanonicalUrl,
  generateHreflangTags,
} from '@/utils/seo';
import { useSEOSettings } from '@/hooks/useSEOSettings';

interface ArticleSEOProps {
  article: Article;
  locale: string;
  pathname: string;
}

/**
 * ArticleSEO Component
 *
 * A client-side component that manages SEO-related meta tags and structured data
 * specifically for article pages. Updates meta tags, Open Graph tags, and JSON-LD data.
 *
 * @component
 * @example
 * ```tsx
 * <ArticleSEO article={article} locale="en" pathname="/en/article/my-article" />
 * ```
 *
 * @returns {null} This component doesn't render anything
 */
export function ArticleSEO({ article, locale, pathname }: ArticleSEOProps) {
  const { socialLinks, siteName, authorName } = useSEOSettings();
  useEffect(() => {
    // Update page title
    const title = article.seo?.metaTitle || article.title;
    document.title = title;

    // Update description
    const description =
      article.seo?.metaDescription || article.excerpt || article.content?.substring(0, 160);
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description || '');
    } else {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      descriptionMeta.setAttribute('content', description || '');
      document.head.appendChild(descriptionMeta);
    }

    // Update keywords
    const keywords = article.seo?.keywords?.join(', ') || '';
    if (keywords) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute('content', keywords);
      } else {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        keywordsMeta.setAttribute('content', keywords);
        document.head.appendChild(keywordsMeta);
      }
    }

    // Add Open Graph tags (with dynamic social links)
    const ogTags = generateOpenGraphTags(article, socialLinks, siteName);
    Object.entries(ogTags).forEach(([property, content]) => {
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

    // Add canonical URL
    const canonicalUrl = generateCanonicalUrl(pathname);
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
    const articleStructuredData = generateArticleStructuredData(article, siteName, authorName);
    const personStructuredData = article.author
      ? generatePersonStructuredData(article.author, siteName)
      : null;

    // Generate breadcrumbs
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Articles', url: `/${locale}` },
    ];

    // Add category if available
    if (article.categories && article.categories.length > 0) {
      const category = article.categories[0];
      breadcrumbs.push({
        name: category.name,
        url: `/${locale}?category=${category.slug}`,
      });
    }

    // Add current article
    breadcrumbs.push({
      name: article.title,
      url: `/${locale}/article/${article.slug}`,
    });

    const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbs);

    // Remove existing structured data
    const existingStructuredData = document.querySelectorAll('script[type="application/ld+json"]');
    existingStructuredData.forEach(script => script.remove());

    // Add new structured data
    const structuredDataScript = document.createElement('script');
    structuredDataScript.setAttribute('type', 'application/ld+json');
    structuredDataScript.textContent = JSON.stringify([
      articleStructuredData,
      ...(personStructuredData ? [personStructuredData] : []),
      breadcrumbStructuredData,
    ]);
    document.head.appendChild(structuredDataScript);
  }, [article, locale, pathname, siteName, authorName, socialLinks]);

  // This component doesn't render anything, it only modifies the document head
  return null;
}
