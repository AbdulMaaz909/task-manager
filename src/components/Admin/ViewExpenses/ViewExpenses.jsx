'use client'
import React, { useState } from 'react'

const ViewExpenses = () => {
  const [search, setSearch] = useState("")

  const expenses  = [
    {
      id: 1,
      employee: "Rahul Sharma",
      date: "2026-02-08",
      category: "Travel",
      amount: 1200,
      description: "Client meeting travel expense",
      status: "Approved",
    },
    {
      id: 2,
      employee: "Ayesha Khan",
      date: "2026-02-07",
      category: "Food",
      amount: 800,
      description: "Team lunch expense",
      status: "Pending",
    },
    {
      id: 3,
      employee: "Aman Verma",
      date: "2026-02-06",
      category: "Office Supplies",
      amount: 1500,
      description: "Purchased stationery items",
      status: "Rejected",
    },
  ];

  const filteredExpenses = expenses.filter((item)=>(
    item.employee.toLowerCase().includes(search.toLowerCase())
  ))

  const getStatusColor = (status) => {
    if(status === "Approved") return "text-green-600 bg-green-100";
    if(status === "Pending") return "text-yellow-600 bg-yellow-100";
    if(status === "Rejected") return "text-red-600 bg-red-100";
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Employee Expenses (Admin Panel)
      </h1>

      {/* Search Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by Employee Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="date"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Filter
        </button>
      </div>

      {/* Expense Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="p-4">Employee</th>
              <th className="p-4">Date</th>
              <th className="p-4">Category</th>
              <th className="p-4">Amount (₹)</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">
                  {item.employee}
                </td>
                <td className="p-4">{item.date}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4 font-semibold">₹{item.amount}</td>
                <td className="p-4">{item.description}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewExpenses;