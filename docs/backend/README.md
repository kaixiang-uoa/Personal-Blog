# Backend Development Guide

## Directory Structure

```
Back-end/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.js        # Database configuration
│   │   ├── logger.js    # Logging configuration
│   │   ├── s3.js        # S3 storage configuration
│   │   └── swagger.js   # API documentation
│   ├── controllers/     # Request handlers
│   │   ├── authController.js     # Authentication logic
│   │   ├── postController.js     # Post management
│   │   ├── categoryController.js # Category management
│   │   ├── tagController.js      # Tag management
│   │   ├── mediaController.js    # Media upload/management
│   │   ├── settingController.js  # Settings management
│   │   └── keepAliveController.js # Keep-alive service
│   ├── middleware/      # Express middleware
│   │   ├── authMiddleware.js     # JWT authentication
│   │   ├── errorMiddleware.js    # Error handling
│   │   ├── validationMiddleware.js # Request validation
│   │   └── securityMiddleware.js # Security headers
│   ├── models/         # Mongoose data models
│   │   ├── Post.js     # Post schema
│   │   ├── User.js     # User schema
│   │   ├── Category.js # Category schema
│   │   ├── Tag.js      # Tag schema
│   │   ├── Media.js    # Media schema
│   │   └── Setting.js  # Settings schema
│   ├── routers/        # API route definitions
│   │   ├── authRouters.js        # Authentication routes
│   │   ├── postRouters.js        # Post management routes
│   │   ├── categoryRouters.js    # Category routes
│   │   ├── tagRouters.js         # Tag routes
│   │   ├── mediaRouters.js       # Media routes
│   │   └── settingRouters.js     # Settings routes
│   ├── services/       # Business logic services
│   │   └── keepAlive/  # Keep-alive service
│   ├── utils/          # Utility functions
│   │   ├── responseHandler.js    # API response formatting
│   │   ├── paginationHelper.js   # Pagination utilities
│   │   ├── fileNaming.js         # File naming utilities
│   │   └── i18n.js              # Internationalization
│   ├── test/           # Test files
│   │   ├── api/        # API integration tests
│   │   └── unit/       # Unit tests
│   ├── scripts/        # Database scripts
│   │   ├── initSettings.js       # Initialize default settings
│   │   └── ensureIndexes.js      # Database index creation
│   ├── app.js          # Express app configuration
│   └── server.js       # Server entry point
├── uploads/            # File upload directory
├── logs/               # Application logs
├── coverage/           # Test coverage reports
├── jest.config.js      # Jest testing configuration
└── package.json        # Dependencies and scripts
```

## Quick Start

1. **Requirements**
   - Node.js 18+
   - MongoDB 6+
   - npm or pnpm

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Configure environment variables
   ```

4. **Database Setup**
   ```bash
   # Ensure MongoDB is running
   npm run db:ensure-indexes
   npm run init-about
   ```

5. **Start Service**
   ```bash
   npm run dev
   ```

## Core Features

1. **RESTful API Service**
   - Complete CRUD operations
   - Request validation
   - Error handling
   - Response formatting
   - API documentation (Swagger)

2. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control
   - Password encryption (bcrypt)
   - Session management
   - Route protection

3. **Data Storage**
   - MongoDB database
   - Mongoose ODM
   - File upload system
   - Image optimization

4. **Security Features**
   - JWT authentication
   - Request rate limiting
   - CORS configuration
   - Data encryption
   - Input validation
   - XSS protection

5. **Internationalization**
   - Multi-language API responses
   - Locale-based content
   - Translation support

6. **Keep-alive Service**
   - Automated service to prevent server sleep
   - Health check endpoints
   - Monitoring integration

## Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Database**: MongoDB 6+
- **ODM**: Mongoose 8.x
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator
- **File Upload**: Multer + Multer-S3
- **Testing**: Jest + Supertest
- **Logging**: Winston
- **Documentation**: Swagger/OpenAPI

## API Design

### 1. Response Format
```javascript
// Success response
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2024-12-19T10:30:00.000Z"
}

