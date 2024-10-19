import React from 'react'
import style from './dashboard.module.css'
import Nav from './Nav/Nav'
import Sidebar from './Sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import MainContent from './MainContent/MainContent'

const Dashboard = () => {
  const location = useLocation();
  return (
    <div className={style.dashboardWrapper}>
      <div>
        <Sidebar />
      </div>
      <div className={style.dashboardContentWrapper}>
        <div style={{ position: 'sticky', top: '0', width: '100%', zIndex: '1' }}>
          <Nav />
        </div>
        <div>
          {location.pathname === '/dashboard' ? <MainContent /> : <Outlet />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard