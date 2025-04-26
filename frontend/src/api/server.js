import axios from "./axios.js";

export const submitserver = async (serverData) => {
    try {
        const response = await axios.post("/server/submit", serverData);
        return response;
    } catch (error) {
        console.error("Error submitting server:", error);
        throw error;
    }
}

export const getallservers = async () => {
    try {
        const response = await axios.get("/server/allserver");
        return response.data;
    } catch (error) {
        console.error("Error fetching all servers:", error);
        throw error;
    }
}
export const getserverbyid = async (serverid) => {
    try {
        const response = await axios.get(`/server/${serverid}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching server by ID:", error);
        throw error;
    }
}

export const editServer = async (serverid, serverData) => {
    try {
        const response = await axios.put(`/server/edit/${serverid}`, serverData);
        return response.data;
    } catch (error) {
        console.error("Error editing server:", error);
        throw error;
    }
}
export const deleteServer = async (serverid) => {
    try {
        const response = await axios.delete(`/server/delete/${serverid}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting server:", error);
        throw error;
    }

}

export const getSubmittedServers = async () => {
    try {
        const response = await axios.get("/server/submittedserver");
     
        return response.data;
    } catch (error) {
        console.error("Error fetching submitted servers:", error);
        throw error;
    }
}
