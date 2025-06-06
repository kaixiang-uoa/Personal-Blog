import React from 'react';
import { useTranslations } from 'next-intl';

interface ApiErrorFallbackProps {
  error?: Error | null;
  resetErrorBoundary?: () => void;
  message?: string;
}

/**
 * API error fallback component
 * display friendly error message and retry button when API request fails
 */
export default function ApiErrorFallback({
  error,
  resetErrorBoundary,
  message
}: ApiErrorFallbackProps) {
  // Use common namespace instead of errors to avoid missing translations
  let t;
  try {
    // Try to use translations, but don't fail if they're not available
    t = useTranslations('common');
  } catch (e) {
    // Fallback if translations aren't available
    t = (key: string) => {
      const fallbacks: Record<string, string> = {
        'defaultApiError': 'Something went wrong',
        'dataLoadingFailed': 'Data loading failed',
        'tryAgain': 'Try again'
      };
      return fallbacks[key] || key;
    };
  }
  
  // default error message
  const errorMessage = message || error?.message || t('defaultApiError');

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-800/30 dark:bg-red-900/20">
      <div className="flex flex-col items-center justify-center gap-2">
        <svg
          className="h-10 w-10 text-red-500 dark:text-red-400"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
          <path d="M9 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
        </svg>
        
        <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
          {t('dataLoadingFailed')}
        </h3>
        
        <p className="text-sm text-red-600 dark:text-red-300 max-w-md">
          {errorMessage}
        </p>
        
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-offset-slate-900"
          >
            {t('tryAgain')}
          </button>
        )}
      </div>
    </div>
  );
} 