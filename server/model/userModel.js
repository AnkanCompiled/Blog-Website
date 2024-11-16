const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  link: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_id: { type: Number, required: true },
  post: [PostSchema],
});

module.exports = mongoose.model("User", UserSchema);
