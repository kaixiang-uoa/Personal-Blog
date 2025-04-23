const express = require('express');
const router = express.Router();
const { login, getMe, register } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Login
router.post('/login', login);

// Get current user information
router.get('/me', protect, getMe);

// Register (Development environment only)
router.post('/register', register);

module.exports = router;