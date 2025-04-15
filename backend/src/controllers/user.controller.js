import { Server } from "../models/server.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asynchandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";

const generatebothtokens = async (userid) => {
  try {
    const user = await User.findById(userid);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    // console.log("id",user._id)
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };


  } catch (error) {

    throw new ApiError(500, "Internal server error while generating the tokens", error);
  }
}

const registerUser = asynchandler(async (req,res) => {
  const { username, password, email } = req.body;
  if ([username, password, email].some((field) => field.trim === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (email && !email.includes("@")) {
    throw new ApiError(400, "Invalid email format");
  }
  if (password && password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(400, "Username or email already exists");
  }
  const user = await User.create({
    username: username.toLowerCase(),
    password,
    email,
  });
  const createduser = await User.findById(user._id).select("-password -refreshToken");
  if (!createduser) {
    throw new ApiError(400, "Something went wrong while creating user");
  }

  return res.status(201).json(
    new ApiResponse(201, createduser, "User created successfully")
  );



})

const loginUser = asynchandler(async (req, res) => {

  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({
    $or: [{ username }],
  })

  if (!user) {
    throw new ApiError(400, "Invalid username or password");
  }
  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) {
    throw new ApiError(400, "Invalid username or password");
  }
  const { accessToken, refreshToken } = await generatebothtokens(user._id);
  const loggedinuser = await User.findById(user._id).select("-password -refreshToken");
  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200).cookie("refreshToken", refreshToken, options).cookie("accessToken", accessToken, options).json(
    new ApiResponse(200,
      {
        loggedinuser,
        accessToken,
        refreshToken,
      }, "User logged in successfully")
  );
})

const logoutuser = asynchandler(async (req, res) => {


  await User.findByIdAndUpdate(

    req.user._id,
    {
      $set: { refreshToken: undefined }
    },
    {
      new: true,

    }
  )
  const options = {
    httpOnly: true,
    secure: true,
  }

  return res.status(200).clearCookie("accessToken", options).
    clearCookie("refreshToken", options).
    json(
      new ApiResponse(
        200,
        {},
        "the user is succesfully logged out",))
})

const refreshingtheaccesstokens = asynchandler(async (req, res) => {
  const incomingrefresh = req.cookies.refreshToken || req.body.refreshToken

  if (!incomingrefresh) {
    throw new ApiError(401, "unauthorized request")
  }

  try {
    const decodedrefresh = jwt.verify(incomingrefresh, process.env.JWT_REFRESH_SECRET)

    const user = await User.findById(decodedrefresh._id)
    if (!user) {
      throw new ApiError(401, "unauthorized request")
    }

    if (user?.refreshToken !== incomingrefresh) {
      throw new ApiError(401, "refresh token is expired or not valid")
    }


    const options = {
      httpOnly: true,
      secure: true,
    }

    const { newrefreshToken, accessToken } = await generatebothtokens(user._id)

    return res.status(200).
      cookie("accessToken", accessToken, options).
      cookie("refreshToken", newrefreshToken, options).
      json(
        new ApiResponse(
          200,
          {
            accessToken, refreshToken: newrefreshToken,
          },
          "access token refreshed successfully",
        )
      )
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid refresh token")
  }
})


const changecurrpassword = asynchandler(async (req, res) => {

  const { oldpassword, newpassword } = req.body
  const user = await User.findById(req.user?._id)
  const ispasswordcorrect = await user.isPasswordMatch(oldpassword)

  if (!ispasswordcorrect) {
    throw new ApiError(400, "old password is wrong")
  }
  user.password = newpassword
  await user.save({ ValidateBeforeSave: false })
  return res.status(200).json(
    new ApiResponse(200, {}, 'password changed successfully')
  )

})
const SubmittedServers = asynchandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const servers = await Server.find({ submittedBy: userId });

    return res.status(200).json(
      new ApiResponse(200, { servers }, "Servers retrieved successfully")
    );
  } catch (error) {
    throw new ApiError(500, "Error retrieving servers");
  }
});

const userProfile = asynchandler(async (req, res) => {
  const userId = req.user?._id;

  try {
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
      new ApiResponse(200, user, "User profile retrieved successfully")
    );
  } catch (error) {
    throw new ApiError(500, "Error retrieving user profile");

  }
})


export {
  registerUser, loginUser, logoutuser, refreshingtheaccesstokens, changecurrpassword, SubmittedServers, userProfile
};