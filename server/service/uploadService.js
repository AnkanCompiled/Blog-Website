const fs = require("fs");
const path = require("path");
const userDao = require("../dao/userDao");
const contentDao = require("../dao/contentDao");

const AppError = require("../error/AppError");

const uploadImage = async (data, image, id) => {
  try {
    const base64Data = image.split(",")[1];
    const assetsFolder = path.join(__dirname, "..", "assets", "uploadImages");

    if (!fs.existsSync(assetsFolder)) {
      fs.mkdirSync(assetsFolder, { recursive: true });
    }

    const currentDateTime = new Date().toISOString().replace(/[-:T.]/g, "");
    const filePath = path.join(assetsFolder, `${currentDateTime}.jpg`);

    await new Promise((resolve, reject) => {
      fs.writeFile(filePath, base64Data, { encoding: "base64" }, (err) => {
        if (err) {
          reject(new Error("Failed to save image: " + err.message));
        } else {
          resolve("Image saved successfully");
        }
      });
    });
    const user = await userDao.uploadUser(data, currentDateTime, id);
    await contentDao.uploadContent(user.user_id, user.post_id);
    return `Image saved at ${filePath}`;
  } catch (error) {
    throw new AppError(error.message, 500);
  }
};

module.exports = { uploadImage };
