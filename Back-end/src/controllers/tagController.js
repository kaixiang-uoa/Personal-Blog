const Tag = require('../models/Tag');
const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');
const { success, createError } = require('../utils/responseHandler');

/**
 * @desc    Get all tags
 * @route   GET /api/tags
 * @access  Public
 */
exports.getAllTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find().sort({ name: 1 });

  return success(res, { 
    tags,
    count: tags.length 
  });
});

/**
 * @desc    Get a single tag by ID
 * @route   GET /api/tags/:id
 * @access  Public
 */
exports.getTagById = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    throw createError('Tag not found', 404);
  }

  return success(res, { tag });
});

/**
 * @desc    Get a tag by slug
 * @route   GET /api/tags/slug/:slug
 * @access  Public
 */
exports.getTagBySlug = asyncHandler(async (req, res) => {
  const tag = await Tag.findOne({ slug: req.params.slug });

  if (!tag) {
    throw createError('Tag not found', 404);
  }

  return success(res, { tag });
});

/**
 * @desc    Create a tag
 * @route   POST /api/tags
 * @access  Private/Admin
 */
exports.createTag = asyncHandler(async (req, res) => {
  const { name, slug, description } = req.body;

  // Check if slug already exists
  const slugExists = await Tag.findOne({ slug });
  if (slugExists) {
    throw createError('This slug is already in use, please use another one', 400);
  }

  // Create tag
  const tag = await Tag.create({
    name,
    slug,
    description
  });

  return success(res, { tag }, 201, 'Tag created successfully');
});

/**
 * @desc    Update a tag
 * @route   PUT /api/tags/:id
 * @access  Private/Admin
 */
exports.updateTag = asyncHandler(async (req, res) => {
  const { name, slug, description } = req.body;
  
  // Find tag
  let tag = await Tag.findById(req.params.id);
  
  if (!tag) {
    throw createError('标签不存在', 404);
  }
  
  // Check if slug is already taken by another tag
  if (slug && slug !== tag.slug) {
    const slugExists = await Tag.findOne({ slug });
    if (slugExists) {
      throw createError('该别名已被使用，请使用其他别名', 400);
    }
  }
  
  // Update tag fields
  tag.name = name || tag.name;
  tag.slug = slug || tag.slug;
  tag.description = description !== undefined ? description : tag.description;
  
  // Save updated tag
  await tag.save();
  
  return success(res, { tag }, 200, '标签更新成功');
});

/**
 * @desc    Delete a tag
 * @route   DELETE /api/tags/:id
 * @access  Private/Admin
 */
exports.deleteTag = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id);
  
  if (!tag) {
    throw createError('标签不存在', 404);
  }
  
  // Remove tag from posts
  await Post.updateMany(
    { tags: tag._id },
    { $pull: { tags: tag._id } }
  );
  
  await tag.remove();
  
  return success(res, null, 200, '标签删除成功');
});