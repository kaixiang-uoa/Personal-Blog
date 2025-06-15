import express from "express";
import {
  getAllMedia,
  getMediaById,
  uploadMedia,
  updateMedia,
  deleteMedia,
} from "../controllers/mediaController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { csrfProtection } from "../middleware/csrfMiddleware.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ensure upload directory exists
const uploadDir = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// file filter
const fileFilter = (req, file, cb) => {
  // allowed file types
  const allowedTypes =
    /jpeg|jpg|png|gif|webp|svg|pdf|doc|docx|xls|xlsx|ppt|pptx/;

  // check file extension
  const ext = path.extname(file.originalname).toLowerCase();
  const isAllowed = allowedTypes.test(ext);

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

// configure upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

const router = express.Router();

// get all media files
router.get("/", protect, getAllMedia);

// get single media file
router.get("/:id", protect, getMediaById);

// upload media file
router.post("/", protect, csrfProtection, upload.array("files", 10), uploadMedia);

// update media file information
router.put("/:id", protect, csrfProtection, updateMedia);

// delete media file (single or batch)
router.delete("/:id?", protect, csrfProtection, restrictTo("admin", "editor"), deleteMedia);

export default router;
