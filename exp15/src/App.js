import React, { useState } from "react";
import "./App.css";

function App() {
  const [balance, setBalance] = useState({
    casual: 10,
    medical: 8
  });

  const [form, setForm] = useState({
    type: "casual",
    days: ""
  });

  const [history, setHistory] = useState([]);

  const handleApply = () => {
    const days = parseInt(form.days);

    if (!days || days <= 0) return;

    if (balance[form.type] < days) {
      alert("Not enough leave balance!");
      return;
    }

    setBalance({
      ...balance,
      [form.type]: balance[form.type] - days
    });

    setHistory([
      {
        type: form.type,
        days,
        date: new Date().toLocaleDateString(),
        status: "Approved"
      },
      ...history
    ]);

    setForm({ type: "casual", days: "" });
  };

  return (
    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>HR Panel</h2>
        <p>Dashboard</p>
        <p>Apply Leave</p>
        <p>History</p>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <div className="header">
          <h2>Leave Management</h2>
          <div className="user">👤 Employee</div>
        </div>

        {/* CONTENT */}
        <div className="content">

          {/* BALANCE CARDS */}
          <div className="cards">
            <div className="card blue">
              <h4>Casual Leave</h4>
              <p>{balance.casual}</p>
            </div>

            <div className="card green">
              <h4>Medical Leave</h4>
              <p>{balance.medical}</p>
            </div>
          </div>

          {/* GRID */}
          <div className="grid">

            {/* FORM */}
            <div className="card">
              <h3>Apply Leave</h3>

              <label>Leave Type</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option value="casual">Casual Leave</option>
                <option value="medical">Medical Leave</option>
              </select>

              <label>Days</label>
              <input
                type="number"
                value={form.days}
                onChange={(e) =>
                  setForm({ ...form, days: e.target.value })
                }
              />

              <button onClick={handleApply}>Apply</button>
            </div>

            {/* HISTORY */}
            <div className="card">
              <h3>Leave History</h3>

              {history.length === 0 ? (
                <p className="empty">No records</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Days</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {history.map((h, i) => (
                      <tr key={i}>
                        <td>{h.type}</td>
                        <td>{h.days}</td>
                        <td>{h.date}</td>
                        <td>
                          <span className="status approved">
                            {h.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default App;