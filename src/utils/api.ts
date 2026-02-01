import { GenreResponse, MediaMode, MoviesWithLogos } from '@/types';
import { APIResponse } from '@/types/global';

import fetchData from './fetchData';

export const api = {
  media: {
    getMedia: async (mediaMode: MediaMode, page = 1) => {
      const { results } = await fetchData<APIResponse>('3', `discover/${mediaMode}`, {
        page,
      });
      return results;
    },
  },

  getGenres: async (mediaMode: string) => {
    return await fetchData<GenreResponse>('3', `genre/${mediaMode}/list`);
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
        cache: { type: 'no-store' },
      },
    );
    return results;
  },
};
