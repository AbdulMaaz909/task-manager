import React from 'react'
import AdminSidebar from '@/layout/AdminSideBar'
import Setting from '@/components/Admin/Setting/Setting'

const page = () => {
  return (
    <div className='flex'>
        <AdminSidebar/>
        <Setting/>
    </div>
  )
}

export default page