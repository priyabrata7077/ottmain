import React from 'react'
import NavBar from '../Nav'
import ShowCase from './Showcase'
import FestivalShowcase from './FestivalShowcase'
import Events from './FileEvent'
import RenderChar from './RenderCharCard'
import RederMovie from './RenderMovie'
import Footer from '../Footer'
import AddBanner from '../AddBanner'
const Home = () => {
  return (
    <div>
        <NavBar/>
        <ShowCase/>
        <AddBanner/>
       <FestivalShowcase/>
       {/* <Events/> */}
       <RenderChar/>
       <AddBanner/>
      {/* <RederMovie/> */}
      <Footer/>
    </div>
  )
}

export default Home