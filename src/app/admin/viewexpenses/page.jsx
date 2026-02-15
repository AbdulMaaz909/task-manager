import React from 'react'
import AdminSidebar from '@/layout/AdminSideBar'
import ViewExpenses from '@/components/Admin/ViewExpenses/ViewExpenses'

const page = () => {
  return (
    <div className='flex'>
        <AdminSidebar/>
        <ViewExpenses/>
    </div>
  )
}

export default page