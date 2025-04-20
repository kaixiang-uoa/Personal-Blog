const Post = require('../models/Post');
const Tag = require('../models/Tag');
const Category = require('../models/Category');

// 获取所有文章
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    console.log('查询参数:', req.query); // 添加调试日志
    
    // 构建查询条件
    const query = {};
    
    // 处理标签过滤 - 支持通过ID或slug查询
    if (req.query.tag) {
      console.log('通过tag参数查询:', req.query.tag); // 添加调试日志
      // 尝试通过slug查询标签
      const tag = await Tag.findOne({ slug: req.query.tag });
      if (tag) {
        console.log('找到标签:', tag); // 添加调试日志
        query.tags = tag._id;
      } else {
        console.log('未找到标签，尝试直接作为ID查询'); // 添加调试日志
        // 如果找不到对应的标签，尝试直接作为ID查询
        query.tags = req.query.tag;
      }
    } else if (req.query.tagSlug) {
      console.log('通过tagSlug参数查询:', req.query.tagSlug); // 添加调试日志
      // 通过标签slug查询
      const tag = await Tag.findOne({ slug: req.query.tagSlug });
      if (tag) {
        console.log('找到标签:', tag); // 添加调试日志
        query.tags = tag._id;
      } else {
        console.log('未找到标签，返回空结果'); // 添加调试日志
        // 如果找不到对应的标签，返回空结果
        return res.json({
          success: true,
          data: [],
          total: 0,
          page,
          limit
        });
      }
    }
    
    // 处理分类过滤 - 支持通过ID或slug查询
    if (req.query.category) {
      // 通过分类ID查询
      query.categories = req.query.category;
    } else if (req.query.categorySlug) {
      // 通过分类slug查询
      const category = await Category.findOne({ slug: req.query.categorySlug });
      if (category) {
        query.categories = category._id;
      } else {
        // 如果找不到对应的分类，返回空结果
        return res.json({
          success: true,
          data: [],
          total: 0,
          page,
          limit
        });
      }
    }
    
    // 处理搜索
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } },
        { excerpt: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    console.log('最终查询条件:', query); // 添加调试日志
    
    // 查询文章总数
    const total = await Post.countDocuments(query);
    console.log('匹配文章数量:', total); // 添加调试日志
    
    // 查询文章列表
    const posts = await Post.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username displayName')
      .populate('categories', 'name slug')
      .populate('tags', 'name slug');
    
    console.log('返回文章数量:', posts.length); // 添加调试日志
    
    // 返回结果
    res.json({
      success: true,
      data: posts,
      total,
      page,
      limit
    });
  } catch (err) {
    console.error('获取文章列表失败:', err);
    res.status(500).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  }
};

// 通过slug获取单篇文章
exports.getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await Post.findOne({ slug })
      .populate('author', 'username displayName')
      .populate('categories', 'name slug')
      .populate('tags', 'name slug');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '文章不存在'
      });
    }
    
    res.json({
      success: true,
      data: { post }
    });
  } catch (err) {
    console.error('获取文章详情失败:', err);
    res.status(500).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  }
};

// 创建文章
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    
    res.status(201).json({
      success: true,
      data: { post: newPost }
    });
  } catch (err) {
    console.error('创建文章失败:', err);
    res.status(500).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  }
};

// 更新文章
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '文章不存在'
      });
    }
    
    res.json({
      success: true,
      data: { post }
    });
  } catch (err) {
    console.error('更新文章失败:', err);
    res.status(500).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  }
};

// 删除文章
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await Post.findByIdAndDelete(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: '文章不存在'
      });
    }
    
    res.json({
      success: true,
      message: '文章已删除'
    });
  } catch (err) {
    console.error('删除文章失败:', err);
    res.status(500).json({
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  }
};