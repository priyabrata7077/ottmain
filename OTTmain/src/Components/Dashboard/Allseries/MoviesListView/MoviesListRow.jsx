import React from 'react'

const MoviesListRow = (props) => {
  return (

    <tr>
      <td>{props.title}</td>
      <td>{props.genre}</td>
      <td>{props.release_date}</td>
      <td>{props.rating}</td>
      <td>{props.views}</td>
      <td>
        <button className='btn' style={{ background: '#33526E', color: '#fff' }}>Edit</button>
        <button className='btn btn-danger ms-1'>Delete</button>
      </td>
    </tr>

  )
}

export default MoviesListRow
