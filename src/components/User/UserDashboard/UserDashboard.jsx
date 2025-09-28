'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock, Loader } from "lucide-react";

function UserDashboard() {
  const API_BASE_URL = "http://localhost:5000/api"; // ✅ base URI here
  const [tasks, setTasks] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${API_BASE_URL}/getmytask`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, [token]);

const nextStatus = (status) => {
  const s = status.toLowerCase();
  if (s === "pending") return "In Progress";
  if (s === "in progress") return "Completed";
  return "Completed";
};

const handleStatusChange = async (id, currentStatus) => {
  try {
    const status = nextStatus(currentStatus);

    const { data } = await axios.patch(
      `${API_BASE_URL}/updatetask/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update state with new status
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, status: data.task.status } : task
      )
    );
  } catch (err) {
    console.error("Update failed:", err.response?.data || err.message);
  }
};

  const Card = ({ title, value }) => (
    <div className="bg-[#b294ff] p-6 rounded-xl shadow hover:shadow-lg duration-200">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <div className="flex-1">
        {/* Navbar */}
        <div className="bg-[#EBEAFF] shadow px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Welcome Back 👋</h2>
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full border"
              alt="avatar"
            />
            <span className="font-medium">
              {typeof window !== "undefined" ? localStorage.getItem("name"): ""}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Tasks Assigned" value={tasks.length} />
          <Card
            title="Completed"
            value={tasks.filter((t) => t.status === "Completed").length}
          />
          <Card
            title="In Progress"
            value={tasks.filter((t) => t.status === "In Progress").length}
          />
        </div>

        {/* Task List */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">📌 My Tasks</h3>
          <div className="bg-[#EBEAFF] rounded-xl shadow p-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks assigned yet.</p>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className="flex justify-between items-center p-3 border rounded-lg hover:shadow"
                  >
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-gray-500">
                        Status:{" "}
                        <span
                          className={`font-medium ${
                            task.status === "Pending"
                              ? "text-yellow-600"
                              : task.status === "In Progress"
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {task.status}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleStatusChange(task._id, task.status)}
                      className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition"
                    >
                      {task.status === "Pending" && <Clock size={18} />}
                      {task.status === "In Progress" && <Loader size={18} />}
                      {task.status === "Completed" && <CheckCircle size={18} />}
                      {task.status === "Completed" ? "Completed" : "Update"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
