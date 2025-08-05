import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SettingSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: false,
      default: '',
    },
    group: {
      type: String,
      enum: ['general', 'appearance', 'seo', 'social', 'advanced', 'about'],
      default: 'general',
    },
    description: {
      type: String,
    },
    description_en: {
      type: String,
    },
    description_zh: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Setting', SettingSchema);
