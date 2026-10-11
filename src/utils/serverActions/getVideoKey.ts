'use server';

import { VideoResponse } from '@/types/video';
import { fetchData } from '@/utils/fetchData';

import { isMediaMode, isPositiveInt } from './validate';

export async function getVideoKey(mediaType: 'movie' | 'tv', id: number): Promise<string | null> {
  if (!isMediaMode(mediaType) || !isPositiveInt(id)) return null;

  try {
    const data = await fetchData<VideoResponse>('3', `${mediaType}/${id}/videos`, {
      disablePage: true,
      cache: { type: 'revalidate', seconds: 60 * 60 * 24 },
    });

    if (!data?.results) return null;
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
