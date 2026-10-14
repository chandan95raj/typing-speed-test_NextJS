"use client";

import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  DURATIONS,
  DIFFICULTIES,
  buildText,
  calcStats,
  getDailyChallenge,
  todayKey,
} from "@/lib/typing";
import { saveResult } from "@/lib/storage";

const Char = memo(function Char({ ch, state }) {
  return <span className={`ch ${state}`}>{ch}</span>;
});

function formatTime(total) {
  const s = Math.max(0, Math.ceil(total));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function Results({ outcome, onRestart, onNew, canChange }) {
  const { stats, info } = outcome;
  const items = [
    ["Net WPM", stats.netWpm],
    ["Gross WPM", stats.grossWpm],
    ["Accuracy", `${stats.accuracy}%`],
    ["Correct characters", stats.correct],
    ["Incorrect characters", stats.incorrect],
    ["Time", formatTime(stats.seconds)],
  ];

  return (
    <div className="results" role="status">
      <h2 className="results-title">Test complete</h2>

      <div className="badges">
        {info?.isBest && <span className="badge badge-gold">New personal best!</span>}
        {info && <span className="badge">{info.streak}-day streak</span>}
      </div>

      <div className="result-grid">
        {items.map(([label, value]) => (
          <div className="result-item" key={label}>
            <div className="result-value">{value}</div>
            <div className="result-label">{label}</div>
          </div>
        ))}
      </div>

      <p className="muted">
        You typed {stats.typedChars} characters in {formatTime(stats.seconds)}{" "}
        with {stats.accuracy}% accuracy.
      </p>

      {info && info.newAchievements.length > 0 && (
        <div className="unlocked">
          <strong>Achievement unlocked</strong>
          <ul>
            {info.newAchievements.map((a) => (
              <li key={a.id}>
                {a.title}: {a.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!info && <p className="muted">This test was too short to be saved.</p>}

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onRestart}>
          Try again
        </button>
        {canChange && (
          <button type="button" className="btn" onClick={onNew}>
            New passage
          </button>
        )}
      </div>
    </div>
  );
}

export default function TypingTest({
  mode = "normal", // "normal" | "daily" | "fixed"
  initialMinutes = 1,
  initialDifficulty = "medium",
  fixedText = "",
  fixedDifficulty = "custom",
}) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [text, setText] = useState("");
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState("idle"); // idle | running | finished
  const [seconds, setSeconds] = useState(0);
  const [keys, setKeys] = useState({ total: 0, wrong: 0 });
  const [outcome, setOutcome] = useState(null);
  const [focused, setFocused] = useState(false);

  const inputRef = useRef(null);
  const boxRef = useRef(null);
  const typedRef = useRef("");
  const keysRef = useRef({ total: 0, wrong: 0 });
  const startRef = useRef(0);
  const difficultyRef = useRef(initialDifficulty);
  const firstRun = useRef(true);
  const passageId = useId();

  const durationSec = mode === "daily" ? 60 : mode === "fixed" ? null : minutes * 60;
  const label = mode === "daily" ? "Daily" : mode === "fixed" ? "Paragraph" : `${minutes} min`;

  const reset = useCallback(
    (fresh, focus = true) => {
      typedRef.current = "";
      keysRef.current = { total: 0, wrong: 0 };
      setTyped("");
      setKeys({ total: 0, wrong: 0 });
      setSeconds(0);
      setStatus("idle");
      setOutcome(null);

      if (fresh) {
        if (mode === "daily") {
          const c = getDailyChallenge(todayKey());
          difficultyRef.current = c.difficulty;
          setText(c.text);
        } else if (mode === "fixed") {
          difficultyRef.current = fixedDifficulty;
          setText(fixedText);
        } else {
          difficultyRef.current = difficulty;
          setText(buildText(difficulty, minutes));
        }
      }
      if (focus) {
        setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
      }
    },
    [mode, fixedText, fixedDifficulty, difficulty, minutes]
  );

  // Load passage on mount and whenever settings change
  useEffect(() => {
    reset(true, !firstRun.current);
    firstRun.current = false;
  }, [reset]);

  const finish = useCallback(
    (elapsed) => {
      const stats = calcStats({
        typed: typedRef.current,
        text,
        totalKeys: keysRef.current.total,
        wrongKeys: keysRef.current.wrong,
        seconds: elapsed,
      });
      let info = null;
      if (stats.typedChars >= 10) {
        info = saveResult({
          ...stats,
          mode,
          label,
          minutes: mode === "normal" ? minutes : null,
          difficulty: difficultyRef.current,
        });
      }
      setSeconds(elapsed);
      setStatus("finished");
      setOutcome({ stats, info });
    },
    [text, mode, label, minutes]
  );

  // Timer
  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      if (durationSec && elapsed >= durationSec) finish(durationSec);
      else setSeconds(elapsed);
    }, 200);
    return () => clearInterval(id);
  }, [status, durationSec, finish]);

  // Keyboard shortcuts: Esc = restart, Ctrl/Cmd + Enter = new passage
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        reset(false);
      } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        reset(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reset]);

  // Keep the current character visible
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const el = box.children[typed.length];
    if (!el) return;
    const lh = parseFloat(getComputedStyle(box).lineHeight) || 32;
    box.scrollTop = Math.max(0, el.offsetTop - lh * 1.2);
  }, [typed, text]);

  const handleChange = (e) => {
    if (status === "finished" || !text) return;
    let value = e.target.value.replace(/\n/g, "");
    if (value.length > text.length) value = value.slice(0, text.length);

    const prev = typedRef.current;

    if (status === "idle" && value.length > 0) {
      startRef.current = Date.now();
      setStatus("running");
    }

    if (value.length > prev.length) {
      for (let i = prev.length; i < value.length; i++) {
        keysRef.current.total++;
        if (value[i] !== text[i]) keysRef.current.wrong++;
      }
      setKeys({ ...keysRef.current });
    }

    typedRef.current = value;
    setTyped(value);

    if (value.length === text.length) {
      finish((Date.now() - startRef.current) / 1000);
    }
  };

  const keepCaretAtEnd = (e) => {
    const t = e.target;
    const end = t.value.length;
    if (t.selectionStart !== end || t.selectionEnd !== end) {
      t.setSelectionRange(end, end);
    }
  };

  const chars = useMemo(
    () =>
      text.split("").map((ch, i) => {
        let state = "pending";
        if (i < typed.length) state = typed[i] === ch ? "correct" : "incorrect";
        else if (i === typed.length) state = "current";
        return <Char key={i} ch={ch} state={state} />;
      }),
    [text, typed]
  );

  const live = calcStats({
    typed,
    text,
    totalKeys: keys.total,
    wrongKeys: keys.wrong,
    seconds,
  });
  const liveWpm = seconds >= 2 ? live.netWpm : 0;
  const timeText = durationSec ? formatTime(durationSec - seconds) : formatTime(Math.floor(seconds));

  return (
    <section className="card" aria-label="Typing test">
      {mode === "normal" && (
        <div className="controls">
          <div className="control-group">
            <span className="control-label">Time</span>
            <div className="segmented" role="group" aria-label="Test duration">
              {DURATIONS.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`seg ${m === minutes ? "active" : ""}`}
                  aria-pressed={m === minutes}
                  disabled={status === "running"}
                  onClick={() => setMinutes(m)}
                >
                  {m} min
                </button>
              ))}
            </div>
          </div>
          <div className="control-group">
            <span className="control-label">Level</span>
            <div className="segmented" role="group" aria-label="Passage difficulty">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`seg ${d === difficulty ? "active" : ""}`}
                  aria-pressed={d === difficulty}
                  disabled={status === "running"}
                  onClick={() => setDifficulty(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="stats-bar">
        <Stat label={durationSec ? "Time left" : "Time"} value={timeText} />
        <Stat label="WPM" value={liveWpm} />
        <Stat label="Accuracy" value={`${live.accuracy}%`} />
      </div>

      {status !== "finished" ? (
        <>
          <div
            className="text-area"
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
          >
            <div
              ref={boxRef}
              className={`text-box ${!focused ? "blurred" : ""}`}
              aria-hidden="true"
            >
              {text === "" ? <span className="muted">Loading passage...</span> : chars}
            </div>
            <textarea
              ref={inputRef}
              className="hidden-input"
              value={typed}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onPaste={(e) => e.preventDefault()}
              onDrop={(e) => e.preventDefault()}
              onSelect={keepCaretAtEnd}
              onKeyDown={(e) => {
                if (
                  ["Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              aria-label="Typing input. Type the passage shown on screen."
              aria-describedby={passageId}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
            {!focused && <div className="focus-hint">Click here or start typing</div>}
          </div>
          <p id={passageId} className="sr-only">
            {text}
          </p>

          <div className="actions">
            <button type="button" className="btn" onClick={() => reset(false)}>
              Restart <kbd>Esc</kbd>
            </button>
            {mode === "normal" && (
              <button type="button" className="btn" onClick={() => reset(true)}>
                New passage <kbd>Ctrl</kbd>+<kbd>Enter</kbd>
              </button>
            )}
          </div>
          <p className="shortcut-hint">
            The timer starts when you type the first character. Press Esc to restart
            {mode === "normal" ? " or Ctrl+Enter for a new passage" : ""}.
          </p>
        </>
      ) : (
        outcome && (
          <Results
            outcome={outcome}
            onRestart={() => reset(false)}
            onNew={() => reset(true)}
            canChange={mode === "normal"}
          />
        )
      )}
    </section>
  );
}