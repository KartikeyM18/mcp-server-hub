import { useEffect, useState } from "react";
import { getallservers } from "../api/server";
import ServerCard from "../components/ServerCard";
import ServerSearch from "../components/SearchServer";

export default function Home() {
  const tags = [
    "Community", "Database", "API", "Data", "Cloud", "Kubernetes", "AI", "Vector", "Browser", "Docker",
    "Security", "Monitoring", "HTTP", "Github", "Communication", "Youtube"
  ];



   const [servers, setServers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [searchedserver,setSearchServer] = useState([]);
   useEffect(() => {
 
     const fetchServers = async () => {
       try {
         const res = await getallservers();
         setSearchServer(res.data.servers);
         const sortedServers = [...res.data.servers].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
         const limitedServers = sortedServers.slice(0, 3); 
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
    <div className="bg-black text-white min-h-screen flex flex-col">
   

      {/* Hero */}
      <header className="text-center py-20 bg-gradient-to-b from-black to-gray-900">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-500">From Server to Solution: The Best MCP Tools in One Place</h1>
        <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
        Optimize LLM Performance with MCP Servers – Find the Ideal Tools for Your Workflow
        </p>
      </header>

      {/* Tag Explorer */}
      <section className="px-6 md:px-12 py-12">
        <h2 className="text-2xl font-semibold mb-4">Explore by Tags</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map(tag => (
            <span key={tag} className="bg-gray-800 text-sm px-3 py-1 rounded-full hover:bg-blue-600 transition">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-6 md:px-12 py-12">
       <ServerSearch servers={searchedserver} />
      </section>

      {/* Newly Released Servers */}
      <section className="px-6 md:px-12 py-12">
        <h2 className="text-2xl font-semibold mb-6">Newly Released</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          { loading ? (
        <p className="text-center">Loading servers...</p>
      ) : servers.map((server) => 
        (
          <ServerCard
          key={server._id}
          _id={server._id}
          name={server.name}
          description={server.description}
          tags={server.tags}
          submittedBy={server.submittedBy}
        />
          )
          )}
        </div>
      </section>

    
    </div>
  );
}

