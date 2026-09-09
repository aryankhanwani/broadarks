import type { MetadataRoute } from "next";

const BASE = "https://broadarks.com";

/** XML sitemap for search engines. The human-readable map lives at /sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/divisions", priority: 0.9, changeFrequency: "monthly" },
    { path: "/approach", priority: 0.8, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/sitemap", priority: 0.3, changeFrequency: "monthly" },
    { path: "/privacy-and-policies", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms-conditions-and-legal", priority: 0.3, changeFrequency: "yearly" },
  ];

  return pages.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
