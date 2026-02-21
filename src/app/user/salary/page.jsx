import SalaryPage from "@/components/User/Salary/Salary";
import Sidebar from "@/layout/UserSideBar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <Sidebar />
      <SalaryPage />
    </div>
  );
};
export default page;
