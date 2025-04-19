const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// 获取所有文章
router.get('/', getAllPosts);

// 通过slug获取文章
router.get('/slug/:slug', getPostBySlug);

// 通过ID获取文章
router.get('/:id', getPostById);

// 创建文章 (需要管理员权限)
router.post('/', protect, restrictTo('admin'), createPost);

// 更新文章 (需要管理员权限)
router.put('/:id', protect, restrictTo('admin'), updatePost);

// 删除文章 (需要管理员权限)
router.delete('/:id', protect, restrictTo('admin'), deletePost);

module.exports = router;