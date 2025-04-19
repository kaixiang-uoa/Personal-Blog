const mongoose = require('mongoose');
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

module.exports = mongoose.model('Media', MediaSchema);