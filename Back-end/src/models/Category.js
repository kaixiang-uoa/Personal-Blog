import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // add multilingual support for name
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
    // add multilingual support for description
    description_en: {
      type: String,
      trim: true,
    },
    description_zh: {
      type: String,
      trim: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    featuredImage: {
      type: String,
    },
  },
  { timestamps: true },
);

// middleware to auto-generate slug
CategorySchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      // replace non-word characters (excluding Chinese) with hyphens
      .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
      // remove leading/trailing hyphens
      .replace(/^-+|-+$/g, "");
  }

  // set default language values if not provided
  if (!this.name_zh && this.name) {
    this.name_zh = this.name;
  }

  if (!this.name_en && this.name) {
    this.name_en = this.name;
  }

  if (!this.description_zh && this.description) {
    this.description_zh = this.description;
  }

  if (!this.description_en && this.description) {
    this.description_en = this.description;
  }

  next();
});

// module.exports = mongoose.model('Category', CategorySchema);
export default mongoose.model("Category", CategorySchema);
