import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    alt: {
        type: String
    },
    alt_en: {
        type: String
    },
    alt_zh: {
        type: String
    },
    caption: {
        type: String
    },
    caption_en: {
        type: String
    },
    caption_zh: {
        type: String
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, 
{ timestamps: true }
);

export default mongoose.model('Media', MediaSchema);