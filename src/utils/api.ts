import { GenreResponse, MediaMode, MoviesWithLogos } from '@/types';
import { APIResponse } from '@/types/global';

import fetchData from './fetchData';

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

  getTrending: async (mediaMode: MediaMode, page = 1) => {
    const { results } = await fetchData<APIResponse<MoviesWithLogos>>(
      '3',
      `trending/${mediaMode}/week`,
      {
        page,
        cache: { type: 'revalidate', seconds: 60 * 10 },
      },
    );
    return results;
  },
};
