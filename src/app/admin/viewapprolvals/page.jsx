import React from 'react'
import Sidebar from '@/layout/UserSideBar'
import ViewApprolvals from '@/components/Admin/ViewApprolvals/ViewApprolvals'

const page = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <ViewApprolvals/>
    </div>
  )
}

export default page