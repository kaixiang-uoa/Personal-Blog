import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PingRecordSchema = new Schema(
  {
    timestamp: {
      type: Date,
      required: true,
      default: Date.now
    },
    status: {
      type: Number,
      required: false
    },
    error: {
      type: String,
      required: false
    },
    duration: {
      type: Number,
      required: false
    },
    type: {
      type: String,
      enum: ["auto", "manual", "initial"],
      required: true
    },
    isRunning: {
      type: Boolean,
      default: false,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    defaultInterval: {
      type: Number,
      default: 5 * 60 * 1000,
    },
  },
  { 
    timestamps: true,
    // add index to improve query performance
    indexes: [
      { timestamp: -1 }  // sort by timestamp in descending order, for quick retrieval of latest record
    ]
  }
);

export default mongoose.model("PingRecord", PingRecordSchema); 