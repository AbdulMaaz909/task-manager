import AddSalary from '@/components/Admin/AddSalary/AddSalary'
import AdminSidebar from '@/layout/AdminSideBar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <AdminSidebar/>
        <AddSalary/>
    </div>
  )
}

export default page