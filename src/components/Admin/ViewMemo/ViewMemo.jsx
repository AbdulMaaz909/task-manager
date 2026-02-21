"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewMemo = () => {
  const baseUrl = "http://localhost:5000/api";
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${baseUrl}/getmemo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMemos(res.data.data);

      } catch (error) {
        console.log("Error fetching memos", error);
      }
    };

    fetchMemos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">
        All Memos
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {memos.length === 0 && (
          <p className="text-gray-500 text-center">No memos found</p>
        )}

        {memos.map((memo) => (
          <div
            key={memo._id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <p className="text-gray-800">{memo.note}</p>

            <div className="mt-2 text-sm text-gray-500 flex justify-between">
              <span>
                👤 {memo.user?.name}
              </span>
              <span>
                📅 {new Date(memo.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMemo;