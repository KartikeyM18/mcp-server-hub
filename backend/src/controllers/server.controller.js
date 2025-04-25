import asynchandler from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { Server } from "../models/server.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
            submittedBy
        });

        if (!server) {
            throw new ApiError(400, "Error creating server");
        }

        // If the server is created successfully, push the server ID to the user's submitted servers
        if (submittedBy) {
            const user = await User.findById(submittedBy);
            if (user) {
                user.submittedserver.push(server._id);
                await user.save();
            }
        }
        return res.status(201).json(
            new ApiResponse(201, server, "Server submitted successfully")
        );
    } catch (error) {
        console.error("Error detail:", error);
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
    const { serverid } = req.params
    if (!serverid) {
        throw new ApiError(400, "server id is required")
    }

    try {
        const server = await Server.findById(serverid)
        if (!server) {
            throw new ApiError(404, "server not found")
        }
       
        await Server.findByIdAndDelete(serverid);
        await User.findByIdAndUpdate(
            server.submittedBy,
            { $pull: { submittedserver: serverid } },
            { new: true }
        )
        return res.status(200).json(
            new ApiResponse(200, "server deleted successfully")
        )
    } catch (error) {
        throw new ApiError(500, "error deleting server")
    }


})


const getallservers = asynchandler(async (req, res) => {
    try {

        const servers = await Server.find().populate('submittedBy', 'email');

        return res.status(200).json(
            new ApiResponse(200, { servers }, "All servers retrieved successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error retrieving servers");
    }
});

const getserverbyid = asynchandler(async (req, res) => {
    const { serverid } = req.params;
    if (!serverid) {
        throw new ApiError(400, "Server ID is required");
    }

    try {
        const server = await Server.findById(serverid).populate('submittedBy', 'name email');

        if (!server) {
            throw new ApiError(404, "Server not found");
        }

        return res.status(200).json(
            new ApiResponse(200, server, "Server retrieved successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error retrieving server");
    }
}
);

const getSubmittedServers = asynchandler(async (req, res) => {
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
})


export { submitaserver,editServer,deleteServer,getallservers,getserverbyid ,getSubmittedServers};



