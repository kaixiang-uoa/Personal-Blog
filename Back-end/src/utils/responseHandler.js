/**
 * Unified API response handling utility
 */

// Success response
exports.success = (res, data, statusCode = 200, message = 'Operation successful') => {
  return res.status(statusCode).json({
    success: true,
    data,
    message
  });
};

// Success response with pagination
exports.paginate = (res, data, page, limit, total, message = '成功获取数据列表') => {
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
exports.error = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    data: null,
    message
  });
};

// Create custom error
exports.createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};