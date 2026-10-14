export const metadata = {
  title: "About SpeedType",
  description:
    "Learn about SpeedType, a free online typing speed test with no sign-up, local progress tracking and daily challenges.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div>
      <header className="page-head">
        <h1>About SpeedType</h1>
      </header>
      <section className="prose">
        <p>
          SpeedType is a free typing speed test built to help people measure and improve how
          fast and how accurately they type. You can start a test instantly, without creating
          an account.
        </p>
        <h2>What you can do here</h2>
        <ul>
          <li>Take 1, 3, 5 and 10 minute typing tests.</li>
          <li>Practice with easy, medium and hard English passages.</li>
          <li>Track your personal best, streaks, achievements and progress charts.</li>
          <li>Take a new daily challenge that is the same for everyone.</li>
          <li>Calculate your WPM and accuracy from your own numbers.</li>
        </ul>
        <h2>How results are stored</h2>
        <p>
          Your results are saved in your own browser using local storage. They are not sent to
          any server, and you can delete them at any time from the statistics section.
        </p>
      </section>
    </div>
  );
}