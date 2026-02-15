'use client';
import { React, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    
  });
//   localStorage.setItem("token", response.data.token);
// localStorage.setItem("name", res.data.name);

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.user) {
        toast.success("Login Successfully!");
        localStorage.setItem("token", res.data.token);          // <-- token
        localStorage.setItem("name", res.data.user.name);       

        if (res.data.user.role === "admin") {
          router.push("/admin/admindashboard");
        } else {
          router.push("/user/userdashboard");
        }
      } else {
        toast.error("Invalid server response");
      }

      console.log(res.data);

    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left Side - Image */}
        <div className="flex-1 relative hidden md:block h-screen ">
          <img
            src="employee_image.jpeg"
            alt="home image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 "></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center bg-[#dadee8]">
          <div className="bg-[#3FB6C2] p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-black text-lg py-2 rounded-lg  transition duration-300"
              >
                Login
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-blue-900 font-semibold hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1200} />
    </>
  );
}

export default Login;
