import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Footer = () => {
  const  {user} = useAuth()
  return (
    <footer className="bg-black text-gray-400 py-8 px-6 md:px-12 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm select-none">
          &copy; {new Date().getFullYear()} MCP Central. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm font-medium">
        { !user && <Link
            to="/developer/dev-login"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            As Dev
          </Link>}
          <a
            href="#"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

  