import Category from '../models/Category.js';
import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';
import {  success, createError  } from '../utils/responseHandler.js';
import { transformLocalizedCategories } from '../utils/transformLocalizedCategories.js';

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
export const getAllCategories = asyncHandler(async (req, res) => {
  // Get language preference from query parameter or default to 'zh'
  let lang = 'en';
  if(req.query.lang){
    lang = Array.isArray(req.query.lang)? req.query.lang[0] : req.query.lang;
  }
  
  // Get all categories
  const categories = await Category.find().sort({ name: 1 });
  // Transform categories based on language preference
  const transformedCategories = transformLocalizedCategories(categories, lang);

  return success(res, { 
    categories: transformedCategories,
    count: transformedCategories.length 
  });
});

/**
 * @desc    Get a single category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
export const getCategoryById = asyncHandler(async (req, res) => {
  // Get language preference from query parameter or default to 'zh'
  const lang = req.query.lang || 'zh';
  
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw createError('Category not found', 404);
  }
  
  // Transform category based on language preference
  const transformed = transformLocalizedCategories([category], lang)[0];
  
  return success(res, { category: transformed });
});

/**
 * @desc    Get a category by slug
 * @route   GET /api/categories/slug/:slug
 * @access  Public
 */
export const getCategoryBySlug = asyncHandler(async (req, res) => {
  // Get language preference from query parameter or default to 'zh'
  const lang = req.query.lang || 'zh';
  
  const category = await Category.findOne({ slug: req.params.slug });

  if (!category) {
    throw createError('Category not found', 404);
  }
  
  // Transform category based on language preference
  const transformed = transformLocalizedCategories([category], lang)[0];

  return success(res, { category: transformed });
});

/**
 * @desc    Create a category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { 
    name, 
    name_en, 
    name_zh, 
    slug, 
    description, 
    description_en, 
    description_zh, 
    parent, 
    featuredImage 
  } = req.body;

  // Check if slug already exists
  const slugExists = await Category.findOne({ slug });
  if (slugExists) {
    throw createError('This slug is already in use, please use another one', 400);
  }

  // Create category
  const category = await Category.create({
    name,
    name_en,
    name_zh,
    slug,
    description,
    description_en,
    description_zh,
    parent: parent || null,
    featuredImage
  });

  return success(res, { category }, 201, 'Category created successfully');
});

/**
 * @desc    Update a category
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { 
    name, 
    name_en, 
    name_zh, 
    slug, 
    description, 
    description_en, 
    description_zh, 
    parent, 
    featuredImage 
  } = req.body;
  
  // Find category
  let category = await Category.findById(req.params.id);
  
  if (!category) {
    throw createError('Category not found', 404);
  }
  
  // Check if slug is already taken by another category
  if (slug && slug !== category.slug) {
    const slugExists = await Category.findOne({ slug });
    if (slugExists) {
      throw createError('This slug is already in use, please use another one', 400);
    }
  }
  
  // Prevent circular parent reference
  if (parent && parent.toString() === category._id.toString()) {
    throw createError('Category can not be its own parent', 400);
  }
  
  // Update category fields
  category.name = name || category.name;
  category.name_en = name_en !== undefined ? name_en : category.name_en;
  category.name_zh = name_zh !== undefined ? name_zh : category.name_zh;
  category.slug = slug || category.slug;
  category.description = description !== undefined ? description : category.description;
  category.description_en = description_en !== undefined ? description_en : category.description_en;
  category.description_zh = description_zh !== undefined ? description_zh : category.description_zh;
  category.parent = parent || category.parent;
  category.featuredImage = featuredImage || category.featuredImage;
  
  // Save updated category
  await category.save();
  
  return success(res, { category }, 200, 'Category updated successfully');
});

/**
 * @desc    Delete a category
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  
  if (!category) {
    throw createError('Category not found', 404);
  }
  
  // Check if category has children
  const hasChildren = await Category.findOne({ parent: category._id });
  if (hasChildren) {
    throw createError('This category has children, can not be deleted', 400);
  }
  
  // Update posts to remove this category
  await Post.updateMany(
    { category: category._id },
    { $set: { category: null } }
  );
  
  // use modern mongoose delete method instead of deprecated remove()
  await Category.deleteOne({ _id: category._id });
  
  return success(res, null, 200, 'Category deleted successfully');
});