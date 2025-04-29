import express from 'express';
const router = express.Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateProfile
} from '../controllers/userController.js';
import {  protect, restrictTo  } from '../middleware/authMiddleware.js';

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

export default router;