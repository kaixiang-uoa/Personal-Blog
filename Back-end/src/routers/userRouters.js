const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateProfile
} = require('../controllers/userController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// 获取所有用户 (需要管理员权限)
router.get('/', protect, restrictTo('admin'), getAllUsers);

// 更新当前用户信息
router.put('/profile', protect, updateProfile);

// 获取单个用户 (需要管理员权限)
router.get('/:id', protect, restrictTo('admin'), getUserById);

// 创建用户 (需要管理员权限)
router.post('/', protect, restrictTo('admin'), createUser);

// 更新用户 (需要管理员权限)
router.put('/:id', protect, restrictTo('admin'), updateUser);

// 删除用户 (需要管理员权限)
router.delete('/:id', protect, restrictTo('admin'), deleteUser);

module.exports = router;