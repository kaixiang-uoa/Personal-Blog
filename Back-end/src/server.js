import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import postRouter from './routers/postRouters.js';
import userRouter from './routers/userRouters.js';
import categoryRouter from './routers/categoryRouters.js';
import tagRouter from './routers/tagRouters.js';
import commentRouter from './routers/commentRouters.js';
import mediaRouter from './routers/mediaRouters.js';
import settingRouter from './routers/settingRouters.js';
// Add authentication router
import authRouter from './routers/authRouters.js';
// Add error handling middleware
import {  errorHandler, notFound  } from './middleware/errorMiddleware.js';

// loading .env configuration.
dotenv.config();

// connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());


// Configure static file directory for accessing public files
app.use(express.static(path.join(path.resolve(), 'public')));

// Configure static file directory for accessing uploaded media files
app.use('/uploads', express.static(path.join('../uploads')));

app.get('/',(req,res) =>{
    res.send('Back-end is running');
})

// Add API version prefix
const API_PREFIX = '/api/v1';

// Register routes
app.use(`${API_PREFIX}/posts`, postRouter);
app.use(`${API_PREFIX}/users`, userRouter);
app.use(`${API_PREFIX}/categories`, categoryRouter);
app.use(`${API_PREFIX}/tags`, tagRouter);
app.use(`${API_PREFIX}/comments`, commentRouter);
app.use(`${API_PREFIX}/media`, mediaRouter);
app.use(`${API_PREFIX}/settings`, settingRouter);
app.use(`${API_PREFIX}/auth`, authRouter);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3002;
app.listen(PORT,()=>{
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
})