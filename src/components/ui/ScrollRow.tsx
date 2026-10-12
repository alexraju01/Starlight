'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

import CustomSliderButtons from '@/components/Media/CustomSlider/CustomSliderButtons';
import { nearestSnapPoint, scrollBehavior, snapPoints } from '@/utils/scrollSnap';

import DragScrollList from './DragScrollList';

interface Props {
  /** Row title (e.g. a SectionHeading); the arrows sit opposite it. */
  heading: React.ReactNode;
  /** Accessible name for the list itself. */
  label: string;
  /** Extra classes for the list, e.g. gaps or padding for hover effects. */
  listClassName?: string;
  /** `<li>` items. */
  children: React.ReactNode;
}

/** How far each arrow press scrolls, as a share of the visible width. */
const PAGE_FRACTION = 0.85;
/** Width of the fade on an edge that has more content beyond it. */
const FADE_PX = 56;

/**
 * Free-scrolling horizontal row with no visible scrollbar: arrow buttons page through it on
 * larger screens, touch swipes it, a mouse can drag it. Each edge fades out only while
 * there's more content past it, so the row always hints at where it continues.
 */
export default function ScrollRow({ heading, label, listClassName, children }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  // Runs on every scroll event, but only re-renders when an edge actually flips – a
  // re-render per scroll frame made the whole row stutter (worst in dev builds).
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

  /** Glides about a screen's width, landing exactly on an item edge (no snap correction). */
  const page = (direction: -1 | 1) => {
    const el = listRef.current;
    if (!el) return;
    const points = snapPoints(el);
    const desired = el.scrollLeft + direction * el.clientWidth * PAGE_FRACTION;
    let target = nearestSnapPoint(el, desired);
    // Items wider than a page: still move at least one item.
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
          <CustomSliderButtons direction="left" onClick={() => page(-1)} disabled={edges.atStart} />
          <CustomSliderButtons direction="right" onClick={() => page(1)} disabled={edges.atEnd} />
        </div>
      </div>

      {/* Bleeds to the screen edge on mobile so items scroll under the gutter. */}
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
        {/* Edge fades as overlays, not a mask on the scroller: a masked scroller is repainted
            on every frame, while overlays let the browser just slide the row. */}
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
