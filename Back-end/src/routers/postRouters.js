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

// Get all posts
router.get('/', getAllPosts);

// Get post by slug
router.get('/slug/:slug', getPostBySlug);

// Get post by ID
router.get('/:id', getPostById);

// Create post (requires admin privileges)
router.post('/', protect, restrictTo('admin'), createPost);

// Update post (requires admin privileges)
router.put('/:id', protect, restrictTo('admin'), updatePost);

// Delete post (requires admin privileges)
router.delete('/:id', protect, restrictTo('admin'), deletePost);

module.exports = router;