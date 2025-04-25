import { useState } from 'react';
import { Link } from 'react-router-dom';


const ServerSearch = ({ servers }) => {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
  ? servers.filter((server) =>
      server.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      )
    )
  : [];


  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <input
        type="text"
        placeholder="🔍 Search servers by tag (e.g., node, react...)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center">No servers found with that tag.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((server, idx) => (
            <Link
              to={`/servers/${server._id}`}
              key={idx}
              className="p-5 bg-black shadow-md rounded-xl b border-1 border-gray-600 hover:shadow-lg transition"
            >
            <div
              key={idx}
              className="p-5 bg-black shadow-md rounded-xl  hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-1">{server.name}</h2>
              <p className="text-gray-600 mb-2">{server.description}</p>
              <div className="flex flex-wrap gap-2">
                {server.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServerSearch;
