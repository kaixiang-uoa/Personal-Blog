const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const postRouter = require('./routers/postRouters');
const userRouter = require('./routers/userRouters');
const categoryRouter = require('./routers/categoryRouters');
const tagRouter = require('./routers/tagRouters');
const commentRouter = require('./routers/commentRouters');
const mediaRouter = require('./routers/mediaRouters');
const settingRouter = require('./routers/settingRouters');
// 添加认证路由
const authRouter = require('./routers/authRouters');
// 添加错误处理中间件
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// loading .env configuration.
dotenv.config();

// connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// 配置静态文件目录，用于访问上传的媒体文件
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/',(req,res) =>{
    res.send('Back-end is running');
})

// 添加API版本前缀
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

// 404处理
app.use(notFound);

// 错误处理中间件
app.use(errorHandler);

const PORT = process.env.PORT || 3002;
app.listen(PORT,()=>{
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
})