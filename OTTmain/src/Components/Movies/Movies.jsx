import React from 'react'
import NavBar from '../Nav'
import Footer from '../Footer'
import MovieCarousel from './MovieCarausal'
import Event from '../Home/FileEvent'
import Movie from '../Home/RenderMovie'
import Hindi from '../Home/RenderCharCard'
import AddBanner from '../AddBanner'

const Movies = () => {
  return (
    <div>
        <NavBar/>
        <MovieCarousel/>
        <AddBanner/>
        <Movie/>
        <Hindi/>
        <Event/>
        <Footer/>
    </div>
  )
}

export default Movies