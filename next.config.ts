import { NextConfig } from 'next';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true, // 👈 This disables ESLint during builds
  },

  turbopack: {
    root: path.join(__dirname, '..'),
  },

  // output: "export",
  images: {
    qualities: [60, 75],
    imageSizes: [185, 342],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
