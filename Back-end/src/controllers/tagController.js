const Tag = require('../models/Tag');
const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');

/**
 * @desc    获取所有标签
 * @route   GET /api/tags
 * @access  Public
 */
exports.getAllTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find().sort({ name: 1 });
  
  res.status(200).json({
    success: true,
    count: tags.length,
    tags
  });
});

/**
 * @desc    获取单个标签
 * @route   GET /api/tags/:id
 * @access  Public
 */
exports.getTagById = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id);
  
  if (!tag) {
    res.status(404);
    throw new Error('标签不存在');
  }
  
  res.status(200).json({
    success: true,
    tag
  });
});

/**
 * @desc    通过slug获取标签
 * @route   GET /api/tags/slug/:slug
 * @access  Public
 */
exports.getTagBySlug = asyncHandler(async (req, res) => {
  const tag = await Tag.findOne({ slug: req.params.slug });
  
  if (!tag) {
    res.status(404);
    throw new Error('标签不存在');
  }
  
  res.status(200).json({
    success: true,
    tag
  });
});

/**
 * @desc    创建标签
 * @route   POST /api/tags
 * @access  Private/Admin
 */
exports.createTag = asyncHandler(async (req, res) => {
  const { name, slug, description } = req.body;
  
  // 检查slug是否已存在
  const slugExists = await Tag.findOne({ slug });
  if (slugExists) {
    res.status(400);
    throw new Error('该slug已被使用，请使用其他slug');
  }
  
  // 创建标签
  const tag = await Tag.create({
    name,
    slug,
    description
  });
  
  res.status(201).json({
    success: true,
    tag
  });
});

/**
 * @desc    更新标签
 * @route   PUT /api/tags/:id
 * @access  Private/Admin
 */
exports.updateTag = asyncHandler(async (req, res) => {
  let tag = await Tag.findById(req.params.id);
  
  if (!tag) {
    res.status(404);
    throw new Error('标签不存在');
  }
  
  // 如果更新了slug，检查新slug是否已存在
  if (req.body.slug && req.body.slug !== tag.slug) {
    const slugExists = await Tag.findOne({ 
      slug: req.body.slug,
      _id: { $ne: req.params.id }
    });
    
    if (slugExists) {
      res.status(400);
      throw new Error('该slug已被使用，请使用其他slug');
    }
  }
  
  // 更新标签
  tag = await Tag.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.status(200).json({
    success: true,
    tag
  });
});

/**
 * @desc    删除标签
 * @route   DELETE /api/tags/:id
 * @access  Private/Admin
 */
exports.deleteTag = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id);
  
  if (!tag) {
    res.status(404);
    throw new Error('标签不存在');
  }
  
  // 检查是否有文章使用此标签
  const postCount = await Post.countDocuments({ tags: req.params.id });
  if (postCount > 0) {
    res.status(400);
    throw new Error(`无法删除此标签，有 ${postCount} 篇文章正在使用它`);
  }
  
  await tag.deleteOne();
  
  res.status(200).json({
    success: true,
    message: '标签已删除'
  });
});