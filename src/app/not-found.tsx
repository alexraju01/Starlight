'use client';

import Fuse from 'fuse.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { stripLeadingSlash, validRoutes } from '@/utils';

import type { Route } from 'next';

export default function NotFound() {
  const pathname = usePathname();
  const cleanPath = stripLeadingSlash(pathname);

  const suggestion = useMemo(() => {
    // Only fuzzy-match the first segment: "/moviez/123" → "movie".
    const firstSegment = cleanPath.split('/')[0];
    if (!firstSegment) return null;
    const fuse = new Fuse(validRoutes, { threshold: 0.4 });
    return fuse.search(firstSegment)[0]?.item ?? null;
  }, [cleanPath]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#100F10] px-6 text-white">
      {/* Card */}
      <div className="bg-card-bg relative z-10 w-full max-w-2xl space-y-6 rounded-2xl border border-white/10 px-8 py-14 text-center shadow-2xl sm:px-16">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow sm:text-5xl md:text-6xl lg:text-7xl">
          Page Not Found
        </h1>

        <p className="text-2xl text-gray-300">
          We couldn’t find{' '}
          <span className="font-semibold break-words text-red-300 underline">/{cleanPath}</span>
        </p>

        {suggestion && (
          <p className="text-xl text-gray-400">
            Did you mean{' '}
            <Link
              href={`/${suggestion}` as Route}
              className="font-semibold text-lime-400 underline transition-colors duration-200 ease-in-out hover:text-white"
            >
              /{suggestion}
            </Link>
            ?
          </p>
        )}

        <div className="pt-4">
          <Link
            href="/"
            className="inline-block rounded-full border border-white/20 bg-white/10 px-6 py-3 text-2xl font-medium text-white shadow transition-all duration-200 ease-in-out hover:bg-white/20 hover:shadow-lg focus:ring-2 focus:ring-white/30 focus:outline-none"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
