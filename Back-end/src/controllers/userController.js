import User from '../models/User.js';
import { success, error } from '../utils/responseHandler.js';
import bcrypt from 'bcryptjs';

// 获取所有用户
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
      select: '-password'
    };
    
    const users = await User.find()
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .sort(options.sort)
      .select(options.select);
      
    const total = await User.countDocuments();
    
    return success(res, {
      users,
      pagination: {
        total,
        page: options.page,
        limit: options.limit,
        pages: Math.ceil(total / options.limit)
      }
    }, 200, 'user.listSuccess');
  } catch (err) {
    return error(res, 'user.listFailed', 500, err.message);
  }
};

// 获取单个用户
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return error(res, 'user.notFound', 404);
    }
    
    return success(res, user, 200);
  } catch (err) {
    return error(res, 'user.getFailed', 500, err.message);
  }
};

// 创建用户 (管理员功能)
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    // 检查用户是否已存在
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (userExists) {
      return error(res, userExists.email === email ? 'user.emailExists' : 'user.usernameExists', 400);
    }
    
    // 创建用户
    const user = await User.create({
      username,
      email,
      password,
      role: role || 'user'
    });
    
    return success(res, {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }, 201, 'user.created');
  } catch (err) {
    return error(res, 'user.createFailed', 500, err.message);
  }
};

// 更新用户 (管理员功能)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, isActive } = req.body;
    
    const user = await User.findById(id);
    
    if (!user) {
      return error(res, 'user.notFound', 404);
    }
    
    // 更新字段
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;
    
    await user.save();
    
    return success(res, {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    }, 200, 'user.updated');
  } catch (err) {
    return error(res, 'user.updateFailed', 500, err.message);
  }
};

// 删除用户
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    
    if (!user) {
      return error(res, 'user.notFound', 404);
    }
    
    // 不允许删除自己
    if (user._id.toString() === req.user.id) {
      return error(res, 'user.cannotDeleteSelf', 400);
    }
    
    await User.findByIdAndDelete(id);
    
    return success(res, null, 200, 'user.deleted');
  } catch (err) {
    return error(res, 'user.deleteFailed', 500, err.message);
  }
};

// 更新个人资料
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email, currentPassword, newPassword, bio, avatar } = req.body;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return error(res, 'user.notFound', 404);
    }
    
    // 如果要更新密码，验证当前密码
    if (newPassword && currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      
      if (!isMatch) {
        return error(res, 'user.passwordIncorrect', 400);
      }
      
      user.password = newPassword;
    }
    
    // 更新其他字段
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;
    
    await user.save();
    
    return success(res, {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      avatar: user.avatar
    }, 200, 'user.profileUpdated');
  } catch (err) {
    return error(res, 'user.updateProfileFailed', 500, err.message);
  }
};