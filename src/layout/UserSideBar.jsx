"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Home,
  Clock,
  Calendar,
  DollarSign,
  FileText,
  StickyNote,
  LogOut
} from "lucide-react";

function Sidebar() {
  const [open, setOpen] = useState(true);

  const menus = [
    { name: "Dashboard", icon: Home, path: "/user/userdashboard" },
    { name: "Add Timesheet", icon: Clock, path: "/user/timesheet" },
    { name: "Leave", icon: Calendar, path: "/user/leave" },
    { name: "Salary", icon: DollarSign, path: "/user/salary" },
    { name: "RequestAprovals", icon: Home, path: "/user/requestaprovals" },
    { name: "Expense", icon: FileText, path: "/user/expense" },
    { name: "Memo", icon: StickyNote, path: "/user/memo" },
    { name: "Logout", icon: LogOut, path: "/" },
  ];

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } bg-[#9694FF] text-black  duration-300 flex flex-col min-h-screen`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h1 className={`font-bold text-2xl ${!open && "hidden"}`}>
          My Company
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
            className="flex items-center gap-3 p-3 hover:bg-purple-600 cursor-pointer"
          >
            <menu.icon size={25} />
            <span className={`${!open && "hidden"} duration-200 text-xl`}>
              {menu.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
