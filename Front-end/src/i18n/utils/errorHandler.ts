import { useTranslations } from 'next-intl';

export type ErrorType = 
  | 'network'
  | 'server'
  | 'validation'
  | 'auth'
  | 'notFound'
  | 'unknown';

export interface ErrorOptions {
  type?: ErrorType;
  message?: string;
  code?: string;
  details?: Record<string, any>;
}

export function useErrorHandler() {
  const t = useTranslations('errors');

  const getErrorMessage = (error: Error | string | ErrorOptions): string => {
    // If it's a string, return it directly
    if (typeof error === 'string') {
      return error;
    }

    // If it's an Error object
    if (error instanceof Error) {
      return error.message;
    }

    // If it's an ErrorOptions object
    const { type = 'unknown', message, code, details } = error;

    // Try to get a localized message based on the error type
    try {
      switch (type) {
        case 'network':
          return t('common.networkError');
        case 'server':
          return t('common.serverError');
        case 'validation':
          return t('common.validationError');
        case 'auth':
          return t('auth.loginFailed');
        case 'notFound':
          return t('common.notFound');
        default:
          // If we have a custom message, use it
          if (message) {
            return message;
          }
          // Otherwise use the default error message
          return t('common.defaultError');
      }
    } catch (e) {
      // Fallback if translations are not available
      return message || 'An unexpected error occurred';
    }
  };

  const formatValidationError = (field: string, type: string, params?: Record<string, any>): string => {
    try {
      return t(`form.${type}`, { field, ...params });
    } catch (e) {
      return `Invalid ${field}`;
    }
  };

  return {
    getErrorMessage,
    formatValidationError
  };
} 