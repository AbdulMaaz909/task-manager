'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, Trash2 } from "lucide-react";

function AdminDashboard() {
  const API_BASE_URL = "http://localhost:5000/api";
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get token safely
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("No authentication token found");
        return;
      }

      try {
        setLoading(true);
        console.log("Token:", token);
        
        // Fetch tasks
        const tasksResponse = await axios.get(
          `${API_BASE_URL}/getalltasks`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks(tasksResponse.data);

        // Fetch users
        const usersResponse = await axios.get(
          `${API_BASE_URL}/auth/users`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(usersResponse.data);
        
        setError(""); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to fetch data");
        
        // Handle unauthorized access
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          // Redirect to login page if you have routing
          // window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    
    if (!taskInput.trim()) {
      setError("Task title is required");
      return;
    }
    
    if (!assignedToId) {
      setError("Please select a user to assign the task");
      return;
    }

    // Find the selected user's details
    const selectedUser = users.find(user => user._id === assignedToId);
    
    console.log("Creating task with:", {
      assignedToId,
      assignedUserName: selectedUser ? selectedUser.name : 'Unknown User',
      assignedUserEmail: selectedUser ? selectedUser.email : 'Unknown Email',
      taskInput: taskInput.trim(),
      descriptionInput: descriptionInput.trim()
    });

    try {
      setLoading(true);
      setError("");
      
      const { data } = await axios.post(
        `${API_BASE_URL}/createtask`,
        {
          title: taskInput.trim(),
          description: descriptionInput.trim(),
          status: "Pending",
          userId: assignedToId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log("Backend Response:", data); // Debug response
      
      // Ensure userId is properly set in the new task
      const newTask = data.task || data;
      if (!newTask.userId) {
        newTask.userId = assignedToId; // Fallback to set userId
      }
      
      console.log("New Task with userId:", newTask); // Debug new task
      
      // Add the new task to the list
      setTasks((prev) => [...prev, newTask]);
      
      // Clear form
      setTaskInput("");
      setDescriptionInput("");
      setAssignedToId("");
    } catch (err) {
      console.error("Error creating task:", err);
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_BASE_URL}/deletetask/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Remove task from state
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  // Helper function to find user by ID or get user from task
  const findUserById = (userId) => {
    return users.find(user => user._id === userId);
  };

  // Helper function to get user info from task
  const getTaskUser = (task) => {
    // If task has user object directly (from backend)
    if (task.user && task.user._id) {
      return task.user;
    }
    // If task has userId field
    if (task.userId) {
      return findUserById(task.userId);
    }
    return null;
  };

  const StatCard = ({ title, value }) => (
    <div className="bg-[#9694FF] p-6 rounded-xl shadow hover:shadow-lg duration-200">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );

  // Show loading state
  if (loading && tasks.length === 0 && users.length === 0) {
    return (
      <div className="flex-1 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 bg-gray-100 min-h-screen">
      {/* Navbar */}
      <div className="bg-[#EBEAFF] shadow px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Welcome Back, Admin 👋</h2>
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            className="w-10 h-10 rounded-full border"
            alt="avatar"
          />
          <span className="font-medium">
            {typeof window !== "undefined" ? localStorage.getItem("name") || "Admin" : "Admin"}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Users" value={users.length} />
          <StatCard title="Total Tasks" value={tasks.length} />
          <StatCard
            title="Completed Tasks"
            value={tasks.filter((t) => t.status === "Completed").length}
          />
        </div>

        {/* Assign Task */}
        <div className="bg-[#EBEAFF] rounded-xl shadow p-6">
          <h3 className="text-2xl font-semibold mb-4">📝 Assign Tasks</h3>
          <form onSubmit={handleAddTask} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter task title"
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
              <select
                value={assignedToId}
                onChange={(e) => setAssignedToId(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select user</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <textarea
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
                placeholder="Enter task description (optional)"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !taskInput.trim() || !assignedToId}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircle size={20} /> Add Task
                </>
              )}
            </button>
          </form>

          {/* Task List */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Assigned Tasks</h4>
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks assigned yet.</p>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => {
                  const assignedUser = getTaskUser(task);
                  
                  // Debug each task
                  console.log("Task:", task);
                  console.log("Task has user object:", task.user);
                  console.log("Task userId:", task.userId);
                  console.log("Found user:", assignedUser);
                  
                  return (
                    <li
                      key={task._id}
                      className="flex justify-between items-start p-3 border rounded-lg hover:shadow transition-shadow"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{task.title}</p>
                        {task.description && (
                          <p className="text-gray-600 mt-1 text-sm">{task.description}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          Assigned to: {assignedUser ? assignedUser.name : 'Unknown User'} | Status:{" "}
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
                        className="text-red-500 hover:text-red-700 ml-4 transition-colors"
                        onClick={() => handleDeleteTask(task._id)}
                        title="Delete task"
                      >
                        <Trash2 size={20} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;