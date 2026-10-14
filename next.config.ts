import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // TMDB_API_KEY is read on the server only (see src/utils/fetchData.ts).
  // Do NOT expose it via `env` – that inlines the secret into client bundles.

  typedRoutes: true,

  turbopack: { root: __dirname },

  images: {
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

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
