'use client';
import { Loader } from 'lucide-react';
import { useState } from 'react';

import MediaCard2 from '@/components/Cards/MediaCard2';
import Button from '@/components/ui/Button/Button';
import { DISCOVER_BREAKPOINTS } from '@/constants/breakpoints';
import { useGenres } from '@/hooks/useGenre';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { Movie, TVShow } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

import UpcomingMedia from '../UpcomingMedia/UpcomingMedia';

interface Props {
  initialMedia: (Movie | TVShow)[];
  mediaMode: MediaMode;
}

export default function MediaList({ initialMedia, mediaMode }: Props) {
  const [media, setMedia] = useState<(Movie | TVShow)[]>(initialMedia);
  const [page, setPage] = useState(1);
  const [buttonHidden, setButtonHidden] = useState(initialMedia.length === 0);
  const [loading, setLoading] = useState(false);

  const genres = useGenres(mediaMode);
  const itemsPerRow = useResponsiveItems(DISCOVER_BREAKPOINTS);

  if (itemsPerRow === null) {
    return <div className="p-6 text-center">Loading layout...</div>;
  }

  const loadMoreMedia = async () => {
    setLoading(true);

    const nextPage = page + 1;
    const mediaList = await api.media.getMedia(mediaMode, nextPage);

    const newMedia = mediaList.filter(
      (newItem) => !media.some((existing) => existing.id === newItem.id),
    );

    setButtonHidden(mediaList.length === 0);
    setMedia((prev) => [...prev, ...newMedia]);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <div className="animate-fadeIn">
      <div
        className="grid gap-8 w-full px-6 mb-8 transition-all relative overflow-hidden
				grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
      >
        {media.map((item, index) => {
          const isLastInRow = (index + 1) % itemsPerRow === 0 ? true : false;

          if (!item.poster_path) return null;

          if (mediaMode === MediaMode.UPCOMING) {
            return <UpcomingMedia key={item.id} media={item} mediaMode={MediaMode.TV} />;
          }
          return (
            <MediaCard2
              key={item.id}
              item={item}
              genreMap={genres}
              mediaMode={mediaMode}
              isLast={isLastInRow}
            />
          );
        })}
      </div>

      {!buttonHidden && (
        <div className="flex justify-center ">
          <Button
            icon={loading && <Loader className="animate-spin" />}
            onClick={loadMoreMedia}
            disabled={loading}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
