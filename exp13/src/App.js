import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [dark, setDark] = useState(false);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clear = () => setInput("");

  const calculate = () => {
    try {
      const result = eval(input).toString();
      setHistory([{ exp: input, res: result }, ...history]);
      setInput(result);
    } catch {
      setInput("Error");
    }
  };

  // ⌨️ Keyboard Support
  useEffect(() => {
    const handleKey = (e) => {
      if ("0123456789+-*/.".includes(e.key)) {
        setInput((prev) => prev + e.key);
      } else if (e.key === "Enter") {
        calculate();
      } else if (e.key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key === "Escape") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [input]);

  return (
    <div className={dark ? "app dark" : "app"}>
      <div className="card">

        {/* HEADER */}
        <div className="top">
          <h2>Calculator</h2>
          <button className="toggle" onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* DISPLAY */}
        <div className="display">{input || "0"}</div>

        {/* BUTTONS */}
        <div className="grid">
          <button className="action" onClick={clear}>C</button>
          <button className="operator" onClick={() => handleClick("/")}>÷</button>
          <button className="operator" onClick={() => handleClick("*")}>×</button>
          <button className="operator" onClick={() => handleClick("-")}>−</button>

          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button className="operator" onClick={() => handleClick("+")}>+</button>

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>

          <button className="zero" onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button className="equals" onClick={calculate}>=</button>
        </div>

        {/* HISTORY */}
        <div className="history">
          <h4>History</h4>
          {history.length === 0 ? (
            <p>No calculations yet</p>
          ) : (
            history.map((item, i) => (
              <div key={i} className="history-item">
                {item.exp} = <b>{item.res}</b>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;