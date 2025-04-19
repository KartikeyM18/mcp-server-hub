import React, { useState } from 'react'
import axios from 'axios'

const SubmitForm = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const [infoObj, setInfoObj] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${serverUrl}/submit`, infoObj, {
                withCredentials: true,
            });
            console.log("Response from server:", response.data);
            setIsSubmitted(true);

        } catch (error) {
            console.error("Error posting data:", error);
        }
    }

    if(isSubmitted){
        return <div className='flex flex-col items-center mt-20 gap-5'>
            <h1 className='text-4xl text-slate-700 font-bold text-center'>Done!</h1>
            
            <p className='text-xl font-semibold text-slate-800'>Thanks for your submission! We'll review and display your MCP Server later.</p>
        </div>
    }

    return (
        <div className='flex justify-center items-center mt-10'>
            <div className='w-[700px] flex flex-col gap-9'>
                <h1 className='text-4xl text-slate-700 font-bold text-center'>MCP Server you want to submit</h1>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>Server Name *</p>
                    <input type="text" className='border border-gray-300 shadow w-80 p-1 px-1.5 rounded-md'
                        onChange={(e) => {
                            setInfoObj({ ...infoObj, name: e.target.value });
                        }} />
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>URL *</p>
                    <input type="text" className='border border-gray-300 shadow w-80 p-1 px-1.5 rounded-md'
                        onChange={(e) => {
                            setInfoObj({ ...infoObj, githubRepo: e.target.value });
                        }} />
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>Description *</p>
                    <textarea rows={4} className='border border-gray-300 shadow p-1 px-1.5 rounded-md'
                        onChange={(e) => {
                            setInfoObj({ ...infoObj, description: e.target.value });
                        }} />
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>Email *</p>
                    <input type="text" className='border border-gray-300 shadow w-80 p-1 px-1.5 rounded-md'
                        onChange={(e) => {
                            setInfoObj({ ...infoObj, submittedBy: e.target.value });
                        }} />
                </div>

                <button
                    className='bg-black text-white p-1 pb-1.5 px-4 rounded-lg font-semibold w-fit'
                    onClick={handleSubmit}>Submit</button>

            </div>
        </div>
    )
}

export default SubmitForm
