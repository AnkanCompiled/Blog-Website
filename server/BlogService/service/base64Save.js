import fs from "fs";
import path from "path";
import AppError from "../error/AppError.js";

export const base64Save = async (base64String, filename) => {
  try {
    if (!base64String) {
      throw new AppError("Base64 not found", 400);
    }
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const uploadPath = path.join(process.cwd(), "uploads", filename);

    await fs.promises.writeFile(uploadPath, buffer);

    console.log(`${filename} saved successfully!`);
  } catch (error) {
    console.error("Error saving image:", error);
    throw new AppError(`Failed to save image: ${error.message}`, 500);
  }
};
