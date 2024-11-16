const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({});

module.exports = mongoose.model("image", ImageSchema);
