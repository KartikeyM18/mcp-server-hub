import { createContext,useContext,useState,useEffect } from "react";

import { getcurentUser,logoutUser } from "../api/user";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getcurentUser();
                setUser(currentUser.data);
            } catch (error) {

               
               throw new Error("Failed to fetch user");
            } finally {
                setLoading(false);  
            }
        };

        fetchUser();
    }, []);


    const logout = async () => {
        try {
            await logoutUser();
            
            setUser(null);
        } catch (error) {
            console.error("Error logging out:", error);
        }
   
    }
    return (
        <AuthContext.Provider value={{ user,setUser,logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
