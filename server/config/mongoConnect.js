const mongoose = require("mongoose");
const { mongoUri } = require("./env");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
