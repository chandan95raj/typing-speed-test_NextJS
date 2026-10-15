import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import Link from "next/link";
import TypingTest from "@/components/TypingTest";
import { PAGES, SITE_DESCRIPTION } from "@/lib/site";

export const metadata = {
  title: { absolute: "SpeedType - Free Online Typing Speed Test (WPM & Accuracy)" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

const features = [
  ["⚡", "Real-time results", "See your WPM, accuracy and timer update as you type."],
  ["⏱️", "Your pace, your test", "Pick 1, 3, 5 or 10 minutes, from a quick check to an endurance run."],
  ["🎯", "Find your level", "Choose easy, medium or hard passages with punctuation and numbers."],
  ["📈", "See your progress", "Personal bests, charts, streaks and achievements saved in your browser."],
  ["🔥", "Daily challenge", "Take on a fresh shared passage every day and keep your streak going."],
  ["🔒", "Private by design", "Start instantly. Your results stay on your device."],
];

const faqs = [
  ["What is a good typing speed?", "Most people type around 40 words per minute. 60 WPM is good, 80 WPM or more is fast, and above 100 WPM is exceptional."],
  ["How is WPM calculated?", "Every 5 characters count as one word. Gross WPM is all characters typed divided by 5 and by the minutes taken. Net WPM only counts the correct characters."],
  ["Are my results saved?", "Yes, in your own browser using local storage. Clearing your browser data removes them."],
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

export default function HomePage() {
  return (
    <div>
      <JsonLd data={jsonLd} />
      <header className="home-hero">
        <div className="eyebrow">⌨ &nbsp; Your next personal best starts here</div>
        <h1>Find your flow.<br /><span>Feel the speed.</span></h1>
        <p className="lead">
          A better way to measure your typing speed, build accuracy and watch your progress grow.
        </p>
        <div className="trust-row" aria-label="Service highlights">
          <span>✦ Free to use</span>
          <span>⌁ No sign-up</span>
          <span>◉ Progress saved locally</span>
        </div>
      </header>

      <TypingTest initialMinutes={1} />

      <section className="section">
        <h2>Why use SpeedType?</h2>
        <p className="muted">Everything you need to make every practice session count.</p>
        <div className="grid">
          {features.map(([icon, title, text]) => (
            <div className="card feature-card" key={title}>
              <div className="feature-icon" aria-hidden="true">{icon}</div>
              <h3>{title}</h3>
              <p className="muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Explore all tests and tools</h2>
        <div className="grid">
          {PAGES.map((p) => (
            <Link key={p.href} href={p.href} className="link-card">
              <span>
                <strong>{p.label}</strong>
                {p.description}
              </span>
              <span className="link-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section prose">
        <h2>Frequently asked questions</h2>
        {faqs.map(([q, a]) => (
          <div key={q}>
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}