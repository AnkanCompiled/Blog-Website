const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    user_id: { type: Number, required: true },
    post_id: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Content", ContentSchema);
