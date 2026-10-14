"use client";

import { useCallback, useEffect, useState } from "react";
import TypingTest from "./TypingTest";
import { getDailyChallenge, todayKey } from "@/lib/typing";
import { getDailyDone, getStreak } from "@/lib/storage";

export default function DailyChallenge() {
  const [info, setInfo] = useState(null);

  const load = useCallback(() => {
    const c = getDailyChallenge(todayKey());
    setInfo({
      date: c.key,
      difficulty: c.difficulty,
      done: getDailyDone().includes(c.key),
      streak: getStreak().current,
    });
  }, []);

  useEffect(() => {
    load();
    window.addEventListener("tst:updated", load);
    return () => window.removeEventListener("tst:updated", load);
  }, [load]);

  return (
    <div>
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h2>Today&apos;s Daily Challenge</h2>
        <p className="muted">
          Everyone gets the same 1 minute passage today. Finish it to keep your
          daily streak alive and unlock the Daily Champion achievement.
        </p>
        {info && (
          <div className="badges">
            <span className="badge">{info.date}</span>
            <span className="badge" style={{ textTransform: "capitalize" }}>
              {info.difficulty} level
            </span>
            <span className={`badge ${info.done ? "badge-ok" : ""}`}>
              {info.done ? "Completed today" : "Not completed yet"}
            </span>
            <span className="badge">{info.streak}-day streak</span>
          </div>
        )}
      </div>
      <TypingTest mode="daily" />
    </div>
  );
}