import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import asynchandler from "../utils/asynchandler.js"
import jwt from "jsonwebtoken"

export const verifyjwt = asynchandler(async (req, _, next) => {
  try {
    const bearerToken = req.header("Authorization");
    const token = req.cookies?.accessToken || (bearerToken && bearerToken.replace("Bearer ", ""));

    if (!token) {
      throw new ApiError(401, "unauthorized request, no access token provided");
    }

    const decodedtoken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decodedtoken._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "invalid accessToken user not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, error.message || "invalid accessToken"));
  }
});


;

export const optionalJwt = async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      req.user = null;
      return next();
    }

    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
      req.user = "guest";
    } else {
      req.user = user;
    }
  } catch (error) {
    // Token is invalid or expired
    req.user = null;
  }

  next();
};

export const isDevAuthenticated = (req, res, next) => {
  const token = req.cookies?.devToken;
  if (!token) throw new ApiError(401, "Not authenticated");

  try {
    const decoded = jwt.verify(token, process.env.JWT_DEV_SECRET);
    if (decoded.role !== "developer") throw new ApiError(403, "Forbidden");
    req.user = decoded;
    next();
  } catch (err) {
    req.user = null;
    throw new ApiError(401, "Invalid or expired token");
  }
};

