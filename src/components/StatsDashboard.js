"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ACHIEVEMENTS,
  clearAllData,
  getBest,
  getResults,
  getStreak,
  getUnlocked,
} from "@/lib/storage";
import ProgressChart from "./ProgressChart";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function StatsDashboard() {
  const [data, setData] = useState(null);

  const load = useCallback(() => {
    setData({
      results: getResults(),
      best: getBest(),
      streak: getStreak(),
      unlocked: getUnlocked(),
    });
  }, []);

  useEffect(() => {
    load();
    window.addEventListener("tst:updated", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("tst:updated", load);
      window.removeEventListener("storage", load);
    };
  }, [load]);

  if (!data) {
    return (
      <section className="card section">
        <p className="muted">Loading your stats...</p>
      </section>
    );
  }

  const { results, best, streak, unlocked } = data;
  const total = results.length;
  const last10 = results.slice(-10);
  const avg = last10.length
    ? Math.round(last10.reduce((s, r) => s + r.netWpm, 0) / last10.length)
    : 0;
  const bestAcc = total ? Math.max(...results.map((r) => r.accuracy)) : 0;
  const top = [...results].sort((a, b) => b.netWpm - a.netWpm).slice(0, 5);
  const recent = [...results].reverse().slice(0, 10);
  const unlockedCount = ACHIEVEMENTS.filter((a) => unlocked[a.id]).length;

  const cards = [
    ["Personal best", best ? `${best.netWpm} WPM` : "-"],
    ["Current streak", `${streak.current} day${streak.current === 1 ? "" : "s"}`],
    ["Longest streak", `${streak.longest} day${streak.longest === 1 ? "" : "s"}`],
    ["Tests completed", total],
    ["Average (last 10)", total ? `${avg} WPM` : "-"],
    ["Best accuracy", total ? `${bestAcc}%` : "-"],
  ];

  return (
    <div className="section">
      <h2>Your Statistics</h2>
      <p className="muted">Saved only in this browser. No account needed.</p>

      <div className="result-grid">
        {cards.map(([label, value]) => (
          <div className="result-item" key={label}>
            <div className="result-value">{value}</div>
            <div className="result-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="card section">
        <h3>Progress chart</h3>
        <ProgressChart results={results} />
      </div>

      <div className="card section">
        <h3>
          Achievements ({unlockedCount}/{ACHIEVEMENTS.length})
        </h3>
        <ul className="ach-grid">
          {ACHIEVEMENTS.map((a) => (
            <li key={a.id} className={`ach ${unlocked[a.id] ? "unlocked-ach" : ""}`}>
              <strong>{a.title}</strong>
              <small>{a.description}</small>
              <div className="para-meta">{unlocked[a.id] ? "Unlocked" : "Locked"}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="card section">
        <h3>Local leaderboard (this device)</h3>
        {top.length === 0 ? (
          <p className="muted">Finish a test to enter the leaderboard.</p>
        ) : (
          <ol className="board">
            {top.map((r) => (
              <li key={r.id}>
                <strong>{r.netWpm} WPM</strong> - {r.accuracy}% accuracy - {r.label} -{" "}
                {formatDate(r.date)}
              </li>
            ))}
          </ol>
        )}
        <p className="muted">An online leaderboard can be added later with accounts.</p>
      </div>

      <div className="card section">
        <h3>Recent results</h3>
        {recent.length === 0 ? (
          <p className="muted">No results yet. Finish a test and it will appear here.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Test</th>
                  <th>Level</th>
                  <th>Net WPM</th>
                  <th>Gross WPM</th>
                  <th>Accuracy</th>
                  <th>Correct / Incorrect</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id}>
                    <td>{formatDate(r.date)}</td>
                    <td>{r.label}</td>
                    <td style={{ textTransform: "capitalize" }}>{r.difficulty}</td>
                    <td>{r.netWpm}</td>
                    <td>{r.grossWpm}</td>
                    <td>{r.accuracy}%</td>
                    <td>
                      {r.correct} / {r.incorrect}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {total > 0 && (
          <div className="actions">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm("Delete all saved results, streaks and achievements on this device?")) {
                  clearAllData();
                }
              }}
            >
              Clear all data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}