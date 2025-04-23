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

module.exports = router;