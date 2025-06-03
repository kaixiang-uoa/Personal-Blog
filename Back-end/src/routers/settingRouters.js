import express from 'express';
import { 
    getAllSettings, 
    getSettingByKey, 
    updateSetting, 
    updateSettings, 
    deleteSetting,
    getSettingHistory,
    getSettingVersions,
    rollbackSetting
} from '../controllers/settingController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// get all settings
router.get('/', getAllSettings);

// get single setting
router.get('/:key', getSettingByKey);

// routes that require admin privileges
router.put('/:key', protect, restrictTo('admin'), updateSetting);
router.post('/', protect, restrictTo('admin'), updateSetting);
router.post('/batch', protect, restrictTo('admin'), updateSettings);
router.delete('/:key', protect, restrictTo('admin'), deleteSetting);

// setting history related routes
router.get('/history/all', protect, restrictTo('admin'), getSettingHistory);
router.get('/history/:key', protect, restrictTo('admin'), getSettingHistory);
router.get('/versions/:key', protect, restrictTo('admin'), getSettingVersions);
router.post('/rollback/:historyId', protect, restrictTo('admin'), rollbackSetting);

export default router;