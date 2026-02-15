import ViewTimesheet from '@/components/Admin/ViewTimesheet/ViewTimesheet'
import AdminSidebar from '@/layout/AdminSideBar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
    <AdminSidebar/>
    <ViewTimesheet/>
    </div>
  )
}

export default page