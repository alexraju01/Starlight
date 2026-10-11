'use client';

import { RotateCw } from 'lucide-react';
import { FallbackProps } from 'react-error-boundary';

import { ghostButton } from '@/components/ui/buttonStyles';

interface SliderErrorFallbackProps extends FallbackProps {
  message?: string;
}

/** Shown in place of a row that failed to load; the rest of the page keeps working. */
export function SliderErrorFallback({ resetErrorBoundary, message }: SliderErrorFallbackProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-[16px] rounded-[14px] border border-white/[0.08] bg-white/[0.03] px-[24px] py-[40px] text-center"
    >
      <p className="text-[15px] text-white/70">
        {message || 'Something went wrong loading this section.'}
      </p>
      <button type="button" onClick={resetErrorBoundary} className={ghostButton}>
        <RotateCw aria-hidden="true" className="size-[18px]" />
        Try again
      </button>
    </div>
  );
}
