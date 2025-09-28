// ExpensePage.jsx
import React, { useState } from "react";

export default function ExpensePage() {
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    if (!desc.trim() || !amount) return;
    setItems([...items, { id: Date.now(), desc, amount: parseFloat(amount) }]);
    setDesc("");
    setAmount("");
  };

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Expense Tracker</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          style={{ width: 100, padding: 8 }}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense} style={{ padding: "8px 12px" }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span>{item.desc}</span>
            <strong>₹{item.amount.toFixed(2)}</strong>
          </li>
        ))}
      </ul>

      <h2 style={{ textAlign: "right", marginTop: 20 }}>
        Total: ₹{total.toFixed(2)}
      </h2>
    </div>
  );
}
