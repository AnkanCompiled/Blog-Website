import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply", default: [] }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);

export default model("Comment", commentSchema);
