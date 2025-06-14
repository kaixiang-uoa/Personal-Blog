'use client';

import { useSettings } from '@/contexts/SettingsContext';
import { useEffect } from 'react';

/**
 * SEOHead Component
 * 
 * A client-side component that manages SEO-related meta tags and document head elements.
 * Updates the website title, description, keywords, and favicon based on settings.
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
  
  // Get SEO-related settings with fallback values
  const siteName = getSetting('general.siteName', 'Modern Blog');
  const siteDescription = getSetting('general.siteDescription', 'A trendy blog for web development enthusiasts');
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
  }, [siteName, siteDescription, keywords, favicon]);
  
  // This component doesn't render anything, it only modifies the document head
  return null;
} 