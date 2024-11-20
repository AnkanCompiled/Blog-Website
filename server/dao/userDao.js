const User = require("../model/userModel");

const createUser = async (userData) => {
  const user = new User(userData);
  return user.save();
};

const uploadUser = async (data, imageLink, id) => {
  const user = await User.findOne({ user_id: id });
  const newPost = {
    title: data.title,
    link: imageLink,
    content: data.content,
  };
  user.post.push(newPost);
  await user.save();
  const postId = await User.findOne({ user_id: id });
  console.log("Post: ", postId.post[postId.post.length - 1]);
  return {
    user_id: user.user_id,
    post_id: postId.post[postId.post.length - 1]._id,
  };
};

const postDetails = async (user_id, post_id) => {
  const user = await User.findOne({ user_id: user_id });
  const post = user.post.find((post) => post._id.toString() === post_id);
  return { user: user.name, post: post };
};

module.exports = {
  createUser,
  uploadUser,
  postDetails,
};
