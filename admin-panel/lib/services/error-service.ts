/**
 * Error Service
 * 
 * Provides unified error handling mechanism, including error type definitions, capture, formatting and display
 */
import { toast } from 'sonner';

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  INFO = 'info',        // Informational error, does not affect user operations
  WARNING = 'warning',  // Warning, may affect some functionality
  ERROR = 'error',      // Error, affects functionality but won't cause system crash
  CRITICAL = 'critical' // Critical error, may cause system unavailability
}

/**
 * Error categories
 */
export enum ErrorCategory {
  API = 'api',          // API request errors
  AUTHENTICATION = 'authentication', // Authentication related errors
  VALIDATION = 'validation',    // Input validation errors
  NETWORK = 'network',       // Network connection errors
  PERMISSION = 'permission',    // Permission errors
  UNEXPECTED = 'unexpected'     // Unexpected system errors
}

/**
 * Application error interface
 */
export interface AppError {
  message: string;           // Error message
  severity: ErrorSeverity;   // Error severity level
  category: ErrorCategory;   // Error category
  code?: string;             // Error code (optional)
  details?: Record<string, unknown>; // Detailed error information (optional)
  originalError?: unknown;   // Original error object (optional)
}

/**
 * Create application error
 */
export function createAppError(
  message: string,
  category: ErrorCategory = ErrorCategory.UNEXPECTED,
  severity: ErrorSeverity = ErrorSeverity.ERROR,
  details?: Record<string, unknown>,
  originalError?: unknown,
  code?: string
): AppError {
  return {
    message,
    category,
    severity,
    details,
    originalError,
    code
  };
}

/**
 * Handle API error
 */
export function handleApiError(error: unknown): AppError {
  // If already an AppError, return directly
  if (typeof error === 'object' && error !== null && 'category' in error && 'severity' in error) {
    return error as AppError;
  }

  // Axios error handling
  if (typeof error === 'object' && error !== null && 'isAxiosError' in error && error.isAxiosError) {
    const axiosError = error as any;
    const status = axiosError.response?.status;
    const responseData = axiosError.response?.data;
    
    // Determine error category and severity based on status code
    if (status === 401 || status === 403) {
      return createAppError(
        responseData?.message || 'Authentication failed, please login again',
        ErrorCategory.AUTHENTICATION,
        ErrorSeverity.ERROR,
        responseData,
        error,
        `HTTP_${status}`
      );
    }
    
    if (status === 400 || status === 422) {
      return createAppError(
        responseData?.message || 'Invalid request data',
        ErrorCategory.VALIDATION,
        ErrorSeverity.WARNING,
        responseData,
        error,
        `HTTP_${status}`
      );
    }
    
    if (status >= 500) {
      return createAppError(
        'Server error, please try again later',
        ErrorCategory.API,
        ErrorSeverity.ERROR,
        responseData,
        error,
        `HTTP_${status}`
      );
    }
    
    if (!axiosError.response && axiosError.code === 'ECONNABORTED') {
      return createAppError(
        'Request timeout, please check your network connection',
        ErrorCategory.NETWORK,
        ErrorSeverity.WARNING,
        { timeout: axiosError.config?.timeout },
        error,
        'TIMEOUT'
      );
    }
    
    if (!axiosError.response) {
      return createAppError(
        'Network error, please check your network connection',
        ErrorCategory.NETWORK,
        ErrorSeverity.WARNING,
        { message: axiosError.message },
        error,
        'NETWORK'
      );
    }
    
    // Default API error
    return createAppError(
      responseData?.message || 'Request failed',
      ErrorCategory.API,
      ErrorSeverity.ERROR,
      responseData,
      error,
      `HTTP_${status || 'UNKNOWN'}`
    );
  }
  
  // Handle standard JavaScript errors
  if (error instanceof TypeError) {
    return createAppError(
      `Type error: ${error.message}`,
      ErrorCategory.UNEXPECTED,
      ErrorSeverity.ERROR,
      { stack: error.stack },
      error,
      'TYPE_ERROR'
    );
  }
  
  if (error instanceof SyntaxError) {
    return createAppError(
      `Syntax error: ${error.message}`,
      ErrorCategory.UNEXPECTED,
      ErrorSeverity.ERROR,
      { stack: error.stack },
      error,
      'SYNTAX_ERROR'
    );
  }
  
  if (error instanceof Error) {
    return createAppError(
      error.message,
      ErrorCategory.UNEXPECTED,
      ErrorSeverity.ERROR,
      { stack: error.stack },
      error,
      'UNKNOWN_ERROR'
    );
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return createAppError(
      error,
      ErrorCategory.UNEXPECTED,
      ErrorSeverity.ERROR,
      {},
      error,
      'STRING_ERROR'
    );
  }
  
  // Unknown error
  return createAppError(
    'An unknown error occurred',
    ErrorCategory.UNEXPECTED,
    ErrorSeverity.ERROR,
    { error },
    error,
    'UNKNOWN'
  );
}

/**
 * Show error toast
 */
export function showErrorToast(error: AppError): void {
  // Choose different toast type based on severity
  switch (error.severity) {
    case ErrorSeverity.INFO:
      toast.info(error.message);
      break;
    case ErrorSeverity.WARNING:
      toast.warning(error.message);
      break;
    case ErrorSeverity.CRITICAL:
      toast.error(error.message, {
        duration: 6000, // Show for longer duration
        description: 'Please contact administrator or refresh the page'
      });
      break;
    case ErrorSeverity.ERROR:
    default:
      toast.error(error.message);
      break;
  }
  
  // Log error to console for debugging
  console.error('Application Error:', {
    message: error.message,
    category: error.category,
    severity: error.severity,
    code: error.code,
    details: error.details
  });
  
  if (error.originalError) {
    console.error('Original Error:', error.originalError);
  }
}

/**
 * Error handling wrapper function
 * Used to wrap async functions, automatically handle errors
 */
export function withErrorHandling<T>(
  fn: () => Promise<T>,
  options: {
    showToast?: boolean; // Whether to show error toast
    rethrow?: boolean;   // Whether to rethrow the error
    fallbackValue?: T;   // Fallback value when error occurs
    errorTransformer?: (error: AppError) => AppError; // Custom error transformer
  } = {}
): Promise<T> {
  const { showToast = true, rethrow = false, fallbackValue, errorTransformer } = options;
  
  return fn().catch((error: unknown) => {
    // Handle error
    let appError = handleApiError(error);
    
    // Apply custom error transformer
    if (errorTransformer) {
      appError = errorTransformer(appError);
    }
    
    // Show error toast
    if (showToast) {
      showErrorToast(appError);
    }
    
    // Rethrow error or return fallback value
    if (rethrow) {
      throw appError;
    }
    
    if (fallbackValue !== undefined) {
      return fallbackValue;
    }
    
    throw appError;
  });
}

/**
 * Error service
 */
export const errorService = {
  createError: createAppError,
  handleApiError,
  showErrorToast,
  withErrorHandling,
  
  /**
   * Capture and handle error
   */
  captureError(error: unknown, options: { showToast?: boolean } = {}): AppError {
    const appError = handleApiError(error);
    
    if (options.showToast !== false) {
      showErrorToast(appError);
    }
    
    return appError;
  },
  
  /**
   * Create error log
   */
  logError(error: AppError): void {
    // Can integrate external logging service here, such as Sentry
    console.error('Error Logged:', error);
    
    // For critical errors, can send to server or third-party monitoring service
    if (error.severity === ErrorSeverity.CRITICAL) {
      // TODO: Implement remote logging for critical errors
    }
  }
};

export default errorService; 