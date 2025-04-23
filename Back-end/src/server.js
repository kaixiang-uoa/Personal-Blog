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
// Add authentication router
const authRouter = require('./routers/authRouters');
// Add error handling middleware
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// loading .env configuration.
dotenv.config();

// connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Configure static file directory for accessing uploaded media files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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