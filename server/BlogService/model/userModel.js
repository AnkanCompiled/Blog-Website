import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, unique: true, maxLength: 15 },
    profilePicture: { type: String, default: "" },
    bio: { type: String, maxLength: 250, default: "" },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    interests: { type: [String], default: [] },
    privacySettings: {
      profileVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
      },
      allowMessagesFrom: {
        type: String,
        enum: ["everyone", "followers"],
        default: "everyone",
      },
    },
    status: {
      type: String,
      enum: ["active", "suspended", "deactivated"],
      default: "active",
    },

    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

export default model("User", userSchema);
