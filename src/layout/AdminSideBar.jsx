"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  LayoutDashboard,
  Users,
  UserCheck,
  FileText,
  CalendarCheck,
  DollarSign,
  Settings,
  LogOut
} from "lucide-react";

function AdminSidebar() {
  const [open, setOpen] = useState(true);

  const menus = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/admindashboard",
    },
    {
      name: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      name: "Approvals",
      icon: UserCheck,
      path: "/admin/approvals",
    },
    {
      name: "ViewTimesheets",
      icon: CalendarCheck,
      path: "/admin/timesheets",
    },
    {
      name: "ViewExpenses",
      icon: FileText,
      path: "/admin/expenses",
    },
    {
      name: "AddSalary",
      icon: DollarSign,
      path: "/admin/salary",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
    {
      name: "Logout",
      icon: LogOut,
      path: "/",
    },
  ];

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } bg-[#1F2937] text-white duration-300 flex flex-col min-h-screen`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-600">
        <h1 className={`font-bold text-2xl ${!open && "hidden"}`}>
          Admin Panel
        </h1>
        <Menu
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Menu Items */}
      <div className="mt-6 flex-1">
        {menus.map((menu, i) => (
          <Link
            href={menu.path}
            key={i}
            className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer transition"
          >
            <menu.icon size={24} />
            <span className={`${!open && "hidden"} text-lg`}>
              {menu.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminSidebar;
