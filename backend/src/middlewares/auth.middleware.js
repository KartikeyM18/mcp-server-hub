import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import asynchandler from "../utils/asynchandler.js"
import jwt from "jsonwebtoken"

export const verifyjwt = asynchandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "unauthorized request,no access token provided")
        }
        const decodededtoken = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        const user = await User.findById(decodededtoken._id).select("-password -refreshToken")
        if (!user) {
            throw new ApiError(401, "invalid accessToken user not found")

        }
        req.user = user


        next()
    } catch (error) {
        next(new ApiError(401, error.message || "invalid accessToken"))
    }

})