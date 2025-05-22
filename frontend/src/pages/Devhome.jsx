import { useEffect, useState } from "react";
import { getserversbyapproval } from "../api/server";
import ServerCard from "../components/ServerCard";
import { useDevAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ServerCardSkeleton from "../components/ServerCardSkeleton";
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
            View, Approve and manage user's submitted servers.
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
  <label
    htmlFor="filter"
    className="block text-sm font-semibold text-gray-100 mb-2"
  >
    Filter by Approval Status
  </label>
  <div className="relative w-full max-w-xs">
    <select
      id="filter"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="appearance-none w-full px-4 py-3 pr-10 rounded-lg bg-gray-800 text-white border border-gray-700 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:outline-none transition duration-150 ease-in-out cursor-pointer"
    >
      <option value="approved">✅ Approved</option>
      <option value="pending">🕓 Pending</option>
      <option value="rejected">❌ Rejected</option>
    </select>
    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      <svg
        className="h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>


      <main className="max-w-7xl mx-auto">
        {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServerCardSkeleton key={i} />
            ))}
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
                className=" p-4 rounded-2xl border border-gray-900 shadow-lg backdrop-blur-md hover:scale-[1.02] transition-all duration-200"
              >
                <ServerCard
                  _id={server._id}
                  name={server.name}
                  description={server.description}
                  tags={server.tags}
                  submittedBy={server.submittedBy}
                  onclickroute={`/developer/dev-home/${server._id}`}
                  status={server.status}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


