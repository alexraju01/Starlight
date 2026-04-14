'use client';

import { FallbackProps } from 'react-error-boundary';

interface SliderErrorFallbackProps extends FallbackProps {
  message?: string;
}

export function SliderErrorFallback({ resetErrorBoundary, message }: SliderErrorFallbackProps) {
  return (
    <div className="my-5 rounded-lg border border-dashed border-red-900/30 bg-[#1a1a1a] py-10 text-center text-red-400">
      <p className="font-medium">{message || 'Something went wrong loading this section.'}</p>

      <button
        onClick={resetErrorBoundary}
        className="mt-4 rounded bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-500"
      >
        Retry Connection
      </button>
    </div>
  );
}
