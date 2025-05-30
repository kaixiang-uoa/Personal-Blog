import Post from '../models/Post.js';
import Tag from '../models/Tag.js';
import Category from '../models/Category.js';
import asyncHandler from 'express-async-handler';
import { success, createError } from '../utils/responseHandler.js';
import { populatePostQuery } from '../utils/populatePostQuery.js';
import { getPopulatedPostById, getPopulatedPostBySlug } from '../utils/populateUtils.js';
import { transformLocalizedCategories } from '../utils/transformLocalizedCategories.js';
import { transformLocalizedTags } from '../utils/transformLocalizedTags.js';

/**
 * @desc    Get all posts, supports filtering by tags, categories, search, date, etc.
 * @route   GET /api/posts
 * @access  Public
 */
export const getAllPosts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status = 'published',
    allStatus = false,
    categorySlug,
    tagSlug,
    search,
    sort: sortKey = 'publishedAt-desc',
    lang,
  } = req.query;
  
  const query = allStatus === 'true' ? {} : { status };

  // Category filter
  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug });
    if (category) query.categories = category._id;
  }

  // Tag filter
  if (tagSlug) {
    const tagSlugs = tagSlug.split(',').map(s => s.trim()).filter(Boolean); 
    const tags = await Tag.findOne({ slug:  { $in: tagSlugs } });
    if (tags.length > 0) {
      query.tags = { $in: tags.map(t => t._id) };
    }
  }

  // Search keyword filter
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ];
  }

  const sortOptions = {
    'publishedAt-desc': '-publishedAt',
    'publishedAt-asc': 'publishedAt',
    'updatedAt-desc': '-updatedAt',
    'updatedAt-asc': 'updatedAt',
  };

  const sort = sortOptions[sortKey] || '-publishedAt';
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const posts = await populatePostQuery(
    Post.find(query).sort(sort).skip(skip).limit(parseInt(limit))
  );

  const total = await Post.countDocuments(query);

  const transformedPosts = posts.map(post => {
    const transformedPost = post.toObject();

    if (transformedPost.categories && transformedPost.categories.length > 0) {
      transformedPost.categories = transformLocalizedCategories(transformedPost.categories, lang);
    }

    if (transformedPost.tags && transformedPost.tags.length > 0) {
      transformedPost.tags = transformLocalizedTags(transformedPost.tags, lang);
    }
    return transformedPost;
  });

  return success(res, {
    posts: transformedPosts,
    total,
    totalPages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page),
  });
});

/**
 * @desc    Get a single post by ID
 * @route   GET /api/posts/:id
 * @access  Public
 */
export const getPostById = asyncHandler(async (req, res) => {
  const lang = req.query.lang || 'zh';
  console.log('post', req.params.id);

  const post = await getPopulatedPostById(req.params.id);
 
  if (!post) throw createError('Post not found', 404);
  post.viewCount += 1;
  await post.save();

  const transformedPost = post.toObject();
  if (transformedPost.categories && transformedPost.categories.length > 0) {
    transformedPost.categories = transformLocalizedCategories(transformedPost.categories, lang);
  }

  if (transformedPost.tags && transformedPost.tags.length > 0) {
    transformedPost.tags = transformLocalizedTags(transformedPost.tags, lang);
  }

  return success(res, { post: transformedPost });
});

/**
 * @desc    Get a post by slug
 * @route   GET /api/posts/slug/:slug
 * @access  Public
 */
export const getPostBySlug = asyncHandler(async (req, res) => {
  const lang = req.query.lang || 'zh';
  const post = await getPopulatedPostBySlug(req.params.slug);
  if (!post) throw createError('Post not found', 404);
  post.viewCount += 1;
  await post.save();

  const transformedPost = post.toObject();
  if (transformedPost.categories && transformedPost.categories.length > 0) {
    transformedPost.categories = transformLocalizedCategories(transformedPost.categories, lang);
  }

  if (transformedPost.tags && transformedPost.tags.length > 0) {
    transformedPost.tags = transformLocalizedTags(transformedPost.tags, lang);
  }
  return success(res, { post: transformedPost });
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

  // 生成唯一的 slug
  let baseSlug = providedSlug;
  if (!baseSlug) {
    baseSlug = title.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
  }

  // 确保 slug 唯一
  const slug = await generateUniqueSlug(baseSlug);

  // 处理标签
  let tagIds = [];
  if (tags && tags.length > 0) {
    const tagPromises = tags.map(async (tagName) => {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = await Tag.create({
          name: tagName,
          slug: tagName.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-'),
        });
      }
      return tag._id;
    });
    tagIds = await Promise.all(tagPromises);
  }

  const post = await Post.create({
    title,
    slug,
    excerpt,
    content,
    author: req.user._id,
    categories,
    tags: tagIds,
    status: status || 'draft',
    featuredImage,
    seo,
    publishedAt: status === 'published' ? Date.now() : null,
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
  if (!post) throw createError('Post not found', 404);

  if (req.body.slug && req.body.slug !== post.slug) {
    const slugExists = await Post.findOne({ slug: req.body.slug, _id: { $ne: req.params.id } });
    if (slugExists) throw createError('This slug is already in use, please use another slug', 400);
  }

  if (req.body.status === 'published' && post.status !== 'published') {
    req.body.publishedAt = Date.now();
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
  if (!post) throw createError('Post not found', 404);

  // 只删除文章本身，不动分类和标签
  await post.deleteOne();

  return success(res, { message: 'Post deleted successfully' });
});
