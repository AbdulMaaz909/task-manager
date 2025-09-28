import AdminDashboard from '@/components/Admin/AdminDashboard/AdminDashboard';
import Sidebar from '@/layout/SideBar';
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <AdminDashboard/>
    </div>
  )
}
export default page;
