import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import Category from "../models/Category.js";
import asyncHandler from "express-async-handler";
import { success, createError } from "../utils/responseHandler.js";
import { populatePostListQuery } from "../utils/populatePostQuery.js";
import {
  getPopulatedPostById,
  getPopulatedPostBySlug,
} from "../utils/populateUtils.js";
import { transformLocalizedCategories } from "../utils/transformLocalizedCategories.js";
import { transformLocalizedTags } from "../utils/transformLocalizedTags.js";

/**
 * @desc    Get all posts, supports filtering by tags, categories, search, date, etc.
 * @route   GET /api/posts
 * @access  Public
 */
export const getAllPosts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status = "published",
    allStatus = false,
    categorySlug,
    tagSlug,
    search,
    sort: sortKey = "publishedAt-desc",
    lang,
  } = req.query;

  const query = allStatus === "true" ? {} : { status };

  // Category filter
  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug });
    if (category) query.categories = category._id;
  }

  // Tag filter
  if (tagSlug) {
    const tagSlugs = tagSlug
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const tags = await Tag.find({ slug: { $in: tagSlugs } });
    if (tags && tags.length > 0) {
      query.tags = { $in: tags.map((t) => t._id) };
    }
  }

  // Search keyword filter
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
    ];
  }

  const sortOptions = {
    "publishedAt-desc": "-publishedAt",
    "publishedAt-asc": "publishedAt",
    "updatedAt-desc": "-updatedAt",
    "updatedAt-asc": "updatedAt",
    latest: "-publishedAt",
    oldest: "publishedAt",
    popular: "-viewCount",
  };

  const sort = sortOptions[sortKey] || "-publishedAt";
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Use optimized list query that excludes content for better performance
  const posts = await populatePostListQuery(
    Post.find(query).sort(sort).skip(skip).limit(parseInt(limit)),
  );

  // Execute count in parallel with post query for better performance
  const total = await Post.countDocuments(query);

  const transformedPosts = posts.map((post) => {
    // Check if post is already a plain object (from lean query)
    const transformedPost =
      typeof post.toObject === "function" ? post.toObject() : post;

    if (transformedPost.categories && transformedPost.categories.length > 0) {
      transformedPost.categories = transformLocalizedCategories(
        transformedPost.categories,
        lang,
      );
    }

    if (transformedPost.tags && transformedPost.tags.length > 0) {
      transformedPost.tags = transformLocalizedTags(transformedPost.tags, lang);
    }
    return transformedPost;
  });

  const result = {
    posts: transformedPosts,
    total,
    totalPages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
  };

  return success(res, result);
});

/**
 * @desc    Get a single post by ID
 * @route   GET /api/posts/:id
 * @access  Public
 */
export const getPostById = asyncHandler(async (req, res) => {
  const lang = req.query.lang || "en";
  const postId = req.params.id;

  const post = await getPopulatedPostById(postId);

  if (!post) throw createError("Post not found", 404);

  // idempotent check - use client IP and timestamp combination as idempotent key
  const clientIp = req.ip || req.socket.remoteAddress;
  const viewKey = `${post._id}:${clientIp}`;
  const viewTimestamps = req.app.locals.viewTimestamps || {};

  const now = Date.now();
  const lastView = viewTimestamps[viewKey] || 0;

  // if the same IP visits the same article within 5 seconds, do not count it again
  if (now - lastView > 5000) {
    post.viewCount += 1;
    await post.save();

    // update timestampe timestamp
    viewTimestamps[viewKey] = now;
    req.app.locals.viewTimestamps = viewTimestamps;

    // automatically clean up records older than 30 minutes
    const thirtyMinutes = 30 * 60 * 1000;
    Object.keys(viewTimestamps).forEach((key) => {
      if (now - viewTimestamps[key] > thirtyMinutes) {
        delete viewTimestamps[key];
      }
    });
  }

  const transformedPost =
    typeof post.toObject === "function" ? post.toObject() : post;
  if (transformedPost.categories && transformedPost.categories.length > 0) {
    transformedPost.categories = transformLocalizedCategories(
      transformedPost.categories,
      lang,
    );
  }

  if (transformedPost.tags && transformedPost.tags.length > 0) {
    transformedPost.tags = transformLocalizedTags(transformedPost.tags, lang);
  }

  const result = { post: transformedPost };

  return success(res, result);
});

/**
 * @desc    Get a post by slug
 * @route   GET /api/posts/slug/:slug
 * @access  Public
 */
