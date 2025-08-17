/**
 * standard error code system
 * define all possible error types and their related information
 */

// error categories
export const ErrorCategories = {
  VALIDATION: 'VALIDATION', // validation related errors
  AUTH: 'AUTHENTICATION', // authentication related errors
  ACCESS: 'AUTHORIZATION', // authorization related errors
  RESOURCE: 'RESOURCE', // resource related errors
  SYSTEM: 'SYSTEM', // system related errors
  DATA: 'DATA', // data related errors
  EXTERNAL: 'EXTERNAL', // external service related errors
};

/**
 * standard error code definition
 * format: E{category first letter}{3 digits}
 * examples:
 * - EV001: validateerror001
 * - EA001: authenticationerror001
 * - ER001: resourceerror001
 * - ES001: systemerror001
 * - ED001: dataerror001
 * - EE001: externalserviceerror001
 */
export const ErrorCodes = {
  // validateerror (EV***)
  EV001: {
    message: 'Invalid input data',
    category: ErrorCategories.VALIDATION,
    statusCode: 400,
  },
  EV002: {
    message: 'Required field missing',
    category: ErrorCategories.VALIDATION,
    statusCode: 400,
  },
  EV003: {
    message: 'Invalid format',
    category: ErrorCategories.VALIDATION,
    statusCode: 400,
  },
  EV004: {
    message: 'Validation failed',
    category: ErrorCategories.VALIDATION,
    statusCode: 400,
  },
  EV005: {
    message: 'Invalid query parameters',
    category: ErrorCategories.VALIDATION,
    statusCode: 400,
  },

  // authenticationerror (EA***)
  EA001: {
    message: 'Authentication required',
    category: ErrorCategories.AUTH,
    statusCode: 401,
  },
  EA002: {
    message: 'Invalid credentials',
    category: ErrorCategories.AUTH,
    statusCode: 401,
  },
  EA003: {
    message: 'Token expired',
    category: ErrorCategories.AUTH,
    statusCode: 401,
  },
  EA004: {
    message: 'Invalid token',
    category: ErrorCategories.AUTH,
    statusCode: 401,
  },
  EA005: {
    message: 'Account locked',
    category: ErrorCategories.AUTH,
    statusCode: 401,
  },

  // authorizationerror (EAC***)
  EAC001: {
    message: 'Permission denied',
    category: ErrorCategories.ACCESS,
    statusCode: 403,
  },
  EAC002: {
    message: 'Insufficient privileges',
    category: ErrorCategories.ACCESS,
    statusCode: 403,
  },
  EAC003: {
    message: 'Resource access forbidden',
    category: ErrorCategories.ACCESS,
    statusCode: 403,
  },

  // resource error (ER***)
  ER001: {
    message: 'Resource not found',
    category: ErrorCategories.RESOURCE,
    statusCode: 404,
  },
  ER002: {
    message: 'Resource already exists',
    category: ErrorCategories.RESOURCE,
    statusCode: 409,
  },
  ER003: {
    message: 'Resource deleted',
    category: ErrorCategories.RESOURCE,
    statusCode: 410,
  },
  ER004: {
    message: 'Resource temporarily unavailable',
    category: ErrorCategories.RESOURCE,
    statusCode: 503,
  },

  // system
  ES001: {
    message: 'Internal server error',
    category: ErrorCategories.SYSTEM,
    statusCode: 500,
  },
  ES002: {
    message: 'Service unavailable',
    category: ErrorCategories.SYSTEM,
    statusCode: 503,
  },
  ES003: {
    message: 'Request timeout',
    category: ErrorCategories.SYSTEM,
    statusCode: 504,
  },
  ES004: {
    message: 'Configuration error',
    category: ErrorCategories.SYSTEM,
    statusCode: 500,
  },

  // data error (ED***)
  ED001: {
    message: 'Database error',
    category: ErrorCategories.DATA,
    statusCode: 500,
  },
  ED002: {
    message: 'Data integrity error',
    category: ErrorCategories.DATA,
    statusCode: 409,
  },
  ED003: {
    message: 'Query execution failed',
    category: ErrorCategories.DATA,
    statusCode: 500,
  },
  ED004: {
    message: 'Transaction failed',
    category: ErrorCategories.DATA,
    statusCode: 500,
  },

  // external service error (EE***)
  EE001: {
    message: 'External service unavailable',
    category: ErrorCategories.EXTERNAL,
    statusCode: 503,
  },
  EE002: {
    message: 'External API error',
    category: ErrorCategories.EXTERNAL,
    statusCode: 502,
  },
};

/**
 * get error code details
 * @param {string} code - error code
 * @returns {Object|null} error code details, return null if not found
 */
export const getErrorDetails = (code) => {
  return ErrorCodes[code] || null;
};

/**
 * create error object with error code
 * @param {string} code - error code
 * @param {string} [message] - custom error message, use default message if not provided
 * @param {Object} [details] - additional error details
 * @returns {Error} standard error object
 */
export const createErrorWithCode = (code, message, details = {}) => {
  const errorInfo = ErrorCodes[code];

  if (!errorInfo) {
    throw new Error(`Unknown error code: ${code}`);
  }

  const error = new Error(message || errorInfo.message);
  error.code = code;
  error.statusCode = errorInfo.statusCode;
  error.category = errorInfo.category;
  error.details = details;

  return error;
};
