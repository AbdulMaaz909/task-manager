"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push('/');
  }

  const menus = [
    { name: "Dashboard", icon: Home, path: "/user/userdashboard" },
    { name: "Add Timesheet", icon: Clock, path: "/user/timesheet" },
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
  menu.name === "Logout" ? (
    <div
      key={i}
      onClick={handleLogout}
      className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer transition"
    >
      <menu.icon size={24} />
      <span className={`${!open && "hidden"} text-lg`}>
        {menu.name}
      </span>
    </div>
  ) : (
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
  )
))}

      </div>
    </div>
  );
}

export default Sidebar;
