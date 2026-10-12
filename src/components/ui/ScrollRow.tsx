'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

import { nearestSnapPoint, scrollBehavior, snapPoints } from '@/utils/scrollSnap';

import ArrowButton from './ArrowButton';
import DragScrollList from './DragScrollList';

interface Props {
  /** Shown opposite the arrows. */
  heading: React.ReactNode;
  /** Accessible name for the list. */
  label: string;
  listClassName?: string;
  /** `<li>` items. */
  children: React.ReactNode;
}

/** Share of the visible width each arrow press scrolls. */
const PAGE_FRACTION = 0.85;
const FADE_PX = 56;

/**
 * Free-scrolling row without a scrollbar: arrows on larger screens, swipe, mouse drag. Each
 * edge fades only while there's more content past it.
 */
export default function ScrollRow({ heading, label, listClassName, children }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  // Runs per scroll event but only re-renders when an edge flips (per-frame renders stutter).
  const measure = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 2;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setEdges((prev) =>
      prev.atStart === atStart && prev.atEnd === atEnd ? prev : { atStart, atEnd },
    );
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      observer.disconnect();
    };
  }, [measure]);

  /** Glides about a screen's width, landing exactly on an item edge. */
  const page = (direction: -1 | 1) => {
    const el = listRef.current;
    if (!el) return;
    const points = snapPoints(el);
    const desired = el.scrollLeft + direction * el.clientWidth * PAGE_FRACTION;
    let target = nearestSnapPoint(el, desired);
    // Items wider than a page: still move at least one.
    if (Math.abs(target - el.scrollLeft) < 2) {
      target =
        direction > 0
          ? (points.find((p) => p > el.scrollLeft + 2) ?? target)
          : ([...points].reverse().find((p) => p < el.scrollLeft - 2) ?? target);
    }
    el.scrollTo({ left: target, behavior: scrollBehavior() });
  };

  return (
    <div className="flex flex-col gap-[16px] lg:gap-[20px]">
      <div className="flex items-center justify-between gap-[16px]">
        {heading}
        <div className="hidden gap-[8px] sm:flex">
          <ArrowButton direction="left" onClick={() => page(-1)} disabled={edges.atStart} />
          <ArrowButton direction="right" onClick={() => page(1)} disabled={edges.atEnd} />
        </div>
      </div>

      {/* Bleeds to the screen edge on mobile. */}
      <div className="relative -mx-[16px] sm:-mx-[24px] lg:mx-0">
        <DragScrollList
          ref={listRef}
          aria-label={label}
          className={clsx(
            'flex snap-x snap-proximity scroll-px-[16px] overflow-x-auto overscroll-x-contain px-[16px] [scrollbar-width:none] sm:scroll-px-[24px] sm:px-[24px] lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden',
            listClassName,
          )}
        >
          {children}
        </DragScrollList>
        {/* Overlays, not a mask: a masked scroller repaints every frame. */}
        <div
          aria-hidden="true"
          className={clsx(
            'from-secondary pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r to-transparent transition-opacity duration-300',
            edges.atStart ? 'opacity-0' : 'opacity-100',
          )}
          style={{ width: FADE_PX }}
        />
        <div
          aria-hidden="true"
          className={clsx(
            'from-secondary pointer-events-none absolute inset-y-0 right-0 bg-gradient-to-l to-transparent transition-opacity duration-300',
            edges.atEnd ? 'opacity-0' : 'opacity-100',
          )}
          style={{ width: FADE_PX }}
        />
      </div>
    </div>
  );
}
