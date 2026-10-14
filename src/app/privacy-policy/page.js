export const metadata = {
  title: "Privacy Policy",
  description:
    "How SpeedType handles your data: local storage for results, analytics cookies and third-party advertising.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <div>
      <header className="page-head">
        <h1>Privacy Policy</h1>
        <p className="muted">Last updated: October 2026</p>
      </header>
      <section className="prose">
        <h2>Information we store on your device</h2>
        <p>
          SpeedType saves your typing results, personal best, streaks, achievements and theme
          preference in your browser&apos;s local storage. This data stays on your device. We
          do not receive it and we do not require an account.
        </p>

        <h2>Analytics</h2>
        <p>
          We may use Google Analytics to understand how visitors use the site, such as which
          pages are visited and which devices are used. This service may set cookies and
          collect anonymous usage data. You can block analytics cookies in your browser
          settings.
        </p>

        <h2>Advertising</h2>
        <p>
          We may show ads provided by third parties such as Google AdSense. These providers may
          use cookies to show ads based on your visits to this and other websites. You can
          manage personalized advertising in your Google Ad Settings.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>Delete all saved typing data using the Clear all data button on the Typing Test page.</li>
          <li>Clear your browser data to remove local storage and cookies.</li>
          <li>Use your browser settings to block or limit cookies.</li>
        </ul>

        <h2>Children</h2>
        <p>SpeedType is not directed at children under 13 and does not knowingly collect personal information from them.</p>

        <h2>Changes to this policy</h2>
        <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>

        <h2>Contact</h2>
        <p>If you have questions about this policy, please use the Contact page.</p>
      </section>
    </div>
  );
}