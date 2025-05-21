import { useEffect, useState } from "react";
import axios from "axios";
import ServerCard from "./ServerCard"; // Ensure this is the correct import path

const ServersSection = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [servers, setServers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getServers();
  }, []);

  const getServers = async () => {
    try {
      const response = await axios.get(`${serverUrl}/allserver`);
      setServers(response.data.data.servers);
    } catch (error) {
      console.error("Error fetching servers:", error);
      setError("Failed to load servers. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-gray-950 text-white min-h-screen">
      <div className="w-full max-w-6xl">
        <h2 className="text-4xl font-bold mb-8 text-white">🚀 Newly Released</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-800 text-white rounded shadow">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map((server, index) => (
            <ServerCard
              key={index}
              name={server.name}
              description={server.description}
              id={server._id}
            />
          ))}
        </div>

        {!error && servers.length === 0 && (
          <p className="text-center mt-10 text-gray-400">No servers found.</p>
        )}
      </div>
    </div>
  );
};

export default ServersSection;
