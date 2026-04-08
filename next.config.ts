import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  output: 'standalone',
  outputFileTracingExcludes: {
    "*": ["typescript"],
  },

  experimental: {
    scrollRestoration: true
  }
};

export default nextConfig;
