const express = require('express');
const router = express.Router();
const {
  getAllSettings,
  getSettingById,
  updateSetting,
  createSetting
} = require('../controllers/settingController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// 获取所有设置
router.get('/', protect, restrictTo('admin'), getAllSettings);

// 获取单个设置
router.get('/:id', protect, restrictTo('admin'), getSettingById);

// 更新设置
router.put('/:id', protect, restrictTo('admin'), updateSetting);

// 创建设置
router.post('/', protect, restrictTo('admin'), createSetting);

module.exports = router;