import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Required for pdf2json (used in statement extraction) to work correctly
  // in Next.js server routes — without this, it throws "nodeUtil is not
  // defined". Stable Next.js 15 config key.
  serverExternalPackages: ["pdf2json"],
};

export default nextConfig;