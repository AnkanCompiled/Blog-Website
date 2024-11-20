const { uploadImage } = require("../service/uploadService");

const uploadController = async (req, res, next) => {
  try {
    const { data, image } = req.body;
    const parsedData = JSON.parse(data);
    await uploadImage(parsedData, image, req.user.user_id);
    res.status(201).json({ message: "upload successfull" });
  } catch (err) {
    next(err);
  }
};
module.exports = { uploadController };
