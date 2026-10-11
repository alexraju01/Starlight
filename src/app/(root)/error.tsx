'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      role="alert"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <h1 className="text-4xl font-bold md:text-5xl">Something went wrong</h1>
      <p className="max-w-xl text-[16px] text-slate-400">
        We couldn’t load this page. This is usually temporary — please try again.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="bg-primary rounded-full px-8 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-[#b8281f]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-white/20 px-8 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-white/10"
        >
          Go home
        </Link>
      </div>
      {error.digest && <p className="text-[12px] text-slate-600">Error ID: {error.digest}</p>}
    </div>
  );
}
