import type { MetadataRoute } from "next";

/* Mirrors the robots policy in the revamp brief. The OAI-SearchBot
   allowance is deliberate: the FAQ blocks on this site are written
   to be quoted by answer engines, so we want them crawled. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/tag/", "/author/", "/api/"],
      },
      { userAgent: "OAI-SearchBot", allow: "/" },
    ],
    sitemap: "https://broadarks.com/sitemap.xml",
  };
}
