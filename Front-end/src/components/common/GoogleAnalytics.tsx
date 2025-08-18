'use client';

import { useEffect } from 'react';
import { initGA, isGAEnabled, GA_MEASUREMENT_ID } from '@/lib/analytics';

/**
 * GoogleAnalytics Component
 *
 * Initializes Google Analytics when the app loads.
 * This component should be included in the root layout.
 *
 * @component
 * @example
 * ```tsx
 * <GoogleAnalytics />
 * ```
 *
 * @returns {null} This component doesn't render anything
 */
export function GoogleAnalytics() {
  useEffect(() => {
    // Debug: Log GA configuration
    console.log('Google Analytics Debug:', {
      GA_MEASUREMENT_ID,
      isGAEnabled,
      NODE_ENV: process.env.NODE_ENV,
      window: typeof window !== 'undefined',
      document: typeof document !== 'undefined',
    });

    if (isGAEnabled) {
      console.log('Initializing Google Analytics...');
      try {
        initGA();
        console.log('Google Analytics initialization completed');

        // Check if gtag is available after initialization
        setTimeout(() => {
          if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            console.log('Google Analytics gtag function is available');
          } else {
            console.warn('Google Analytics gtag function is not available');
          }
        }, 1000);
      } catch (error) {
        console.error('Google Analytics initialization failed:', error);
      }
    } else {
      console.warn(
        'Google Analytics is disabled. Check NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable.'
      );
    }
  }, []);

  return null;
}
