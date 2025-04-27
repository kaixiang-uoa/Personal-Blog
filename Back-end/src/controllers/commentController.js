import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { success, error } from '../utils/responseHandler.js';
import mongoose from 'mongoose';

// 获取文章的所有评论
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId, parentComment: null })
      .populate('user', 'username avatar')
      .populate({
        path: 'replies',
        populate: {
          path: 'user',
          select: 'username avatar'
        }
      })
      .sort({ createdAt: -1 });

    return success(res, comments, 200, 'comment.listSuccess');
  } catch (err) {
    return error(res, 'comment.listFailed', 500, err.message);
  }
};

// 添加评论
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;
    const userId = req.user.id;

    // 验证文章是否存在
    const post = await Post.findById(postId);
    if (!post) {
      return error(res, 'post.notFound', 404);
    }

    const commentData = {
      content,
      user: userId,
      post: postId,
    };

    // 如果是回复评论
    if (parentComment) {
      const parentCommentExists = await Comment.findById(parentComment);
      if (!parentCommentExists) {
        return error(res, 'comment.parentNotFound', 404);
      }
      commentData.parentComment = parentComment;
    }

    const comment = await Comment.create(commentData);

    // 如果是回复，将回复添加到父评论的replies数组中
    if (parentComment) {
      await Comment.findByIdAndUpdate(
        parentComment,
        { $push: { replies: comment._id } }
      );
    }

    // 增加文章评论计数
    await Post.findByIdAndUpdate(
      postId,
      { $inc: { commentCount: 1 } }
    );

    return success(res, comment, 201, 'comment.created');
  } catch (err) {
    return error(res, 'comment.createFailed', 500, err.message);
  }
};

// 删除评论
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return error(res, 'comment.notFound', 404);
    }

    // 检查是否是评论作者或管理员
    if (comment.user.toString() !== userId && req.user.role !== 'admin') {
      return error(res, 'comment.unauthorized', 403);
    }

    // 如果有回复，也删除所有回复
    if (comment.replies && comment.replies.length > 0) {
      await Comment.deleteMany({ _id: { $in: comment.replies } });
    }

    // 如果是回复，从父评论的replies数组中移除
    if (comment.parentComment) {
      await Comment.findByIdAndUpdate(
        comment.parentComment,
        { $pull: { replies: commentId } }
      );
    }

    // 减少文章评论计数
    await Post.findByIdAndUpdate(
      comment.post,
      { $inc: { commentCount: -1 } }
    );

    await Comment.findByIdAndDelete(commentId);
    return success(res, null, 200, 'comment.deleted');
  } catch (err) {
    return error(res, 'comment.deleteFailed', 500, err.message);
  }
};

// 更新评论
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return error(res, 'comment.notFound', 404);
    }
    
    // 检查是否是评论作者
    if (comment.user.toString() !== userId) {
      return error(res, 'comment.unauthorized', 403);
    }
    
    comment.content = content;
    comment.isEdited = true;
    await comment.save();
    
    return success(res, comment, 200, 'comment.updated');
  } catch (err) {
    return error(res, 'comment.updateFailed', 500, err.message);
  }
};