// Error response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [ ... ]
  },
  "timestamp": "2024-12-19T10:30:00.000Z"
}
```

### 2. Error Handling
```javascript
// utils/errorHandler.js
class ApiError extends Error {
  constructor(statusCode, message, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

// middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message
      }
    });
  }
  
  console.error(err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error'
    }
  });
};
```

### 3. Route Organization
```javascript
// routers/postRouters.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { validatePost } = require('../middleware/validationMiddleware');
const postController = require('../controllers/postController');

// Public routes
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

// Protected routes
router.post('/', auth, validatePost, postController.createPost);
router.put('/:id', auth, validatePost, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;
```

## Data Models

### 1. User Model
```javascript
// models/User.js
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'author', 'user'],
    default: 'user'
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
```

### 2. Post Model
```javascript
// models/Post.js
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    maxlength: 500
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  featuredImage: {
    type: String,
    default: null
  },
  viewCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});
```

## Middleware

### 1. Authentication Middleware
```javascript
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new ApiError(401, 'Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      throw new ApiError(401, 'Invalid token or user inactive.');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new ApiError(401, 'Invalid token.'));
    } else if (error.name === 'TokenExpiredError') {
      next(new ApiError(401, 'Token expired.'));
    } else {
      next(error);
    }
  }
};
```

### 2. Validation Middleware
```javascript
// middleware/validationMiddleware.js
const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));
    
    throw new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', errorDetails);
  }
  next();
};

const validatePost = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title must be less than 200 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters'),
  body('categories')
    .isArray({ min: 1 })
    .withMessage('At least one category is required'),
  validateRequest
];
```

### 3. Rate Limiting
```javascript
// middleware/rateLimitMiddleware.js
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP, please try again later.'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts, please try again later.'
    }
  }
});
```

## Controllers

### 1. Post Controller
```javascript
// controllers/postController.js
const Post = require('../models/Post');
const { ApiError } = require('../utils/errorHandler');
const { paginateResults } = require('../utils/paginationHelper');

exports.getAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status = 'published', category, tag, search } = req.query;
    
    const query = { status };
    
    if (category) query.categories = category;
    if (tag) query.tags = tag;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query)
      .populate('author', 'displayName avatar')
      .populate('categories', 'name slug')
      .populate('tags', 'name slug')
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);
    const pagination = paginateResults(page, limit, total);

    res.json({
      success: true,
      data: posts,
      pagination
    });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, categories, tags, featuredImage, status } = req.body;
    
    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    const post = new Post({
      title,
      slug,
      content,
      excerpt,
      author: req.user._id,
      categories,
      tags,
      featuredImage,
      status,
      publishedAt: status === 'published' ? new Date() : null
    });

    await post.save();
    
    await post.populate([
      { path: 'author', select: 'displayName avatar' },
      { path: 'categories', select: 'name slug' },
      { path: 'tags', select: 'name slug' }
    ]);

    res.status(201).json({
      success: true,
      data: post,
      message: 'Post created successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      next(new ApiError(400, 'Post with this title already exists'));
    } else {
      next(error);
    }
  }
};
```

## File Upload

### 1. Media Upload Configuration
```javascript
// config/s3.js
const AWS = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, `uploads/${fileName}`);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new ApiError(400, 'Only image files are allowed'));
    }
  }
});
```

### 2. Media Controller
```javascript
// controllers/mediaController.js
exports.uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, 'No file uploaded');
    }

    const media = new Media({
      filename: req.file.key,
      originalname: req.file.originalname,
      path: req.file.location,
      type: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user._id
    });

    await media.save();

    res.status(201).json({
      success: true,
      data: media,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    next(error);
  }
};
```

## Testing

### 1. Unit Tests
```javascript
// test/unit/postController.test.js
const request = require('supertest');
const app = require('../../src/app');
const Post = require('../../src/models/Post');
const { setupTestDB } = require('../setup');

