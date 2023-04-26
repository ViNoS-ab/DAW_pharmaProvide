import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshToken.js";

const MAX_AGE = 15 * 60; //max age in seconds = 15 minutes
const MAX_AGE_REFRESH = 60 * 60 * 24 * 60; //max age of refresh in seconds = 60 days

//creates the jwt token and sends the cookie
export const createToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: MAX_AGE,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: MAX_AGE * 1000,
  });
  return token;
};
//creates jwt refresh token and sends the cookie
export const createRefreshToken = async (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_REFRESH_KEY, {
    expiresIn: MAX_AGE_REFRESH,
  });
  res.cookie("jwt_refresh", token, {
    httpOnly: true,
    maxAge: MAX_AGE_REFRESH * 1000,
  });
  await RefreshToken.create({ userId: id, token });
  return token;
};
