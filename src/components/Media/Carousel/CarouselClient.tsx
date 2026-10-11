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

export default function CarouselClient({ children, itemCount }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isAnyVideoPlaying } = useCarousel();
  const trackRef = useRef<HTMLUListElement>(null);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
  }, [itemCount]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === itemCount - 1 ? 0 : prev + 1));
  }, [itemCount]);

  // Hide off-screen slides from keyboard + screen readers so Tab can't land on invisible buttons.
  useEffect(() => {
    const slides = trackRef.current?.children;
    if (!slides) return;
    Array.from(slides).forEach((slide, i) => {
      const hidden = i !== currentIndex;
      (slide as HTMLElement).inert = hidden;
      slide.setAttribute('aria-hidden', String(hidden));
    });
  }, [currentIndex, itemCount]);

  // Gentle autoplay. Pauses on hover/focus, while a trailer plays, when the tab is hidden,
  // and is disabled entirely for users who prefer reduced motion.
  useEffect(() => {
    if (isPaused || isAnyVideoPlaying || itemCount < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') handleNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isPaused, isAnyVideoPlaying, itemCount, handleNext, currentIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || isAnyVideoPlaying) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta < 0) handleNext();
    else handlePrev();
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
      className="flex-center relative m-[24px] h-[500px] overflow-hidden rounded-[32px] sm:m-0 sm:h-[700px] sm:rounded-none md:h-[calc(100svh-87px)] md:max-h-[1100px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
    >
      <ul
        ref={trackRef}
        aria-live={isPaused ? 'polite' : 'off'}
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children}
      </ul>

      <div
        className={clsx(
          'transition-all duration-500 ease-in-out',
          isAnyVideoPlaying ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        <CarouselControls onPrev={handlePrev} onNext={handleNext} />

        {/* Position indicators */}
        <div className="absolute bottom-4 left-1/2 z-2 hidden -translate-x-1/2 gap-2 md:flex">
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
