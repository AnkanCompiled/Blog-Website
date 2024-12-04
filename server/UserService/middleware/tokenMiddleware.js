import jwt from "jsonwebtoken";
import AppError from "../error/AppError.js";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

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

const createToken = (userDetails) => {
  const token = jwt.sign(userDetails, jwtSecret, {
    expiresIn: "7d",
  });
  return token;
};

const adminRoleCheck = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );
  }
  next();
};

export { authenticate, createToken, adminRoleCheck };
