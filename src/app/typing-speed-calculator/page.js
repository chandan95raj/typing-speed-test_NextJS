import SpeedCalculator from "@/components/SpeedCalculator";

export const metadata = {
  title: "Typing Speed Calculator - Gross WPM, Net WPM & Accuracy",
  description:
    "Free typing speed calculator. Enter the words or characters you typed, your mistakes and the time taken to calculate gross WPM, net WPM and accuracy.",
  alternates: { canonical: "/typing-speed-calculator" },
};

const averages = [
  ["Beginner", "Under 25 WPM", "Still learning key positions"],
  ["Average", "25 - 40 WPM", "Typical for casual computer users"],
  ["Good", "40 - 60 WPM", "Comfortable for office work"],
  ["Fast", "60 - 80 WPM", "Above average, great for writers and developers"],
  ["Excellent", "80+ WPM", "Professional level typing"],
];

export default function CalculatorPage() {
  return (
    <div>
      <header className="page-head">
        <h1>Typing Speed Calculator</h1>
        <p className="lead">
          Typed something somewhere else? Enter your numbers to work out your words per minute
          and accuracy.
        </p>
      </header>

      <SpeedCalculator />

      <section className="section prose">
        <h2>The formulas</h2>
        <ul>
          <li><strong>Gross WPM</strong> = (total words typed) ÷ minutes</li>
          <li><strong>Net WPM</strong> = Gross WPM - (uncorrected mistakes ÷ minutes)</li>
          <li><strong>Accuracy</strong> = (typed - mistakes) ÷ typed × 100</li>
        </ul>
        <p>
          If you count characters, the calculator divides them by 5 to get words. In characters
          mode, every mistaken character counts as one fifth of a word.
        </p>

        <h2>Example</h2>
        <p>
          You type 250 words in 5 minutes with 10 uncorrected mistakes. Gross WPM is 250 ÷ 5 =
          50. Net WPM is 50 - (10 ÷ 5) = 48. Accuracy is (250 - 10) ÷ 250 = 96%.
        </p>

        <h2>Average typing speeds</h2>
        <div className="card table-wrap">
          <table>
            <thead>
              <tr><th>Level</th><th>Net WPM</th><th>Description</th></tr>
            </thead>
            <tbody>
              {averages.map(([a, b, c]) => (
                <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}