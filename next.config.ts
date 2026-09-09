import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The site is deliberately flat — nothing nests deeper than one
     path segment. These redirects catch the retired nested URLs. */
  async redirects() {
    return [
      { source: "/about/leadership", destination: "/about#leadership", permanent: true },
      { source: "/about/governance", destination: "/about#governance", permanent: true },
      { source: "/divisions/karigreen", destination: "/divisions#kari-green", permanent: true },
      { source: "/divisions/vihanga-ai", destination: "/divisions#vihaanga-ai", permanent: true },
      { source: "/divisions/:slug", destination: "/divisions#:slug", permanent: true },
    ];
  },
};

export default nextConfig;
