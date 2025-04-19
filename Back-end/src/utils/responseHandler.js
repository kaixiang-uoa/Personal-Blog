/**
 * 统一API响应处理工具
 */

// 成功响应
exports.success = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data
  });
};

// 带分页的成功响应
exports.paginate = (res, data, page, limit, total) => {
  return res.status(200).json({
    success: true,
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    totalPages: Math.ceil(total / parseInt(limit)),
    data
  });
};

// 错误响应
exports.error = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};

// 创建自定义错误
exports.createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};