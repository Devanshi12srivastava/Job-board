import React from 'react'
import {Outlet} from "react-router-dom";
import Header from '../Header';
import Profile from '../Profile';
const Applayout = () => {
  return (
    <div >
  <div className="grid-background "></div>
  <main className='min-h-screen container'>
    <Header/>
      <Outlet/>
      <Profile/>
</main>
<div className='p-10 text-center bg-purple-400 '>
  Find a Job❤️
</div>
    </div>
  )
}

export default Applayout;
