import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    siteName: String,
    siteUrl: String,
    siteDescription: String,
    postsPerPage: {
        type: Number,
        default: 10
    },
    adminEmail: String,
    timezone: {
        type: String,
        default: 'Asia/Shanghai'
    },
    dateFormat: {
        type: String,
        default: 'YYYY-MM-DD'
    },
    timeFormat: {
        type: String,
        default: 'HH:mm:ss'
    },
    language: {
        type: String,
        default: 'zh-CN'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{ timestamps: true }
);

export default mongoose.model('Setting', SettingSchema);