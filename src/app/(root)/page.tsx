import RowErrorBoundary from '@/components/Error/RowErrorBoundary';
import GenreCollection from '@/components/Genre/GenreCollection/GenreCollection';
import Carousel from '@/components/Media/Carousel/Carousel';
import MediaRow from '@/components/Media/MediaRow/MediaRow';
import BackgroundBlur from '@/components/ui/BackgroundBlur';
import { ENDPOINTS } from '@/constants';
import { MediaMode } from '@/types/mediaMode';

export default function Home() {
  return (
    <>
      <Carousel mediaMode={MediaMode.MOVIE} />
      <section className="relative overflow-hidden">
        <BackgroundBlur />

        <div className="page-gutter relative flex flex-col gap-[40px] pt-[32px] pb-[48px] lg:gap-[56px] lg:pt-[48px] lg:pb-[72px]">
          <GenreCollection />
          <RowErrorBoundary message="Failed to load trending movies.">
            <MediaRow
              endpoint={ENDPOINTS.TRENDING_MOVIES}
              title="Trending Movies"
              href="/movie"
              mediaMode={MediaMode.MOVIE}
            />
          </RowErrorBoundary>
          <RowErrorBoundary message="Failed to load popular movies.">
            <MediaRow
              endpoint={ENDPOINTS.POPULAR_MOVIES}
              title="Popular Movies"
              href="/movie"
              mediaMode={MediaMode.MOVIE}
            />
          </RowErrorBoundary>
          <RowErrorBoundary message="Failed to load trending TV shows.">
            <MediaRow
              endpoint={ENDPOINTS.TRENDING_TV}
              title="Trending TV Shows"
              href="/tv"
              mediaMode={MediaMode.TV}
            />
          </RowErrorBoundary>
        </div>
      </section>
    </>
  );
}
