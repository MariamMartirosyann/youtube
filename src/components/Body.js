import React from 'react'
import SideBar from './SideBar'
import MainContainer from './MainContainer'
import WatchPage from './WatchPage'
import { Outlet } from 'react-router'

const Body = () => {
  return (
    <div className='flex'>
        <SideBar/>
        <Outlet/>
    </div>
  )
}

export default Body