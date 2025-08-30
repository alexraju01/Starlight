import { APIResponse, Media, Movie, TVShow } from '@/types/global';
import CustomSliderClient from './CustomSliderClient';
import { MediaMode } from '@/types/mediaMode';
import { fetchData } from '@/utils';

interface Props {
  endpoint: string;
  title: string;
  mediaMode: MediaMode;
}

const CustomSlider = async ({ endpoint, title, mediaMode }: Props) => {
  try {
    const { results } = await fetchData<{ results: Movie[] }>('3', endpoint);

    const mediaWithDetails: Media[] = await Promise.all(
      results.map(async (item) => {
        try {
          if (mediaMode === MediaMode.TV) {
            const { number_of_seasons } = await fetchData<TVShow>('3', `tv/${item.id}`);
            return { ...item, media_type: 'tv', number_of_seasons };
          }
          return { ...item, media_type: 'movie' };
        } catch (innerErr) {
          console.error(`Failed to fetch extra data for ID ${item.id}:`, innerErr);
          return { ...item, media_type: mediaMode }; // fallback without extra data
        }
      }),
    );

    return <CustomSliderClient media={mediaWithDetails} title={title} mediaMode={mediaMode} />;
  } catch (err) {
    console.error(`CustomSlider failed for endpoint "${endpoint}":`, err);
    return (
      <div className="text-red-400 text-center py-6">
        Failed to load <strong>{title}</strong>.
      </div>
    );
  }
};

export default CustomSlider;
