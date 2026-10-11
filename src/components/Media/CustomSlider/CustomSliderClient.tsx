'use client';

import { MediaCard2 } from '@/components/Cards';
import RowSlider from '@/components/Media/RowSlider/RowSlider';
import CustomSliderSkeleton from '@/components/Skeletons/LoadingSkeletons/CustomSliderLoading';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { MediaListItem } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

import type { Route } from 'next';

interface Props {
  media: MediaListItem[];
  title: React.ReactNode;
  href?: Route;
  mediaMode: MediaMode;
  genres: Record<number, string>;
  breakpoints?: { max: number; value: number }[];
}

/** Row of hover-preview media cards. */
export default function CustomSliderClient({
  media,
  title,
  href,
  mediaMode,
  genres,
  breakpoints = CAROUSEL_BREAKPOINTS,
}: Props) {
  return (
    <MediaProvider mediaMode={mediaMode} genres={genres}>
      <RowSlider
        title={title}
        href={href}
        breakpoints={breakpoints}
        count={media.length}
        fallback={<CustomSliderSkeleton />}
        renderItem={(i, { isFirst, isLast }) => (
          <MediaCard2 item={media[i]} isFirst={isFirst} isLast={isLast} />
        )}
      />
    </MediaProvider>
  );
}
