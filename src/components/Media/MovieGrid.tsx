'use client';

import MediaCard2 from '@/components/Cards/MediaCard2/MediaCard2';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaMode } from '@/types/mediaMode';

interface MovieGridProps {
  media: any[];
  genreMap: Record<number, string>;
}

const MovieGrid = ({ media, genreMap }: MovieGridProps) => {
  const columns = useResponsiveItems(CAROUSEL_BREAKPOINTS);

  if (!media.length || columns === null) return null;

  return (
    <div
      className="grid gap-8 w-full mb-8 transition-all relative overflow-hidden
                 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      {media.map((item, index) => {
        const isFirst = index % columns === 0;
        const isLast = (index + 1) % columns === 0;

        const mode = (item.media_type as MediaMode) || MediaMode.MOVIE;

        return (
          <MediaProvider key={item.id} genres={genreMap} mediaMode={mode}>
            <MediaCard2 item={item} isFirst={isFirst} isLast={isLast} />
          </MediaProvider>
        );
      })}
    </div>
  );
};

export default MovieGrid;
