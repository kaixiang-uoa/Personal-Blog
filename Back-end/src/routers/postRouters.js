import express from 'express';
const router = express.Router();
import {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import {  protect, restrictTo  } from '../middleware/authMiddleware.js';

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

export default router;