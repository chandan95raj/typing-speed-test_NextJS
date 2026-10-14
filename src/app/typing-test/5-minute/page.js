import TypingTest from "@/components/TypingTest";

export const metadata = {
  title: "5 Minute Typing Test - Measure Speed and Consistency",
  description:
    "Take a free 5 minute typing test to measure your real-world typing speed, accuracy and endurance. Learn how to keep a steady pace for longer sessions.",
  alternates: { canonical: "/typing-test/5-minute" },
};

export default function FiveMinutePage() {
  return (
    <div>
      <header className="page-head">
        <h1>5 Minute Typing Test</h1>
        <p className="lead">
          A longer test gives a more honest picture of your typing. See how well you keep your
          speed and accuracy over five full minutes.
        </p>
      </header>

      <TypingTest initialMinutes={5} />

      <section className="section prose">
        <h2>Why choose a 5 minute test?</h2>
        <p>
          Short tests reward bursts of speed. In real work, such as writing emails, reports or
          code, you type for much longer. A 5 minute test shows your sustainable speed and
          reveals when fatigue or loss of focus starts to cause mistakes.
        </p>

        <h2>How to read your result</h2>
        <ul>
          <li>Your net WPM here is usually 5 to 10 WPM lower than in a 1 minute test. That is normal.</li>
          <li>If accuracy drops sharply, slow down slightly and focus on rhythm.</li>
          <li>Aim for a score that is close to your 1 minute result. That means great consistency.</li>
        </ul>

        <h2>Tips for longer tests</h2>
        <ul>
          <li>Sit upright with relaxed shoulders and floating wrists.</li>
          <li>Breathe steadily and avoid tensing your fingers.</li>
          <li>Use the easy level first, then move to medium and hard.</li>
          <li>Rest your eyes and hands for a minute between attempts.</li>
        </ul>
      </section>
    </div>
  );
}