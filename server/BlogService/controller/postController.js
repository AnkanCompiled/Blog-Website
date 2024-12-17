import { base64Save } from "../service/base64Save.js";
import { uploadService } from "../service/postService.js";

export async function uploadController(req, res, next) {
  try {
    const { content, image } = req.body;
    const filename = Date.now() + ".png";
    base64Save(image, filename);
    await uploadService(req.user.id, content, filename);
    res.status(200).json({
      message: "File uploaded successfully!",
      content: content, // Return parsed content
      image: filename, // Return the path to the uploaded image
    });
  } catch (error) {
    next(error);
  }
}
