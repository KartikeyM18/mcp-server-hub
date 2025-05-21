
import { Navigate } from 'react-router-dom';
import { useAuth, useDevAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If not logged in, redirect to login
    return <Navigate to="/login" />;
  }




  // If logged in, render the protected component
  return children;
};

export default ProtectedRoute;
