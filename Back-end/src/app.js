import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 导入路由
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

// 导入中间件
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { i18nMiddleware } from './middleware/i18nMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS配置
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

const app = express();

// 应用中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());

// 应用国际化中间件
app.use(i18nMiddleware);

// 静态文件目录
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'public')));

// API前缀
const API_PREFIX = '/api/v1';

// 注册路由
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

// 根路由
app.get('/', (req, res) => {
  res.send('博客API服务器正在运行');
});

// 404处理
app.use(notFound);

// 错误处理
app.use(errorHandler);

export default app;