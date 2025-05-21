import { useEffect, useState } from "react";
import { getserversbyapproval } from "../api/server";
import ServerCard from "../components/ServerCard";
import { useDevAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Devhome() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("approved");

  const { logout } = useDevAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServers = async () => {
      setLoading(true);
      try {
        const res = await getserversbyapproval(filter);
        setServers(res.data.servers);
      } catch (err) {
        console.error("Failed to fetch servers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, [filter]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] text-white px-6 py-8 font-sans">
      <header className="flex justify-between items-center max-w-7xl mx-auto mb-10">
        <div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
            Developer Dashboard
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            View, filter and manage your submitted servers.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-5 py-2 rounded-xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
          Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto mb-8">
        <label htmlFor="filter" className="block text-gray-300 text-sm mb-2 font-medium">
          Filter by Approval Status:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 shadow-md w-full max-w-xs focus:ring-2 focus:ring-pink-500 focus:outline-none transition cursor-pointer"
        >
          <option value="approved">✅ Approved</option>
          <option value="pending">🕓 Pending</option>
          <option value="rejected">❌ Rejected</option>
        </select>
      </div>

      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center text-gray-300 text-xl mt-24 animate-pulse">
            Loading servers...
          </div>
        ) : servers.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-24 italic">
            No servers found for <span className="underline">{filter}</span> status.
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {servers.map((server) => (
              <div
                key={server._id}
                className="bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] p-4 rounded-2xl border border-gray-700 shadow-lg backdrop-blur-md hover:scale-[1.02] transition-all duration-200"
              >
                <ServerCard
                  _id={server._id}
                  name={server.name}
                  description={server.description}
                  tags={server.tags}
                  submittedBy={server.submittedBy}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


