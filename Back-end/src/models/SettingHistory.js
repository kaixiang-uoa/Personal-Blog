import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SettingHistorySchema = new Schema({
    key: {
        type: String,
        required: true,
        trim: true
    },
    oldValue: {
        type: Schema.Types.Mixed,
        required: false
    },
    newValue: {
        type: Schema.Types.Mixed,
        required: true
    },
    changedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    action: {
        type: String,
        enum: ['create', 'update', 'delete'],
        default: 'update'
    },
    description: {
        type: String
    }
},
{ timestamps: true }
);

// 创建索引以便快速查询特定键的历史记录
SettingHistorySchema.index({ key: 1, createdAt: -1 });

export default mongoose.model('SettingHistory', SettingHistorySchema); 