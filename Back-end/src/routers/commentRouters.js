import express from 'express';
import {
  getCommentsByPost,
  addComment,
  deleteComment,
  updateComment,
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// get all comments of a post
router.get('/post/:postId', getCommentsByPost);

// add comment (need login)
router.post('/post/:postId', protect, addComment);

// update comment (need login)
router.put('/:commentId', protect, updateComment);

// delete comment (need login)
router.delete('/:commentId', protect, deleteComment);

export default router;
