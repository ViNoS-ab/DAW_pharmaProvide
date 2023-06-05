import express from "express";
import {
  login,
  logout,
  signup,
  tokenRefresh,
  verifyEmail,
} from "../controllers/auth.js";
import { populateUser } from "../middlewares/authorizartion.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.delete("/logout", populateUser, logout);
router.head("/refresh", tokenRefresh);
router.get("/verifyEmail/:code", verifyEmail);

export default router;
