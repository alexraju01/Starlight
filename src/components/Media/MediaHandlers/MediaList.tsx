'use client';
import { Loader } from 'lucide-react';
import { useState } from 'react';

import MediaCard2 from '@/components/Cards/MediaCard2';
import Button from '@/components/ui/Button/Button';
import { DISCOVER_BREAKPOINTS } from '@/constants/breakpoints';
import { useGenres } from '@/hooks/useGenre';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { Media, Movie, TVShow } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import getMedia from '@/utils/serverActions/getMedia';
import getUpcoming from '@/utils/serverActions/getUpcoming';

import UpcomingMedia from '../UpcomingMedia/UpcomingMedia';

interface Props {
  initialMedia: (Movie | TVShow)[];
  mediaMode: MediaMode;
}

export default function MediaList({ initialMedia, mediaMode }: Props) {
  const [media, setMedia] = useState<(Movie | TVShow)[]>(initialMedia);
  const [page, setPage] = useState<number>(1);
  const [buttonHidden, setButtonHidden] = useState<boolean>(initialMedia.length === 0);
  const [loading, setLoading] = useState<boolean>(false);
  const genres = useGenres(mediaMode);
  const itemsPerRow = useResponsiveItems(DISCOVER_BREAKPOINTS);

  if (itemsPerRow === null) {
    return <div className="p-6 text-center">Loading layout...</div>;
  }

  const isUpcoming = mediaMode === MediaMode.UPCOMING;
  const loadMoreMedia = async () => {
    setLoading(true);

    const nextPage = page + 1;

    const mediaList = isUpcoming
      ? await getUpcoming(MediaMode.TV, nextPage)
      : await getMedia(mediaMode, nextPage);

    const mediaWithType = mediaList.map((item) => ({
      ...item,
      media_type: mediaMode === MediaMode.TV ? 'tv' : 'movie',
    })) as Media[];

    const newMedia = mediaWithType.filter(
      (newItem) => !media.some((existingMedia) => existingMedia.id === newItem.id),
    );

    setButtonHidden(mediaWithType.length === 0);
    setMedia((prevMedia) => [...prevMedia, ...newMedia]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  return (
    <div className="animate-fadeIn">
      <div
        className={`
						grid gap-8 w-full px-6 mb-8 transition-all relative overflow-hidden
					${
            isUpcoming
              ? 'grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(45rem,1fr))] auto-rows-auto p-6'
              : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7'
          }`}
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