export const getPostBySlug = asyncHandler(async (req, res) => {
  const lang = req.query.lang || "en";
  const slug = req.params.slug;

  const post = await getPopulatedPostBySlug(slug);
  if (!post) throw createError("Post not found", 404);

  // idempotent check - use client IP and timestamp combination as idempotent key
  const clientIp = req.ip || req.socket.remoteAddress;
  const viewKey = `${post._id}:${clientIp}`;
  const viewTimestamps = req.app.locals.viewTimestamps || {};

  const now = Date.now();
  const lastView = viewTimestamps[viewKey] || 0;

  // if the same IP visits the same article within 5 seconds, do not count it again
  if (now - lastView > 5000) {
    post.viewCount += 1;
    await post.save();

    // update timestamp
    viewTimestamps[viewKey] = now;
    req.app.locals.viewTimestamps = viewTimestamps;

    // automatically clean up records older than 30 minutes
    const thirtyMinutes = 30 * 60 * 1000;
    Object.keys(viewTimestamps).forEach((key) => {
      if (now - viewTimestamps[key] > thirtyMinutes) {
        delete viewTimestamps[key];
      }
    });
  }

  const transformedPost =
    typeof post.toObject === "function" ? post.toObject() : post;
  if (transformedPost.categories && transformedPost.categories.length > 0) {
    transformedPost.categories = transformLocalizedCategories(
      transformedPost.categories,
      lang,
    );
  }

  if (transformedPost.tags && transformedPost.tags.length > 0) {
    transformedPost.tags = transformLocalizedTags(transformedPost.tags, lang);
  }

  const result = { post: transformedPost };

  return success(res, result);
});

/**
 * @desc    Check if a slug is available
 * @param   {string} slug - The slug to check
 * @param   {string} [excludeId] - Optional post ID to exclude from check
 * @returns {Promise<boolean>} - True if slug is available
 */
const isSlugAvailable = async (slug, excludeId = null) => {
  const query = { slug };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  const existingPost = await Post.findOne(query);
  return !existingPost;
};

/**
 * @desc    Generate a unique slug
 * @param   {string} baseSlug - The base slug to use
 * @param   {string} [excludeId] - Optional post ID to exclude from check
 * @returns {Promise<string>} - A unique slug
 */
const generateUniqueSlug = async (baseSlug, excludeId = null) => {
  let slug = baseSlug;
  let counter = 1;

  while (!(await isSlugAvailable(slug, excludeId))) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

/**
 * @desc    Create a post
 * @route   POST /api/posts
 * @access  Private/Admin
 */
export const createPost = asyncHandler(async (req, res) => {
  const {
    title,
    slug: providedSlug,
    excerpt,
    content,
    categories,
    tags,
    status,
    featuredImage,
    seo,
  } = req.body;

  // If it's a draft and has no title, use a temporary title
  const postTitle = title || "";

  // process slug
  let slug = "";
  if (providedSlug) {
    // If slug is provided, ensure it's unique
    slug = await generateUniqueSlug(providedSlug);
  } else if (postTitle) {
    // If there's a title but no slug, generate from title
    const baseSlug = postTitle
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, "-");
    slug = await generateUniqueSlug(baseSlug);
  } else if (status === "published") {
    // If it's published status but has no title and slug, generate a temporary slug
    const timestamp = Date.now();
    slug = await generateUniqueSlug(`post-${timestamp}`);
  } else {
    // In draft mode, if there's no title and slug, generate a temporary slug
    const timestamp = Date.now();
    slug = `draft-${timestamp}`;
  }

  // createpost
  const post = await Post.create({
    title: postTitle,
    slug,
    excerpt: excerpt || "",
    content: content || "",
    author: req.user._id,
    categories: categories || [],
    tags: tags || [],
    status: status || "draft",
    featuredImage: featuredImage || "",
    seo: seo || {},
    publishedAt: status === "published" ? Date.now() : null,
  });

  const populatedPost = await getPopulatedPostById(post._id);
  return success(res, { post: populatedPost }, 201);
});

/**
 * @desc    Update a post
 * @route   PUT /api/posts/:id
 * @access  Private/Admin
 */
export const updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);
  if (!post) throw createError("Post not found", 404);

  const { status, title, content, slug: providedSlug } = req.body;

  // Check if status is changing from draft to published
  if (status === "published" && post.status !== "published") {
    // Validate required fields when publishing
    if (!title) throw createError("Title is required for published posts", 400);
    if (!content)
      throw createError("Content is required for published posts", 400);

    // Set publish time
    req.body.publishedAt = Date.now();
  }

  // process slug
  if (providedSlug && providedSlug !== post.slug) {
    const slugExists = await Post.findOne({
      slug: providedSlug,
      _id: { $ne: req.params.id },
    });
    if (slugExists)
      throw createError(
        "This slug is already in use, please use another slug",
        400,
      );
  } else if (status === "published" && !post.slug && !providedSlug) {
    // If it's published status but has no slug, generate from title
    if (title) {
      const baseSlug = title.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-");
      req.body.slug = await generateUniqueSlug(baseSlug, req.params.id);
    } else {
      // If there's no title, use timestamp to generate slug
      const timestamp = Date.now();
      req.body.slug = await generateUniqueSlug(
        `post-${timestamp}`,
        req.params.id,
      );
    }
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  const populatedPost = await getPopulatedPostById(post._id);
  return success(res, { post: populatedPost });
});

/**
 * @desc    Delete a post
 * @route   DELETE /api/posts/:id
 * @access  Private/Admin
 */
export const deletePost = asyncHandler(async (req, res) => {
  const post = await getPopulatedPostById(req.params.id);
  if (!post) throw createError("Post not found", 404);

  // only delete post, not categories and tags
  await post.deleteOne();

  return success(res, { message: "Post deleted successfully" });
});
