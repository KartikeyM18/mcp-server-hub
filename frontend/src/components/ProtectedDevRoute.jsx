import { Navigate } from "react-router-dom";
import { useDevAuth } from "../contexts/AuthContext";

const ProtectedDevRoute = ({ children }) => {

  const { dev } = useDevAuth();

 

  if (!dev) {
    // If not logged in, redirect to login
    return <Navigate to="/developer/dev-login" />;
  }

  // If logged in, render the protected component
  return children;
}
export default ProtectedDevRoute;
//