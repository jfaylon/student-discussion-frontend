import type { NextConfig } from "next";

const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendApiUrl}/:path*`, // Dynamically from .env
      },
    ];
  },
};

export default nextConfig;
