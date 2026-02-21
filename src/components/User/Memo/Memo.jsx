"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Memo = () => {
  const baseUrl = "http://localhost:5000/api";

  const [memo, setMemo] = useState("");
  const [memos, setMemos] = useState([]);

  // ✅ Fetch memos from backend
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

  // ✅ Create memo
  const saveMemo = async () => {
    if (memo.trim() === "") return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${baseUrl}/creatememo`,
        {
          note: memo,
          date: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add new memo on top
      setMemos([res.data.data, ...memos]);
      setMemo("");

    } catch (error) {
      console.log("Error creating memo", error);
    }
  };

  // ✅ Delete memo
  const deleteMemo = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${baseUrl}/deletememo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMemos(memos.filter((item) => item._id !== id));

    } catch (error) {
      console.log("Error deleting memo", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-5">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">My Memo</h1>

        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="Write your memo"
          className="w-full h-28 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={saveMemo}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save Memo
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-medium text-gray-700 mb-2">
            Saved Memos
          </h2>

          {memos.length === 0 && (
            <p className="text-sm text-gray-400">No memos yet</p>
          )}

          <div className="space-y-3">
            {memos.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-start p-3 border rounded-lg text-sm text-gray-700 bg-gray-50"
              >
                <span>{item.note}</span>
                <button
                  onClick={() => deleteMemo(item._id)}
                  className="text-red-500 text-xs ml-2 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memo;