import axios from './axios.js'

export const registerUser = async (userData) => {
    try {
        const response = await axios.post('/user/register', userData)
        return response 

    } catch (error) {
        console.log(error)
        console.error('Error registering user:', error)
        throw error
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await axios.post('/user/login', userData);
       
        return response.data.data.loggedinuser;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post('/user/logout',{
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error('Error logging out user:', error)
        throw error
    }
}

export const getcurentUser = async () => {
    try {
        const response = await axios.get('/user/currentuser',{
            withCredentials: true
        })
      
        return response.data
    } catch (error) {
        
        throw error
    }
}

export const refreshToken = async () => {
    try {
        const response = await axios.post('/user/refresh-token')
        return response.data
    } catch (error) {
        console.error('Error refreshing token:', error)
        throw error
    }
}
export const changePassword = async (passwordData) => {
    try {
        const response = await axios.post('/user/change-password', passwordData , {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error('Error changing password:', error)
        throw error
    }
}
export const getUserProfile = async (username) => {
    try {
        const response = await axios.get(`/user/${username}`)
        return response.data
    } catch (error) {
        console.error('Error fetching user profile:', error)
        throw error
    }
}
export const getSubmittedServers = async () => {
    try {
        const response = await axios.get('/user/submittedservers',{
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error('Error fetching submitted servers:', error)
        throw error
    }
}
