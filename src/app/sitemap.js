import { LEGAL_PAGES, PAGES, SITE_URL } from "@/lib/site";

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, priority: 1 },
    ...PAGES.map((p) => ({
      url: `${SITE_URL}${p.href}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...LEGAL_PAGES.map((p) => ({
      url: `${SITE_URL}${p.href}`,
      lastModified: now,
      priority: 0.3,
    })),
  ];
}