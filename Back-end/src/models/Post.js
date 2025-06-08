/**
 * Blog post model
 * Defines the data structure and middleware for blog posts
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Post schema definition
 * Contains fields for title, content, author, status, etc.
 */
const PostSchema = new Schema({
    title: {
        type: String,
        required: function() { return this.status === 'published'; },
        trim: true
    },
    slug: {
        type: String,
        required: function() { return this.status === 'published'; },
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: function() { return this.status === 'published'; }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    featuredImage: {
        type: String
    },
    seo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String]
    },
    viewCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    allowComments: {
        type: Boolean,
        default: true
    },
    publishedAt: {
        type: Date,
        default: null
    }
},
{ timestamps: true }
);

/**
 * Middleware to auto-generate post slugs
 * Creates URL-friendly slugs based on the post title
 */
PostSchema.pre('save', function(next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            // replace non-word characters (excluding Chinese) with hyphens
            .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
            // remove leading/trailing hyphens
            .replace(/^-+|-+$/g, '');
    }
    next();
});

export default mongoose.model('Post', PostSchema);