import { Schema, model } from "mongoose";

const repliesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);

export default model("Reply", repliesSchema);
