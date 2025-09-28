import ExpensePage from '@/components/User/Expense/Expense';
import Sidebar from '@/layout/SideBar';
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <ExpensePage/>
    </div>
  )
}
export default page;
