import Timesheet from '@/components/User/TimeSheet/TimeSheet';
import Sidebar from '@/layout/SideBar';

import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <Timesheet/>
    </div>
  )
}
export default page;