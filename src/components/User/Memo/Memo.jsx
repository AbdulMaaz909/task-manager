"use client";
import { useState, useEffect, useRef } from "react";

const Memo = () => {
  const [memo, setMemo] = useState("");
  const [memos, setMemos] = useState([]);
  const isFirstRender = useRef(true);

  // Load memos once
  useEffect(() => {
    const savedMemos = JSON.parse(localStorage.getItem("memos")) || [];
    setMemos(savedMemos);
  }, []);

  // Save memos (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("memos", JSON.stringify(memos));
  }, [memos]);

  const saveMemo = () => {
    if (memo.trim() === "") return;
    setMemos([memo, ...memos]);
    setMemo("");
  };

  const deleteMemo = (index) => {
    setMemos(memos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-5">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">My Memo</h1>
        <p className="text-sm text-gray-500 mb-4">
          Write quick notes for your tasks
        </p>

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
            {memos.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start p-3 border rounded-lg text-sm text-gray-700 bg-gray-50"
              >
                <span>{item}</span>
                <button
                  onClick={() => deleteMemo(index)}
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
