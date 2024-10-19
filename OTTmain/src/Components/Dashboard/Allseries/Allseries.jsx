import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import MoviesListView from './MoviesListView/MoviesListView'


const Allseries = () => {
  return (
    <div className='p-2'>
      <h3 className='ms-3 my-1'><span>Dashboard</span><span>/</span>All Movies</h3>
      <hr />
      <div className=''>
        <MoviesListView />
      </div>
    </div>
  )
}

export default Allseries
