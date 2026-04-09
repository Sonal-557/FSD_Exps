import React, { useState } from "react";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([
    { name: "Candidate 1", votes: 0 },
    { name: "Candidate 2", votes: 0 },
    { name: "Candidate 3", votes: 0 }
  ]);

  const vote = (index) => {
    const updated = [...candidates];
    updated[index].votes += 1;
    setCandidates(updated);
  };

  const resetVotes = () => {
    const reset = candidates.map(c => ({ ...c, votes: 0 }));
    setCandidates(reset);
  };

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  const maxVotes = Math.max(...candidates.map(c => c.votes));

  return (
    <div className="app">
      <div className="card">
        <h2>Voting Dashboard</h2>

        {candidates.map((c, i) => {
          const percent = totalVotes ? ((c.votes / totalVotes) * 100).toFixed(1) : 0;
          const isWinner = c.votes === maxVotes && totalVotes > 0;

          return (
            <div className={`item ${isWinner ? "winner" : ""}`} key={i}>

              <div className="top-row">
                <h3>{c.name}</h3>
                <span>{c.votes} votes</span>
              </div>

              {/* PROGRESS BAR */}
              <div className="bar">
                <div className="fill" style={{ width: percent + "%" }}></div>
              </div>

              <div className="bottom-row">
                <span>{percent}%</span>
                <button onClick={() => vote(i)}>Vote</button>
              </div>

            </div>
          );
        })}

        <button className="reset" onClick={resetVotes}>
          Reset Votes
        </button>
      </div>
    </div>
  );
}

export default App;