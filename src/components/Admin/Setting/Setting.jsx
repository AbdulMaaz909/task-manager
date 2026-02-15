'use client'
import React, { useState } from 'react'

const Setting = () => {
  const [settings, setSettings] = useState({
    name:"Maaz",
    email:"abdul@gmail.com",
    password:"",
    notifications:true,
    darkMode:false
  })

  const handleChange = (e) =>{
    const {name , value, type, checked} = e.target

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    })
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings Updated Successfully!");
    console.log(settings);
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin Settings
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-7xl">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Admin Name
            </label>
            <input
              type="text"
              name="name"
              value={settings.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Change Password
            </label>
            <input
              type="password"
              name="password"
              value={settings.password}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-3 mt-4">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
              />
              Enable Email Notifications
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleChange}
              />
              Enable Dark Mode
            </label>

          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition mt-4"
          >
            Save Settings
          </button>

        </form>
      </div>
    </div>
  )
}

export default Setting