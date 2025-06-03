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

// password encryption middleware
UserSchema.pre('save', async function(next) {
    // only re-encrypt if password is modified
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash password
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model('User', UserSchema);