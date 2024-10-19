import React from 'react'
import NavBar from '../Nav'
import Footer from '../Footer'
import Channels from './ChannelCard'
import ChannelList from './ChannelList'
import AdBanner from '../AddBanner'
const Channel = () => {
  return (
    <div>
        <NavBar/>
        <ChannelList/>
        <AdBanner/>
        <Channels/>
        <Footer/>
    </div>
  )
}

export default Channel