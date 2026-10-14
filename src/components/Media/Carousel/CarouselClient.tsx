'use client';

import clsx from 'clsx';
import { useState, ReactNode, useCallback, useEffect, useRef } from 'react';

import { useCarousel } from '@/context/CarouselContext';
import { useSwipe } from '@/hooks/useSwipe';
import { prefersReducedMotion } from '@/utils/motion';

import CarouselControls from './CarouselControls';
import CarouselDots from './CarouselDots';

interface Props {
  children: ReactNode;
  itemCount: number;
}

const AUTOPLAY_MS = 5000;

/** True modulo (`-1 mod 9` → 8). */
const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Shortest signed distance from `from` to `to` around a ring of `count` slides. */
const ringDistance = (to: number, from: number, count: number) => {
  const d = mod(to - from, count);
  return d > count / 2 ? d - count : d;
};

/**
 * Endless hero carousel. Slides sit on a ring: `position` is an unbounded counter (the
 * active slide is position mod count) and each slide gets its signed distance as `--d`,
 * written to the DOM so dragging never re-renders. CSS turns `--d` into the slide offset
 * and parallax (.carousel-slide in globals.css).
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
        // Hidden off-screen, so a slide wrapping round the ring never flies across.
        el.style.visibility = Math.abs(d) > 1.5 ? 'hidden' : '';
      });
    },
    [itemCount],
  );

  /** Where the slides are on screen now (lags `position` mid-transition). */
  const visualPosition = () => {
    const track = trackRef.current;
    const active = track?.children[currentIndex] as HTMLElement | undefined;
    if (!track || !active) return position;
    const offsetPx = new DOMMatrix(getComputedStyle(active).transform).m41;
    return position - offsetPx / (track.offsetWidth || 1);
  };

  // Grabbing mid-animation starts from where the slides are, so nothing jumps.
  const dragOrigin = useRef(0);

  const { isDragging, handlers: swipeHandlers } = useSwipe({
    enabled: !isAnyVideoPlaying && itemCount > 1,
    onDragStart: () => {
      dragOrigin.current = visualPosition();
      layout(dragOrigin.current);
    },
    onDrag: (dx) => layout(dragOrigin.current - dx / (trackRef.current?.offsetWidth || 1)),
    onRelease: (direction) => {
      const target = Math.round(dragOrigin.current) + direction;
      if (target === position) layout(position);
      else setPosition(target);
    },
  });

  // Off-screen slides are inert so Tab can't land on invisible buttons.
  useEffect(() => {
    layout(position);
    Array.from(trackRef.current?.children ?? []).forEach((slide, i) => {
      const hidden = i !== currentIndex;
      (slide as HTMLElement).inert = hidden;
      slide.setAttribute('aria-hidden', String(hidden));
    });
  }, [position, currentIndex, layout]);

  // No transitions for the first placement, so slides don't animate in from the SSR stack.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    void section.offsetWidth; // flush layout before re-enabling transitions
    section.removeAttribute('data-instant');
  }, []);

  // Autoplay: paused on hover/focus, while dragging or playing a trailer, in a hidden tab
  // and for reduced motion. Restarts after every slide change (`position` dependency).
  useEffect(() => {
    if (isPaused || isDragging || isAnyVideoPlaying || itemCount < 2) return;
    if (prefersReducedMotion()) return;

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
      className="relative flex cursor-grab [touch-action:pan-y] flex-col overflow-hidden pb-[6px] select-none data-[dragging]:cursor-grabbing min-[840px]:pb-0"
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
          // Poster-shaped below 840px; 16:9 above, capped to the space under the navbar.
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
        <div className="hidden sm:block">
          <CarouselControls onPrev={handlePrev} onNext={handleNext} />
        </div>
        <CarouselDots count={itemCount} current={currentIndex} onSelect={goTo} />
      </div>
    </section>
  );
}
