import React from 'react'

const MainContentCard = (props) => {
  const style = {
    backgroundColor: '#33526E',
    borderLeft: '3px solid #D51F53',
    width: '20rem',
    borderRadius: '15px',
  }
  return (
    <div>
      <div>
        <div className="card text-white mb-4" style={style}>
          <div className="card-body">
            <h5>{props.heading}</h5>
            <h2>{props.quantity}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContentCard
