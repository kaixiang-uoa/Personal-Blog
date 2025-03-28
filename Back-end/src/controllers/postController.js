const Post = require('../models/Post')
const asyncHandler = require('express-async-handler')


/**
 * @desc    Get all posts
 * @route   GET /api/posts
 */
exports.getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find(); // get all posts
        res.status(200).json(posts.length>0 ? posts : {message:'There is no posts'})
    }catch(err){
        res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
    }
};


/**
 * @desc    Create a new post
 * @route   POST /api/posts
 */

// normal veriosn(async/await + try/catch)
// Version A (normal version)
/*
exports.createPost = async (req, res) => {
  try {
    const { title, content, author, coverImage, tags, category } = req.body;
    const newPost = new Post({ title, content, author, coverImage, tags, category });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
};
*/

// express-async-handler version 
exports.createPost = asyncHandler(async (req,res) =>{
    const { title,content,author,coverImage,category,tags,isPublished} = req.body;
    const newPost = new Post({
        title,
        content,
        author,
        coverImage,
        category,
        tags,
        isPublished
    })
    const createPost = await newPost.save()
    res.status(201).json(createPost) 
})


/**
 * @desc    Get a single post by ID
 * @route   GET /api/posts/:id
 */
exports.getPostById = asyncHandler(async (req,res) => {
    const post = await Post.findById(req.params.id)
    if(!post){
        res.status(200).json({message:'Can not find this post'})
    }
    res.status(200).json(post)
})


/**
 * @desc    Update a post
 * @route   PUT /api/posts/:id
 */
exports.updatePost = asyncHandler(async (req,res) =>{
    console.log('🛠️ Update Post Called');
    console.log('🆔 ID from req.params:', req.params.id);
    console.log('📝 Body:', req.body);


    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body is empty' });
    }
    
    const updatePost = await Post.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true, 
    })
    
    console.log(updatePost)

    if(!updatePost){
        return res.status(404).json({message:'Post not found'})
    }

    res.status(200).json({message:'Post has been updated.'});
})

/**
 * @desc    Delete a post
 * @route   DELETE /api/posts/:id
 */
exports.deletePost = asyncHandler(async (req, res) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
  
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
  
    res.status(200).json({ message: 'Post deleted successfully' });
  });