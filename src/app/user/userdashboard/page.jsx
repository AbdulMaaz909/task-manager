// import Dashboard from '@/components/User/UserDashboard/UserDashboard';
import Chatbot from '@/components/Chatbot/Chatbot';
import UserDashboard from '@/components/User/UserDashboard/UserDashboard';
import Sidebar from '@/layout/SideBar';
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <UserDashboard/>
        <Chatbot/>
    </div>
  )
}
export default page;