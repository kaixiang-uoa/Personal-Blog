const Category = require('../models/Category');
const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');

/**
 * @desc    获取所有分类
 * @route   GET /api/categories
 * @access  Public
 */
exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  
  res.status(200).json({
    success: true,
    count: categories.length,
    categories
  });
});

/**
 * @desc    获取单个分类
 * @route   GET /api/categories/:id
 * @access  Public
 */
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  
  if (!category) {
    res.status(404);
    throw new Error('分类不存在');
  }
  
  res.status(200).json({
    success: true,
    category
  });
});

/**
 * @desc    通过slug获取分类
 * @route   GET /api/categories/slug/:slug
 * @access  Public
 */
exports.getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  
  if (!category) {
    res.status(404);
    throw new Error('分类不存在');
  }
  
  res.status(200).json({
    success: true,
    category
  });
});

/**
 * @desc    创建分类
 * @route   POST /api/categories
 * @access  Private/Admin
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description } = req.body;
  
  // 检查slug是否已存在
  const slugExists = await Category.findOne({ slug });
  if (slugExists) {
    res.status(400);
    throw new Error('该slug已被使用，请使用其他slug');
  }
  
  // 创建分类
  const category = await Category.create({
    name,
    slug,
    description
  });
  
  res.status(201).json({
    success: true,
    category
  });
});

/**
 * @desc    更新分类
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
exports.updateCategory = asyncHandler(async (req, res) => {
  let category = await Category.findById(req.params.id);
  
  if (!category) {
    res.status(404);
    throw new Error('分类不存在');
  }
  
  // 如果更新了slug，检查新slug是否已存在
  if (req.body.slug && req.body.slug !== category.slug) {
    const slugExists = await Category.findOne({ 
      slug: req.body.slug,
      _id: { $ne: req.params.id }
    });
    
    if (slugExists) {
      res.status(400);
      throw new Error('该slug已被使用，请使用其他slug');
    }
  }
  
  // 更新分类
  category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.status(200).json({
    success: true,
    category
  });
});

/**
 * @desc    删除分类
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  
  if (!category) {
    res.status(404);
    throw new Error('分类不存在');
  }
  
  // 检查是否有文章使用此分类
  const postCount = await Post.countDocuments({ categories: req.params.id });
  if (postCount > 0) {
    res.status(400);
    throw new Error(`无法删除此分类，有 ${postCount} 篇文章正在使用它`);
  }
  
  await category.deleteOne();
  
  res.status(200).json({
    success: true,
    message: '分类已删除'
  });
});