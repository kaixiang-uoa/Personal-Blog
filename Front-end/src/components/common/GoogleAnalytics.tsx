'use client';

import { useEffect } from 'react';
import { initGA, isGAEnabled } from '@/lib/analytics';

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
    // Debug: Log environment variable status
    console.log('GA Debug - Environment variable:', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    console.log('GA Debug - isGAEnabled:', isGAEnabled);

    if (isGAEnabled) {
      try {
        console.log('GA Debug - Initializing Google Analytics...');
        initGA();
        console.log('GA Debug - Google Analytics initialized successfully');
      } catch (error) {
        console.error('Google Analytics initialization failed:', error);
      }
    } else {
      console.warn(
        'GA Debug - Google Analytics is disabled. Check NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable.'
      );
    }
  }, []);

  return null;
}
