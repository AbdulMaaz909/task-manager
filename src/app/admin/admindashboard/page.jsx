import AdminDashboard from "@/components/Admin/AdminDashboard/AdminDashboard";
import AdminSidebar from "@/layout/AdminSideBar";
import React from "react";

const page = () => {
  return (
    <div className="flex">
      <AdminSidebar/>
      <AdminDashboard />
    </div>
  );
};
export default page;
