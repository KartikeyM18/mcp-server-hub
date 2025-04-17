import React from 'react'

const Navbar = () => {
    return (
        <nav className='p-2 relative flex justify-center items-center'>
            <div className='absolute left-4'>
                <h1 className='text-3xl font-bold'>
                    MCP Server Hub
                </h1>
            </div>

            <div className='flex gap-4'>
                <a href="/" className='hover:text-slate-800 text-lg font-semibold'>Home</a>
                <a href="/submit" className='hover:text-slate-800 text-lg font-semibold' >Submit</a>
            </div>

        </nav>
    )
}

export default Navbar
