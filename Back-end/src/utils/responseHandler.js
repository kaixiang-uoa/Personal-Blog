import { t } from './i18n.js';

/**
 * unified success response
 * @param {Object} res - Express response object
 * @param {Object} data - response data
 * @param {Number} statusCode - HTTP status code
 * @param {String} messageKey - message key
 * @returns {Object} response object
 */
export const success = (res, data = null, statusCode = 200, messageKey = 'common.success') => {
  const lang = res.locals.lang || 'en';
  return res.status(statusCode).json({
    success: true,
    message: t(messageKey, lang),
    data
  });
};

/**
 * unified error response
 * @param {Object} res - Express response object
 * @param {String} messageKey - message key
 * @param {Number} statusCode - HTTP status code
 * @param {Object} error - error object
 * @returns {Object} response object
 */
export const error = (res, messageKey = 'common.error', statusCode = 400, error = null) => {
  const lang = res.locals.lang || 'en';
  return res.status(statusCode).json({
    success: false,
    message: t(messageKey, lang),
    error: process.env.NODE_ENV === 'production' ? null : error
  });
};

// Create custom error
export const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};