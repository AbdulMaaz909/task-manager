"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function ExpensePage() {
  const baseUrl = 'http://localhost:5000/api';///createexpense
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const isFirstRender = useRef(true);

  // Load saved expenses
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("expenses")) || [];
    setItems(saved);
  }, []);


  // Save expenses (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("expenses", JSON.stringify(items));
  }, [items]);

  const addExpense = async () => {
    if (!desc.trim() || !amount) return;

    try {
      const token = localStorage.getItem('token');
      console.log(token);

      const res= await axios.post(`${baseUrl}/createexpense`,
        {
          date: new Date().toISOString(), // important
        amount: Number(amount),
        description: desc,
        },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Saved in DB",res.data);

      setItems([
        ...items,
        {
          id:res.data.data._id,
          desc,
          amount: parseFloat(amount),
        }
      ]);
      setDesc("");
      setAmount("");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Expense didn't save!");
    }
  };

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Expense Tracker
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Track your daily expenses easily
        </p>

        {/* Input Section */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-28 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addExpense}
            className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* Expense List */}
        <div className="space-y-2">
          {items.length === 0 && (
            <p className="text-sm text-gray-400 text-center">
              No expenses added
            </p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg px-3 py-2 text-sm bg-gray-50"
            >
              <span className="text-gray-700">{item.desc}</span>
              <span className="font-medium text-gray-800">
                ₹{item.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <span className="text-sm text-gray-600">Total</span>
          <span className="text-lg font-semibold text-gray-800">
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
