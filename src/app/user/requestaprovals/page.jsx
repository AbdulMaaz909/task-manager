import React from 'react'
import Sidebar from "@/layout/UserSideBar";
import RequestAprovals from '@/components/RequestAprovals/RequestAprovals';
const page = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <RequestAprovals/>
    </div>
  )
}

export default page