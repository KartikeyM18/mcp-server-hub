
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
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

import { useAuth } from './contexts/AuthContext'
const router = createBrowserRouter(
  createRoutesFromElements(
     <Route path="/" element={<Layout/>}> 
      <Route path='' element={<Home/>} />
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<Signup/>} />
      <Route path='submit' element={<Submit/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='servers' element={<AllServers/>}/>
      <Route path='servers/:serverid' element={<Server/>} />
      <Route path='servers/edit/:serverid' element={<EditServer/>}/>
      
     </Route>
  
  )
)
function App() {
  const { loading } = useAuth();
  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-black text-white">Loading...</div>;
  }
  return ( 
    <RouterProvider router={router}>
         
    </RouterProvider>
  )
}

export default App
