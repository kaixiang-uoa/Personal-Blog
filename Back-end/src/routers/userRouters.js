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

// Get all users (requires admin privileges)
router.get('/', protect, restrictTo('admin'), getAllUsers);

// Update current user information
router.put('/profile', protect, updateProfile);

// Get single user (requires admin privileges)
router.get('/:id', protect, restrictTo('admin'), getUserById);

// Create user (requires admin privileges)
router.post('/', protect, restrictTo('admin'), createUser);

// Update user (requires admin privileges)
router.put('/:id', protect, restrictTo('admin'), updateUser);

// Delete user (requires admin privileges)
router.delete('/:id', protect, restrictTo('admin'), deleteUser);

module.exports = router;