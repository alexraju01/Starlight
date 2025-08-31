import path from 'path';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: { TMDB_API_KEY: process.env.TMDB_API_KEY },

  typedRoutes: true,

  turbopack: { root: path.join(__dirname, '..') },

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
