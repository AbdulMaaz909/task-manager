import Timesheet from "@/components/User/TimeSheet/TimeSheet";
import Sidebar from "@/layout/UserSideBar";

import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
      <Timesheet />
    </div>
    </div>
  );
};
export default page;
