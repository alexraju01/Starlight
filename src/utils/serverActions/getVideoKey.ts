'use server';

import { VideoResponse } from '@/types/video';
import { fetchData } from '@/utils';

export async function getVideoKey(mediaType: 'movie' | 'tv', id: number): Promise<string | null> {
  try {
    const data = await fetchData<VideoResponse>('3', `${mediaType}/${id}/videos`, {});

    if (!data?.results) return null;
    // Prefer Trailer, fallback to Teaser
    let trailer = data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube',
    );

    if (!trailer) {
      trailer = data.results.find((video) => video.type === 'Teaser' && video.site === 'YouTube');
    }

    return trailer?.key ?? null;
  } catch (err) {
    console.error('Failed to fetch video key:', err);
    return null;
  }
}
