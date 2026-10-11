'use client';

import Fuse from 'fuse.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { stripLeadingSlash, validRoutes } from '@/utils';

import type { Route } from 'next';

/** "We couldn't find /moviez" plus a fuzzy "Did you mean /movie?" for typos in the first segment. */
export default function NotFoundPath() {
  const cleanPath = stripLeadingSlash(usePathname());

  const suggestion = useMemo(() => {
    const firstSegment = cleanPath.split('/')[0];
    if (!firstSegment) return null;
    const fuse = new Fuse(validRoutes, { threshold: 0.4 });
    return fuse.search(firstSegment)[0]?.item ?? null;
  }, [cleanPath]);

  return (
    <>
      <p className="mt-[12px] max-w-[52ch] text-[15px] leading-[1.6] text-white/60 lg:text-[16px]">
        We couldn’t find{' '}
        <code className="rounded-[6px] bg-white/[0.08] px-[6px] py-[2px] font-mono text-[14px] break-all text-white/85">
          /{cleanPath}
        </code>
        . It may have moved, or the link may be broken.
      </p>
      {suggestion && (
        <p className="mt-[12px] text-[15px] text-white/60">
          Did you mean{' '}
          <Link
            href={`/${suggestion}` as Route}
            className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
          >
            /{suggestion}
          </Link>
          ?
        </p>
      )}
    </>
  );
}
