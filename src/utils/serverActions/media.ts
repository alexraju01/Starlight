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
