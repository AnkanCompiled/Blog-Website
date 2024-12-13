import userModel from "../model/userModel.js";

export const createUserDb = async (data) => {
  const newUser = new userModel(data);
  const result = await newUser.save();
  return result;
};
