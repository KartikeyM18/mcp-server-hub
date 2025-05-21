
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Layout from './Layout'
import Submit from './pages/Submit'
import Profile from './pages/Profile'
import AllServers from './pages/AllServers'
import Server from  './pages/Server'
import EditServer from './pages/EditServer'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import { useAuth } from './contexts/AuthContext'
import Logindev from './components/Logindev'
import Devhome from './pages/Devhome'
import ProtectedDevRoute from './components/ProtectedDevRoute'
import GiveApproval from './pages/GiveApproval'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorFallback from './components/ErrorBoundary'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorFallback error={new Error("Root error")} />}>
      <Route index element={<Home />} errorElement={<ErrorFallback error={new Error("Home error")} />} />
      <Route path="login" element={<Login />} errorElement={<ErrorFallback error={new Error("Login error")} />} />
      <Route path="register" element={<Signup />} errorElement={<ErrorFallback error={new Error("Signup error")} />} />
      <Route path="submit" element={<Submit />} errorElement={<ErrorFallback error={new Error("Submit error")} />} />
      <Route path="profile" element={<Profile />} errorElement={<ErrorFallback error={new Error("Profile error")} />} />
      <Route path="servers" element={<AllServers />} errorElement={<ErrorFallback error={new Error("All servers error")} />} />
      <Route path="servers/:serverid" element={<Server />} errorElement={<ErrorFallback error={new Error("Server error")} />} />
      <Route path="servers/edit/:serverid" element={<ProtectedRoute><EditServer /></ProtectedRoute>} errorElement={<ErrorFallback error={new Error("Edit server error")} />} />
      
      <Route path="developer" errorElement={<ErrorFallback error={new Error("Developer route error")} />}>
        <Route path="dev-login" element={<Logindev />} />
        <Route path="dev-home" element={<ProtectedDevRoute><Devhome /></ProtectedDevRoute>} />
        <Route path="giveapproval/:serverid" element={<ProtectedDevRoute><GiveApproval /></ProtectedDevRoute>} />
      </Route>

      <Route path="404" element={<NotFound />} />
<Route path="*" element={<Navigate to="/404" replace />} />

    </Route>
  )
);

function App() {
  const { loading } = useAuth();
  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-black text-white"><LoadingSpinner/></div>;
  }
  
  return ( 
    <RouterProvider router={router}>
         
    </RouterProvider>
  )
}

export default App
