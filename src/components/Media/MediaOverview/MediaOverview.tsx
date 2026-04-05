import GoBack from '@/components/Navigation/GoBack';
import { CastMember, MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';
import { fetchData } from '@/utils';

import { Seasons, SimilarMedia } from '.';
import MediaBackdrop from './MediaBackdrop';
import MediaDetailsPanel from './MediaDetailsPanel';
import CastContainer from '../CastContainer/CastContainer';

interface Props {
  params: string;
  mediaMode: MediaMode.TV | MediaMode.MOVIE;
}

async function fetchMediaData(params: string, mediaMode: MediaMode.TV | MediaMode.MOVIE) {
  try {
    const [mediaDetails, credits] = await Promise.all([
      fetchData<MediaWithDetails>('3', `/${mediaMode}/${params}`),
      fetchData<{ cast: CastMember[] }>('3', `/${mediaMode}/${params}/credits`),
    ]);

    if (mediaDetails) {
      mediaDetails.media_type = mediaMode;
    }
    return { mediaDetails, credits };
  } catch (error) {
    console.error('Error fetching media data:', error);
    return { mediaDetails: null, credits: { cast: [] } }; // Handle errors gracefully
  }
}

export default async function MediaOverview({ params, mediaMode }: Props) {
  const { mediaDetails, credits } = await fetchMediaData(params, mediaMode);
  if (!mediaDetails) return <div>Error loading media details.</div>;

  return (
    <>
      <MediaBackdrop media={mediaDetails} />
      <GoBack />
      <div className="px-6 md:px-12">
        <MediaDetailsPanel media={mediaDetails} mediaMode={mediaMode} />

        {mediaDetails.media_type === MediaMode.TV && <Seasons seasons={mediaDetails.seasons} />}
        <CastContainer castList={credits.cast.slice(0, 10)} />
        <SimilarMedia mediaMode={mediaMode} params={params} />
      </div>
    </>
  );
}
