const express = require('express');
const router = express.Router();
const { login, getMe, register } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// 登录
router.post('/login', login);

// 获取当前用户信息
router.get('/me', protect, getMe);

// 注册 (仅开发环境)
router.post('/register', register);

module.exports = router;