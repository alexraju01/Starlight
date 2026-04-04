'use server';

import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

/**
 * This runs ONLY on the server.
 * Your API keys inside fetchData remain hidden.
 */
export async function getMoreMediaAction(mediaMode: MediaMode, page: number) {
  try {
    const results = await api.media.getMedia(mediaMode, page);
    return results;
  } catch (error) {
    console.error('Server Action Error:', error);
    return [];
  }
}

export async function getGenresAction(mediaMode: string) {
  return await api.genre.getGenres(mediaMode);
}

export async function fetchGenreMedia(genreId: number, page: number) {
  try {
    const [newMovies, newTv] = await Promise.all([
      api.media.getMedia(MediaMode.MOVIE, page, [genreId]),
      api.media.getMedia(MediaMode.TV, page, [genreId]),
    ]);

    return [
      ...newMovies.map((m) => ({ ...m, media_type: MediaMode.MOVIE })),
      ...newTv.map((m) => ({ ...m, media_type: MediaMode.TV })),
    ];
  } catch (error) {
    console.error('Action error:', error);
    return [];
  }
}
