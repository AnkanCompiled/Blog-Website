import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    mediaUrl: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
    visibility: {
      type: String,
      enum: ["public", "private", "followers"],
      default: "public",
    },
  },
  { timestamps: true }
);

export default model("Post", postSchema);
