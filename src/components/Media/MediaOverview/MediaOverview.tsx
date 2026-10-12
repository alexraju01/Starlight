import { Suspense } from 'react';

import GoBack from '@/components/Navigation/GoBack';
import CustomSliderSkeleton from '@/components/Skeletons/LoadingSkeletons/CustomSliderLoading';
import { CastSkeleton } from '@/components/Skeletons/MediaDetailsSkeleton';
import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';
import { api } from '@/utils/api';

import { Seasons, SimilarMedia } from '.';
import MediaBackdrop from './MediaBackdrop';
import MediaDetailsPanel from './MediaDetailsPanel';
import MediaFacts from './MediaFacts';
import CastContainer from '../CastContainer/CastContainer';
import SliderBoundary from '../CustomSlider/SliderBoundary';

interface Props {
  media: MediaWithDetails;
  mediaMode: MediaMode.TV | MediaMode.MOVIE;
}

const CAST_LIMIT = 15;

async function Cast({ media, mediaMode }: Props) {
  const credits = await api.media.getCredits(mediaMode, media.id);
  return <CastContainer credits={{ ...credits, cast: credits.cast.slice(0, CAST_LIMIT) }} />;
}

/**
 * Details page layout.
 *
 *   Hero      backdrop + poster/title/actions. Mobile: banner with the poster overlapping
 *             its bottom edge. Desktop: full-bleed, content anchored bottom-left.
 *   Body      seasons + cast; the "Details" card sits in a sticky right column on desktop
 *             and drops below them on mobile.
 *   Similar   full-width recommendations slider.
 */
export default function MediaOverview({ media, mediaMode }: Props) {
  return (
    <article className="pb-[48px] lg:pb-[72px]">
      <section
        aria-label="Overview"
        className="relative lg:flex lg:min-h-[min(820px,calc(100svh-var(--nav-h)))] lg:items-end"
      >
        <MediaBackdrop media={media} />
        <GoBack className="absolute top-[16px] left-[16px] z-10 sm:left-[24px] lg:top-[24px] lg:left-[68px] 2xl:left-[101px]" />
        <div className="page-gutter relative -mt-[72px] w-full sm:-mt-[96px] lg:mt-0 lg:pt-[96px] lg:pb-[64px]">
          <MediaDetailsPanel media={media} mediaMode={mediaMode} />
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

      <div className="page-gutter mt-[48px] lg:mt-[72px]">
        <SliderBoundary message="Failed to load recommendations.">
          <Suspense fallback={<CustomSliderSkeleton />}>
            <SimilarMedia mediaMode={mediaMode} id={media.id} />
          </Suspense>
        </SliderBoundary>
      </div>
    </article>
  );
}
