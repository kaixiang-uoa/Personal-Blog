import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    name_en: {
      type: String,
      trim: true,
    },
    name_zh: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    description_en: {
      type: String,
      trim: true,
    },
    description_zh: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

// Middleware to auto-generate slug
TagSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      // Replace non-word characters (excluding Chinese) with hyphens
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '');
  }
  next();
});

export default mongoose.model('Tag', TagSchema);
