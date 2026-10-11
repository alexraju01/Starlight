'use client';

import clsx from 'clsx';
import { useState, ReactNode, useCallback, useEffect, useRef } from 'react';

import { useCarousel } from '@/context/CarouselContext';

import CarouselControls from './CarouselControls';

interface Props {
  children: ReactNode;
  itemCount: number;
}

const AUTOPLAY_MS = 8000;
const SWIPE_THRESHOLD_PX = 50;
/** Drag resistance when pulling past the first / last slide. */
const EDGE_RESISTANCE = 0.35;

/*
 * Layout + parallax are driven by CSS variables so dragging never re-renders React:
 *   --pos    fractional position of the track (currentIndex, plus drag offset while swiping)
 *   --i      each slide's index (set on the <li>s below)
 *   --slide  slide width: 86% on mobile so neighbours peek in, 100% from `sm` up
 *   --gap    space between slides
 * Each slide reads `var(--i) - var(--pos)` to offset its backdrop (see CarouselItem).
 */
export default function CarouselClient({ children, itemCount }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { isAnyVideoPlaying } = useCarousel();
  const trackRef = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; y: number; axis: 'x' | 'y' | null } | null>(null);
  const didDrag = useRef(false);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
  }, [itemCount]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === itemCount - 1 ? 0 : prev + 1));
  }, [itemCount]);

  const setTrackPos = (pos: number) => {
    trackRef.current?.style.setProperty('--pos', String(pos));
  };

  // Keep the track in sync with the active slide, and hide off-screen slides from
  // keyboard + screen readers so Tab can't land on invisible buttons.
  useEffect(() => {
    setTrackPos(currentIndex);
    const slides = trackRef.current?.children;
    if (!slides) return;
    Array.from(slides).forEach((slide, i) => {
      const el = slide as HTMLElement;
      const hidden = i !== currentIndex;
      el.style.setProperty('--i', String(i));
      el.inert = hidden;
      el.setAttribute('aria-hidden', String(hidden));
    });
  }, [currentIndex, itemCount]);

  // Gentle autoplay. Pauses on hover/focus, while dragging or a trailer plays, when the
  // tab is hidden, and is disabled entirely for users who prefer reduced motion.
  useEffect(() => {
    if (isPaused || isDragging || isAnyVideoPlaying || itemCount < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') handleNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isPaused, isDragging, isAnyVideoPlaying, itemCount, handleNext, currentIndex]);

  /** Width of one step (slide + gap) in px. */
  const stepWidth = () => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return 1;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.offsetWidth + gap;
  };

  // Pointer events cover both touch (swipe) and mouse (click-and-drag).
  const onPointerDown = (e: React.PointerEvent) => {
    didDrag.current = false;
    if (isAnyVideoPlaying || itemCount < 2) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, axis: null };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const state = drag.current;
    if (!state) return;
    let dx = e.clientX - state.x;
    const dy = e.clientY - state.y;

    // Lock to an axis on the first real movement so vertical page scrolling still works.
    if (!state.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      state.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (state.axis === 'x') {
        setIsDragging(true);
        // Keep receiving moves even if the mouse leaves the carousel mid-drag.
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    }
    if (state.axis !== 'x') return;

    const atEdge = (currentIndex === 0 && dx > 0) || (currentIndex === itemCount - 1 && dx < 0);
    if (atEdge) dx *= EDGE_RESISTANCE;

    // The track follows the pointer 1:1.
    setTrackPos(currentIndex - dx / stepWidth());
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const state = drag.current;
    drag.current = null;
    if (!state || state.axis !== 'x') return;

    setIsDragging(false);
    didDrag.current = true;
    const delta = e.clientX - state.x;

    if (e.type === 'pointercancel' || Math.abs(delta) < SWIPE_THRESHOLD_PX) {
      setTrackPos(currentIndex); // snap back
      return;
    }
    if (delta < 0) handleNext();
    else handlePrev();
  };

  // A mouse drag still fires `click` on release – don't let it trigger the
  // trailer button / links underneath the pointer.
  const onClickCapture = (e: React.MouseEvent) => {
    if (!didDrag.current) return;
    didDrag.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  // Tapping a peeking neighbour (mobile) brings it to the centre. Inactive slides are
  // `inert`, so the click lands on the track – use its position to pick a side.
  const onTrackClick = (e: React.MouseEvent) => {
    const active = trackRef.current?.children[currentIndex];
    if (!active) return;
    const { left, right } = active.getBoundingClientRect();
    if (e.clientX < left) handlePrev();
    else if (e.clientX > right) handleNext();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (isAnyVideoPlaying) return;
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Trending this week"
      data-dragging={isDragging || undefined}
      className="group/carousel relative flex cursor-grab [touch-action:pan-y] flex-col overflow-hidden pt-4 pb-2 select-none data-[dragging]:cursor-grabbing sm:h-[700px] sm:p-0 md:h-[calc(100svh-87px)] md:max-h-[1100px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
      // Stop the browser's native image drag from hijacking a mouse swipe.
      onDragStart={(e) => e.preventDefault()}
      onKeyDown={onKeyDown}
    >
      <ul
        ref={trackRef}
        aria-live={isPaused ? 'polite' : 'off'}
        onClick={onTrackClick}
        className={clsx(
          'flex h-[min(540px,72svh)] w-full gap-[var(--gap)] sm:h-full',
          '[--gap:12px] [--slide:86%] sm:[--gap:0px] sm:[--slide:100%]',
          'transition-transform duration-500 ease-out group-data-[dragging]/carousel:transition-none',
        )}
        style={
          {
            '--pos': 0,
            // Centre the active slide; on mobile this leaves room for both neighbours to peek.
            transform:
              'translateX(calc((100% - var(--slide)) / 2 - var(--pos) * (var(--slide) + var(--gap))))',
          } as React.CSSProperties
        }
      >
        {children}
      </ul>

      <div
        className={clsx(
          'transition-all duration-500 ease-in-out',
          isAnyVideoPlaying ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        {/* Arrows on larger screens; mobile uses swipe + tap-to-peek. */}
        <div className="hidden sm:block">
          <CarouselControls onPrev={handlePrev} onNext={handleNext} />
        </div>

        {/* Position indicators: below the cards on mobile, overlaid from md up. */}
        <div className="mt-4 flex justify-center gap-2 sm:hidden md:absolute md:bottom-4 md:left-1/2 md:z-2 md:mt-0 md:flex md:-translate-x-1/2">
          {Array.from({ length: itemCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1} of ${itemCount}`}
              aria-current={i === currentIndex ? 'true' : undefined}
              onClick={() => setCurrentIndex(i)}
              className={clsx(
                'h-1.5 rounded-full transition-all duration-300',
                i === currentIndex ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
