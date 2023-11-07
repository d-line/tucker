import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    permalink: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      trim: true,
    },
    feed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feed",
    },
    published: {
      type: Date,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    keepUnread: {
      type: Boolean,
      default: false,
    },
    isStarred: {
      type: Boolean,
      default: false,
    },
    entryId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Story", storySchema);
