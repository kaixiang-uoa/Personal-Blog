import Post from '../models/Post.js';
import Tag from '../models/Tag.js';
import Category from '../models/Category.js';
import asyncHandler from 'express-async-handler';
import { success, createError } from '../utils/responseHandler.js';

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
    categorySlug,
    tagSlug,
    search,
    sort: sortKey = 'publishedAt-desc', // 默认按发布时间降序排序
    lang = 'zh',
  } = req.query;

  const query = { status };

  // Category filter
  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug });
    if (category) query.categories = category._id;
  }

  // Tag filter
  if (tagSlug) {
    const tag = await Tag.findOne({ slug: tagSlug });
    if (tag) query.tags = tag._id;
  }

  // Search keyword filter
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } }
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

  const posts = await Post.find(query)
    .populate('author', 'username displayName avatar')
    .populate('categories', 'name name_en name_zh slug')
    .populate('tags', 'name slug')
    .sort(sort) // 使用传入的排序参数
    .skip(skip)
    .limit(parseInt(limit));
  const total = await Post.countDocuments(query);
 
  // Transform posts to include localized category names
  const transformedPosts = posts.map(post => {
    const transformedPost = post.toObject();
    
    // Transform categories
    if (transformedPost.categories && transformedPost.categories.length > 0) {
      transformedPost.categories = transformedPost.categories.map(category => {
        const transformedCategory = {...category};
        
        // Replace name with language-specific version
        if (lang === 'en' && transformedCategory.name_en) {
          transformedCategory.name = transformedCategory.name_en;
        } else if (lang === 'zh' && transformedCategory.name_zh) {
          transformedCategory.name = transformedCategory.name_zh;
        }
        
        return transformedCategory;
      });
    }
    
    return transformedPost;
  });
 
  return success(res, {
    posts: transformedPosts,
    total: total,
    totalPages: Math.ceil(total / parseInt(limit)),
    currentPage: parseInt(page)
  });
});

/**
 * @desc    Get a single post by ID
 * @route   GET /api/posts/:id
 * @access  Public
 */
export const getPostById = asyncHandler(async (req, res) => {
  const lang = req.query.lang || 'zh'; // Add language parameter
  
  const post = await Post.findById(req.params.id)
    .populate('author', 'username displayName avatar')
    .populate('categories', 'name name_en name_zh slug')
    .populate('tags', 'name slug');

  if (!post) throw createError('Post not found', 404);
  post.viewCount += 1;
  await post.save();
  
  // Transform post to include localized category names
  const transformedPost = post.toObject();
  
  // Transform categories
  if (transformedPost.categories && transformedPost.categories.length > 0) {
    transformedPost.categories = transformedPost.categories.map(category => {
      const transformedCategory = {...category};
      
      // Replace name with language-specific version
      if (lang === 'en' && transformedCategory.name_en) {
        transformedCategory.name = transformedCategory.name_en;
      } else if (lang === 'zh' && transformedCategory.name_zh) {
        transformedCategory.name = transformedCategory.name_zh;
      }
      
      return transformedCategory;
    });
  }
  
  return success(res, { post: transformedPost });
});

/**
 * @desc    Get a post by slug
 * @route   GET /api/posts/slug/:slug
 * @access  Public
 */
export const getPostBySlug = asyncHandler(async (req, res) => {
  const lang = req.query.lang || 'zh'; // Add language parameter
  
  const post = await Post.findOne({ slug: req.params.slug })
    .populate('author', 'username displayName avatar')
    .populate('categories', 'name name_en name_zh slug')
    .populate('tags', 'name slug');

  if (!post) throw createError('Post not found', 404);
  post.viewCount += 1;
  await post.save();
  
  // Transform post to include localized category names
  const transformedPost = post.toObject();
  
  // Transform categories
  if (transformedPost.categories && transformedPost.categories.length > 0) {
    transformedPost.categories = transformedPost.categories.map(category => {
      const transformedCategory = {...category};
      
      // Replace name with language-specific version
      if (lang === 'en' && transformedCategory.name_en) {
        transformedCategory.name = transformedCategory.name_en;
      } else if (lang === 'zh' && transformedCategory.name_zh) {
        transformedCategory.name = transformedCategory.name_zh;
      }
      
      return transformedCategory;
    });
  }
  
  return success(res, { post: transformedPost });
});

/**
 * @desc    Create a post
 * @route   POST /api/posts
 * @access  Private/Admin
 */
export const createPost = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    excerpt,
    content,
    categories,
    tags,
    status,
    featuredImage,
    seo
  } = req.body;

  const slugExists = await Post.findOne({ slug });
  if (slugExists) throw createError('This slug is already in use, please use another slug', 400);

  const post = await Post.create({
    title,
    slug,
    excerpt,
    content,
    author: req.user._id,
    categories,
    tags,
    status: status || 'draft',
    featuredImage,
    seo,
    publishedAt: status === 'published' ? Date.now() : null
  });

  return success(res, { post }, 201);
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
  return success(res, { post });
});

/**
 * @desc    Delete a post
 * @route   DELETE /api/posts/:id
 * @access  Private/Admin
 */
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw createError('Post not found', 404);
  await post.deleteOne();
  return success(res, { message: 'Post deleted successfully' });
});
