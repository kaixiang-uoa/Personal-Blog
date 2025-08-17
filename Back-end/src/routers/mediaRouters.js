import express from 'express';
import {
  getAllMedia,
  getMediaById,
  uploadMedia,
  updateMedia,
  deleteMedia,
} from '../controllers/mediaController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
// import { csrfProtection } from "../middleware/csrfMiddleware.js";
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import { s3Config } from '../config/s3.js';
import { createMulterFileFilter } from '../utils/mimeValidator.js';
import { generateFileName } from '../utils/fileNaming.js';

// Configure multer for S3 upload - This configuration handles file uploads directly to AWS S3
const upload = multer({
  storage: multerS3({
    s3: new S3Client({
      credentials: s3Config.credentials,
      region: s3Config.region,
    }),
    bucket: s3Config.bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      console.log('Processing file:', {
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer ? 'Buffer present' : 'No buffer',
      });

      try {
        // Generate standardized file name
        const fileName = generateFileName({
          originalName: file.originalname,
          prefix: s3Config.upload.fileNaming.prefix,
          timestamp: s3Config.upload.fileNaming.timestamp,
          randomString: s3Config.upload.fileNaming.randomString,
        });
        console.log('Generated file name:', fileName);
        cb(null, fileName);
      } catch (error) {
        console.error('Error generating file name:', error);
        cb(error);
      }
    },
  }),
  fileFilter: createMulterFileFilter(),
  limits: {
    fileSize: s3Config.upload.maxFileSize,
  },
});

// Add error handling middleware
const handleMulterError = (err, req, res, next) => {
  console.error('Multer error:', err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large',
        error: err.message,
      });
    }
    return res.status(400).json({
      success: false,
      message: 'File upload error',
      error: err.message,
    });
  }

  // Handle S3 specific errors
  if (err.Code === 'NoSuchBucket') {
    return res.status(500).json({
      success: false,
      message: 'Storage configuration error',
      error: 'The specified storage bucket does not exist',
    });
  }

  // Handle file size error
  if (err.message === 'File size is required') {
    return res.status(400).json({
      success: false,
      message: 'Invalid file',
      error: 'File size information is missing',
    });
  }

  next(err);
};

const router = express.Router();

// get all media files
router.get('/', protect, getAllMedia);

// get single media file
router.get('/:id', protect, getMediaById);

// upload media file - Handles file upload to AWS S3 and creates media record in database
router.post(
  '/',
  protect,
  upload.array('files', 10),
  handleMulterError,
  uploadMedia,
);

// update media file information
router.put('/:id', protect, updateMedia);

// delete media file (single or batch)
router.delete('/:id?', protect, restrictTo('admin', 'editor'), deleteMedia);

export default router;
