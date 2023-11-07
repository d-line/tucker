import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    lastFetched: {
      type: Date,
      required: true,
    },
    status: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Feed", feedSchema);
