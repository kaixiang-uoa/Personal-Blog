const Post = require('../models/Post');
const Tag = require('../models/Tag');
const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');
const { success, paginate, createError } = require('../utils/responseHandler');

/**
 * @desc    获取所有文章，支持标签、分类、搜索、日期等综合筛选
 * @route   GET /api/posts
 * @access  Public
 */
exports.getAllPosts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status = 'published',
    categorySlug,
    tagSlug,
    search,
    startDate,
    endDate
  } = req.query;

  const query = { status };

  // 分类筛选
  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug });
    if (category) query.categories = category._id;
  }

  // 标签筛选
  if (tagSlug) {
    const tag = await Tag.findOne({ slug: tagSlug });
    if (tag) query.tags = tag._id;
  }

  // 搜索关键词筛选
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } }
    ];
  }

  // 日期范围筛选
  if (startDate || endDate) {
    query.publishedAt = {};
    if (startDate) query.publishedAt.$gte = new Date(startDate);
    if (endDate) query.publishedAt.$lte = new Date(endDate);
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const posts = await Post.find(query)
    .populate('author', 'username displayName avatar')
    .populate('categories', 'name slug')
    .populate('tags', 'name slug')
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Post.countDocuments(query);
  return paginate(res, posts, page, limit, total);
});

/**
 * @desc    获取单篇文章
 * @route   GET /api/posts/:id
 * @access  Public
 */
exports.getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'username displayName avatar')
    .populate('categories', 'name slug')
    .populate('tags', 'name slug');

  if (!post) throw createError('文章不存在', 404);
  post.viewCount += 1;
  await post.save();
  return success(res, { post });
});

/**
 * @desc    通过slug获取文章
 * @route   GET /api/posts/slug/:slug
 * @access  Public
 */
exports.getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
    .populate('author', 'username displayName avatar')
    .populate('categories', 'name slug')
    .populate('tags', 'name slug');

  if (!post) throw createError('文章不存在', 404);
  post.viewCount += 1;
  await post.save();
  return success(res, { post });
});

/**
 * @desc    创建文章
 * @route   POST /api/posts
 * @access  Private/Admin
 */
exports.createPost = asyncHandler(async (req, res) => {
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
  if (slugExists) throw createError('该slug已被使用，请使用其他slug', 400);

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
 * @desc    更新文章
 * @route   PUT /api/posts/:id
 * @access  Private/Admin
 */
exports.updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);
  if (!post) throw createError('文章不存在', 404);

  if (req.body.slug && req.body.slug !== post.slug) {
    const slugExists = await Post.findOne({ slug: req.body.slug, _id: { $ne: req.params.id } });
    if (slugExists) throw createError('该slug已被使用，请使用其他slug', 400);
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
 * @desc    删除文章
 * @route   DELETE /api/posts/:id
 * @access  Private/Admin
 */
exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw createError('文章不存在', 404);
  await post.deleteOne();
  return success(res, { message: '文章已删除' });
});
