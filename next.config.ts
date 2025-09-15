import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apexmedicalgroup.onrender.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://apexmedicalgroup.onrender.com",
          },
        ],
      },
    ]
  },
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
