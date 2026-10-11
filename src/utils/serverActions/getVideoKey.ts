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

    // Prefer the official trailer, fall back to a teaser.
    const youTubeVideo = (type: string) =>
      data?.results?.find((video) => video.type === type && video.site === 'YouTube');

    return (youTubeVideo('Trailer') ?? youTubeVideo('Teaser'))?.key ?? null;
  } catch (err) {
    console.error('Failed to fetch video key:', err);
    return null;
  }
}
