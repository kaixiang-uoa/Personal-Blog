const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'author'],
        default: 'author'
    },
    displayName: {
        type: String,
        trim: true
    },
    avatar: {
        type: String
    },
    socialLinks: {
        github: String,
        x: String,
        website: String
    },
    lastLogin: {
        type: Date
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);