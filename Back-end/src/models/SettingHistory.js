import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SettingHistorySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },
    oldValue: {
      type: Schema.Types.Mixed,
      required: false,
    },
    newValue: {
      type: Schema.Types.Mixed,
      required: true,
    },
    changedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    action: {
      type: String,
      enum: ['create', 'update', 'delete'],
      default: 'update',
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

// create index for fast query of history records of a specific key
SettingHistorySchema.index({ key: 1, createdAt: -1 });

export default mongoose.model('SettingHistory', SettingHistorySchema);
