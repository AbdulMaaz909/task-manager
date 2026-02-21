import ViewMemo from '@/components/Admin/ViewMemo/ViewMemo'
import AdminSidebar from '@/layout/AdminSideBar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <AdminSidebar/>
        <ViewMemo/>
    </div>
  )
}

export default page