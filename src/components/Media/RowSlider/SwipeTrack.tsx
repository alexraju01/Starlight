'use client';

import clsx from 'clsx';
import { useRef } from 'react';

import { useSwipe } from '@/hooks/useSwipe';

interface Props {
  /** Resting position for the current page, e.g. `translateX(-200%)`. */
  baseTransform: string;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
  children: React.ReactNode;
}

/** Drag past the first/last page moves the track at this fraction of the pointer (rubber band). */
const EDGE_RESISTANCE = 0.3;

/**
 * Slider track that follows a swipe / mouse drag and settles on the previous or next page
 * on release. The drag offset is written straight to the DOM so dragging never re-renders.
 */
export default function SwipeTrack({
  baseTransform,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  className,
  children,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const { isDragging, handlers } = useSwipe({
    enabled: canGoPrev || canGoNext,
    onDrag: (dx) => {
      const blocked = (dx > 0 && !canGoPrev) || (dx < 0 && !canGoNext);
      const offset = blocked ? dx * EDGE_RESISTANCE : dx;
      if (trackRef.current) {
        trackRef.current.style.transform = `${baseTransform} translateX(${offset}px)`;
      }
    },
    onRelease: (direction) => {
      if (direction === 1 && canGoNext) return onNext();
      if (direction === -1 && canGoPrev) return onPrev();
      // Snap back: wait a frame so the transition is re-enabled before moving.
      requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.transform = baseTransform;
      });
    },
  });

  return (
    <div
      ref={trackRef}
      className={clsx(
        'flex touch-pan-y select-none',
        isDragging
          ? 'cursor-grabbing transition-none'
          : 'cursor-grab transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        className,
      )}
      style={{ transform: baseTransform }}
      {...handlers}
    >
      {children}
    </div>
  );
}
