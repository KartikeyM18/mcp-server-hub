import React from 'react'
import { useAuth } from '../contexts/AuthContext';

const ServerApprove = () => {
    const { user } = useAuth();
    console.log(user);
    if(!user || user.email != 'world@hello.com') return (
        <div className='flex justify-center items-center min-h-screen bg-black text-white text-6xl'>
            Not Authorised!
        </div>
    )


    return (
        <div className='flex justify-center items-center min-h-screen bg-black text-white text-6xl'>
            Authorised!
        </div>
    )
}

export default ServerApprove
