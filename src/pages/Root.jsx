import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
const Root = () => {
  return (
    <div className='flex'>
      <SideBar />
      <div className='w-4/5'>
        <Header/>
         <Outlet />
      </div>
     
    </div>
  );
};

export default Root;
