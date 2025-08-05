/**
 * securitymiddleware
 *
 * provide enhanced security measures, including HTTP security headers and other security features
 */

import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';

// Rate limit configurations from environment variables
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes default
const RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '1000'); // 1000 requests default
const SENSITIVE_RATE_LIMIT_WINDOW_MS = parseInt(process.env.SENSITIVE_RATE_LIMIT_WINDOW_MS || '3600000'); // 1 hour default
const SENSITIVE_RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.SENSITIVE_RATE_LIMIT_MAX_REQUESTS || '50'); // 50 attempts default
const CONTACT_RATE_LIMIT_WINDOW_MS = parseInt(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || '3600000'); // 1 hour default
const CONTACT_RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.CONTACT_RATE_LIMIT_MAX_REQUESTS || '20'); // 20 attempts default

/**
 * configure enhanced security headers
 *
 * @returns {Function} configure strict security headers with Helmet middleware
 */
export const configureSecureHeaders = () => {
  return helmet({
    // prevent clickjacking
    frameguard: {
      action: 'deny',
    },

    // content security policy, prevent XSS attacks
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // allow inline scripts, adjust as needed
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'http:', 'https:', 'data:', 'blob:'],
        mediaSrc: ["'self'", 'http:', 'https:', 'data:', 'blob:'],
        connectSrc: ["'self'", 'https:'],
        fontSrc: ["'self'", 'https:', 'data:'],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"], // prevent any site from embedding iframe
      },
    },

    // disable resource policy, allow CORS resource access (necessary for public images, etc.)
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },

    // enable DNS prefetch control
    dnsPrefetchControl: {
      allow: false,
    },

    // enable HTTPS strict transport security
    hsts: {
      maxAge: 15552000, // 180 days
      includeSubDomains: true,
      preload: true,
    },

    // disable MIME sniffing
    noSniff: true,

    // strict-origin-when-cross-origin referrer policy
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin',
    },

    // prevent XSS attacks
    xssFilter: true,
  });
};

/**
 * API request limit middleware
 *
 * @param {Object} options - limit options
 * @returns {Function} rate limit middleware
 */
export const apiLimiter = (options = {}) => {
  const defaultOptions = {
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: true, // return standard RateLimit headers
    legacyHeaders: false, // disable X-RateLimit headers
    message: {
      success: false,
      message: 'Request too frequent, please try again later',
      error: 'Request frequency exceeds limit',
    },
  };

  return rateLimit({
    ...defaultOptions,
    ...options,
  });
};

/**
 * sensitive API limit middleware - for login, register, etc. security sensitive operations
 *
 * @returns {Function} rate limit middleware for sensitive operations
 */
export const sensitiveApiLimiter = () => {
  return apiLimiter({
    windowMs: SENSITIVE_RATE_LIMIT_WINDOW_MS,
    max: SENSITIVE_RATE_LIMIT_MAX_REQUESTS,
    message: {
      success: false,
      message: 'Attempts too frequent, please try again later',
      error: 'Operation frequency exceeds security limit',
    },
  });
};

/**
 * Contact form rate limiter
 *
 * @returns {Function} rate limit middleware for contact form
 */
export const contactLimiter = () => {
  return rateLimit({
    windowMs: CONTACT_RATE_LIMIT_WINDOW_MS,
    max: CONTACT_RATE_LIMIT_MAX_REQUESTS,
    message: {
      success: false,
      message: 'Too many contact form submissions. Please try again later.',
      error: 'Contact form submission limit exceeded',
    },
  });
};

/**
 * add unique request ID middleware
 *
 * @returns {Function} add request ID middleware
 */
export const addRequestId = () => {
  return (req, res, next) => {
    // if request has ID, use existing ID, otherwise generate new ID
    req.id = req.headers['x-request-id'] || uuidv4();

    // add ID to response headers
    res.setHeader('X-Request-ID', req.id);

    next();
  };
};

/**
 * settings HTTP strict transport security (HSTS)
 *
 * @returns {Function} settingsHSTS middleware
 */
export const setHSTS = () => {
  return (req, res, next) => {
    // only settingsHSTS on HTTPS connections
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload',
      );
    }
    next();
  };
};

/**
 * sanitize user input - remove potential dangerous characters and patterns
 *
 * @param {Object} data - data object to be cleaned
 * @returns {Object} cleaned data
 */
export const sanitizeInput = (data) => {
  // if input is not an object, return directly
  if (!data || typeof data !== 'object') {
    return data;
  }

  const sanitized = {};

  // iterate over all properties of the object
  Object.keys(data).forEach((key) => {
    let value = data[key];

    // recursively process nested objects
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeInput(value);
    }
    // process array
    else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'object' ? sanitizeInput(item) : sanitizeString(item),
      );
    }
    // process string
    else if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    }
    // other types are copied directly
    else {
      sanitized[key] = value;
    }
  });

  return sanitized;
};

/**
 * sanitize string - remove potential XSS and injection patterns
 *
 * @param {String} str - input string
 * @returns {String} cleaned string
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;

  // remove possible script tags
  let sanitized = str.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    '',
  );

  // remove possible dangerous HTML attributes
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '');
  sanitized = sanitized.replace(/on\w+='[^']*'/gi, '');

  return sanitized;
};

/**
 * input sanitization middleware - clean request body
 *
 * @returns {Function} clean request body middleware
 */
export const sanitizeInputMiddleware = () => {
  return (req, res, next) => {
    if (req.body) {
      req.body = sanitizeInput(req.body);
    }

    if (req.query) {
      req.query = sanitizeInput(req.query);
    }

    if (req.params) {
      req.params = sanitizeInput(req.params);
    }

    next();
  };
};
