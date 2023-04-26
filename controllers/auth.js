import "dotenv/config";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createRefreshToken, createToken } from "../utils/createTokens.js";
import RefreshToken from "../models/refreshToken.js";

export async function signup(req, res) {
  const { email } = req.body;
  try {
    const exist = await User.findOne({ email: email });
    if (exist)
      return res.status(400).json({
        success: false,
        status: 400,
        message: "email already exists",
      });

    const user = await User.create(req.body);

    createToken(user._id, res);
    createRefreshToken(user._id, res);

    res.status(201).json({
      success: true,
      status: 201,
      data: user,
    });
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = email && (await User.findOne({ email: email }));
    if (!user)
      return res
        .status(404)
        .json({ status: 404, message: "incorrect email" });

    const isMatch =
      password && (await bcrypt.compare(password, user.password));
    if (!isMatch)
      return res
        .status(400)
        .json({ status: 400, message: "wrong pasword" });

    createToken(user._id, res);
    await createRefreshToken(user._id, res);

    return res.status(200).json({
      status: 200,
      data: { username: user.username, id: user._id },
      message: "you are logged in",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.cookie("jwt_refresh", "", { maxAge: 1 });
    //removes refresh token from db
    await RefreshToken.deleteMany({
      userId: req.user._id,
    });

    return res
      .status(200)
      .json({ status: 200, message: "you are logged out" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "there was an error, try again later",
    });
  }
}

export async function tokenRefresh(req, res) {
  try {
    const token = req.cookies.jwt_refresh;
    if (!token)
      return res
        .status(400)
        .json({ success: false, status: 400, message: "no token" });

    const verefiedToken = jwt.verify(token, process.env.JWT_REFRESH_KEY);
    const registredToken = await RefreshToken.findOne({
      userId: verefiedToken.id,
    });
    if (registredToken?.token !== token)
      return res.status(400).json({
        success: false,
        status: 400,
        message: "invalid refresh token",
      });

    createToken(verefiedToken.id, res);
    return res.status(200).json({
      success: true,
      status: 200,
      message: "token has been refreshed",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "there was an error, try again later",
      success: false,
    });
  }
}
