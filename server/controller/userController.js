const mySqlService = require("../service/mySqlService");
const { tokenCreate } = require("../middleware/authMiddleware");

const registerUser = async (req, res, next) => {
  try {
    const user = await mySqlService.registerUser(
      req.body.registerEmail,
      req.body.registerPassword,
      req.body.registerName
    );
    const token = tokenCreate(user);
    console.log(user);
    res.status(201).json({ message: token });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await mySqlService.loginUser(
      req.body.loginEmail,
      req.body.loginPassword
    );
    const token = tokenCreate(user);
    console.log(user);
    res.status(201).json({ message: token });
  } catch (err) {
    next(err);
  }
};

const activateUser = async (req, res, next) => {
  try {
    await mySqlService.activateEmail(req.body.email, req.body.status);
    res.status(201).json({ message: "Success" });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser, activateUser };
