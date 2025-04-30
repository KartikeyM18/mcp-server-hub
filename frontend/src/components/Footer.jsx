const Footer = () => {
    return (
      <footer className="bg-black text-gray-400 py-8 px-6 md:px-12 mt-auto border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} MCP Central. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-blue-500">Privacy</a>
            <a href="#" className="hover:text-blue-500">Terms</a>
            <a href="#" className="hover:text-blue-500">Contact</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  