"use client";

import { useMemo, useState } from "react";

function band(wpm) {
  if (wpm < 25) return "Beginner";
  if (wpm < 40) return "Average";
  if (wpm < 60) return "Good";
  if (wpm < 80) return "Fast";
  return "Excellent";
}

export default function SpeedCalculator() {
  const [unit, setUnit] = useState("words");
  const [typed, setTyped] = useState("");
  const [mistakes, setMistakes] = useState("0");
  const [mins, setMins] = useState("1");
  const [secs, setSecs] = useState("0");

  const result = useMemo(() => {
    const t = parseFloat(typed);
    const m = parseFloat(mistakes) || 0;
    const totalMin = (parseFloat(mins) || 0) + (parseFloat(secs) || 0) / 60;
    if (!(t > 0) || !(totalMin > 0)) return null;

    const words = unit === "words" ? t : t / 5;
    const errorWords = unit === "words" ? m : m / 5;
    const gross = words / totalMin;
    const net = Math.max(0, gross - errorWords / totalMin);
    const accuracy = Math.min(100, Math.max(0, ((t - m) / t) * 100));

    return {
      gross: Math.round(gross * 10) / 10,
      net: Math.round(net * 10) / 10,
      accuracy: Math.round(accuracy * 10) / 10,
      level: band(net),
    };
  }, [unit, typed, mistakes, mins, secs]);

  return (
    <div className="card">
      <div className="control-group" style={{ marginBottom: "1rem" }}>
        <span className="control-label">I counted my</span>
        <div className="segmented" role="group" aria-label="Unit">
          {["words", "characters"].map((u) => (
            <button
              key={u}
              type="button"
              className={`seg ${u === unit ? "active" : ""}`}
              aria-pressed={u === unit}
              onClick={() => setUnit(u)}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="typed">Total {unit} typed</label>
          <input id="typed" type="number" min="0" inputMode="decimal" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={unit === "words" ? "e.g. 250" : "e.g. 1250"} />
        </div>
        <div className="field">
          <label htmlFor="mistakes">Uncorrected mistakes ({unit})</label>
          <input id="mistakes" type="number" min="0" inputMode="decimal" value={mistakes} onChange={(e) => setMistakes(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="mins">Minutes</label>
          <input id="mins" type="number" min="0" inputMode="decimal" value={mins} onChange={(e) => setMins(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="secs">Seconds</label>
          <input id="secs" type="number" min="0" max="59" inputMode="decimal" value={secs} onChange={(e) => setSecs(e.target.value)} />
        </div>
      </div>

      {result ? (
        <div className="result-grid" role="status">
          <div className="result-item">
            <div className="result-value">{result.net}</div>
            <div className="result-label">Net WPM</div>
          </div>
          <div className="result-item">
            <div className="result-value">{result.gross}</div>
            <div className="result-label">Gross WPM</div>
          </div>
          <div className="result-item">
            <div className="result-value">{result.accuracy}%</div>
            <div className="result-label">Accuracy</div>
          </div>
          <div className="result-item">
            <div className="result-value">{result.level}</div>
            <div className="result-label">Level</div>
          </div>
        </div>
      ) : (
        <p className="muted">Enter the amount you typed and the time taken to see your results.</p>
      )}
    </div>
  );
}