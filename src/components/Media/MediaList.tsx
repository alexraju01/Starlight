'use client';

import { Loader } from 'lucide-react';
import { useState } from 'react';

import MediaCard2 from '@/components/Cards/MediaCard2';
import Button from '@/components/ui/Button/Button';
import { CAROUSEL_BREAKPOINTS } from '@/constants/breakpoints';
import { MediaProvider } from '@/context/MediaContext';
import { useResponsiveItems } from '@/hooks/useResponsiveItems';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { getMoreMediaAction } from '@/utils/serverActions/media';

interface Props {
  initialMedia: MediaWithDetails[];
  initialGenres: Record<number, string>;
  mediaMode: MediaMode;
}

export default function MediaList({ initialMedia, initialGenres, mediaMode }: Props) {
  const [media, setMedia] = useState<MediaWithDetails[]>(initialMedia);
  const [page, setPage] = useState(1);
  const [buttonHidden, setButtonHidden] = useState(initialMedia.length === 0);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const genres = initialGenres;
  // Null until hydrated – the grid still renders on the server (SEO + no layout shift).
  const itemsPerRow = useResponsiveItems(CAROUSEL_BREAKPOINTS);

  const loadMoreMedia = async () => {
    setLoading(true);
    setError(false);
    const nextPage = page + 1;

    try {
      const mediaList = await getMoreMediaAction(mediaMode, nextPage);

      setButtonHidden(mediaList.length === 0);
      setMedia((prev) => {
        const seen = new Set(prev.map((item) => item.id));
        return [...prev, ...mediaList.filter((item) => !seen.has(item.id))];
      });
      setPage(nextPage);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <MediaProvider mediaMode={mediaMode} genres={genres}>
      <div className="animate-fadeIn">
        <div className="relative mb-8 grid w-full grid-cols-2 gap-8 overflow-hidden transition-all sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {media
            .filter((item) => item.poster_path)
            .map((item, index) => {
              const isLastInRow = itemsPerRow !== null && (index + 1) % itemsPerRow === 0;
              return <MediaCard2 key={item.id} item={item} isLast={isLastInRow} />;
            })}
        </div>

        {error && (
          <p role="alert" className="mb-4 text-center text-[14px] text-red-300">
            Couldn’t load more titles. Please try again.
          </p>
        )}

        {!buttonHidden && (
          <div className="flex justify-center">
            <Button
              icon={loading && <Loader className="animate-spin" />}
              onClick={loadMoreMedia}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Loading…' : 'Load More'}
            </Button>
          </div>
        )}
      </div>
    </MediaProvider>
  );
}
