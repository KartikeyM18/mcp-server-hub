import React from 'react'
import Navbar from '../components/Navbar'
import HeadingSection from '../components/HeadingSection'
import ServersSections from '../components/ServersSection'

const Home = () => {
    return (
        <>
            <Navbar />
            <HeadingSection />
            <ServersSections />
        </>
    )
}

export default Home
