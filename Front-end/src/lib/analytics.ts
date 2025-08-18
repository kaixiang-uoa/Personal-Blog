/**
 * Google Analytics Configuration
 * Handles GA4 setup and tracking for the blog
 */

// GA4 Measurement ID from environment variable
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Check if GA is enabled
export const isGAEnabled = !!GA_MEASUREMENT_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !isGAEnabled) {
    return;
  }

  try {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    // Make gtag available globally
    window.gtag = gtag;
  } catch (error) {
    console.error('Error in initGA:', error);
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !isGAEnabled || !window.gtag) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window === 'undefined' || !isGAEnabled || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track performance metrics
export const trackPerformance = (metricName: string, value: number, rating: string) => {
  if (typeof window === 'undefined' || !isGAEnabled || !window.gtag) return;

  window.gtag('event', 'performance_metric', {
    metric_name: metricName,
    value: value,
    rating: rating,
  });
};

// Track article views
export const trackArticleView = (articleTitle: string, articleSlug: string) => {
  trackEvent('article_view', 'engagement', articleTitle);
  trackPageView(`/article/${articleSlug}`, articleTitle);
};

// Track search events
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('search', 'engagement', searchTerm, resultsCount);
};

// Track category/tag filter
export const trackFilter = (filterType: 'category' | 'tag', filterValue: string) => {
  trackEvent('filter', 'engagement', `${filterType}:${filterValue}`);
};

// Type definitions
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: unknown[]) => void;
  }
}
