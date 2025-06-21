import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PingRecordSchema = new Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
    },
    success: {
      type: Boolean,
      required: true,
    },
    isLiving: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PingRecord", PingRecordSchema); 