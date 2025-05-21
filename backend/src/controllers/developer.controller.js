
import asynchandler from "../utils/asynchandler.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import jwt from "jsonwebtoken"
import { Server } from "../models/server.model.js";
import Message from "../models/Message.model.js";
import { User } from "../models/user.model.js";
const matchcredentials = async (username, password) => {
    if (!username || !password) {
        throw new ApiError(400, "Username and password are required");
    }

    if(!(username === process.env.DEV_USERNAME && password === process.env.DEV_PASSWORD)){
        return false
    }
    
    
    return true
}
const logindev = asynchandler(async (req,res) => {
    const { username, password } = req.body;
    if ([username, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const isValid = await matchcredentials(username, password);
    if (!isValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    
    const token = jwt.sign({username,role:"developer"},process.env.JWT_DEV_SECRET, {expiresIn:"1d"})

    res.cookie("devToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });


return res.status(200).json(new ApiResponse(200, { username }, "Login successful"));

})

const logoutdev = asynchandler(async (req, res) => {
  
    res.status(200).clearCookie("devToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    }).json(new ApiResponse(200, {}, "Logout successful"));

    
})

const getdev = asynchandler(async (req, res) => {
    const decoded = req.user
    return res.status(200).json(new ApiResponse(200, { decoded }, "developer data fetched successfully"));
})

const acceptserver = asynchandler(async (req,res)=>{
    const {serverid} = req.params
  
    
    if(!serverid){
        throw new ApiError(400,"server id is required")
    }
    const server = await Server.findById(serverid)
    if(!server){
        throw new ApiError(404,"server not found")
    }

     if(!server.submittedBy || server.submittedBy === null){
        throw new ApiError(400,"server has no submitter Because it is submitted by a bot")
    }
    
 

     
   

 
   
    server.Approved = "approved"
    
    
    await server.save()
    return res.status(200).json(new ApiResponse(200, {}, "server approved successfully"))
})

const rejectserver = asynchandler(async (req,res)=>{
    const {serverid} = req.params
    const {message} = req.body
    
    if(!serverid){
        throw new ApiError(400,"server id is required")
    }
    const server = await Server.findById(serverid)
    if(!server){
        throw new ApiError(404,"server not found")
    }

      if(!server.submittedBy || server.submittedBy === null){
        throw new ApiError(400,"server has no submitter Because it is submitted by a bot")
    }


    const notify = await Message.create({
        receiver: server.submittedBy,
        content: message || "the server has been rejected",
        forserver: serverid
    })

    if(!notify){
        throw new ApiError(500,"failed to send notification")
    }
     
  

    await User.findByIdAndUpdate(server.submittedBy, {
        $push: { messages: notify._id }
    })
    server.Approved = "rejected"
    server.rejectionMessage = notify._id
    await server.save()
    return res.status(200).json(new ApiResponse(200, {notify}, "server rejected successfully"))
}
)

const refreshapprovel = asynchandler(async (req,res)=>{
    const {serverid} = req.params
  

    if(!serverid){
        throw new ApiError(400,"server id is required")
    }
    const server = await Server.findById(serverid)
    if(!server){
        throw new ApiError(404,"server not found")
    }
    if(!server.submittedBy || server.submittedBy === null){
        throw new ApiError(400,"server has no submitter Because it is submitted by a bot")
    }
    if(server.Approved === "approved"){
         server.Approved = "pending"
    }
    else if(server.Approved === "rejected"){
        server.Approved = "pending"
    }
    else if(server.Approved === "pending"){
        server.Approved = "pending"
    }
    else{
        throw new ApiError(400,"server status is invalid")
    }
    
 
    await server.save()
    return res.status(200).json(new ApiResponse(200, {}, "server status changed successfully"))
})
export { logindev ,logoutdev , getdev, acceptserver, rejectserver,refreshapprovel}