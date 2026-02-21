'use client';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function SalaryPage() {
  const baseurl = 'http://localhost:5000/api';
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(`${baseurl}/mysalary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSalaryData(res.data.data);

      } catch (error) {
        toast.error("Error fetching salary data");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">My Salary</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Month</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Basic</th>
              <th className="py-3 px-4 text-left">Bonus</th>
              <th className="py-3 px-4 text-left">Deduction</th>
              <th className="py-3 px-4 text-left">Net Salary</th>
            </tr>
          </thead>

          <tbody>
            {salaryData.map((emp, idx) => (
              <tr key={emp._id}>
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{emp.month}</td>
                <td className="py-2 px-4">{emp.role}</td>
                <td className="py-2 px-4">₹{emp.salary}</td>
                <td className="py-2 px-4">₹{emp.bonus}</td>
                <td className="py-2 px-4">₹{emp.deduction}</td>
                <td className="py-2 px-4 font-semibold">
                  ₹{emp.salary + emp.bonus - emp.deduction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-left" autoClose={1200}/>
    </div>
  );
}

export default SalaryPage;
