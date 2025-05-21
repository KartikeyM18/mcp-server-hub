import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link, NavLink } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const activeLink = "text-blue-500 border-b-2 border-blue-500";
const inactiveLink =
  "text-white border-b-2 border-transparent hover:text-blue-500 hover:border-blue-500";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  if (loading) return <LoadingSpinner/>

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
<nav className="bg-gradient-to-b from-gray-950 to-black text-white px-6 py-4 shadow-xl sticky top-0 z-50 border-b border-gray-800">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    {/* Logo */}
    <div className="text-2xl font-extrabold text-blue-400 tracking-wide hover:text-cyan-400 transition duration-300">
      <Link to="/">MCP Central</Link>
    </div>

    {/* Desktop nav */}
    <div className="hidden md:flex items-center space-x-8">
      {["/", "/servers", "/submit"].map((path, i) => {
        const label = path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
        return (
          <NavLink
            key={i}
            to={path}
            className={({ isActive }) =>
              `transition duration-300 font-semibold tracking-wide pb-1 ${
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-white border-b-2 border-transparent hover:text-cyan-400 hover:border-cyan-400"
              }`
            }
          >
            {label}
          </NavLink>
        );
      })}

      {!user ? (
        <>
          <Link
            to="/login"
            className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-md border border-blue-500 hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Signup
          </Link>
        </>
      ) : (
        <div className="relative group">
          <User
            className="w-9 h-9 cursor-pointer text-blue-400 hover:text-cyan-400 transition duration-300"
            aria-label="User menu"
          />
          <div className="absolute right-0 mt-3 w-44 bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <Link
              to="/profile"
              className="block px-4 py-3 text-white hover:bg-gray-800 rounded-t-lg"
            >
              {user.username} profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-white hover:bg-gray-800 rounded-b-lg focus:outline-none cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>

    {/* Mobile menu button */}
    <div className="md:hidden">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {menuOpen ? <X className="w-6 h-6 text-blue-400" /> : <Menu className="w-6 h-6 text-blue-400" />}
      </button>
    </div>
  </div>

  {/* Mobile menu */}
  {menuOpen && (
    <div className="md:hidden mt-5 space-y-4 border-t border-gray-800 pt-4 max-w-md mx-auto px-6">
      {[
        { path: "/", label: "Home" },
        { path: "/servers", label: "Servers" },
        { path: "/submit", label: "Submit" },
      ].map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `block font-medium py-3 px-4 rounded-md transition duration-300 ${
              isActive
                ? "text-blue-400 bg-gray-900"
                : "text-white hover:text-cyan-400 hover:bg-gray-900"
            }`
          }
          onClick={() => setMenuOpen(false)}
        >
          {label}
        </NavLink>
      ))}

      {!user ? (
        <>
          <Link
            to="/login"
            className="block text-center bg-blue-600 hover:bg-blue-700 rounded-md py-3 font-semibold shadow"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block text-center border border-blue-500 hover:bg-blue-600 rounded-md py-3 font-semibold mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Signup
          </Link>
        </>
      ) : (
        <div className="space-y-3">
          <Link
            to="/profile"
            className="block py-3 px-4 rounded-md hover:bg-gray-800 transition font-medium"
            onClick={() => setMenuOpen(false)}
          >
            {user.username} profile
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="w-full text-left py-3 px-4 rounded-md hover:bg-gray-800 transition font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )}
</nav>

  );
};

export default Navbar;


