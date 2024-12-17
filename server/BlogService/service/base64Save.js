import fs from "fs";
import path from "path";

export const base64Save = (base64String, filename) => {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

  const buffer = Buffer.from(base64Data, "base64");

  const uploadPath = path.join(process.cwd(), "uploads", filename);

  fs.writeFile(uploadPath, buffer, (err) => {
    if (err) {
      console.error(`Error saving ${filename}`, err);
      return;
    }
    console.log(`${filename} saved successfully!`);
  });
};
