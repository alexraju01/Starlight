'use client';

import clsx from 'clsx';
import { useState, ReactNode, useCallback, useEffect, useRef } from 'react';

import { useCarousel } from '@/context/CarouselContext';

import CarouselControls from './CarouselControls';
import CarouselDots from './CarouselDots';
import { useCarouselSwipe } from './useCarouselSwipe';

interface Props {
  children: ReactNode;
  itemCount: number;
}

/** How long each slide stays on screen before autoplay moves on (ms). */
const AUTOPLAY_MS = 5000;

/** True modulo (`-1 mod 9` → 8). */
const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Shortest signed distance from `from` to `to` around a ring of `count` slides. */
const ringDistance = (to: number, from: number, count: number) => {
  const d = mod(to - from, count);
  return d > count / 2 ? d - count : d;
};

/*
 * Endless loop: every slide is absolutely positioned and placed by its distance from the
 * current position around a ring, so after the last slide the first one comes in from the
 * right (instead of the track rewinding through every slide).
 *
 *   position  unbounded counter (…, 8, 9, 10, …); the active slide is position mod count
 *   --d       each slide's signed distance from the centre, set imperatively so dragging
 *             never re-renders React. CSS turns it into the slide offset and the backdrop
 *             parallax (see .carousel-slide in globals.css).
 */
export default function CarouselClient({ children, itemCount }: Props) {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isAnyVideoPlaying } = useCarousel();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const currentIndex = mod(position, Math.max(itemCount, 1));

  const handlePrev = useCallback(() => setPosition((p) => p - 1), []);
  const handleNext = useCallback(() => setPosition((p) => p + 1), []);
  const goTo = (index: number) =>
    setPosition((p) => p + ringDistance(index, mod(p, itemCount), itemCount));

  /** Places every slide around the ring for a (possibly fractional, while dragging) position. */
  const layout = useCallback(
    (pos: number) => {
      const slides = trackRef.current?.children;
      if (!slides) return;
      Array.from(slides).forEach((slide, i) => {
        const el = slide as HTMLElement;
        const d = ringDistance(i, pos, itemCount);
        el.style.setProperty('--d', String(d));
        // Slides more than one step away are off-screen; hiding them means a slide that
        // wraps from the far left to the far right never visibly flies across.
        el.style.visibility = Math.abs(d) > 1.5 ? 'hidden' : '';
      });
    },
    [itemCount],
  );

  const { isDragging, handlers: swipeHandlers } = useCarouselSwipe({
    enabled: !isAnyVideoPlaying && itemCount > 1,
    getWidth: () => trackRef.current?.offsetWidth ?? 1,
    onDrag: (slidesMoved) => layout(position - slidesMoved),
    onRelease: (direction) => {
      if (direction === 1) handleNext();
      else if (direction === -1) handlePrev();
      else layout(position); // snap back
    },
  });

  // Place slides, and hide off-screen ones from keyboard + screen readers so Tab can't
  // land on invisible buttons.
  useEffect(() => {
    layout(position);
    Array.from(trackRef.current?.children ?? []).forEach((slide, i) => {
      const hidden = i !== currentIndex;
      (slide as HTMLElement).inert = hidden;
      slide.setAttribute('aria-hidden', String(hidden));
    });
  }, [position, currentIndex, layout]);

  // Transitions are off for the very first placement so slides don't animate in from the
  // server-rendered stack.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    void section.offsetWidth; // flush the instant layout before re-enabling transitions
    section.removeAttribute('data-instant');
  }, []);

  // Autoplay. Pauses on hover/focus, while dragging or a trailer plays, when the tab is
  // hidden, and is disabled for users who prefer reduced motion. `position` is a dependency
  // so the timer restarts after every manual slide change.
  useEffect(() => {
    if (isPaused || isDragging || isAnyVideoPlaying || itemCount < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') handleNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isPaused, isDragging, isAnyVideoPlaying, itemCount, handleNext, position]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (isAnyVideoPlaying) return;
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Trending this week"
      data-instant=""
      data-dragging={isDragging || undefined}
      className="relative flex cursor-grab [touch-action:pan-y] flex-col overflow-hidden pb-2 select-none data-[dragging]:cursor-grabbing min-[840px]:pb-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onKeyDown={onKeyDown}
      {...swipeHandlers}
    >
      <ul
        ref={trackRef}
        aria-live={isPaused ? 'polite' : 'off'}
        className={clsx(
          'relative w-full overflow-hidden',
          // Below 840px: Viki's billboard sizing – the larger of the screen width or 77% of
          // its height (roughly poster-shaped). From 840px: 16:9, but never taller than the
          // space between the bottom of the navbar and the bottom of the screen.
          'h-[max(100vw,77svh)] min-[840px]:h-[min(56.25vw,calc(100svh-var(--nav-h)))]',
        )}
      >
        {children}
      </ul>

      <div
        className={clsx(
          'transition-all duration-500 ease-in-out',
          isAnyVideoPlaying ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        {/* Arrows on larger screens; mobile uses swipe. */}
        <div className="hidden sm:block">
          <CarouselControls onPrev={handlePrev} onNext={handleNext} />
        </div>
        <CarouselDots count={itemCount} current={currentIndex} onSelect={goTo} />
      </div>
    </section>
  );
}
