'use client'
import React, { useState } from 'react'

const ViewApprolvals = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      employeeName: "Abdul Maaz",
      type: "Leave",
      reason: "Family function",
      status: "Pending",
      createdAt: "08/02/2026",
    },
    {
      id: 2,
      employeeName: "Rahul Sharma",
      type: "Asset",
      reason: "Need new mouse",
      status: "Pending",
      createdAt: "07/02/2026",
    },
  ]);

    const updateStatus = (id, newStatus) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin - Request Approvals
        </h1>

        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border p-4 rounded-xl flex justify-between items-center"
            >
              {/* Left Side Info */}
              <div>
                <p className="font-semibold text-lg">
                  {req.employeeName}
                </p>
                <p className="text-sm text-gray-600">
                  Type: {req.type}
                </p>
                <p className="text-sm text-gray-600">
                  Reason: {req.reason}
                </p>
                <p className="text-xs text-gray-400">
                  Submitted on: {req.createdAt}
                </p>

                {/* Status Badge */}
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                    req.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : req.status === "Approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              {/* Right Side Buttons */}
              {req.status === "Pending" && (
                <div className="space-x-2">
                  <button
                    onClick={() => updateStatus(req.id, "Approved")}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(req.id, "Rejected")}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No requests found.
          </p>
        )}
      </div>
    </div>
  )
}

export default ViewApprolvals;