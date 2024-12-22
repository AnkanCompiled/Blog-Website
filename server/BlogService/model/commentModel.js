import { Schema, model } from "mongoose";

const repliesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    replies: {
      type: [repliesSchema],
      default: [],
    },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model("Comment", commentSchema);
