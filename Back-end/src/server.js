const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const postRouter = require('./routers/postRouters');


// loading .env configuration.
dotenv.config();

// connect to database
connectDB();

const app = express();
app.use(express.json());

app.get('/',(req,res) =>{
    res.send('Back-end is running');
})

app.use('/api/posts',postRouter);


const PORT = process.env.PORT || 3002;
app.listen(PORT,()=>{
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
})