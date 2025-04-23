const express = require('express');
const router = express.Router();
const {
  getAllSettings,
  getSettingById,
  updateSetting,
  createSetting
} = require('../controllers/settingController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Get all settings
router.get('/', protect, restrictTo('admin'), getAllSettings);

// Get a single setting
router.get('/:id', protect, restrictTo('admin'), getSettingById);

// Update a setting
router.put('/:id', protect, restrictTo('admin'), updateSetting);

// Create a setting
router.post('/', protect, restrictTo('admin'), createSetting);

module.exports = router;