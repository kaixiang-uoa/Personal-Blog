import express from 'express';
import { 
  getCommentsByPost, 
  addComment, 
  deleteComment, 
  updateComment 
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 获取文章的所有评论
router.get('/post/:postId', getCommentsByPost);

// 添加评论 (需要登录)
router.post('/post/:postId', protect, addComment);

// 更新评论 (需要登录)
router.put('/:commentId', protect, updateComment);

// 删除评论 (需要登录)
router.delete('/:commentId', protect, deleteComment);

export default router;