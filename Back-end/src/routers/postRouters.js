const express = require('express')
const router = express.Router();
const { getAllPosts,createPost,getPostById,updatePost,deletePost } = require('../controllers/postController')

// get all posts
router.get('/', getAllPosts);

// create a post
router.post('/',createPost);

// find post by id
router.post('/:id',getPostById);

// update post by id
router.put('/:id',updatePost);

// delete post by id
router.delete('/:id',deletePost);

module.exports = router;