import Memo from "@/components/User/Memo/Memo";
import Sidebar from "@/layout/UserSideBar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Memo />
      </div>
    </div>
  );
};

export default page;
