import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows local release verification while `npm run dev` is using `.next`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
