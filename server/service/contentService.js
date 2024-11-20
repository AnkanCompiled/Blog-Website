const contentDao = require("../dao/contentDao");
const userDao = require("../dao/userDao");
const path = require("path");

const getPostService = async () => {
  const content = await contentDao.getContent();
  return content;
};

const getDetailService = async (user_id, post_id) => {
  const content = await userDao.postDetails(user_id, post_id);
  return content;
};

const getImageService = async (link) => {
  const filePath = path.join(
    __dirname,
    "..",
    "assets",
    "uploadImages",
    `${link}.jpg`
  );
  return filePath;
};

module.exports = { getPostService, getDetailService, getImageService };
