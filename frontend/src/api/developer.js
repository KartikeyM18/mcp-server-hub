import axios from "./axios.js";

export const Logindeveloper = async (developerData) => {
    try {
        const response = await axios.post("/developer/login", developerData);
        console.log("Developer login response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting developer:", error);
        throw error;
    }
}

export const Logoutdeveloper = async () => {
    try {
        const response = await axios.post("/developer/logout");
        console.log("Developer register response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting developer:", error);
        throw error;
    }
}


export const Getdeveloper = async () => {
    try {
        const response = await axios.get("/developer/getdev",{
            withCredentials: true,
        });
        console.log("Developer register response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting developer:", error);
        throw error;
    }
}

export const Acceptserver = async (serverid) => {
    try {
        const response = await axios.post(`/developer/accept/${serverid}`,  {
            withCredentials: true,
        });
        console.log("Developer register response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting developer:", error);
        throw error;
    }
}
export const Rejectserver = async (serverid, message) => {
    try {
        const response = await axios.post(`/developer/reject/${serverid}`, message, {
            withCredentials: true,
        });
        console.log("Developer register response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting developer:", error);
        throw error;
    }
}
export const Refreshapprovel = async (serverid) => {
    try {
        const response = await axios.post(`/developer/refresh/${serverid}`, {}, {
            withCredentials: true,
        });
        console.log("Developer register response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting developer:", error);
        throw error;
    }
}

