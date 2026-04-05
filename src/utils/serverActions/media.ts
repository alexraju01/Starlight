'use server';

import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

export async function getMoreMediaAction(
  mediaMode: MediaMode,
  page: number,
): Promise<MediaWithDetails[]> {
  try {
    const results = await api.media.getMedia(mediaMode, page);

    return results as MediaWithDetails[];
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

export async function searchMediaAction(query: string) {
  if (!query || query.trim() === '') return [];

  try {
    return await api.media.search(query);
  } catch (error) {
    console.error('Search Action Error:', error);
    return [];
  }
}

export async function getAllGenresAction() {
  try {
    const { movieGenres, tvGenres } = await api.genre.getAllGenres();

    const genreMap: Record<number, string> = {};
    [...movieGenres, ...tvGenres].forEach((g) => {
      genreMap[g.id] = g.name;
    });

    return genreMap;
  } catch (error) {
    console.error('Failed to fetch all genres for map:', error);
    return {};
  }
}
