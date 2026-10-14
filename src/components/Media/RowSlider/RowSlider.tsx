'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import SectionHeading from '@/components/Navigation/SectionHeading';
import ArrowButton from '@/components/ui/ArrowButton';
import { Breakpoint } from '@/constants/breakpoints';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { useSliderPaging } from '@/hooks/useSliderPaging';

import SwipeTrack from './SwipeTrack';

import type { Route } from 'next';

interface Props {
  /** A string gets the standard section heading; pass an element for a custom one. */
  title: React.ReactNode;
  /** "See all" destination. */
  href?: Route;
  breakpoints: Breakpoint[];
  count: number;
  /** `isLast` marks the last card on screen (its hover preview grows inwards). */
  renderItem: (index: number, page: { isLast: boolean }) => React.ReactNode;
  /** Gap between cards in px. */
  gap?: number;
  /** Rendered until the viewport width (and so the cards per page) is known. */
  fallback?: React.ReactNode;
}

/**
 * Horizontal row that pages a screenful of cards at a time – arrows on larger screens,
 * swipe / mouse drag everywhere. A full page always fills the row exactly: the gap only
 * sits between cards, so both edges line up with the page gutter.
 */
export default function RowSlider({
  title,
  href,
  breakpoints,
  count,
  renderItem,
  gap = 16,
  fallback = null,
}: Props) {
  const perPage = useResponsiveItems(breakpoints);
  const slider = useSliderPaging(count, perPage);

  if (!perPage) return fallback;

  const itemWidth = `calc((100% - ${(perPage - 1) * gap}px) / ${perPage})`;
  // One step = one card + one gap; % is relative to the track, which is the row's width.
  const baseTransform = `translateX(calc(${-slider.index} * (100% + ${gap}px) / ${perPage}))`;

  return (
    <section className="flex flex-col gap-[16px] text-white lg:gap-[20px]">
      <header className="flex items-center justify-between gap-[16px]">
        {typeof title === 'string' ? <SectionHeading>{title}</SectionHeading> : title}

        <div className="flex shrink-0 items-center gap-[8px]">
          {href && (
            <Link
              href={href}
              className="inline-flex items-center gap-[2px] rounded-full py-[6px] pl-[10px] text-[14px] font-medium text-white/60 transition-colors hover:text-white sm:mr-[8px]"
            >
              See all
              <ChevronRight aria-hidden="true" className="size-[16px]" />
            </Link>
          )}
          <div className="hidden gap-[8px] sm:flex">
            <ArrowButton direction="left" onClick={slider.prev} disabled={!slider.canGoPrev} />
            <ArrowButton direction="right" onClick={slider.next} disabled={!slider.canGoNext} />
          </div>
        </div>
      </header>

      {/* Clip sideways only, so a hovered card can still grow past the row's top and bottom. */}
      <div className="overflow-x-clip">
        <SwipeTrack
          baseTransform={baseTransform}
          canGoPrev={slider.canGoPrev}
          canGoNext={slider.canGoNext}
          onPrev={slider.prev}
          onNext={slider.next}
        >
          {Array.from({ length: count }, (_, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{ width: itemWidth, marginRight: i === count - 1 ? 0 : gap }}
              // Off-page cards are clipped: keep them out of the tab order too.
              inert={i < slider.index || i >= slider.index + perPage}
            >
              {renderItem(i, { isLast: i === slider.index + perPage - 1 })}
            </div>
          ))}
        </SwipeTrack>
      </div>
    </section>
  );
}
