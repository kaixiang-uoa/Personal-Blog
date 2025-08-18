import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { success, error } from '../utils/responseHandler.js';

// get all comments of a post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId, parentComment: null })
      .populate('user', 'username avatar')
      .populate({
        path: 'replies',
        populate: {
          path: 'user',
          select: 'username avatar',
        },
      })
      .sort({ createdAt: -1 });

    return success(res, comments, 200, 'comment.listSuccess');
  } catch (err) {
    return error(res, 'comment.listFailed', 500, err.message);
  }
};

// add comment
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;
    const userId = req.user.id;

    // check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return error(res, 'post.notFound', 404);
    }

    const commentData = {
      content,
      user: userId,
      post: postId,
    };

    // if it is a reply comment
    if (parentComment) {
      const parentCommentExists = await Comment.findById(parentComment);
      if (!parentCommentExists) {
        return error(res, 'comment.parentNotFound', 404);
      }
      commentData.parentComment = parentComment;
    }

    const comment = await Comment.create(commentData);

    // if it is a reply, add reply to parent comment's replies array
    if (parentComment) {
      await Comment.findByIdAndUpdate(parentComment, {
        $push: { replies: comment._id },
      });
    }

    // increase post comment count
    await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

    return success(res, comment, 201, 'comment.created');
  } catch (err) {
    return error(res, 'comment.createFailed', 500, err.message);
  }
};

// delete comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return error(res, 'comment.notFound', 404);
    }

    // check if it is comment author or admin
    if (comment.user.toString() !== userId && req.user.role !== 'admin') {
      return error(res, 'comment.unauthorized', 403);
    }

    // if there are replies, also delete all replies
    if (comment.replies && comment.replies.length > 0) {
      await Comment.deleteMany({ _id: { $in: comment.replies } });
    }

    // if it is a reply, remove it from parent comment's replies array
    if (comment.parentComment) {
      await Comment.findByIdAndUpdate(comment.parentComment, {
        $pull: { replies: commentId },
      });
    }

    // decrease post comment count
    await Post.findByIdAndUpdate(comment.post, { $inc: { commentCount: -1 } });

    await Comment.findByIdAndDelete(commentId);
    return success(res, null, 200, 'comment.deleted');
  } catch (err) {
    return error(res, 'comment.deleteFailed', 500, err.message);
  }
};

// update comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return error(res, 'comment.notFound', 404);
    }

    // check if it is comment author
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
