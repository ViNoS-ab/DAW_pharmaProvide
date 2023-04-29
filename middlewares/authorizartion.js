import User from "../models/user.js";
import jwt from "jsonwebtoken";

// middleware for authentication

export const isAuthenticated = async (req, res, next) => {
  try {
    const { jwt: token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

