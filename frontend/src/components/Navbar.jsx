
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link,NavLink} from 'react-router-dom';
import { User } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
   const { user,logout,loading} = useAuth();
  
  
  if (loading) return <p>Loading</p>; // or a loading spinner
  
  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-500"><Link to="/">MCP Central</Link> </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/"  className={({isActive})=> `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
}>Home</NavLink> 
<NavLink to="/servers"  className={({isActive})=> `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
}>Servers</NavLink> 
<NavLink to="/submit"  className={({isActive})=> `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
}>Submit</NavLink>
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded border border-blue-600 hover:bg-blue-600 transition">Signup</Link>
            </>
          ) : (
            <div className="relative group">
              <User className="w-9 h-9 rounded-full cursor-pointer" />
              <div className="absolute right-0 mt-2 w-40 bg-black text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 z-10">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-900 ">{user ? `${user?.username} profile`: "Guest profile"}</Link>
                <Link to="/" onClick={logout} className="block px-4 py-2  hover:bg-gray-900">Logout</Link>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4"> 
        <NavLink to="/"  className={({isActive})=> `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
      }>Home</NavLink>
       <NavLink to="/servers"  className={({isActive})=> `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
    }>Servers</NavLink> 
     <NavLink to="/submit"  className={({isActive})=> `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
}>Submit</NavLink>

          {!user ? (
            <>
              <Link to="/login" className="block px-4 py-2 bg-blue-600 rounded text-center hover:bg-blue-700">Login</Link>
              <Link to="/register" className="block px-4 py-2 border border-blue-600 rounded text-center hover:bg-blue-600">Signup</Link>
            </>
          ) : (
            <div className="space-y-2">

              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-800 rounded">{user ? `${user?.username} profile`: "Guest profile"}</Link>
              <Link to="/" onClick={logout} className="block px-4 py-2 hover:bg-gray-800 rounded">Logout</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

