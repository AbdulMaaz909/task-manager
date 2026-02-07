"use client";
import React from 'react'

const Users = () => {
  const users = [
    { id: 1, name: "Abdul Maaz", email: "abdul@gmail.com", role: "User" },
    { id: 2, name: "Rahul Sharma", email: "rahul@gmail.com", role: "User" },
    { id: 3, name: "Ayesha Khan", email: "ayesha@gmail.com", role: "User" },
    { id: 4, name: "Admin One", email: "admin@gmail.com", role: "Admin" },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Users Management
        </h1>
        <p className="text-sm text-gray-500">
          Total Users: <span className="font-medium">{users.length}</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {users.length}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Admins</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {users.filter((u) => u.role === "Admin").length}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Normal Users</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {users.filter((u) => u.role === "User").length}
          </h2>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.role === "Admin"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Users;
