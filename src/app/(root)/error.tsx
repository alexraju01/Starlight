'use client';

import { RotateCw, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { ghostButton, primaryButton } from '@/components/ui/buttonStyles';
import { logError } from '@/utils/logger';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError('Route error boundary', error);
  }, [error]);

  return (
    <div
      role="alert"
      className="page-gutter flex min-h-[60vh] flex-col items-center justify-center py-[64px] text-center"
    >
      <span className="flex size-[64px] items-center justify-center rounded-full bg-white/[0.06]">
        <TriangleAlert aria-hidden="true" className="size-[28px] text-white/70" />
      </span>
      <h1 className="mt-[20px] text-[26px] leading-[1.2] font-bold tracking-[-0.01em] text-white lg:text-[32px]">
        Something went wrong
      </h1>
      <p className="mt-[12px] max-w-[48ch] text-[15px] leading-[1.6] text-white/60 lg:text-[16px]">
        We couldn’t load this page. This is usually temporary — please try again.
      </p>
      <div className="mt-[28px] flex w-full flex-col gap-[12px] sm:w-auto sm:flex-row">
        <button type="button" onClick={reset} className={primaryButton}>
          <RotateCw aria-hidden="true" className="size-[18px]" />
          Try again
        </button>
        <Link href="/" className={ghostButton}>
          Go to home
        </Link>
      </div>
      {error.digest && (
        <p className="mt-[20px] font-mono text-[12px] text-white/30">Error ID: {error.digest}</p>
      )}
    </div>
  );
}
