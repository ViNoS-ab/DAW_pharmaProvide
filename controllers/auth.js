import "dotenv/config";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { createRefreshToken, createToken } from "../utils/createTokens.js";
import RefreshToken from "../models/refreshToken.js";
import { sendMail } from "../utils/email.js";

export async function signup(req, res) {
  const { email } = req.body;
  try {
    const exist = await User.findOne({ email: email });
    if (exist)
      return res.status(400).json({
        success: false,
        message: "email already exists",
      });
    const verifyCode = crypto.randomBytes(32).toString("hex");
    const verificationCode = crypto
      .createHash("sha256")
      .update(verifyCode)
      .digest("hex");

    const user = await User.create({ ...req.body, verificationCode });

    createToken(user._id, res);
    createRefreshToken(user._id, res);

    await sendMail({
      email,
      subject: "email verification",
      text: `click the following link to verify your email :\n http://localhost:5000/api/auth/verifyEmail/${verifyCode}`,
    });

    res.status(201).json({
      success: true,
      data: {
        ...user.toObject(),
        password: undefined,
        verificationCode: undefined,
        __v: undefined,
      },
    });
  } catch (e) {
    res.status(400).json({ status: 400, message: e.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = email && (await User.findOne({ email: email + "" }));
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "incorrect email" });

    const isMatch =
      password && (await bcrypt.compare(password, user.password));
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "wrong pasword" });

    createToken(user._id, res);
    await createRefreshToken(user._id, res);

    return res.status(200).json({
      success: true,
      data: {
        ...user.toObject(),
        password: undefined,
        verificationCode: undefined,
        __v: undefined,
      },
      message: "you are logged in",
    });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
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
      .json({ success: true, message: "you are logged out" });
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
      return res.status(400).json({ success: false, message: "no token" });

    const verefiedToken = jwt.verify(token, process.env.JWT_REFRESH_KEY);
    const registredToken = await RefreshToken.findOne({
      userId: verefiedToken.id,
    });
    if (registredToken?.token !== token)
      return res
        .status(400)
        .json({ success: false, message: "invalid refresh token" });

    createToken(verefiedToken.id, res);
    return res
      .status(200)
      .json({ success: true, message: "token has been refreshed" });
  } catch (error) {
    return res.status(500).json({
      message: "there was an error, try again later",
      success: false,
    });
  }
}

export async function verifyEmail(req, res) {
  try {
    const verificationCode = crypto
      .createHash("sha256")
      .update(req.params?.code)
      .digest("hex");

    const user = await User.updateOne(
      { verificationCode },
      { verified: true, verificationCode: undefined }
    );

    if (!user)
      return res.status(401).json({
        status: 401,
        message: "Could not verify email",
      });

    return res.status(200).json({
      status: 200,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong, try it later",
    });
  }
};
