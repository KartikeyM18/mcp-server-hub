import { useEffect, useState } from "react";
import { getallservers } from "../api/server";
import ServerCard from "../components/ServerCard";
import ServerSearch from "../components/SearchServer";
import ServerCardSkeleton from "../components/ServerCardSkeleton";
export default function Home() {
  const tags = [
    "Community", "Database", "API", "Data", "Cloud", "Kubernetes", "AI", "Vector", "Browser", "Docker",
    "Security", "Monitoring", "HTTP", "Github", "Communication", "Youtube"
  ];

  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedserver, setSearchServer] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await getallservers();
        setSearchServer(res.data.servers);

        const sortedServers = [...res.data.servers].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const limitedServers = sortedServers.slice(0, 6).filter((server) => server.Approved === "approved");
        setServers(limitedServers);
      } catch (err) {
        console.error("Failed to fetch servers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  return (
    <div className="bg-[#121212] text-gray-200 min-h-screen flex flex-col">
      
      {/* Hero Section */}
      <header className="text-center py-28 px-6 md:px-12 bg-gradient-to-b from-[#263958] to-[#0F172A] shadow-lg">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-[#3083ea] via-[#b4d2ee] to-[#1062a4] bg-clip-text text-transparent drop-shadow-lg">
          From Server to Solution: The Best MCP Tools in One Place
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-lg md:text-xl font-medium tracking-wide">
          Optimize LLM Performance with MCP Servers – Find the Ideal Tools for Your Workflow
        </p>
      </header>

      {/* Tag Explorer */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 tracking-wide text-[#22e6df] drop-shadow-md">
          Explore by Tags
        </h2>
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {tags.map((tag) => (
            <span
              key={tag}
              className="cursor-pointer bg-[#1F2937] text-[#a5b4fc] px-5 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-[#14b8a6] hover:text-[#0f172a] transition duration-300 ease-in-out"
              title={`Filter by ${tag}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto mb-20">
        <ServerSearch servers={searchedserver} />
      </section>

      {/* Newly Released */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-[#22c5b8] drop-shadow-md">
          🆕 Newly Released Servers
        </h2>

        {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServerCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {servers.map((server) => (
              <ServerCard
                key={server._id}
                _id={server._id}
                name={server.name}
                description={server.description}
                tags={server.tags}
                submittedBy={server.submittedBy}
                onclickroute={`/servers/${server._id}`}
                status={server.status}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

