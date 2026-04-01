import { GenreResponse, MediaMode, MoviesWithLogos } from '@/types';
import { APIResponse } from '@/types/global';

import fetchData from './fetchData';
import { getImageUrl } from './image/getImageUrl';

export const api = {
  media: {
    getMedia: async (mediaMode: MediaMode, page = 1, withGenres?: number[]) => {
      const query: Record<string, string | number> = { page };

      if (withGenres?.length) {
        query.with_genres = withGenres.join(',');
      }

      const { results } = await fetchData<APIResponse>('3', `discover/${mediaMode}`, {
        query,
        cache: { type: 'revalidate', seconds: 60 * 60 },
      });

      return results;
    },
  },

  getGenres: async (mediaMode: string) => {
    return await fetchData<GenreResponse>('3', `genre/${mediaMode}/list`, {
      cache: { type: 'revalidate', seconds: 60 * 60 * 24 },
    });
  },

  getAllGenres: async () => {
    const [{ genres: movieGenres }, { genres: tvGenres }] = await Promise.all([
      api.getGenres('movie'),
      api.getGenres('tv'),
    ]);

    return {
      movieGenres,
      tvGenres,
    };
  },

  getGenreNames: (movie: MoviesWithLogos, genres: Record<number, string>): string => {
    return movie.genre_ids?.map((id) => genres[id] || 'Unknown').join(' • ') ?? '';
  },

  getTrending: async (mediaMode: MediaMode, page = 1, time: 'day' | 'week' = 'day') => {
    const { results } = await fetchData<APIResponse<MoviesWithLogos>>(
      '3',
      `trending/${mediaMode}/${time}`,
      {
        page,
        cache: { type: 'revalidate', seconds: 60 * 10 },
      },
    );
    return results;
  },
  getLogos: async (mediaMode: MediaMode, mediaId: number) => {
    try {
      const { logos } = await fetchData<{ logos: { file_path: string; iso_639_1: string }[] }>(
        '3',
        `${mediaMode}/${mediaId}/images`,
        {
          cache: { type: 'revalidate', seconds: 60 * 60 }, // 1 hour cache
        },
      );

      // Prefer English logos, fallback to the first logo
      const logo = logos?.find((l) => l.iso_639_1 === 'en') ?? logos?.[0];

      // Return full image URL using your utility
      return logo?.file_path ? getImageUrl(logo.file_path, 'logo', 'w300') : undefined;
    } catch (err) {
      console.warn(`Failed to fetch logos for ${mediaMode} ${mediaId}:`, err);
      return undefined;
    }
  },
};
