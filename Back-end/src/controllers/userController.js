const User = require('../models/User');
const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

/**
 * @desc    获取所有用户
 * @route   GET /api/users
 * @access  Private/Admin
 */
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: users.length,
    users
  });
});

/**
 * @desc    获取单个用户
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  
  if (!user) {
    res.status(404);
    throw new Error('用户不存在');
  }
  
  res.status(200).json({
    success: true,
    user
  });
});

/**
 * @desc    创建用户
 * @route   POST /api/users
 * @access  Private/Admin
 */
exports.createUser = asyncHandler(async (req, res) => {
  const { username, email, password, displayName, role } = req.body;
  
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
    password,
    displayName: displayName || username,
    role: role || 'user'
  });
  
  res.status(201).json({
    success: true,
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
 * @desc    更新用户
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
exports.updateUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('用户不存在');
  }
  
  // 如果更新了用户名或邮箱，检查是否已存在
  if ((req.body.username && req.body.username !== user.username) || 
      (req.body.email && req.body.email !== user.email)) {
    const userExists = await User.findOne({
      $or: [
        { username: req.body.username, _id: { $ne: req.params.id } },
        { email: req.body.email, _id: { $ne: req.params.id } }
      ]
    });
    
    if (userExists) {
      res.status(400);
      throw new Error('用户名或邮箱已被使用');
    }
  }
  
  // 如果更新了密码，需要加密
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  
  // 更新用户
  user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).select('-password');
  
  res.status(200).json({
    success: true,
    user
  });
});

/**
 * @desc    删除用户
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('用户不存在');
  }
  
  // 检查是否有文章由此用户发布
  const postCount = await Post.countDocuments({ author: req.params.id });
  if (postCount > 0) {
    res.status(400);
    throw new Error(`无法删除此用户，有 ${postCount} 篇文章由该用户发布`);
  }
  
  await user.deleteOne();
  
  res.status(200).json({
    success: true,
    message: '用户已删除'
  });
});

/**
 * @desc    更新当前用户信息
 * @route   PUT /api/users/profile
 * @access  Private
 */
exports.updateProfile = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id);
  
  // 不允许更新角色
  if (req.body.role) {
    delete req.body.role;
  }
  
  // 如果更新了用户名或邮箱，检查是否已存在
  if ((req.body.username && req.body.username !== user.username) || 
      (req.body.email && req.body.email !== user.email)) {
    const userExists = await User.findOne({
      $or: [
        { username: req.body.username, _id: { $ne: req.user.id } },
        { email: req.body.email, _id: { $ne: req.user.id } }
      ]
    });
    
    if (userExists) {
      res.status(400);
      throw new Error('用户名或邮箱已被使用');
    }
  }
  
  // 如果更新了密码，需要加密
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  
  // 更新用户
  user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true, runValidators: true }
  ).select('-password');
  
  res.status(200).json({
    success: true,
    user
  });
});