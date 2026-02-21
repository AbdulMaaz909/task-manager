'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ViewExpenses = () => {
  const baseUrl = 'http://localhost:5000/api';
  const [expense, setExpense] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() =>{
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get(`${baseUrl}/getallexpense`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          }
        });

      console.log("Expense",res.data);
      setExpense(res.data);
      setLoading(false);
      } catch (error) {
        console.log("Error while getting expense data",error.message?.data || error.message);
        setLoading(false)
      }
    };
    fetchData()
  },[]);

  const filteredExpenses = expense.filter((item) =>
  item.user?.name?.toLowerCase().includes(search.toLowerCase())
);

  const formatDate = (date) =>{
    return new Date(date).toLocaleDateString();
  } 

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

      </div>
    
      {/* Expense Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {loading ? (
          <p className="p-6">Loading expenses...</p>
        ): (
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="p-4">Employee</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount (₹)</th>
              <th className="p-4">Descriptioncls</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">
                  {item.user?.name}
                </td>
                <td className="p-4">{formatDate(item.date)}</td>
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
        )}
      </div>
    </div>
  )
}

export default ViewExpenses;