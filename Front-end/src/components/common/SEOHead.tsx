'use client';

import { useSettings } from '@/contexts/SettingsContext';
import { useEffect } from 'react';
import {
  generateOpenGraphTags,
  generateBlogStructuredData,
  generateOrganizationStructuredData,
  generateHreflangTags,
} from '@/utils/seo';
import { useSEOSettings } from '@/hooks/useSEOSettings';
// SITE import is used indirectly through generateHreflangTags

/**
 * SEOHead Component
 *
 * A client-side component that manages SEO-related meta tags and document head elements.
 * Updates the website title, description, keywords, favicon, Open Graph tags, and structured data.
 *
 * @component
 * @example
 * ```tsx
 * <SEOHead />
 * ```
 *
 * @returns {null} This component doesn't render anything
 */
export function SEOHead() {
  const { getSetting } = useSettings();
  const {
    socialLinks,
    siteName: siteNameFromSettings,
    siteDescription: siteDescFromSettings,
  } = useSEOSettings();

  // Get SEO-related settings with fallback values
  const siteName = getSetting('general.siteName', siteNameFromSettings || 'Modern Blog');
  const siteDescription = getSetting(
    'general.siteDescription',
    siteDescFromSettings || 'A trendy blog for web development enthusiasts'
  );
  const keywords = getSetting('general.metaKeywords', '');
  const favicon = getSetting('general.favicon', '/favicon.ico');

  useEffect(() => {
    // Update website title
    document.title = siteName;

    // Update description meta tag
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', siteDescription);
    } else {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      descriptionMeta.setAttribute('content', siteDescription);
      document.head.appendChild(descriptionMeta);
    }

    // Update keywords meta tag if keywords are provided
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

    // Update favicon if provided
    if (favicon) {
      let faviconLink = document.querySelector('link[rel="icon"]');
      if (faviconLink) {
        faviconLink.setAttribute('href', favicon);
      } else {
        faviconLink = document.createElement('link');
        faviconLink.setAttribute('rel', 'icon');
        faviconLink.setAttribute('href', favicon);
        document.head.appendChild(faviconLink);
      }
    }

    // Add Open Graph tags (with dynamic social links)
    const ogTags = generateOpenGraphTags(undefined, socialLinks, siteName, siteDescription);
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

    // Add hreflang tags for homepage
    const hreflangTags = generateHreflangTags('/');
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

    // Add structured data (with dynamic social links & site info)
    const blogStructuredData = generateBlogStructuredData(siteName, siteDescription);
    const organizationStructuredData = generateOrganizationStructuredData(
      socialLinks,
      siteName,
      siteDescription
    );

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
  }, [siteName, siteDescription, keywords, favicon, socialLinks]);

  // This component doesn't render anything, it only modifies the document head
  return null;
}
