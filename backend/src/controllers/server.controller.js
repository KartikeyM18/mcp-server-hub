import asynchandler from "../utils/asynchandler.js";

import { Server } from "../models/server.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const submitaserver = asynchandler(async (req, res) => {
    const { name, description, sections, githubRepo, tags, status } = req.body;

  
    if (!name || !description || !githubRepo) {
        throw new ApiError(400, "Name, description, and GitHub repository URL are required");
    }

    try {
        const submittedBy = req.user?._id || null; 

        const server = await Server.create({
            name,
            description,
            sections: sections || [], 
            githubRepo,
            tags: tags || [], 
            status: status || "active", 
            submittedBy,
        });

        return res.status(201).json(
            new ApiResponse(201, server, "Server submitted successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error submitting server");
    }
});

const editServer = asynchandler(async (req, res) => {
    const { serverid } = req.params; 
    const { name, description, sections, githubRepo, tags, status } = req.body; 

    if (!serverid) {
        throw new ApiError(400, "Server ID is required");
    }

    try {
      
        const server = await Server.findById(serverid);

        if (!server) {
            throw new ApiError(404, "Server not found");
        }

     
        if (String(server.submittedBy) !== String(req.user._id)) {
            throw new ApiError(403, "You are not authorized to edit this server");
        }

  
        server.name = name || server.name;
        server.description = description || server.description;
        server.sections = sections || server.sections;
        server.githubRepo = githubRepo || server.githubRepo;
        server.tags = tags || server.tags;
        server.status = status || server.status;

        
        const updatedServer = await server.save();

        return res.status(200).json(
            new ApiResponse(200, updatedServer, "Server updated successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error updating server");
    }
});


const deleteServer = asynchandler(async (req, res) => {
      const {serverid}=req.params
        if(!serverid){
            throw new ApiError(400,"server id is required")
        }

      try {
          const server=await Server.findById(serverid)
          if(!server){
              throw new ApiError(404,"server not found")
          }
          if(String(server.submittedBy) !== String(req.user._id)){
              throw new ApiError(403,"you are not authorized to delete this server")
          }
          await server.remove()
          return res.status(200).json(
              new ApiResponse(200,server,"server deleted successfully")
          )
      } catch (error) {
            throw new ApiError(500,"error deleting server")
      }


})

const getallservers = asynchandler(async (res) => {
    try {
       
        const servers = await Server.find().populate('submittedBy', 'name email');

        return res.status(200).json(
            new ApiResponse(200, { servers }, "All servers retrieved successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error retrieving servers");
    }
});




export { submitaserver,editServer,deleteServer,getallservers };