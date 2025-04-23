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

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!require('fs').existsSync(uploadDir)) {
  require('fs').mkdirSync(uploadDir, { recursive: true });
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

module.exports = router;