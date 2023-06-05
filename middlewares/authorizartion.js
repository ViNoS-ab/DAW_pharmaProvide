import User from "../models/user.js";
import jwt from "jsonwebtoken";

// middleware for authentication

export const populateUser = async (req, res, next) => {
  try {
    const { jwt: token } = req.cookies;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    next();
  }
};

export const isAuthorized = (req, res, next) => {
  if (req.user) next();
  else {
    res.status(401).json({ success: false, message: "not authenticated" });
  }
};
