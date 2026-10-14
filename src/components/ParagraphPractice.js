"use client";

import { useRef, useState } from "react";
import TypingTest from "./TypingTest";
import { PASSAGES } from "@/data/passages";
import { DIFFICULTIES } from "@/lib/typing";

export default function ParagraphPractice() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const topRef = useRef(null);

  const list = DIFFICULTIES.filter((d) => filter === "all" || filter === d).flatMap((d) =>
    PASSAGES[d].map((text, index) => ({ id: `${d}-${index}`, difficulty: d, index, text }))
  );

  const select = (p) => {
    setSelected(p);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  return (
    <div>
      <div ref={topRef}>
        {selected ? (
          <>
            <p className="muted">
              Practicing: <strong style={{ textTransform: "capitalize" }}>{selected.difficulty}</strong>{" "}
              paragraph #{selected.index + 1}. This mode is untimed and ends when you finish the paragraph.
            </p>
            <TypingTest
              key={selected.id}
              mode="fixed"
              fixedText={selected.text}
              fixedDifficulty={selected.difficulty}
            />
          </>
        ) : (
          <div className="card">
            <p style={{ margin: 0 }}>
              Choose a paragraph from the list below to start practicing it.
            </p>
          </div>
        )}
      </div>

      <div className="section">
        <div className="control-group" style={{ marginBottom: "0.75rem" }}>
          <span className="control-label">Filter</span>
          <div className="segmented" role="group" aria-label="Filter paragraphs by level">
            {["all", ...DIFFICULTIES].map((f) => (
              <button
                key={f}
                type="button"
                className={`seg ${f === filter ? "active" : ""}`}
                aria-pressed={f === filter}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          {list.map((p) => (
            <div className="para-item" key={p.id}>
              <div>
                <p>{p.text}</p>
                <div className="para-meta">
                  {p.difficulty} - {p.text.split(" ").length} words - {p.text.length} characters
                </div>
              </div>
              <button type="button" className="btn btn-primary" onClick={() => select(p)}>
                Practice
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}