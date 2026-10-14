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
  ["Real-time results", "See your WPM, accuracy and timer update as you type."],
  ["1, 3, 5 and 10 minute tests", "Pick the length that fits your goal, from a quick check to an endurance run."],
  ["Three difficulty levels", "Easy, medium and hard English passages, including punctuation and numbers."],
  ["Progress tracking", "Personal best, charts, streaks and achievements saved in your browser."],
  ["Daily challenge", "A new shared passage every day to keep your streak going."],
  ["No sign-up", "Start instantly. Your data never leaves your device."],
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
      <header className="page-head">
        <h1>Test Your Typing Speed</h1>
        <p className="lead">
          Start typing below to measure your words per minute (WPM) and accuracy. Free,
          fast and no registration required.
        </p>
      </header>

      <TypingTest initialMinutes={1} />

      <section className="section">
        <h2>Why use SpeedType?</h2>
        <div className="grid">
          {features.map(([title, text]) => (
            <div className="card" key={title}>
              <h3>{title}</h3>
              <p className="muted" style={{ margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Explore all tests and tools</h2>
        <div className="grid">
          {PAGES.map((p) => (
            <Link key={p.href} href={p.href} className="link-card">
              <strong>{p.label}</strong>
              <span>{p.description}</span>
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