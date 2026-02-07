import Users from '@/components/Admin/Users/Users'
import AdminSidebar from '@/layout/AdminSideBar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
      <AdminSidebar/>
      <Users/>
    </div>
  )
}

export default page
