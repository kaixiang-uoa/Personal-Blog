import express from "express";
const router = express.Router();
import {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { postRules } from "../utils/validationRules.js";

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Blog post management
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of blog posts with optional filtering
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published, archived]
 *           default: published
 *         description: Post status filter
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [publishedAt-desc, publishedAt-asc, updatedAt-desc, updatedAt-asc]
 *           default: publishedAt-desc
 *         description: Sort order
 *       - in: query
 *         name: categorySlug
 *         schema:
 *           type: string
 *         description: Filter by category slug
 *       - in: query
 *         name: tagSlug
 *         schema:
 *           type: string
 *         description: Filter by tag slug (comma separated for multiple tags)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for title, content, or excerpt
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [en, zh]
 *         description: Language for localized content
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 total:
 *                   type: integer
 *                   example: 25
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", validateRequest(postRules.list), getAllPosts);

/**
 * @swagger
 * /posts/slug/{slug}:
 *   get:
 *     summary: Get post by slug
 *     description: Retrieve a post by its slug
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Post slug
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [en, zh]
 *         description: Language for localized content
 *     responses:
 *       200:
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/slug/:slug", validateRequest(postRules.slug), getPostBySlug);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     description: Retrieve a post by its ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [en, zh]
 *         description: Language for localized content
 *     responses:
 *       200:
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", validateRequest(postRules.id), getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new blog post (requires admin or author role)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Post title
 *                 example: New Blog Post
 *               slug:
 *                 type: string
 *                 description: URL slug (auto-generated if not provided)
 *                 example: new-blog-post
 *               content:
 *                 type: string
 *                 description: Post content
 *                 example: This is the content of the blog post...
 *               excerpt:
 *                 type: string
 *                 description: Short excerpt of the post
 *                 example: A brief summary of the post
 *               status:
 *                 type: string
 *                 enum: [draft, published, archived]
 *                 default: draft
 *                 description: Post status
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of category IDs
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of tag IDs
 *               featuredImage:
 *                 type: string
 *                 description: URL to featured image
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Insufficient permissions
 */
router.post(
  "/",
  protect,
  restrictTo("admin", "author"),
  validateRequest(postRules.create),
  createPost
);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     description: Update an existing post (requires admin role)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Post title
 *               slug:
 *                 type: string
 *                 description: URL slug
 *               content:
 *                 type: string
 *                 description: Post content
 *               excerpt:
 *                 type: string
 *                 description: Short excerpt of the post
 *               status:
 *                 type: string
 *                 enum: [draft, published, archived]
 *                 description: Post status
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of category IDs
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of tag IDs
 *               featuredImage:
 *                 type: string
 *                 description: URL to featured image
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Post not found
 */
router.put(
  "/:id",
  protect,
  restrictTo("admin"),
  validateRequest([...postRules.id, ...postRules.create]),
  updatePost
);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     description: Delete an existing post (requires admin role)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       404:
 *         description: Post not found
 */
router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  validateRequest(postRules.id),
  deletePost
);

export default router;
