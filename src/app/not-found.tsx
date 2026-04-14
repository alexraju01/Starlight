'use client';

import Fuse from 'fuse.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { stripLeadingSlash, validRoutes } from '@/utils';

export default function NotFound() {
  const pathname = usePathname();
  const cleanPath = stripLeadingSlash(pathname);

  const fuse = new Fuse(validRoutes, {
    includeScore: true,
    threshold: 0.4,
  });

  const results = fuse.search(cleanPath);
  const suggestion = results.length > 0 ? results[0].item : null;

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#100F10] px-6 text-white">
      {/* Card */}
      <div className="bg-card-bg relative z-10 w-auto space-y-6 rounded-2xl border border-white/10 px-16 py-14 text-center shadow-2xl">
        <h2 className="text-4xl font-extrabold tracking-tight drop-shadow sm:text-5xl md:text-6xl lg:text-7xl">
          Page Not Found
        </h2>

        <p className="text-2xl text-gray-300">
          We couldn’t find{' '}
          <span className="font-semibold break-words text-red-300 underline">/{cleanPath}</span>
        </p>

        {suggestion && (
          <p className="text-xl text-gray-400">
            Did you mean{' '}
            <Link
              href={`/${suggestion}` as any}
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
