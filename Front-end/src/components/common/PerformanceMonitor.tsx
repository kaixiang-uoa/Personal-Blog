'use client';

import { useEffect } from 'react';

// GA4 Measurement ID from environment variable
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Check if GA is enabled
const isGAEnabled = !!GA_MEASUREMENT_ID;

// Track performance metrics
const trackPerformance = (metricName: string, value: number, rating: string) => {
  if (typeof window === 'undefined' || !isGAEnabled || !window.gtag) return;

  window.gtag('event', 'performance_metric', {
    metric_name: metricName,
    value: value,
    rating: rating,
  });
};

// Type definitions
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * PerformanceMonitor Component
 *
 * A component that monitors and reports Core Web Vitals and other performance metrics.
 * Helps track page performance and identify optimization opportunities.
 *
 * @component
 * @example
 * ```tsx
 * <PerformanceMonitor />
 * ```
 *
 * @returns {null} This component doesn't render anything
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        // Only process entries that have a value property
        if ('value' in entry && typeof entry.value === 'number') {
          // Send to analytics if enabled
          if (isGAEnabled) {
            trackPerformance(entry.name, entry.value, getRating(entry.name, entry.value));
          }
        }
      }
    });

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('PerformanceObserver not supported:', error);
    }

    // Monitor page load time
    const pageLoadTime = performance.now();
    window.addEventListener('load', () => {
      const loadTime = performance.now() - pageLoadTime;

      if (isGAEnabled) {
        trackPerformance('page_load_time', loadTime, getLoadTimeRating(loadTime));
      }
    });

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;

          // Log slow resources
          if (resourceEntry.duration > 1000) {
            console.warn('Slow Resource:', {
              name: resourceEntry.name,
              duration: resourceEntry.duration,
              size: resourceEntry.transferSize,
            });
          }
        }
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Resource PerformanceObserver not supported:', error);
    }

    // Cleanup
    return () => {
      observer.disconnect();
      resourceObserver.disconnect();
    };
  }, []);

  return null;
}

/**
 * Get performance rating based on metric name and value
 * @param name - Metric name
 * @param value - Metric value
 * @returns Performance rating
 */
function getRating(name: string, value: number): string {
  switch (name) {
    case 'largest-contentful-paint':
      if (value < 2500) return 'good';
      if (value < 4000) return 'needs-improvement';
      return 'poor';

    case 'first-input':
      if (value < 100) return 'good';
      if (value < 300) return 'needs-improvement';
      return 'poor';

    case 'layout-shift':
      if (value < 0.1) return 'good';
      if (value < 0.25) return 'needs-improvement';
      return 'poor';

    default:
      return 'unknown';
  }
}

/**
 * Get page load time rating
 * @param loadTime - Page load time in milliseconds
 * @returns Load time rating
 */
function getLoadTimeRating(loadTime: number): string {
  if (loadTime < 2000) return 'excellent';
  if (loadTime < 4000) return 'good';
  if (loadTime < 8000) return 'needs-improvement';
  return 'poor';
}
