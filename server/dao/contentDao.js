const Content = require("../model/contentModel");

const uploadContent = async (user_id, post_id) => {
  const contentData = {
    user_id: user_id,
    post_id: post_id,
  };
  const content = new Content(contentData);
  return content.save();
};

const getContent = async () => {
  const allPosts = await Content.find();
  return allPosts;
};

const getDetails = async (id) => {
  const details = await User.findOne({ _id: id });
  return details;
};

module.exports = {
  uploadContent,
  getContent,
};
