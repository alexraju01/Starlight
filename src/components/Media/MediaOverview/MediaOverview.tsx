import { Suspense } from 'react';

import GoBack from '@/components/Navigation/GoBack';
import CustomSliderSkeleton from '@/components/Skeletons/LoadingSkeletons/CustomSliderLoading';
import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';
import { api } from '@/utils/api';

import { Seasons, SimilarMedia } from '.';
import MediaBackdrop from './MediaBackdrop';
import MediaDetailsPanel from './MediaDetailsPanel';
import CastContainer from '../CastContainer/CastContainer';
import SliderBoundary from '../CustomSlider/SliderBoundary';

interface Props {
  media: MediaWithDetails;
  mediaMode: MediaMode.TV | MediaMode.MOVIE;
}

async function Cast({ media, mediaMode }: Props) {
  const cast = await api.media.getAllActors(mediaMode, media.id);
  return <CastContainer castList={cast.slice(0, 10)} />;
}

export default function MediaOverview({ media, mediaMode }: Props) {
  return (
    <>
      <MediaBackdrop media={media} />
      <GoBack />
      <div className="px-6 md:px-12">
        <MediaDetailsPanel media={media} mediaMode={mediaMode} />

        {media.media_type === MediaMode.TV && <Seasons seasons={media.seasons} />}

        <Suspense fallback={null}>
          <Cast media={media} mediaMode={mediaMode} />
        </Suspense>

        <SliderBoundary message="Failed to load recommendations.">
          <Suspense fallback={<CustomSliderSkeleton />}>
            <SimilarMedia mediaMode={mediaMode} id={media.id} />
          </Suspense>
        </SliderBoundary>
      </div>
    </>
  );
}
