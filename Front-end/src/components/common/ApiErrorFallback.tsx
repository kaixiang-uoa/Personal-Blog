import React from 'react';
import { useTranslations } from 'next-intl';

/**
 * Props interface for the ApiErrorFallback component
 * @interface ApiErrorFallbackProps
 * @property {Error | null} [error] - The error object to display
 * @property {function} [resetErrorBoundary] - Function to reset the error boundary
 * @property {string} [message] - Custom error message to display
 */
interface ApiErrorFallbackProps {
  error?: Error | null;
  resetErrorBoundary?: () => void;
  message?: string;
}

/**
 * ApiErrorFallback Component
 *
 * A component that displays user-friendly error messages when API requests fail.
 * Supports different error types with appropriate styling and provides a retry option.
 * Includes fallback translations and handles various HTTP status codes.
 *
 * @component
 * @example
 * ```tsx
 * <ApiErrorFallback
 *   error={apiError}
 *   resetErrorBoundary={handleReset}
 *   message="Custom error message"
 * />
 * ```
 *
 * @param {ApiErrorFallbackProps} props - The component props
 * @returns {JSX.Element} An error display component with retry functionality
 */
export default function ApiErrorFallback({
  error,
  resetErrorBoundary,
  message,
}: ApiErrorFallbackProps) {
  // Use common namespace for translations
  const t = useTranslations('common');

  // Fallback translations in case the hook fails
  const fallbackTranslations: Record<string, string> = {
    defaultApiError: 'Something went wrong',
    dataLoadingFailed: 'Data loading failed',
    tryAgain: 'Try again',
    notFoundError: 'Resource not found',
    serverError: 'Server error occurred',
    networkError: 'Network error',
    unauthorizedError: 'Unauthorized access',
    validationError: 'Invalid data',
  };

  /**
   * Safely translate a key with fallback support
   * @param {string} key - The translation key
   * @returns {string} The translated text or fallback
   */
  const safeTranslate = (key: string) => {
    try {
      return t(key);
    } catch {
      return fallbackTranslations[key] || key;
    }
  };

  /**
   * Parse error details and determine appropriate message and status code
   * @returns {Object} Object containing error message and status code
   */
  const getErrorDetails = () => {
    if (!error) return { message: message || safeTranslate('defaultApiError'), statusCode: 500 };

    // Extract API response information
    let statusCode = 500;
    let errorMessage = message || error.message || safeTranslate('defaultApiError');

    // Handle network errors
    if (error.message.includes('Network Error')) {
      return { message: safeTranslate('networkError'), statusCode: 0 };
    }

    // Extract status code from error message
    const match = error.message.match(/(\d{3})/);
    if (match) {
      statusCode = parseInt(match[1]);
    }

    // Map status codes to user-friendly messages
    switch (statusCode) {
      case 400:
        errorMessage = message || safeTranslate('validationError');
        break;
      case 401:
      case 403:
        errorMessage = message || safeTranslate('unauthorizedError');
        break;
      case 404:
        errorMessage = message || safeTranslate('notFoundError');
        break;
      case 500:
      case 502:
      case 503:
        errorMessage = message || safeTranslate('serverError');
        break;
      default:
        errorMessage = message || error.message || safeTranslate('defaultApiError');
    }

    return { message: errorMessage, statusCode };
  };

  const { message: errorMessage, statusCode } = getErrorDetails();

  /**
   * Get appropriate styling based on error type
   * @returns {Object} Object containing CSS classes for different elements
   */
  const getErrorStyle = () => {
    if (statusCode === 404) {
      return {
        containerClass:
          'border-yellow-200 bg-yellow-50 dark:border-yellow-800/30 dark:bg-yellow-900/20',
        iconClass: 'text-yellow-500 dark:text-yellow-400',
        titleClass: 'text-yellow-800 dark:text-yellow-200',
        textClass: 'text-yellow-600 dark:text-yellow-300',
        buttonClass:
          'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 dark:bg-yellow-700 dark:hover:bg-yellow-600',
      };
    }

    // Default error styling
    return {
      containerClass: 'border-red-200 bg-red-50 dark:border-red-800/30 dark:bg-red-900/20',
      iconClass: 'text-red-500 dark:text-red-400',
      titleClass: 'text-red-800 dark:text-red-200',
      textClass: 'text-red-600 dark:text-red-300',
      buttonClass:
        'bg-red-600 hover:bg-red-700 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600',
    };
  };

  const style = getErrorStyle();

  return (
    <div className={`rounded-lg border p-6 text-center ${style.containerClass}`}>
      <div className="flex flex-col items-center justify-center gap-2">
        {/* Error icon */}
        <svg
          className={`h-10 w-10 ${style.iconClass}`}
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

        {/* Error title */}
        <h3 className={`text-lg font-medium ${style.titleClass}`}>
          {safeTranslate('dataLoadingFailed')}
        </h3>

        {/* Error message */}
        <p className={`text-sm max-w-md ${style.textClass}`}>{errorMessage}</p>

        {/* Retry button */}
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className={`mt-4 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${style.buttonClass}`}
          >
            {safeTranslate('tryAgain')}
          </button>
        )}
      </div>
    </div>
  );
}
