import { Suspense } from 'react';

import RowErrorBoundary from '@/components/Error/RowErrorBoundary';
import CastContainer from '@/components/Media/CastContainer/CastContainer';
import GoBack from '@/components/Navigation/GoBack';
import { CastSkeleton } from '@/components/Skeletons/MediaDetailsSkeleton';
import MediaRowSkeleton from '@/components/Skeletons/MediaRowSkeleton';
import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';
import { api } from '@/utils/api';

import MediaBackdrop from './MediaBackdrop';
import MediaDetailsPanel from './MediaDetailsPanel';
import MediaFacts from './MediaFacts';
import Seasons from './Seasons';
import SimilarMedia from './SimilarMedia';

interface Props {
  media: MediaWithDetails;
  mediaMode: MediaMode;
}

const CAST_LIMIT = 15;

async function Cast({ media, mediaMode }: Props) {
  const credits = await api.media.getCredits(mediaMode, media.id);
  return <CastContainer credits={{ ...credits, cast: credits.cast.slice(0, CAST_LIMIT) }} />;
}

/**
 * Details page: hero (backdrop, poster, title, actions), then seasons + cast beside a sticky
 * "Details" card (below them on mobile), then "More like this".
 */
export default async function MediaOverview({ media, mediaMode }: Props) {
  const hasSimilar = await api.media.hasRecommendations(mediaMode, media.id);

  return (
    <article className="pb-[48px] lg:pb-[72px]">
      <section
        aria-label="Overview"
        className="relative lg:flex lg:min-h-[min(820px,calc(100svh-var(--nav-h)))] lg:items-end"
      >
        <MediaBackdrop media={media} />
        <GoBack className="absolute top-[16px] left-[16px] z-10 sm:left-[24px] lg:top-[24px] lg:left-[68px] 2xl:left-[101px]" />
        <div className="page-gutter relative -mt-[72px] w-full sm:-mt-[96px] lg:mt-0 lg:pt-[96px] lg:pb-[64px]">
          <MediaDetailsPanel media={media} mediaMode={mediaMode} hasSimilar={hasSimilar} />
        </div>
      </section>

      <div className="page-gutter mt-[40px] grid grid-cols-1 gap-[40px] lg:mt-[56px] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-[56px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-[40px] lg:gap-[56px]">
          {media.media_type === MediaMode.TV && <Seasons seasons={media.seasons} />}
          <Suspense fallback={<CastSkeleton />}>
            <Cast media={media} mediaMode={mediaMode} />
          </Suspense>
        </div>

        <aside>
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
            <MediaFacts media={media} />
          </div>
        </aside>
      </div>

      {hasSimilar && (
        <div className="page-gutter mt-[48px] lg:mt-[72px]">
          <RowErrorBoundary message="Failed to load recommendations.">
            <Suspense fallback={<MediaRowSkeleton />}>
              <SimilarMedia mediaMode={mediaMode} id={media.id} />
            </Suspense>
          </RowErrorBoundary>
        </div>
      )}
    </article>
  );
}
