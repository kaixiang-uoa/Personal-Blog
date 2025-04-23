const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { success, createError } = require('../utils/responseHandler');

/**
 * @desc    User login
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    throw createError('Please provide email and password', 400);
  }

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password is correct
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError('邮箱或密码不正确', 401);
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );

  // Return user data without password
  const userData = {
    _id: user._id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    avatar: user.avatar,
    bio: user.bio
  };

  return success(res, { 
    user: userData,
    token 
  }, 200, '登录成功');
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    throw createError('用户不存在', 404);
  }

  return success(res, { user });
});

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, displayName } = req.body;

  // Validate request
  if (!username || !email || !password) {
    throw createError('请提供用户名、邮箱和密码', 400);
  }

  // Check if user already exists
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    throw createError('用户已存在', 400);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    displayName: displayName || username
  });

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );

  // Return user data without password
  const userData = {
    _id: user._id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    avatar: user.avatar,
    bio: user.bio
  };

  return success(res, { 
    user: userData,
    token 
  }, 201, '注册成功');
});