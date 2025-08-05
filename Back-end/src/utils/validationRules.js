/**
 * Common validation rules for use with express-validator
 */
import { body, param, query } from 'express-validator';

/**
 * Common validation rules for posts
 */
export const postRules = {
  // Post creation/update rules
  create: [
    // Title is required only if status is 'published'
    body('title')
      .trim()
      .if(body('status').equals('published'))
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 200 })
      .withMessage('Title must be less than 200 characters'),

    // Content is required only if status is 'published'
    body('content')
      .if(body('status').equals('published'))
      .notEmpty()
      .withMessage('Content is required')
      .bail()
      .isString()
      .withMessage('Content must be a string'),

    body('excerpt')
      .optional()
      .isString()
      .withMessage('Excerpt must be a string')
      .isLength({ max: 500 })
      .withMessage('Excerpt must be less than 500 characters'),

    // Slug is optional; if not provided or empty, backend will auto-generate
    body('slug')
      .optional({ checkFalsy: true })
      .isString()
      .withMessage('Slug must be a string')
      .matches(/^[a-z0-9-]+$/)
      .withMessage(
        'Slug can only contain lowercase letters, numbers, and hyphens',
      ),

    body('status')
      .optional()
      .isIn(['draft', 'published', 'archived'])
      .withMessage('Status must be draft, published, or archived'),

    body('categories')
      .optional()
      .isArray()
      .withMessage('Categories must be an array'),

    body('tags').optional().isArray().withMessage('Tags must be an array'),
  ],

  // Post ID validation
  id: [param('id').isMongoId().withMessage('Invalid post ID format')],

  // Post slug validation
  slug: [
    param('slug')
      .isString()
      .withMessage('Slug must be a string')
      .matches(/^[a-z0-9-]+$/)
      .withMessage(
        'Slug can only contain lowercase letters, numbers, and hyphens',
      ),
  ],

  // Post listing/filtering rules
  list: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),

    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),

    query('status')
      .optional()
      .isIn(['draft', 'published', 'archived'])
      .withMessage('Status must be draft, published, or archived'),

    query('sort')
      .optional()
      .isIn([
        'publishedAt-desc',
        'publishedAt-asc',
        'updatedAt-desc',
        'updatedAt-asc',
        'latest',
        'oldest',
        'popular',
      ])
      .withMessage('Invalid sort parameter'),

    query('tagSlug')
      .optional()
      .isString()
      .withMessage('Tag slug must be a string'),

    query('categorySlug')
      .optional()
      .isString()
      .withMessage('Category slug must be a string'),

    query('lang')
      .optional()
      .isIn(['en', 'zh'])
      .withMessage('Language must be en or zh'),
  ],
};

/**
 * Common validation rules for users
 */
export const userRules = {
  // User creation/update rules
  create: [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage(
        'Username can only contain letters, numbers, and underscores',
      ),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Must be a valid email address'),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],

  // User login rules
  login: [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Must be a valid email address'),

    body('password').notEmpty().withMessage('Password is required'),
  ],
};

/**
 * Common validation rules for categories
 */
export const categoryRules = {
  create: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Category name is required')
      .isLength({ max: 50 })
      .withMessage('Category name must be less than 50 characters'),

    body('slug')
      .optional()
      .isString()
      .withMessage('Slug must be a string')
      .matches(/^[a-z0-9-]+$/)
      .withMessage(
        'Slug can only contain lowercase letters, numbers, and hyphens',
      ),
  ],
};

/**
 * Common validation rules for tags
 */
export const tagRules = {
  create: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Tag name is required')
      .isLength({ max: 50 })
      .withMessage('Tag name must be less than 50 characters'),

    body('slug')
      .optional()
      .isString()
      .withMessage('Slug must be a string')
      .matches(/^[a-z0-9-]+$/)
      .withMessage(
        'Slug can only contain lowercase letters, numbers, and hyphens',
      ),
  ],
};

/**
 * Common validation rules for contact form
 */
export const contactRules = {
  submit: [
    body('name').trim().notEmpty().withMessage('Name is required'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Must be a valid email address'),

    body('subject')
      .trim()
      .notEmpty()
      .withMessage('Subject is required')
      .isLength({ min: 2 })
      .withMessage('Subject must be at least 2 characters'),

    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ min: 5 })
      .withMessage('Message must be at least 5 characters'),
  ],
};
