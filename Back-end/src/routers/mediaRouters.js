import express from 'express';
import { 
    getAllMedia, 
    getMediaById, 
    uploadMedia, 
    updateMedia, 
    deleteMedia 
} from '../controllers/mediaController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 确保上传目录存在
const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置Multer存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
    // 允许的文件类型
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg|pdf|doc|docx|xls|xlsx|ppt|pptx/;
    
    // 检查文件扩展名
    const ext = path.extname(file.originalname).toLowerCase();
    const isAllowed = allowedTypes.test(ext);
    
    if (isAllowed) {
        cb(null, true);
    } else {
        cb(new Error('不支持的文件类型'), false);
    }
};

// 配置上传中间件
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
});

const router = express.Router();

// 获取所有媒体文件
router.get('/', protect, getAllMedia);

// 获取单个媒体文件
router.get('/:id', protect, getMediaById);

// 上传媒体文件
router.post('/', protect, upload.array('files', 10), uploadMedia);

// 更新媒体文件信息
router.put('/:id', protect, updateMedia);

// 删除媒体文件（单个或批量）
router.delete('/:id?', protect, restrictTo('admin', 'editor'), deleteMedia);

export default router;