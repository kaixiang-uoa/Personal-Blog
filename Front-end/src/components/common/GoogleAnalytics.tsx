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
    });

    if (isGAEnabled) {
      console.log('Initializing Google Analytics...');
      initGA();
    } else {
      console.warn('Google Analytics is disabled. Check NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable.');
    }
  }, []);

  return null;
}
