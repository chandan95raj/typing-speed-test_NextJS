import TypingTest from "@/components/TypingTest";

export const metadata = {
  title: "1 Minute Typing Test - Check Your WPM in 60 Seconds",
  description:
    "Take a free 1 minute typing test and find out your words per minute and accuracy. Includes WPM benchmarks and tips for improving your speed.",
  alternates: { canonical: "/typing-test/1-minute" },
};

const levels = [
  ["Beginner", "Under 25 WPM"],
  ["Average", "25 - 40 WPM"],
  ["Good", "40 - 60 WPM"],
  ["Fast", "60 - 80 WPM"],
  ["Professional", "80+ WPM"],
];

export default function OneMinutePage() {
  return (
    <div>
      <header className="page-head">
        <h1>1 Minute Typing Test</h1>
        <p className="lead">
          The fastest way to check your typing speed. Type as accurately as you can for 60
          seconds and get your WPM instantly.
        </p>
      </header>

      <TypingTest initialMinutes={1} />

      <section className="section prose">
        <h2>Why take a 1 minute typing test?</h2>
        <p>
          A one minute test is the standard way to measure typing speed. It is short enough to
          repeat several times, and it shows how fast you can type when you are fully focused.
          It is ideal for job applications, warm-ups and quick progress checks.
        </p>

        <h2>Typing speed levels</h2>
        <div className="card table-wrap">
          <table>
            <thead>
              <tr><th>Level</th><th>Speed</th></tr>
            </thead>
            <tbody>
              {levels.map(([l, s]) => (
                <tr key={l}><td>{l}</td><td>{s}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>How to get a better 1 minute score</h2>
        <ul>
          <li>Take one practice run first to warm up your fingers.</li>
          <li>Do not stop to fix every mistake. Keep a steady rhythm.</li>
          <li>Read a few words ahead of what you are typing.</li>
          <li>Retake the test 3 times and compare your best result.</li>
        </ul>
      </section>
    </div>
  );
}