'use client';

import { RotateCw } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';

import { ghostButton } from '@/components/ui/buttonStyles';

interface Props {
  children: React.ReactNode;
  /** Shown in place of the row if it fails to load. */
  message?: string;
}

/** Contains a failing row (with a retry button) so the rest of the page keeps working. */
export default function RowErrorBoundary({ children, message }: Props) {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
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
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
