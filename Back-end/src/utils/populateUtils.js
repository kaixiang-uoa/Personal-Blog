import Post from '../models/Post.js';

export const getPopulatedPostById = async (id) => {
  return Post.findById(id)
    .populate('author', 'username displayName avatar')
    .populate('categories', 'name name_en name_zh slug')
    .populate('tags', 'name slug');
};

export const getPopulatedPostBySlug = async (slug) => {
  return Post.findOne({ slug })
    .populate('author', 'username displayName avatar')
    .populate('categories', 'name name_en name_zh slug')
    .populate('tags', 'name slug');
};
