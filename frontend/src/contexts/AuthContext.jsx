import { createContext,useContext,useState,useEffect } from "react";

import { getcurentUser,logoutUser } from "../api/user";
import { Logindeveloper, Logoutdeveloper } from "../api/developer";


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



const DevAuthContext = createContext();

export const DevAuthProvider = ({ children }) => {
  const [dev, setDev] = useState(null); // Store dev info (like token or data)
    // const [loadingdev, setLoadingdev] = useState(true);
   
  const logout = async () => {
    try {
      await Logoutdeveloper();
      setDev(null)
      ; // Clear dev data on logout
    } catch (error) {
      console.error("Error logging out developer:", error);
    }
  }

  return (
    <DevAuthContext.Provider value={{ dev, logout ,setDev }}>
      {children}
    </DevAuthContext.Provider>
  );
};

export const useDevAuth = () => useContext(DevAuthContext);

