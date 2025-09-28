import SalaryPage from '@/components/User/Salary/page';
import Sidebar from '@/layout/SideBar';
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <SalaryPage/>
    </div>
  )
}
export default page;
