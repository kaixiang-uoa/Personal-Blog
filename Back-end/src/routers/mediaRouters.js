const express = require('express');
const router = express.Router();

// 临时路由，返回一个简单的消息
router.get('/', (req, res) => {
    res.json({ message: '媒体API正在开发中' });
});

module.exports = router;