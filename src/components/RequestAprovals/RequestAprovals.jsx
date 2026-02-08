'use client'
import React, { useState } from 'react'

const RequestAprovals = () => {
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");
  const [requests, setRequests] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if(!type || ! reason){
      alert("All feilds are required!");
      return;
    }

    const newRequest = {
      id:Date.now(),
      type,
      reason,
      status : "Pending",
      createdAt: new Date().toLocaleDateString(),
    }
    setRequests([newRequest,...requests]);
    setType("");
    setReason("");
  }
  return (
        <div className="min-h-screen bg-gray-100 p-6 w-full">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Employee Service Request
        </h1>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block font-medium mb-1">Request Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="Leave">Leave</option>
              <option value="Asset">Asset</option>
              <option value="Work From Home">Work From Home</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </form>

        {/* Request History */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Requests</h2>

          {requests.length === 0 && (
            <p className="text-gray-500">No requests submitted yet.</p>
          )}

          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{req.type}</p>
                  <p className="text-sm text-gray-600">{req.reason}</p>
                  <p className="text-xs text-gray-400">
                    Submitted on: {req.createdAt}
                  </p>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
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
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default RequestAprovals