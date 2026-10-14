"use client";

import { useState } from "react";
import TypingTest from "./TypingTest";
import DailyChallenge from "./DailyChallenge";

export default function TestTabs() {
  const [tab, setTab] = useState("free");

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Test type">
        <button
          type="button"
          role="tab"
          className="tab"
          aria-selected={tab === "free"}
          onClick={() => setTab("free")}
        >
          Free Test
        </button>
        <button
          type="button"
          role="tab"
          className="tab"
          aria-selected={tab === "daily"}
          onClick={() => setTab("daily")}
        >
          Daily Challenge
        </button>
      </div>
      {tab === "free" ? <TypingTest /> : <DailyChallenge />}
    </div>
  );
}