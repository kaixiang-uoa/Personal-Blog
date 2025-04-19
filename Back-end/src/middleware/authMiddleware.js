const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// 保护路由 - 验证用户是否已登录
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // 从请求头获取token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  // 检查token是否存在
  if (!token) {
    res.status(401);
    throw new Error('未授权，请登录');
  }
  
  try {
    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 获取用户信息
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      res.status(401);
      throw new Error('用户不存在');
    }
    
    next();
  } catch (error) {
    res.status(401);
    throw new Error('未授权，token无效');
  }
});

// 限制角色访问
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error('您没有权限执行此操作');
    }
    next();
  };
};