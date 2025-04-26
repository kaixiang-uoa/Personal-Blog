import express from 'express';
const router = express.Router();
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  getAllMedia,
  getMediaById,
  deleteMedia
} from '../controllers/mediaController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import Media from '../models/Media.js';
import { success, createError } from '../utils/responseHandler.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Ensure upload directory exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, '../../uploads'); // 定义uploadDir变量
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accepted file types
  const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;

  // Check file type
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize upload
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit 5MB
});

// Upload media file
router.post('/', protect, restrictTo('admin'), upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError('Please select a file to upload', 400);
    }

    // Get file information
    const { filename, mimetype, size } = req.file;

    // Create media record
    const media = await Media.create({
      fileName: filename,
      url: `/uploads/${filename}`, // Relative URL
      type: mimetype,
      size: size,
      uploadedBy: req.user._id
    });

    return success(res, { media }, 201);
  } catch (error) {
    next(error);
  }
});

// Get all media
router.get('/', protect, restrictTo('admin'), getAllMedia);

// Get single media
router.get('/:id', protect, restrictTo('admin'), getMediaById);

// Delete media
router.delete('/:id', protect, restrictTo('admin'), deleteMedia);

export default router;