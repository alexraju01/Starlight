'use client';

import { FallbackProps } from 'react-error-boundary';

interface SliderErrorFallbackProps extends FallbackProps {
  message?: string;
}

export function SliderErrorFallback({ resetErrorBoundary, message }: SliderErrorFallbackProps) {
  return (
    <div className="text-center my-5 py-10 bg-[#1a1a1a] border border-dashed border-red-900/30 rounded-lg text-red-400">
      <p className="font-medium">{message || 'Something went wrong loading this section.'}</p>

      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded transition-colors"
      >
        Retry Connection
      </button>
    </div>
  );
}
