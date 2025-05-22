
import React, { useEffect, useState } from "react";
import ServerCard from "../components/ServerCard";

import {  getallservers } from "../api/server";
import ServerCardSkeleton from "../components/ServerCardSkeleton";



const AllServers = () => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchServers = async () => {
      try {
        const res = await getallservers();
        const approvedservers = res.data.servers.filter((server) => server.Approved === "approved");
    
        setServers(approvedservers);
        // update this depending on your response 
      } catch (err) {
        console.error("Failed to fetch servers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);


  

  return (
    <div className="bg-gray-950 min-h-screen text-white">
    <div className="max-w-7xl mx-auto px-4 py-8">

      {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServerCardSkeleton key={i} />
            ))}
          </div>
      ) : servers.length === 0 ? (
        <p className="text-center text-gray-400">No servers found which are approved.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
    </div>
    </div>
  );
};

export default AllServers;
