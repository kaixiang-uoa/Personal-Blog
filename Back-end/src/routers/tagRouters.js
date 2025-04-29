import express from 'express';
const router = express.Router();
import {
  getAllTags,
  getTagById,
  getTagBySlug,
  createTag,
  updateTag,
  deleteTag
} from '../controllers/tagController.js';
import {  protect, restrictTo  } from '../middleware/authMiddleware.js';

// Get all tags
router.get('/', getAllTags);
// Get tag by slug
router.get('/slug/:slug', getTagBySlug);

// Get tag by ID
router.get('/:id', getTagById);

// Create tag (requires admin privileges)
router.post('/', protect, restrictTo('admin'), createTag);

// Update tag (requires admin privileges)
router.put('/:id', protect, restrictTo('admin'), updateTag);

// Delete tag (requires admin privileges)
router.delete('/:id', protect, restrictTo('admin'), deleteTag);

export default router;