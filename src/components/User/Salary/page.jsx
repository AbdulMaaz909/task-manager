'use client';
import React from "react";

const salaryData = [
  { id: 1, name: "Abdul Maaz", position: "Developer", basic: 50000, allowance: 10000, deductions: 5000 },
  { id: 2, name: "Ali Khan", position: "Designer", basic: 40000, allowance: 8000, deductions: 3000 },
  { id: 3, name: "Sara Ali", position: "Manager", basic: 60000, allowance: 15000, deductions: 7000 },
];

function SalaryPage() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Salary Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Position</th>
              <th className="py-3 px-4 text-left">Basic</th>
              <th className="py-3 px-4 text-left">Allowance</th>
              <th className="py-3 px-4 text-left">Deductions</th>
              <th className="py-3 px-4 text-left">Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((emp, idx) => (
              <tr key={emp.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{emp.name}</td>
                <td className="py-2 px-4">{emp.position}</td>
                <td className="py-2 px-4">₹{emp.basic.toLocaleString()}</td>
                <td className="py-2 px-4">₹{emp.allowance.toLocaleString()}</td>
                <td className="py-2 px-4">₹{emp.deductions.toLocaleString()}</td>
                <td className="py-2 px-4 font-semibold">
                  ₹{(emp.basic + emp.allowance - emp.deductions).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow">
          Generate PDF
        </button>
      </div>
    </div>
  );
}
export default SalaryPage;