"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ProgressChart({ results }) {
  const data = results.slice(-20).map((r, i) => ({
    test: i + 1,
    netWpm: r.netWpm,
    accuracy: r.accuracy,
  }));

  if (data.length < 2) {
    return <p className="muted">Complete at least 2 tests to see your progress chart.</p>;
  }

  return (
    <div
      className="chart-wrap"
      role="img"
      aria-label="Line chart of net WPM and accuracy over your last tests"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis dataKey="test" stroke="var(--muted)" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="wpm" stroke="var(--muted)" tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="acc"
            orientation="right"
            domain={[0, 100]}
            stroke="var(--muted)"
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--text)",
            }}
          />
          <Legend />
          <Line
            yAxisId="wpm"
            type="monotone"
            dataKey="netWpm"
            name="Net WPM"
            stroke="var(--accent)"
            strokeWidth={2}
          />
          <Line
            yAxisId="acc"
            type="monotone"
            dataKey="accuracy"
            name="Accuracy %"
            stroke="var(--correct)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}