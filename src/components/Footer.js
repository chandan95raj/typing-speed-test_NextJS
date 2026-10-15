import Link from "next/link";
import { LEGAL_PAGES, PAGES, SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-links">
          {PAGES.map((p) => (
            <Link key={p.href} href={p.href}>
              {p.label}
            </Link>
          ))}
        </div>
        <div className="footer-links">
          {LEGAL_PAGES.map((p) => (
            <Link key={p.href} href={p.href}>
              {p.label}
            </Link>
          ))}
        </div>
        <p>
          Your results, streaks and achievements are saved only in your own
          browser. No account is needed.
        </p>
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
        <p className="developer-credit">Developed by Chandan Raj</p>
      </div>
    </footer>
  );
}