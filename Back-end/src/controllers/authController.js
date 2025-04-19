const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * @desc    用户登录
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // 验证请求
  if (!email || !password) {
    res.status(400);
    throw new Error('请提供邮箱和密码');
  }
  
  // 查找用户
  const user = await User.findOne({ email });
  
  // 验证用户和密码
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('邮箱或密码不正确');
  }
  
  // 更新最后登录时间
  user.lastLogin = Date.now();
  await user.save();
  
  // 生成JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
  
  res.status(200).json({
    success: true,
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      avatar: user.avatar
    }
  });
});

/**
 * @desc    获取当前用户信息
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  
  res.status(200).json({
    success: true,
    user
  });
});

/**
 * @desc    注册用户 (仅在开发环境可用)
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res) => {
  // 仅在开发环境允许注册
  if (process.env.NODE_ENV === 'production') {
    res.status(403);
    throw new Error('注册功能在生产环境不可用');
  }
  
  const { username, email, password, displayName } = req.body;
  
  // 验证请求
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('请提供用户名、邮箱和密码');
  }
  
  // 检查用户是否已存在
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    res.status(400);
    throw new Error('用户已存在');
  }
  
  // 创建用户
  const user = await User.create({
    username,
    email,
    password, // 密码会在模型中自动哈希
    displayName: displayName || username,
    role: 'user' // 默认角色
  });
  
  // 生成JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
  
  res.status(201).json({
    success: true,
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      role: user.role
    }
  });
});