import React from 'react'
import MainContentCard from './MainContentCard' // importing card component
import summaryData from './maincontentdata'    // importing card data

const MainContent = () => {
  return (
    <div className='p-2'>
      <h3 className='ms-3'>Dashboard</h3>
      <hr />
      <div className='d-flex flex-wrap justify-content-between'>
        {
          summaryData.map((data)=>{
            return(
              <MainContentCard heading={data.heading} quantity={data.quantity} />
            )
          })
        }
      </div>
    </div>
  )
}

export default MainContent
