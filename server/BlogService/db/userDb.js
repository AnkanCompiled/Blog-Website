import userModel from "../model/userModel.js";

export const searchUserByIdDb = async (userId) => {
  const result = await userModel.findOne({ userId });
  return result;
};

export const createUserDb = async (data) => {
  const newUser = new userModel(data);
  const result = await newUser.save();
  return result;
};

export const changeUsernameDb = async (userId, username) => {
  const result = await userModel.findOneAndUpdate(
    { userId },
    { $set: { username: username } },
    { new: true, runValidators: true }
  );
  return result;
};
