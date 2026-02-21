"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Users = () => {
  const baseUrl = 'http://localhost:5000/api/auth';
  const [user,setuser] =useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get(`${baseUrl}/users`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        console.log(Users,res.data);
        
        setuser(res.data);
        setLoading(false);
      } catch (error) {
        console.log("error while getting users",error.message?.data || error.message);
        setLoading(false);
      }
    }
    fetchUsers();
  },[]);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Users Management
        </h1>
        <p className="text-sm text-gray-500">
          Total Users: <span className="font-medium">{user.length}</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {user.length}
          </h2>
        </div>


      </div>

      {/* Users Table */}
      
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {loading ? ( 
          <p className='p-6'>Loading....</p> 
        ):
          (
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
            {user.map((user, index) => (
              <tr
                key={user._id}
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
        )}
      </div>
    </div>
  );
}
export default Users;
