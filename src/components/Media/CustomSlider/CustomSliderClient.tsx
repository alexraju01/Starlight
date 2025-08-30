'use client';

import React, { useMemo, useState, useCallback, CSSProperties } from 'react';
import CustomSliderButtons from './CustomSliderButtons';
import { Media } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { useGenres } from '@/hooks/useGenre';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import MediaCard2 from '@/components/Cards/MediaCard2';
import CustomSliderSkeleton from '@/components/Feedback/LoadingSkeletons/CustomSliderLoading';

interface Props {
  media: Media[];
  title: string;
  mediaMode: MediaMode;
}

const ITEM_GAP = 16;

export default function CustomSliderClient({ media, title, mediaMode }: Props) {
  const genres = useGenres(mediaMode);
  const itemsPerScreen = useResponsiveItems(CAROUSEL_BREAKPOINTS); // ⛔ undefined on SSR
  const [sliderIndex, setSliderIndex] = useState(0);
  const totalItems = media.length;

  // 🛡️ Safe maxIndex logic even if itemsPerScreen is null
  const maxIndex = useMemo(() => {
    return itemsPerScreen ? Math.max(0, totalItems - itemsPerScreen) : 0;
  }, [totalItems, itemsPerScreen]);

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

  const transformStyle = useMemo<CSSProperties>(() => {
    return itemsPerScreen
      ? { transform: `translateX(-${(sliderIndex * 100) / itemsPerScreen}%)` }
      : {};
  }, [sliderIndex, itemsPerScreen]);

  // ✅ Render fallback if responsive items not ready yet
  if (!itemsPerScreen) {
    return <CustomSliderSkeleton />;
  }

  return (
    <section className="flex flex-col w-full mb-10 text-white gap-4">
      <header className="flex justify-between items-center px-2">
        <h2 className="slider-title">{title}</h2>
        <nav className="flex gap-2 px-4 py-2 z-10">
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
        </nav>
      </header>

      <div className="relative w-full overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out" style={transformStyle}>
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
                genreMap={genres}
                mediaMode={mediaMode}
                isFirst={isFirst}
                isLast={isLastVisible}
                style={{ width, marginRight }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
