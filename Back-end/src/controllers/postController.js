const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');
const { success, paginate, createError } = require('../utils/responseHandler');

/**
 * @desc    获取所有文章
 * @route   GET /api/posts
 * @access  Public
 */
exports.getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status = 'published', category, tag, search } = req.query;
  
  // 构建查询条件
  const query = { status };
  
  // 如果指定了分类
  if (category) {
    query.categories = category;
  }
  
  // 如果指定了标签
  if (tag) {
    query.tags = tag;
  }
  
  // 如果有搜索关键词
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } }
    ];
  }
  
  // 计算分页
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  // 查询文章并填充作者、分类和标签信息
  const posts = await Post.find(query)
    .populate('author', 'username displayName avatar')
    .populate('categories', 'name slug')
    .populate('tags', 'name slug')
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
  
  // 获取总文章数
  const total = await Post.countDocuments(query);
  
  // 使用统一分页响应
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
  
  if (!post) {
    throw createError('文章不存在', 404);
  }
  
  // 增加浏览次数
  post.viewCount += 1;
  await post.save();
  
  // 使用统一成功响应
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
  
  if (!post) {
    throw createError('文章不存在', 404);
  }
  
  // 增加浏览次数
  post.viewCount += 1;
  await post.save();
  
  // 使用统一成功响应
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
  
  // 检查slug是否已存在
  const slugExists = await Post.findOne({ slug });
  if (slugExists) {
    throw createError('该slug已被使用，请使用其他slug', 400);
  }
  
  // 创建文章
  const post = await Post.create({
    title,
    slug,
    excerpt,
    content,
    author: req.user._id, // 从认证中间件获取
    categories,
    tags,
    status: status || 'draft',
    featuredImage,
    seo,
    publishedAt: status === 'published' ? Date.now() : null
  });
  
  // 使用统一成功响应
  return success(res, { post }, 201);
});

/**
 * @desc    更新文章
 * @route   PUT /api/posts/:id
 * @access  Private/Admin
 */
exports.updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);
  
  if (!post) {
    throw createError('文章不存在', 404);
  }
  
  // 如果更新了slug，检查新slug是否已存在
  if (req.body.slug && req.body.slug !== post.slug) {
    const slugExists = await Post.findOne({ 
      slug: req.body.slug,
      _id: { $ne: req.params.id }
    });
    
    if (slugExists) {
      throw createError('该slug已被使用，请使用其他slug', 400);
    }
  }
  
  // 如果状态从非发布变为发布，设置发布时间
  if (req.body.status === 'published' && post.status !== 'published') {
    req.body.publishedAt = Date.now();
  }
  
  // 更新文章
  post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  // 使用统一成功响应
  return success(res, { post });
});

/**
 * @desc    删除文章
 * @route   DELETE /api/posts/:id
 * @access  Private/Admin
 */
exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    throw createError('文章不存在', 404);
  }
  
  await post.deleteOne();
  
  // 使用统一成功响应
  return success(res, { message: '文章已删除' });
});