'use client';

import { stripLeadingSlash } from '@/utils/stripLeadingSlash';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Fuse from 'fuse.js';
import { validRoutes } from '@/utils/routes';

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
    <div className="min-h-screen w-full bg-[#100F10] text-white flex items-center justify-center px-6">
      {/* Ghost 404 in background */}

      {/* Card */}
      <div className="  relative z-10 w-auto  rounded-2xl bg-card-bg border border-white/10 shadow-2xl px-16 py-14 text-center space-y-6  ">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow">
          Page Not Found
        </h2>

        <p className="text-gray-300 text-2xl">
          We couldn’t find{' '}
          <span className="font-semibold break-words text-red-300 underline">/{cleanPath}</span>
        </p>

        {suggestion && (
          <p className="text-gray-400 text-xl">
            Did you mean{' '}
            <Link
              href={`/${suggestion}`}
              className="text-lime-400 font-semibold underline hover:text-white transition-colors duration-200 ease-in-out"
            >
              /{suggestion}
            </Link>
            ?
          </p>
        )}

        <div className="pt-4">
          <Link
            href="/"
            className="text-2xl inline-block px-6 py-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-200 ease-in-out text-white font-medium shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
