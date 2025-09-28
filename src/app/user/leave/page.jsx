import LeaveManagement from '@/components/User/Leave/Leave';
import Sidebar from '@/layout/SideBar';
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <LeaveManagement/>
    </div>
  )
}
export default page;