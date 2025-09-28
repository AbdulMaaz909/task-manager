"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Generic input handler
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: name === "role" ? value.toLowerCase() : value, 
  });
};

  const handleRegister = async (e) => {
    e.preventDefault();
    //Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(formData.email)){
        toast.error("Please enter a valid email");
        return;
    }
    if (formData.password.length < 6){
        toast.error("Password must be at least 6 characters");
        return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        role: formData.role,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Registration Sucessfully!")
      console.log(res.data);
      router.push("/"); // redirect to login
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
    <div className="flex min-h-screen">
  {/* Left image */}
  <div className="hidden md:block w-1/2 h-screen">
    <img
      src="/register_image.jpeg"
      alt="register side"
      className="w-full h-full object-cover"
    />
  </div>
    <div className="flex w-1/2 items-center justify-center bg-[#FCF5ED]">
      <div className="bg-[#3C467B] p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-50 mb-6">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Role Selection */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-50 mt-6">
          Already have an account?{" "}
          <a
            href="/"
            className="text-purple-500 font-semibold text-lg hover:underline"
          >
            Login
          </a>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={3000}/>
    </div>
    </div>
    </>
  );
}


export default Register;
