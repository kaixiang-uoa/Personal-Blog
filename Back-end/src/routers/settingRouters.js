import express from 'express';
import { 
    getAllSettings, 
    getSettingByKey, 
    updateSetting, 
    updateSettings, 
    deleteSetting 
} from '../controllers/settingController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// 获取所有设置
router.get('/', getAllSettings);

// 获取单个设置
router.get('/:key', getSettingByKey);

// 需要管理员权限的路由
router.put('/:key', protect, restrictTo('admin'), updateSetting);
router.post('/', protect, restrictTo('admin'), updateSetting);
router.post('/batch', protect, restrictTo('admin'), updateSettings);
router.delete('/:key', protect, restrictTo('admin'), deleteSetting);

export default router;