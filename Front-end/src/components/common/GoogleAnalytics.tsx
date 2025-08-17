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
    if (isGAEnabled) {
      initGA();
    }
  }, []);

  return null;
}
