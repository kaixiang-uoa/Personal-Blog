const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// 获取所有分类
router.get('/', getAllCategories);

// 通过slug获取分类
router.get('/slug/:slug', getCategoryBySlug);

// 通过ID获取分类
router.get('/:id', getCategoryById);

// 创建分类 (需要管理员权限)
router.post('/', protect, restrictTo('admin'), createCategory);

// 更新分类 (需要管理员权限)
router.put('/:id', protect, restrictTo('admin'), updateCategory);

// 删除分类 (需要管理员权限)
router.delete('/:id', protect, restrictTo('admin'), deleteCategory);

module.exports = router;