describe('Post Controller', () => {
  setupTestDB();

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  describe('GET /api/posts', () => {
    it('should return all published posts', async () => {
      const post = await Post.create({
        title: 'Test Post',
        slug: 'test-post',
        content: 'Test content',
        status: 'published',
        author: '507f1f77bcf86cd799439011'
      });

      const response = await request(app)
        .get('/api/posts')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].title).toBe('Test Post');
    });
  });
});
```

### 2. Integration Tests
```javascript
// test/api/auth.test.js
describe('Authentication', () => {
  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(userData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
    });
  });
});
```

## Performance Optimization

1. **Database Optimization**
   - Index creation for frequently queried fields
   - Query optimization with aggregation pipelines
   - Connection pooling
   - Read replicas for scaling

2. **Caching Strategy**
   - Redis caching for frequently accessed data
   - Memory caching for static data
   - Cache invalidation strategies
   - Response caching

3. **Concurrency Handling**
   - Request rate limiting
   - Queue processing for heavy operations
   - Asynchronous file processing
   - Database connection pooling

## Security Measures

1. **Authentication and Authorization**
   - JWT token management
   - Role-based access control
   - Session management
   - Password security

2. **Data Security**
   - Input validation and sanitization
   - XSS protection
   - CSRF protection
   - SQL injection prevention

3. **API Security**
   - Request rate limiting
   - CORS configuration
   - Helmet security headers
   - Parameter validation

## Deployment

1. **Environment Configuration**
   - Production environment variables
   - Logging configuration
   - Monitoring setup
   - SSL/TLS configuration

2. **Deployment Steps**
   - Build optimization
   - Server configuration
   - Database migration
   - Service startup

3. **Monitoring and Maintenance**
   - Log collection and analysis
   - Performance monitoring
   - Error tracking
   - Health checks

## Scripts and Utilities

### 1. Database Scripts
```javascript
// scripts/ensureIndexes.js
const mongoose = require('mongoose');
const Post = require('../src/models/Post');
const User = require('../src/models/User');

async function ensureIndexes() {
  try {
    // Create indexes for better query performance
    await Post.collection.createIndex({ slug: 1 }, { unique: true });
    await Post.collection.createIndex({ author: 1 });
    await Post.collection.createIndex({ status: 1 });
    await Post.collection.createIndex({ publishedAt: -1 });
    
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ username: 1 }, { unique: true });
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
}

ensureIndexes();
```

### 2. Keep-alive Service
```javascript
// services/keepAlive/keepAliveService.js
const cron = require('croner');

class KeepAliveService {
  constructor() {
    this.healthCheckUrl = process.env.HEALTH_CHECK_URL;
    this.interval = process.env.KEEP_ALIVE_INTERVAL || '*/5 * * * *'; // Every 5 minutes
  }

  start() {
    const job = cron(this.interval, () => {
      this.performHealthCheck();
    });
    
    console.log('Keep-alive service started');
    return job;
  }

  async performHealthCheck() {
    try {
      const response = await fetch(this.healthCheckUrl);
      if (response.ok) {
        console.log('Health check successful');
      } else {
        console.error('Health check failed:', response.status);
      }
    } catch (error) {
      console.error('Health check error:', error.message);
    }
  }
}

module.exports = KeepAliveService;
```

## Changelog

### 2024-12-19
- Updated to Node.js 18+ requirement
- Enhanced error handling with custom ApiError class
- Improved validation middleware
- Added comprehensive testing setup
- Enhanced security measures
- Added keep-alive service

### 2024-03-21
- Restructured documentation
- Optimized API design
- Completed error handling
- Enhanced authentication system

### 2024-03-20
- Added data validation
- Optimized performance
- Updated dependency versions
- Enhanced file upload system 