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

module.exports = router;