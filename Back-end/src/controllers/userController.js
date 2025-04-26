import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import {  success, createError  } from '../utils/responseHandler.js';

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });

  return success(res, { 
    users,
    count: users.length 
  });
});

/**
 * @desc    Get a single user by ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    throw createError('User not found', 404);
  }

  return success(res, { user });
});

/**
 * @desc    Create a user
 * @route   POST /api/users
 * @access  Private/Admin
 */
export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, displayName, role } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    throw createError('User already exists', 400);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    displayName: displayName || username,
    role: role || 'user'
  });

  // Return user without password
  const createdUser = await User.findById(user._id).select('-password');
  
  return success(res, { user: createdUser }, 201, 'User created successfully');
});

/**
 * @desc    Update a user
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { username, email, password, displayName, role, bio, avatar } = req.body;
  
  // Find user
  let user = await User.findById(req.params.id);
  
  if (!user) {
    throw createError('用户不存在', 404);
  }
  
  // Check if email or username is already taken by another user
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw createError('该邮箱已被使用', 400);
    }
  }
  
  if (username && username !== user.username) {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      throw createError('该用户名已被使用', 400);
    }
  }
  
  // Update user fields
  user.username = username || user.username;
  user.email = email || user.email;
  user.displayName = displayName || user.displayName;
  user.role = role || user.role;
  user.bio = bio !== undefined ? bio : user.bio;
  user.avatar = avatar || user.avatar;
  
  // Update password if provided
  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }
  
  // Save updated user
  await user.save();
  
  // Return updated user without password
  const updatedUser = await User.findById(user._id).select('-password');
  
  return success(res, { user: updatedUser }, 200, '用户更新成功');
});

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw createError('用户不存在', 404);
  }
  
  // Delete user's posts or reassign them
  // await Post.deleteMany({ author: user._id });
  
  await user.remove();
  
  return success(res, null, 200, '用户删除成功');
});

/**
 * @desc    Update current user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { displayName, bio, avatar, currentPassword, newPassword } = req.body;
  
  // Get current user
  const user = await User.findById(req.user.id);
  
  if (!user) {
    throw createError('用户不存在', 404);
  }
  
  // Update basic profile fields
  user.displayName = displayName || user.displayName;
  user.bio = bio !== undefined ? bio : user.bio;
  user.avatar = avatar || user.avatar;
  
  // If user wants to change password
  if (currentPassword && newPassword) {
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      throw createError('当前密码不正确', 400);
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
  }
  
  // Save updated profile
  await user.save();
  
  // Return updated user without password
  const updatedUser = await User.findById(user._id).select('-password');
  
  return success(res, { user: updatedUser }, 200, '个人资料更新成功');
});