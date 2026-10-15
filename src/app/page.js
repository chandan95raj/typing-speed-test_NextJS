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
  ["↗", "Real-time results", "See your WPM, accuracy and timer update as you type."],
  ["◷", "Your pace, your test", "Pick 1, 3, 5 or 10 minutes, from a quick check to an endurance run."],
  ["◎", "Find your level", "Choose easy, medium or hard passages with punctuation and numbers."],
  ["▥", "See your progress", "Personal bests, charts, streaks and achievements saved in your browser."],
  ["✳", "Daily challenge", "Take on a fresh shared passage every day and keep your streak going."],
  ["◉", "Private by design", "Start instantly. Your results stay on your device."],
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
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> A better kind of practice</div>
          <h1>Less hesitation.<br /><span>More flow.</span></h1>
          <p className="lead">
            Find your real typing speed, build accuracy, and make every minute at the keyboard count.
          </p>
          <a className="btn btn-primary hero-cta" href="#typing-test">
            Start a free test <span aria-hidden="true">↓</span>
          </a>
          <div className="trust-row" aria-label="Service highlights">
            <span><b aria-hidden="true">✓</b> Free, always</span>
            <span><b aria-hidden="true">✓</b> No account needed</span>
            <span><b aria-hidden="true">✓</b> Private by design</span>
          </div>
        </div>
        <aside className="hero-note" aria-label="A little practice goes a long way">
          <div className="hero-note-top"><span className="hero-note-icon">⌘</span><span>YOUR PRACTICE SPACE</span></div>
          <div className="key-art" aria-hidden="true">
            <span>Q</span><span>W</span><span>E</span><span>R</span>
            <span>A</span><span>S</span><span>D</span><span>F</span>
            <span className="key-space" />
          </div>
          <p>Small sessions.<br /><strong>Big progress.</strong></p>
          <span className="hero-note-caption">One test at a time.</span>
        </aside>
      </header>

      <div id="typing-test" className="test-shell">
        <div className="test-intro">
          <div>
            <span className="section-kicker">THE QUICK TEST</span>
            <h2>Ready when you are.</h2>
          </div>
          <span className="live-pill"><span /> Live feedback</span>
        </div>
        <TypingTest initialMinutes={1} />
      </div>

      <section className="section">
        <div className="section-heading">
          <div><span className="section-kicker">MADE FOR YOUR MOMENTUM</span><h2>Practice that adds up.</h2></div>
          <p className="muted">No distractions. Just you, the words, and a little progress each day.</p>
        </div>
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
        <div className="section-heading">
          <div><span className="section-kicker">PICK YOUR NEXT STEP</span><h2>A little more to explore.</h2></div>
        </div>
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