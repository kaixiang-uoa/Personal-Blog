'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// GA4 Measurement ID from environment variable
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Check if GA is enabled
const isGAEnabled = !!GA_MEASUREMENT_ID;

// Pageview tracking function
const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_location: url,
      page_title: document.title,
    });
  }
};

// Analytics listener component
function AnalyticsListenerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGAEnabled || !pathname) return;

    const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

    const fullUrl = window.location.origin + url;

    pageview(fullUrl);
  }, [pathname, searchParams]);

  return null;
}

// Wrapper component with error boundary
export function AnalyticsListener() {
  if (!isGAEnabled) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <AnalyticsListenerInner />
    </Suspense>
  );
}

// Type definitions
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
