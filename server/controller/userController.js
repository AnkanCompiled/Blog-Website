const mySqlService = require("../service/mySqlService");
const { tokenCreate } = require("../middleware/authMiddleware");

const registerUser = async (req, res, next) => {
  try {
    const user_id = await mySqlService.registerUser(
      req.body.email,
      req.body.password,
      req.body.name
    );
    const token = tokenCreate(user_id);
    res.status(201).json({ message: token });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user_id = await mySqlService.loginUser(
      req.body.email,
      req.body.password
    );
    const token = tokenCreate(user_id);
    res.status(201).json({ message: token });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser };
