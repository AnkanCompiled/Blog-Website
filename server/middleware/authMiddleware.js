const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

const AppError = require("../error/AppError");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(new AppError("Please login to access this route", 401));
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return next(new AppError("Invalid token", 401));
    }
    req.user = decoded;
    next();
  });
};

const tokenCreate = (data) => {
  const token = jwt.sign(data, jwtSecret, {
    expiresIn: "1d",
  });
  return token;
};

module.exports = { authenticate, tokenCreate };
