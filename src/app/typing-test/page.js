import TestTabs from "@/components/TestTabs";
import StatsDashboard from "@/components/StatsDashboard";

export const metadata = {
  title: "Free Online Typing Test - 1, 3, 5 & 10 Minutes",
  description:
    "Take a free online typing test with 1, 3, 5 or 10 minute options. Get your gross WPM, net WPM and accuracy, then track your progress with charts, streaks and achievements.",
  alternates: { canonical: "/typing-test" },
};

export default function TypingTestPage() {
  return (
    <div>
      <header className="page-head">
        <h1>Free Online Typing Test</h1>
        <p className="lead">
          Choose your test length and difficulty, or take today&apos;s daily challenge. Your
          speed, accuracy and progress are tracked automatically.
        </p>
      </header>

      <TestTabs />
      <StatsDashboard />

      <section className="section prose">
        <h2>How your typing speed is calculated</h2>
        <p>
          A &quot;word&quot; in a typing test is any 5 characters, including spaces and
          punctuation. This keeps results fair no matter how long or short the real words are.
        </p>
        <ul>
          <li><strong>Gross WPM</strong> = (all characters typed ÷ 5) ÷ minutes</li>
          <li><strong>Net WPM</strong> = (correct characters ÷ 5) ÷ minutes</li>
          <li><strong>Accuracy</strong> = correct keystrokes ÷ total keystrokes × 100</li>
        </ul>

        <h2>Which test length should I pick?</h2>
        <ul>
          <li><strong>1 minute:</strong> a quick snapshot of your top speed.</li>
          <li><strong>3 minutes:</strong> a balanced test that shows speed and control.</li>
          <li><strong>5 minutes:</strong> reveals how well you keep your pace.</li>
          <li><strong>10 minutes:</strong> a serious endurance challenge for real-world typing stamina.</li>
        </ul>

        <h2>Tips to improve</h2>
        <ul>
          <li>Prioritize accuracy. Speed follows when mistakes stop slowing you down.</li>
          <li>Keep your eyes on the text, not on the keyboard.</li>
          <li>Practice a little every day. Short, regular sessions beat long, rare ones.</li>
          <li>Keep your wrists relaxed and your posture upright.</li>
        </ul>
      </section>
    </div>
  );
}