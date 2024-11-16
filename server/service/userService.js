const userDao = require("../dao/userDao");

const registerUser = async (name, user_id) => {
  const userData = {
    name: name,
    user_id: user_id,
  };
  userDao.createUser(userData);
};

module.exports = { registerUser };
