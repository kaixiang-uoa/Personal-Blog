const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { 
  getAllMedia, 
  getMediaById, 
  deleteMedia 
} = require('../controllers/mediaController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const Media = require('../models/Media');
const { success, createError } = require('../utils/responseHandler');

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../../uploads');
if (!require('fs').existsSync(uploadDir)) {
  require('fs').mkdirSync(uploadDir, { recursive: true });
}

// 配置存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // 生成唯一文件名
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 接受的文件类型
  const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
  
  // 检查文件类型
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('只允许上传图片文件!'), false);
  }
};

// 初始化上传
const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 限制5MB
});

// 上传媒体文件
router.post('/', protect, restrictTo('admin'), upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError('请选择要上传的文件', 400);
    }
    
    // 获取文件信息
    const { filename, mimetype, size } = req.file;
    
    // 创建媒体记录
    const media = await Media.create({
      fileName: filename,
      url: `/uploads/${filename}`, // 相对URL
      type: mimetype,
      size: size,
      uploadedBy: req.user._id
    });
    
    return success(res, { media }, 201);
  } catch (error) {
    next(error);
  }
});

// 获取所有媒体
router.get('/', protect, restrictTo('admin'), getAllMedia);

// 获取单个媒体
router.get('/:id', protect, restrictTo('admin'), getMediaById);

// 删除媒体
router.delete('/:id', protect, restrictTo('admin'), deleteMedia);

module.exports = router;