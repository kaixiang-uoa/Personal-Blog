const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true // remove blank
    },
    content: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    coverImage: {
        type: String // image URL
    },
    category: {
        type: String
    },
    tags: [String],
    isPublished: {
        type: Boolean,
        default: true
    },
},
    { timestamps: true } // date
);

module.exports = mongoose.model('Post',PostSchema);