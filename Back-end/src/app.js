import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import logger from './config/logger.js';

// Import routers
import postRouter from './routers/postRouters.js';
import userRouter from './routers/userRouters.js';
import categoryRouter from './routers/categoryRouters.js';
import tagRouter from './routers/tagRouters.js';
import commentRouter from './routers/commentRouters.js';
import mediaRouter from './routers/mediaRouters.js';
import settingRouter from './routers/settingRouters.js';
import authRouter from './routers/authRouters.js';
import i18nRouters from './routers/i18nRouters.js';
import contactRouter from './routers/contactRouters.js';

// Import middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { i18nMiddleware } from './middleware/i18nMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

const app = express();

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());

// Apply internationalization middleware
app.use(i18nMiddleware);

// Static file directories
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// API prefix
const API_PREFIX = '/api/v1';

// 添加请求日志中间件
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`, {
        ip: req.ip,
        userAgent: req.get('user-agent')
    });
    next();
});

// Register routes
app.use(`${API_PREFIX}/posts`, postRouter);
app.use(`${API_PREFIX}/users`, userRouter);
app.use(`${API_PREFIX}/categories`, categoryRouter);
app.use(`${API_PREFIX}/tags`, tagRouter);
app.use(`${API_PREFIX}/comments`, commentRouter);
app.use(`${API_PREFIX}/media`, mediaRouter);
app.use(`${API_PREFIX}/settings`, settingRouter);
app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/i18n`, i18nRouters);
app.use(`${API_PREFIX}/contact`, contactRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Blog API server is running');
});

// 404 handler
app.use(notFound);

// Error handler
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });
    errorHandler(err, req, res, next);
});

export default app;