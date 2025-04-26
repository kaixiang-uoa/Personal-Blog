import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    fileName: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    dimensions: {
        width: Number,
        height: Number
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