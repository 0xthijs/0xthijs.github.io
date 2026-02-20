import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/projects/hr-analytics-2030',
  assetPrefix: '/projects/hr-analytics-2030/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
