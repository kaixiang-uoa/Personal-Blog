import express from 'express';
const router = express.Router();
import {
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

// Get all categories
router.get('/', getAllCategories);

// Get category by slug
router.get('/slug/:slug', getCategoryBySlug);

// Get category by ID
router.get('/:id', getCategoryById);

// Create category (requires admin privileges)
router.post('/', protect, restrictTo('admin'), createCategory);

// Update category (requires admin privileges)
router.put('/:id', protect, restrictTo('admin'), updateCategory);

// Delete category (requires admin privileges)
router.delete('/:id', protect, restrictTo('admin'), deleteCategory);

export default router;
