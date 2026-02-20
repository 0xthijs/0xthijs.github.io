import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/projects/hr-analytics-dashboard',
  assetPrefix: '/projects/hr-analytics-dashboard/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
