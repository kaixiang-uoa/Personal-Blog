/**
 * Error handling middleware
 * Standardizes error responses across the application
 */

import {
  ErrorCategories,
  getErrorDetails,
  createErrorWithCode,
} from "../utils/errorCodes.js";

// Error types for better classification and handling (keep
export const ErrorTypes = {
  VALIDATION: "VALIDATION_ERROR",
  AUTHENTICATION: "AUTHENTICATION_ERROR",
  AUTHORIZATION: "AUTHORIZATION_ERROR",
  NOT_FOUND: "NOT_FOUND_ERROR",
  CONFLICT: "CONFLICT_ERROR",
  INTERNAL: "INTERNAL_ERROR",
  DATABASE: "DATABASE_ERROR",
  EXTERNAL_SERVICE: "EXTERNAL_SERVICE_ERROR",
};

// mapping of error types to error categories
const typeToCategory = {
  [ErrorTypes.VALIDATION]: ErrorCategories.VALIDATION,
  [ErrorTypes.AUTHENTICATION]: ErrorCategories.AUTH,
  [ErrorTypes.AUTHORIZATION]: ErrorCategories.ACCESS,
  [ErrorTypes.NOT_FOUND]: ErrorCategories.RESOURCE,
  [ErrorTypes.CONFLICT]: ErrorCategories.RESOURCE,
  [ErrorTypes.INTERNAL]: ErrorCategories.SYSTEM,
  [ErrorTypes.DATABASE]: ErrorCategories.DATA,
  [ErrorTypes.EXTERNAL_SERVICE]: ErrorCategories.EXTERNAL,
};

/**
 * Creates a standardized error object with type classification
 *
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {string} type - Error type from ErrorTypes
 * @returns {Error} Formatted error object
 */
export const createError = (
  message,
  statusCode = 500,
  type = ErrorTypes.INTERNAL
) => {
  const errorCode = getDefaultErrorCode(statusCode, type);
  const error = new Error(message);
  error.statusCode = statusCode;
  error.type = type;
  error.code = errorCode;
  return error;
};

/**
 * Main error handler middleware
 * Formats error responses consistently
 */
export const errorHandler = (err, req, res, _next) => {
  const errorCode = err.code || getDefaultErrorCode(err.statusCode, err.type);

  const errorDetails = getErrorDetails(errorCode);

  const statusCode =
    err.statusCode ||
    (errorDetails && errorDetails.statusCode) ||
    (res.statusCode === 200 ? 500 : res.statusCode);

  const errorType =
    err.type ||
    (errorDetails && errorDetails.category) ||
    getDefaultErrorType(statusCode);

  // Create error response
  const errorResponse = {
    success: false,
    error: {
      message:
        err.message ||
        (errorDetails && errorDetails.message) ||
        "Something went wrong",
      type: errorType,
      requestId: req.requestId,
      code: errorCode,
      statusCode: statusCode,
    },
  };

  // Include additional details if provided
  if (err.details) {
    errorResponse.error.details = err.details;
  }

  // Include stack trace in development mode
  if (process.env.NODE_ENV !== "production") {
    errorResponse.error.stack = err.stack;
  }

  // Set HTTP status and send response
  res.status(statusCode).json(errorResponse);
};

/**
 * 404 error handler middleware
 * Creates standardized not found errors
 */
export const notFound = (req, res, next) => {
  // use standard error code to create error
  const error = createErrorWithCode(
    "ER001", // Resource not found
    `Not Found - ${req.originalUrl}`,
    { path: req.originalUrl }
  );
  next(error);
};

/**
 * Get default error type based on status code
 *
 * @param {number} statusCode - HTTP status code
 * @returns {string} Error type
 */
const getDefaultErrorType = statusCode => {
  if (statusCode >= 500) return ErrorTypes.INTERNAL;
  if (statusCode === 404) return ErrorTypes.NOT_FOUND;
  if (statusCode === 401) return ErrorTypes.AUTHENTICATION;
  if (statusCode === 403) return ErrorTypes.AUTHORIZATION;
  if (statusCode === 409) return ErrorTypes.CONFLICT;
  if (statusCode === 400) return ErrorTypes.VALIDATION;
  return ErrorTypes.INTERNAL;
};

/**
 * Get default error code based on status code and type
 *
 * @param {number} statusCode - HTTP status code
 * @param {string} type - Error type
 * @returns {string} Error code
 */
const getDefaultErrorCode = (statusCode, type) => {
  // try to map error type to error category first
  if (type && typeToCategory[type]) {
    const category = typeToCategory[type];

    // get default error code based on category and status code
    switch (category) {
      case ErrorCategories.VALIDATION:
        return "EV001"; // default validation error
      case ErrorCategories.AUTH:
        return "EA001"; // default authentication error
      case ErrorCategories.ACCESS:
        return "EAC001"; // default authorization error
      case ErrorCategories.RESOURCE:
        return statusCode === 404 ? "ER001" : "ER002"; // resource not found or conflict
      case ErrorCategories.SYSTEM:
        return "ES001"; // default system error
      case ErrorCategories.DATA:
        return "ED001"; // default data error
      case ErrorCategories.EXTERNAL:
        return "EE001"; // default external service error
    }
  }

  // if cannot map to category, map to error code based on status code
  switch (statusCode) {
    case 400:
      return "EV001"; // input validation error
    case 401:
      return "EA001"; // authentication error
    case 403:
      return "EAC001"; // authorization error
    case 404:
      return "ER001"; // resource not found
    case 409:
      return "ER002"; // resource conflict
    case 500:
      return "ES001"; // internal server error
    case 502:
      return "EE002"; // external API error
    case 503:
      return "ES002"; // service unavailable
    case 504:
      return "ES003"; // request timeout
    default:
      // default to internal error
      return "ES001";
  }
};
