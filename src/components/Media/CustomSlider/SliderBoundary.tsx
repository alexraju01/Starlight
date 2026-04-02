'use client';

import { ErrorBoundary } from 'react-error-boundary';

import { SliderErrorFallback } from '@/components/Error/SliderErrorFallback';

interface SliderBoundaryProps {
  children: React.ReactNode;
  message?: string;
}

export default function SliderBoundary({ children, message }: SliderBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={(fallbackProps) => (
        <SliderErrorFallback {...fallbackProps} message={message} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
