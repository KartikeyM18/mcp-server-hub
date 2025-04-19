import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className='p-2 relative flex justify-center items-center mt-4'>
            <div className='absolute left-36'>
                <h1 className='text-3xl font-bold'>
                    MCP Server Hub
                </h1>
            </div>

            <div className='flex gap-4'>
                <button onClick={()=>navigate('/')} className='hover:text-slate-800 text-lg font-semibold cursor-pointer'>Home</button>
                <button onClick={()=>navigate('/submit')} className='hover:text-slate-800 text-lg font-semibold cursor-pointer' >Submit</button>
            </div>

        </nav>
    )
}

export default Navbar
