import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/cms/:path*",
        destination: "https://apexmedicalgroup.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
