import Post from "../models/Post.js";
import { populatePostQuery } from "./populatePostQuery.js";

/**
 * Get a fully populated post by ID
 *
 * @param {string} id - Post ID
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Populated post
 */
export const getPopulatedPostById = async (id, options = {}) => {
  const query = Post.findById(id);
  return populatePostQuery(query, options);
};

/**
 * Get a fully populated post by slug
 *
 * @param {string} slug - Post slug
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Populated post
 */
export const getPopulatedPostBySlug = async (slug, options = {}) => {
  const query = Post.findOne({ slug });
  return populatePostQuery(query, options);
};

/**
 * Get related posts based on categories and tags
 *
 * @param {Object} post - Source post
 * @param {number} limit - Maximum number of related posts to return
 * @returns {Promise<Array>} List of related posts
 */
export const getRelatedPosts = async (post, limit = 3) => {
  if (!post) return [];

  // Extract IDs to compare against
  const categoryIds = post.categories?.map((cat) => cat._id || cat) || [];
  const tagIds = post.tags?.map((tag) => tag._id || tag) || [];
  const postId = post._id;

  // Build query to find posts with similar categories or tags
  const query = {
    _id: { $ne: postId }, // Exclude the current post
    status: "published",
    $or: [],
  };

  // Add category match condition if we have categories
  if (categoryIds.length > 0) {
    query.$or.push({ categories: { $in: categoryIds } });
  }

  // Add tag match condition if we have tags
  if (tagIds.length > 0) {
    query.$or.push({ tags: { $in: tagIds } });
  }

  // If no $or conditions, return empty array
  if (query.$or.length === 0) {
    return [];
  }

  // Find related posts
  return populatePostListQuery(
    Post.find(query).sort("-publishedAt").limit(limit),
  );
};
