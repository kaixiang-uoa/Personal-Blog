import { t } from './i18n.js';
import { ErrorTypes } from '../middleware/errorMiddleware.js';
import { getErrorDetails, createErrorWithCode } from './errorCodes.js';

/**
 * Unified success response formatter
 * @param {Object} res - Express response object
 * @param {Object|null} data - Response data
 * @param {Number} statusCode - HTTP status code
 * @param {String} messageKey - i18n message key
 * @returns {Object} Formatted response object
 */
export const success = (
  res,
  data = null,
  statusCode = 200,
  messageKey = 'common.success',
) => {
  const lang = res.locals.lang || 'en';
  const requestId = res.req?.requestId;

  const response = {
    success: true,
    message: t(messageKey, lang),
    data,
  };

  // Add requestId if available
  if (requestId) {
    response.requestId = requestId;
  }

  return res.status(statusCode).json(response);
};

/**
 * Unified error response formatter
 * @param {Object} res - Express response object
 * @param {String} messageKey - i18n message key
 * @param {Number} statusCode - HTTP status code
 * @param {Object|null} error - Error details
 * @param {String} errorType - Error type classification
 * @param {String} errorCode - Standard error code
 * @returns {Object} Formatted error response
 */
export const error = (
  res,
  messageKey = 'common.error',
  statusCode = 400,
  error = null,
  errorType = null,
  errorCode = null,
) => {
  const lang = res.locals.lang || 'en';
  const requestId = res.req?.requestId;

  // Check if a specific error code was provided or exists in the error object
  const code =
    errorCode || (error && error.code) || getDefaultErrorCode(statusCode);

  // Get error details from code if available
  const errorDetails = getErrorDetails(code);

  // Determine error type and status code
  const type =
    errorType ||
    (errorDetails && errorDetails.category) ||
    getDefaultErrorType(statusCode);
  const finalStatusCode =
    (errorDetails && errorDetails.statusCode) || statusCode;

  const response = {
    success: false,
    error: {
      message: t(messageKey, lang),
      type,
      code,
      statusCode: finalStatusCode,
    },
  };

  // Add requestId if available
  if (requestId) {
    response.error.requestId = requestId;
  }

  // Add error details in non-production environments
  if (process.env.NODE_ENV !== 'production' && error) {
    response.error.details = error.details || error;

    // Add stack trace for debugging
    if (error.stack) {
      response.error.stack = error.stack;
    }
  }

  return res.status(finalStatusCode).json(response);
};

/**
 * Create a standardized error object
 * @param {String} message - Error message
 * @param {Number} statusCode - HTTP status code
 * @param {String} type - Error type from ErrorTypes
 * @returns {Error} Formatted error object
 */
export const createError = (message, statusCode = 400, type = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.type = type || getDefaultErrorType(statusCode);
  error.code = getDefaultErrorCode(statusCode);
  return error;
};

/**
 * Get default error type based on status code
 * @param {Number} statusCode - HTTP status code
 * @returns {String} Error type from ErrorTypes
 * @private
 */
const getDefaultErrorType = (statusCode) => {
  if (statusCode >= 500) return ErrorTypes.INTERNAL;
  if (statusCode === 404) return ErrorTypes.NOT_FOUND;
  if (statusCode === 401) return ErrorTypes.AUTHENTICATION;
  if (statusCode === 403) return ErrorTypes.AUTHORIZATION;
  if (statusCode === 409) return ErrorTypes.CONFLICT;
  if (statusCode === 400) return ErrorTypes.VALIDATION;
  return ErrorTypes.INTERNAL;
};

/**
 * Get default error code based on status code
 * @param {Number} statusCode - HTTP status code
 * @returns {String} Error code
 * @private
 */
const getDefaultErrorCode = (statusCode) => {
  // Map status codes to default error codes
  switch (statusCode) {
    case 400:
      return 'EV001'; // Invalid input data
    case 401:
      return 'EA001'; // Authentication required
    case 403:
      return 'EAC001'; // Permission denied
    case 404:
      return 'ER001'; // Resource not found
    case 409:
      return 'ER002'; // Resource already exists
    case 500:
      return 'ES001'; // Internal server error
    case 502:
      return 'EE002'; // External API error
    case 503:
      return 'ES002'; // Service unavailable
    case 504:
      return 'ES003'; // Request timeout
    default:
      return 'ES001'; // Default to internal server error
  }
};

// Export from errorCodes.js for convenience
export { createErrorWithCode };
