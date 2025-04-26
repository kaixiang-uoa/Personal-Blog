import express from 'express';
const router = express.Router();
import {
  getAllSettings,
  getSettingById,
  updateSetting,
  createSetting
} from '../controllers/settingController.js';
import {  protect, restrictTo  } from '../middleware/authMiddleware.js';

// Get all settings
router.get('/', protect, restrictTo('admin'), getAllSettings);

// Get a single setting
router.get('/:id', protect, restrictTo('admin'), getSettingById);

// Update a setting
router.put('/:id', protect, restrictTo('admin'), updateSetting);

// Create a setting
router.post('/', protect, restrictTo('admin'), createSetting);

export default router;