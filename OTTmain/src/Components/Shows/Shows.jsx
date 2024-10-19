import React from 'react'
import NavBar from '../Nav'
import Footer from '../Footer'
import ShowList from './ShowList'
import AddBanner from '../AddBanner'

const Shows = () => {
  return (
    <div>
        <NavBar/>
        <ShowList/>
        <AddBanner/>
        <Footer/>
    </div>
  )
}

export default Shows