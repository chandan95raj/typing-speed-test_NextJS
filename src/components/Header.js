"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { PAGES, SITE_NAME } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          ⌨️ {SITE_NAME}
        </Link>

        <nav className={`nav ${open ? "open" : ""}`} aria-label="Main navigation">
          {PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className={`nav-link ${pathname === p.href ? "active" : ""}`}
              aria-current={pathname === p.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {p.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}