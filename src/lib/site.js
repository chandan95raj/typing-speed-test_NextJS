export const SITE_NAME = "SpeedType";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const SITE_DESCRIPTION =
  "Free online typing speed test. Check your WPM and accuracy with 1, 3, 5 and 10 minute tests, track your progress and build a daily typing streak. No sign-up needed.";

export const PAGES = [
  {
    href: "/typing-test",
    label: "Typing Test",
    description:
      "Choose 1, 3, 5 or 10 minutes, pick a difficulty and take the daily challenge.",
  },
  {
    href: "/typing-test/1-minute",
    label: "1 Minute",
    description: "The classic quick test. Get your WPM in just 60 seconds.",
  },
  {
    href: "/typing-test/5-minute",
    label: "5 Minute",
    description: "Measure endurance and consistency with a longer test.",
  },
  {
    href: "/typing-test/english",
    label: "English",
    description: "English passages from easy to hard, with punctuation and numbers.",
  },
  {
    href: "/typing-test/paragraphs",
    label: "Paragraphs",
    description: "Pick a specific paragraph and practice it until it is perfect.",
  },
  {
    href: "/typing-speed-calculator",
    label: "Calculator",
    description: "Calculate gross WPM, net WPM and accuracy from your own numbers.",
  },
];

export const LEGAL_PAGES = [
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];