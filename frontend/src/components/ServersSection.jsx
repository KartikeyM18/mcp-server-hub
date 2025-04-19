import React, { useEffect, useState } from 'react'
import ServerCard from './ServerCard'
import axios from 'axios';

const ServersSection = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    useEffect(()=>{
        getServers();
    }, []);

    const [servers, setServers] = useState([]);

    const getServers = async ()=>{
        try {
            const response = await axios.get(`${serverUrl}/allserver`);
            console.log("Response from server:", response.data);
            setServers(response.data.data.servers);
            

        } catch (error) {
            console.error("Error posting data:", error);
        }
    }
    return (
        <div className='flex justify-center mt-10'>
            <div className=' w-4/5'>

                <h2 className='text-4xl text-slate-700 font-bold mb-6'>Newly Released</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {servers.map((server, index)=> <ServerCard key={index} name={server.name} description={server.description}/>)}
                </div>
            </div>
        </div>
    )
}

export default ServersSection
