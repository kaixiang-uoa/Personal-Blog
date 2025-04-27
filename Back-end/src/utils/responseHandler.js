import { t } from './i18n.js';

/**
 * 统一成功响应
 * @param {Object} res - Express响应对象
 * @param {Object} data - 响应数据
 * @param {Number} statusCode - HTTP状态码
 * @param {String} messageKey - 消息键
 * @returns {Object} 响应对象
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
 * 统一错误响应
 * @param {Object} res - Express响应对象
 * @param {String} messageKey - 消息键
 * @param {Number} statusCode - HTTP状态码
 * @param {Object} error - 错误对象
 * @returns {Object} 响应对象
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