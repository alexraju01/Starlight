'use client';

import MediaCard2 from '@/components/Cards/MediaCard2/MediaCard2';
import { CAROUSEL_BREAKPOINTS, DISCOVER_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useGenres } from '@/hooks/useGenre';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { Media } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

interface Props {
  media: Media[];
}

export default function MovieGrid({ media }: Props) {
  // 1. Fetch genre maps for both types
  const movieGenres = useGenres(MediaMode.MOVIE);
  const tvGenres = useGenres(MediaMode.TV);

  // 2. Merge them into a single Record<number, string>
  const allGenres = { ...movieGenres, ...tvGenres };

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

        // 3. Determine the mode for this specific card
        const currentMode = (item.media_type as MediaMode) || MediaMode.MOVIE;

        return (
          <MediaProvider key={item.id} mediaMode={currentMode} genres={allGenres}>
            <MediaCard2 item={item} isFirst={isFirst} isLast={isLast} />
          </MediaProvider>
        );
      })}
    </div>
  );
}
