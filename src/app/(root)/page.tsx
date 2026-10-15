import RowErrorBoundary from '@/components/Error/RowErrorBoundary';
import GenreCollection from '@/components/Genre/GenreCollection/GenreCollection';
import Carousel from '@/components/Media/Carousel/Carousel';
import MediaRow from '@/components/Media/MediaRow/MediaRow';
import BackgroundBlur from '@/components/ui/BackgroundBlur';
import { ENDPOINTS } from '@/constants';
import { SITE_NAME, SITE_URL } from '@/constants/site';
import { MediaMode } from '@/types/mediaMode';
import { jsonLdString } from '@/utils/mediaPage';

/** Tells Google the site's name, so brand searches ("StarLight Discover") match it. */
const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: [`${SITE_NAME} Discover`, 'starlightdiscover.co.uk'],
  url: `${SITE_URL}/`,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(WEBSITE_JSON_LD) }}
      />
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
