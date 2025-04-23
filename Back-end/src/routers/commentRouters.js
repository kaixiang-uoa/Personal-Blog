const express = require('express');
const router = express.Router();

// Temporary route, returns a simple message
router.get('/', (req, res) => {
    res.json({ message: 'Comment API is under development' });
});

module.exports = router;