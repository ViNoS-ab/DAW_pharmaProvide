import express from "express";
import {
  login,
  logout,
  signup,
  tokenRefresh,
} from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/authorizartion.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.delete("/logout", isAuthenticated, logout);
router.head("/refresh", tokenRefresh);

export default router;
