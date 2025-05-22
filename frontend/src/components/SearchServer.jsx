import { useState } from "react";
import { Link } from "react-router-dom";

const ServerSearch = ({ servers }) => {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? servers.filter((server) =>
        server.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
      )
    : [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <input
        type="text"
        aria-label="Search servers by tag"
        placeholder="🔍 Search servers by tag (e.g., node, react...)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border border-gray-700 rounded-xl bg-gray-900 text-white
                   placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 transition"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-center">{ search === "" ? "" : "No servers found with that tag"}</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((server) => (
            <Link
              to={`/servers/${server._id}`}
              key={server._id}
              className="block p-5 bg-gray-900 border border-gray-700 rounded-xl shadow-md
                         hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-white">{server.name}</h2>
              <p className="text-gray-400 mb-3">{server.description}</p>
              <div className="flex flex-wrap gap-2">
                {server.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white bg-opacity-20 text-black text-sm rounded-full select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServerSearch;


