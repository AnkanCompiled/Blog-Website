import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, maxLength: 200 },
    content: { type: String, required: true },
    mediaUrl: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    tags: [String],
    visibility: {
      type: String,
      enum: ["public", "private", "followers"],
      default: "public",
    },
    location: { type: String },
  },
  { timestamps: true }
);

export default model("Post", postSchema);
