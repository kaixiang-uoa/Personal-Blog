import express from "express";
const router = express.Router();
import {
  login,
  getMe,
  register,
  logout,
  refreshToken,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

// Login
router.post("/login", login);

// Get current user information
router.get("/me", protect, getMe);

// Register (Development environment only)
router.post("/register", register);

// Logout
router.post("/logout", protect, logout);

// Refresh token
router.post("/refresh", refreshToken);

export default router;
