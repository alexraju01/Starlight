'use client';

import MediaCard from '@/components/Cards/MediaCard';
import RowSlider from '@/components/Media/RowSlider/RowSlider';
import MediaRowSkeleton from '@/components/Skeletons/MediaRowSkeleton';
import { MEDIA_COLUMNS } from '@/constants/breakpoints';
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
}

/** Paged row of hover-preview media cards. */
export default function MediaRowClient({ media, title, href, mediaMode, genres }: Props) {
  return (
    <MediaProvider mediaMode={mediaMode} genres={genres}>
      <RowSlider
        title={title}
        href={href}
        breakpoints={MEDIA_COLUMNS}
        count={media.length}
        fallback={<MediaRowSkeleton />}
        renderItem={(i, { isLast }) => <MediaCard item={media[i]} isLast={isLast} />}
      />
    </MediaProvider>
  );
}
