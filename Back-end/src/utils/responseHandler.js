/**
 * Unified API response handling utility
 */

// Success response
export const success = (res, data, statusCode = 200, message = 'Operation successful') => {
  return res.status(statusCode).json({
    success: true,
    data,
    message
  });
};

// Success response with pagination
export const paginate = (res, data, page, limit, total, message = '成功获取数据列表') => {
  const currentPage = parseInt(page);
  const totalPages = Math.ceil(total / parseInt(limit));
  return res.status(200).json({
    success: true,
    data: {
      posts: data,
      total,
      totalPages,
      currentPage
    },
    message
  });
};

// Error response
export const error = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    data: null,
    message
  });
};

// Create custom error
export const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};