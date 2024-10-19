import React from 'react'
import style from "./sidebar.module.css"
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div className={style.Menu}>
        <div className={style.part1}>
            <h1>DT Tv</h1>
        </div>
        <div className={style.part2}>
            <h3><Link to="all-series">All Movies</Link></h3>
            <h3><Link to="upload-file">Upload a File/Movie</Link></h3>
            <h3><Link to="trending-series">TV Shows </Link></h3>
            <h3><Link to="#">Users</Link></h3>
            <h3><Link to="#">Subscriptions</Link></h3>
            <h3><Link to="#">Payments</Link></h3>
            <h3><Link to="#">Analytics</Link></h3>
        </div>
    </div>
  )
}

export default Menu