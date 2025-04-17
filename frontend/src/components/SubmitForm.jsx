import React from 'react'

const SubmitForm = () => {
    return (
        <div className='flex justify-center items-center mt-10'>
            <form className='w-[700px] flex flex-col gap-9'>
                <h1 className='text-4xl text-slate-700 font-bold text-center'>MCP Server you want to submit</h1>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>Server Name *</p>
                    <input type="text" className='border border-gray-300 shadow w-80 p-1 px-1.5 rounded-md' />
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>URL *</p>
                    <input type="text" className='border border-gray-300 shadow w-80 p-1 px-1.5 rounded-md' />
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>Description *</p>
                    <textarea rows={4} className='border border-gray-300 shadow p-1 px-1.5 rounded-md' />
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='text-xl font-semibold text-slate-800'>Email *</p>
                    <input type="text" className='border border-gray-300 shadow w-80 p-1 px-1.5 rounded-md' />
                </div>

                <button className='bg-black text-white p-1 pb-1.5 px-4 rounded-lg font-semibold w-fit'>Submit</button>

            </form>
        </div>
    )
}

export default SubmitForm
