import { MediaWithDetails, Movie, MovieListItem, TVShow, TVShowListItem } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { fetchData } from '@/utils';
import { api } from '@/utils/api';

import CustomSliderClient from './CustomSliderClient';

interface Props {
  endpoint: string;
  title: string | React.ReactNode;
  mediaMode: MediaMode;
  breakpoints?: { max: number; value: number }[];
}

const CustomSlider = async ({ endpoint, title, mediaMode, breakpoints }: Props) => {
  try {
    const { results } = await fetchData<{ results: Movie[] }>('3', endpoint, {
      cache: { type: 'revalidate', seconds: 60 * 60 * 24 },
    });

    const { genres } = await api.getGenres(mediaMode);
    const genreMap = Object.fromEntries(genres.map(({ id, name }) => [id, name]));

    const mediaWithDetails: MediaWithDetails[] = await Promise.all(
      results.map(async (item) => {
        try {
          if (mediaMode === MediaMode.TV) {
            const { number_of_seasons } = await fetchData<TVShow>('3', `tv/${item.id}`);
            const tvItem = item as unknown as TVShowListItem;
            return { ...tvItem, media_type: MediaMode.TV, number_of_seasons } as MediaWithDetails;
          }
          const movieItem = item as unknown as MovieListItem;
          return { ...movieItem, media_type: MediaMode.MOVIE } as MediaWithDetails;
        } catch (innerErr) {
          console.error(`Failed to fetch extra data for ID ${item.id}:`, innerErr);
          return { ...item, media_type: mediaMode } as unknown as MediaWithDetails;
        }
      }),
    );

    return (
      <CustomSliderClient
        media={mediaWithDetails}
        breakpoints={breakpoints}
        title={title}
        mediaMode={mediaMode}
        genres={genreMap}
      />
    );
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
