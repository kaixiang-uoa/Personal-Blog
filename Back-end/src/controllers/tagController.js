import Tag from '../models/Tag.js';
import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';
import { success, createError } from '../utils/responseHandler.js';
import { transformLocalizedTags } from '../utils/transformLocalizedTags.js';

/**
 * @desc    Get all tags
 * @route   GET /api/tags
 * @access  Public
 */
export const getAllTags = asyncHandler(async (req, res) => {
  let lang = 'en';
  if (req.query.lang) {
    lang = Array.isArray(req.query.lang) ? req.query.lang[0] : req.query.lang;
  }
  const fullLang = req.query.fullLang === 'true';
  const tags = await Tag.find().sort({ name: 1 });
  if (fullLang) {
    return success(res, {
      tags: tags.map((tag) => ({
        _id: tag._id,
        name: tag.name,
        name_en: tag.name_en,
        name_zh: tag.name_zh,
        slug: tag.slug,
        description: tag.description,
        description_en: tag.description_en,
        description_zh: tag.description_zh,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
        __v: tag.__v,
      })),
      count: tags.length,
    });
  }
  const transformedTags = transformLocalizedTags(tags, lang);
  return success(res, {
    tags: transformedTags,
    count: tags.length,
  });
});

/**
 * @desc    Get a single tag by ID
 * @route   GET /api/tags/:id
 * @access  Public
 */
export const getTagById = asyncHandler(async (req, res) => {
  const fullLang = req.query.fullLang === 'true';
  const tag = await Tag.findById(req.params.id);
  if (!tag) {
    throw createError('Tag not found', 404);
  }
  if (fullLang) {
    console.log('tag', tag);
    return success(res, {
      tag: {
        _id: tag._id,
        name: tag.name,
        name_en: tag.name_en,
        name_zh: tag.name_zh,
        slug: tag.slug,
        description: tag.description,
        description_en: tag.description_en,
        description_zh: tag.description_zh,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
        __v: tag.__v,
      },
    });
  }
  return success(res, { tag });
});

/**
 * @desc    Get a tag by slug
 * @route   GET /api/tags/slug/:slug
 * @access  Public
 */
export const getTagBySlug = asyncHandler(async (req, res) => {
  const fullLang = req.query.fullLang === 'true';
  const tag = await Tag.findOne({ slug: req.params.slug });
  if (!tag) {
    throw createError('Tag not found', 404);
  }
  if (fullLang) {
    return success(res, {
      tag: {
        _id: tag._id,
        name: tag.name,
        name_en: tag.name_en,
        name_zh: tag.name_zh,
        slug: tag.slug,
        description: tag.description,
        description_en: tag.description_en,
        description_zh: tag.description_zh,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
        __v: tag.__v,
      },
    });
  }
  return success(res, { tag });
});

/**
 * @desc    Create a tag
 * @route   POST /api/tags
 * @access  Private/Admin
 */
export const createTag = asyncHandler(async (req, res) => {
  const {
    name,
    name_en,
    name_zh,
    slug,
    description,
    description_en,
    description_zh,
  } = req.body;

  // Check if slug already exists
  const slugExists = await Tag.findOne({ slug });
  if (slugExists) {
    throw createError(
      'This slug is already in use, please use another one',
      400,
    );
  }

  // Create tag
  const tag = await Tag.create({
    name,
    name_en: name_en || name,
    name_zh: name_zh || name,
    slug,
    description,
    description_en: description_en || description,
    description_zh: description_zh || description,
  });

  return success(res, { tag }, 201, 'Tag created successfully');
});

/**
 * @desc    Update a tag
 * @route   PUT /api/tags/:id
 * @access  Private/Admin
 */
export const updateTag = asyncHandler(async (req, res) => {
  const {
    name,
    name_en,
    name_zh,
    slug,
    description,
    description_en,
    description_zh,
  } = req.body;

  // Find tag
  let tag = await Tag.findById(req.params.id);

  if (!tag) {
    throw createError('Tag not found', 404);
  }

  // Check if slug is already taken by another tag
  if (slug && slug !== tag.slug) {
    const slugExists = await Tag.findOne({ slug });
    if (slugExists) {
      throw createError(
        'This slug is already in use, please use another one',
        400,
      );
    }
  }

  // Update tag fields
  tag.name = name || tag.name;
  tag.name_en = name_en || name;
  tag.name_zh = name_zh || name;
  tag.slug = slug || tag.slug;
  tag.description = description !== undefined ? description : tag.description;
  tag.description_en = description_en || description;
  tag.description_zh = description_zh || description;

  // Save updated tag
  await tag.save();

  return success(res, { tag }, 200, 'Tag updated successfully');
});

/**
 * @desc    Delete a tag
 * @route   DELETE /api/tags/:id
 * @access  Private/Admin
 */
export const deleteTag = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    throw createError('Tag not found', 404);
  }

  // Remove tag from posts
  await Post.updateMany({ tags: tag._id }, { $pull: { tags: tag._id } });

  // use modern mongoose delete method instead of deprecated remove()
  await Tag.deleteOne({ _id: tag._id });

  return success(res, null, 200, 'Tag deleted successfully');
});
