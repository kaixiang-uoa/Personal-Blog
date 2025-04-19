// 错误处理中间件
exports.errorHandler = (err, req, res, next) => {
  // 获取状态码，默认为500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

// 404错误处理
exports.notFound = (req, res, next) => {
  const error = new Error(`找不到 - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};