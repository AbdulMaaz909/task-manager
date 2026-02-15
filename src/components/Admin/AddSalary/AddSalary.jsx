'use client'
import React, { useState } from 'react'

const AddSalary = () => {
  const [formData, setFormData] = useState({
    employee: "",
    month: "",
    basic: "",
    bonus: "",
    deduction: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const netSalary =
    (Number(formData.basic) + Number(formData.bonus) - Number(formData.deduction));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Salary Added Successfully!");
    console.log(formData);

  }
  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">

      <h1 className="text-3xl font-bold text-gray-800 mb-6 ">
        Add Employee Salary
      </h1>

      <div className="bg-white p-6   rounded-xl shadow-md max-w-7xl">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Employee */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Employee
            </label>
            <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">-- Select Employee --</option>
              <option value="Rahul Sharma">Rahul Sharma</option>
              <option value="Ayesha Khan">Ayesha Khan</option>
            </select>
          </div>

          {/* Month */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Month
            </label>
            <input
              type="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Salary Fields */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">
                Basic Salary (₹)
              </label>
              <input
                type="number"
                name="basic"
                value={formData.basic}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Bonus (₹)
              </label>
              <input
                type="number"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                Deduction (₹)
              </label>
              <input
                type="number"
                name="deduction"
                value={formData.deduction}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* Net Salary Display */}
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <p className="text-lg font-semibold text-gray-700">
              Net Salary: <span className="text-green-600">₹ {netSalary || 0}</span>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Salary
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddSalary