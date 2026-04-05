'use client';

import React, { useState, useMemo, useCallback, CSSProperties } from 'react';

import { MediaCard2 } from '@/components/Cards';
import CustomSliderSkeleton from '@/components/Skeletons/LoadingSkeletons/CustomSliderLoading';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaListItem } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

import CustomSliderButtons from './CustomSliderButtons';

interface Props {
  media: MediaListItem[];
  title: string | React.ReactNode;
  mediaMode: MediaMode;
  genres: Record<number, string>;
  breakpoints?: { max: number; value: number }[];
}

const ITEM_GAP = 16;

export default function CustomSliderClient({
  media,
  title,
  mediaMode,
  genres,
  breakpoints = CAROUSEL_BREAKPOINTS,
}: Props) {
  const itemsPerScreen = useResponsiveItems(breakpoints);
  const totalItems = media.length;

  const [sliderIndex, setSliderIndex] = useState(0);

  // Max index to prevent scrolling beyond last item
  const maxIndex = useMemo(() => {
    return itemsPerScreen ? Math.max(0, totalItems - itemsPerScreen) : 0;
  }, [totalItems, itemsPerScreen]);

  // Handle slider navigation
  const handleClick = useCallback(
    (direction: 'left' | 'right') => {
      if (!itemsPerScreen) return;
      setSliderIndex((prev) =>
        direction === 'left'
          ? Math.max(prev - itemsPerScreen, 0)
          : Math.min(prev + itemsPerScreen, maxIndex),
      );
    },
    [itemsPerScreen, maxIndex],
  );

  // Translate slider container based on index
  const transformStyle = useMemo<CSSProperties>(() => {
    return itemsPerScreen
      ? { transform: `translateX(-${(sliderIndex * 100) / itemsPerScreen}%)` }
      : {};
  }, [sliderIndex, itemsPerScreen]);

  if (!itemsPerScreen) {
    return <CustomSliderSkeleton />;
  }

  return (
    <MediaProvider mediaMode={mediaMode} genres={genres}>
      <section className="flex flex-col w-full mb-10 text-white gap-4">
        <header className="flex justify-between items-center px-2">
          <h2 className="slider-title">{title}</h2>
          <div className="flex gap-2 px-1 py-2 z-10">
            <CustomSliderButtons
              direction="left"
              onClick={() => handleClick('left')}
              disabled={sliderIndex === 0}
            />
            <CustomSliderButtons
              direction="right"
              onClick={() => handleClick('right')}
              disabled={sliderIndex >= maxIndex}
            />
          </div>
        </header>

        <div className="relative -ml-4 w-full overflow-hidden">
          <div
            className="flex transition-transform duration-300 ml-6  ease-in-out w-full"
            style={transformStyle}
          >
            {media.map((item, i) => {
              const isFirst = i === sliderIndex;
              const isLastVisible = i === sliderIndex + itemsPerScreen - 1;
              const isLastInList = i === totalItems - 1;

              const width = `calc(${100 / itemsPerScreen}% - ${ITEM_GAP}px)`;
              const marginRight = isLastInList ? '0px' : `${ITEM_GAP}px`;

              return (
                <MediaCard2
                  key={item.id}
                  item={item}
                  isFirst={isFirst}
                  isLast={isLastVisible}
                  style={{ width, marginRight }}
                />
              );
            })}
          </div>
        </div>
      </section>
    </MediaProvider>
  );
}
