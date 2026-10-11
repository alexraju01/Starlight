'use server';

import { parseSort } from '@/constants/browse';
import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';

import { MAX_PAGE, MAX_QUERY_LENGTH, isMediaMode, isPositiveInt } from './validate';

export async function getMoreMediaAction(
  mediaMode: MediaMode,
  page: number,
  genreId?: number,
  sort?: string,
): Promise<MediaWithDetails[]> {
  if (!isMediaMode(mediaMode) || !isPositiveInt(page, MAX_PAGE)) return [];
  if (genreId !== undefined && !isPositiveInt(genreId)) return [];

  try {
    return await api.media.getMedia(
      mediaMode,
      page,
      genreId ? [genreId] : undefined,
      parseSort(sort),
    );
  } catch (error) {
    console.error('Server Action Error:', error);
    return [];
  }
}

export async function fetchGenreMedia(genreId: number, page: number) {
  if (!isPositiveInt(genreId) || !isPositiveInt(page, MAX_PAGE)) return [];

  try {
    return await api.media.getGenreMedia(genreId, page);
  } catch (error) {
    console.error('Action error:', error);
    return [];
  }
}

/** Used by the navbar dropdown and the discover page (`page` for "Load more"). */
export async function searchMediaAction(query: string, page = 1) {
  if (typeof query !== 'string' || !isPositiveInt(page, MAX_PAGE)) return [];
  const trimmed = query.trim().slice(0, MAX_QUERY_LENGTH);
  if (!trimmed) return [];

  try {
    return await api.media.search(trimmed, page);
  } catch (error) {
    console.error('Search Action Error:', error);
    return [];
  }
}

export async function getAllGenresAction() {
  try {
    const { genresMap } = await api.genre.getAllGenres();
    return genresMap;
  } catch (error) {
    console.error('Failed to fetch all genres for map:', error);
    return {};
  }
}
