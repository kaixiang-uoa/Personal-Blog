import express from 'express';
const router = express.Router();

// Temporary route, returns a simple message
router.get('/', (req, res) => {
    res.json({ message: 'Comment API is under development' });
});

export default router;