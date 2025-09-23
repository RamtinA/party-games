import type { NextConfig } from "next";
import withPWA from "next-pwa";
const base = process.env.NEXT_PUBLIC_PAGES_BASE_PATH || '';
const assetPrefix = process.env.NEXT_PUBLIC_PAGES_ASSET_PREFIX || '';

const nextConfig: NextConfig = {
  // Remove experimental.appDir as it's no longer needed in Next.js 15
  output: 'export',            // produce static files for `next export`
  basePath: base,              // e.g., "/party-games" for project pages
  assetPrefix: assetPrefix,    // ensures CSS/JS assets load from the right path
  trailingSlash: true,         // optional: generate folder/index.html so paths work nicely

};

const config = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig as any);

export default config;
