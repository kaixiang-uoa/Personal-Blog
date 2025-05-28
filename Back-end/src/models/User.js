import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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

// 密码加密中间件
UserSchema.pre('save', async function(next) {
    // 只有在密码被修改时才重新加密
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        // 生成盐值
        const salt = await bcrypt.genSalt(10);
        // 哈希密码
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model('User', UserSchema);