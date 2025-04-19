const express = require('express');
const router = express.Router();
const {
  getAllTags,
  getTagById,
  getTagBySlug,
  createTag,
  updateTag,
  deleteTag
} = require('../controllers/tagController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// 获取所有标签
router.get('/', getAllTags);

// 通过slug获取标签
router.get('/slug/:slug', getTagBySlug);

// 通过ID获取标签
router.get('/:id', getTagById);

// 创建标签 (需要管理员权限)
router.post('/', protect, restrictTo('admin'), createTag);

// 更新标签 (需要管理员权限)
router.put('/:id', protect, restrictTo('admin'), updateTag);

// 删除标签 (需要管理员权限)
router.delete('/:id', protect, restrictTo('admin'), deleteTag);

module.exports = router;