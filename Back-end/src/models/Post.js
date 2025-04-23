const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    excerpt: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        required: true
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

// Middleware to auto-generate slug
PostSchema.pre('save', function(next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            // Replace non-word characters (excluding Chinese) with hyphens
            .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
            // Remove leading/trailing hyphens
            .replace(/^-+|-+$/g, '');
    }
    next();
});

module.exports = mongoose.model('Post', PostSchema);