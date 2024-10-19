import React from 'react'
import NavBar from '../Nav'
import Footer from '../Footer'
import Carausal from '../Movies/MovieCarausal'
import Chennel from './Chennel'
import AddBanner from '../AddBanner'


const Live = () => {
  return (
    <div>
        <NavBar/>
        <Chennel/>
        <AddBanner/>
        <Carausal/>
        <Footer/>
    </div>
  )
}

export default Live