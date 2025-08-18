import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import {
  getAllMedia,
  getMediaById,
  uploadMedia,
  deleteMedia,
  updateMedia,
} from "../controllers/mediaController.js";
import { createMulterFileFilter } from "../utils/mimeValidator.js";
import { generateFileName } from "../utils/fileNaming.js";
import { s3, bucketConfig } from "../config/s3.js";

// Configure multer based on environment
let upload;

if (process.env.NODE_ENV === "test" || !s3) {
  // Use memory storage for tests or when S3 is not available

  upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: createMulterFileFilter(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  });
} else {
  // Use S3 storage for production

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketConfig.bucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        try {
          const fileName = generateFileName({
            originalName: file.originalname,
            prefix: "media/",
            timestamp: true,
            randomString: true,
          });
          cb(null, fileName);
        } catch (error) {
          cb(error);
        }
      },
    }),
    fileFilter: createMulterFileFilter(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  });
}

// Add error handling middleware
const handleMulterError = (err, req, res, next) => {
  console.error("Multer error:", err);
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large",
        error: err.message,
      });
    }
    return res.status(400).json({
      success: false,
      message: "File upload error",
      error: err.message,
    });
  }

  // Handle S3 specific errors
  if (err.Code === "NoSuchBucket") {
    return res.status(500).json({
      success: false,
      message: "Storage configuration error",
      error: "The specified storage bucket does not exist",
    });
  }

  // Handle file size error
  if (err.message === "File size is required") {
    return res.status(400).json({
      success: false,
      message: "Invalid file",
      error: "File size information is missing",
    });
  }

  next(err);
};

const router = express.Router();

// get all media files
router.get("/", protect, getAllMedia);

// get single media file
router.get("/:id", protect, getMediaById);

// upload media file - Handles file upload to AWS S3 and creates media record in database
router.post(
  "/",
  protect,
  upload.array("files", 10),
  handleMulterError,
  uploadMedia
);

// update media file information
router.put("/:id", protect, updateMedia);

// delete media file (single or batch)
router.delete("/:id?", protect, restrictTo("admin", "editor"), deleteMedia);

export default router;
