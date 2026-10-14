'use server';

import { MediaMode } from '@/types/mediaMode';
import { VideoResponse } from '@/types/video';
import { TTL, fetchData } from '@/utils/fetchData';
import { logError } from '@/utils/logger';

import { isMediaMode, isPositiveInt } from './validate';

export async function getVideoKey(mediaType: MediaMode, id: number): Promise<string | null> {
  if (!isMediaMode(mediaType) || !isPositiveInt(id)) return null;

  try {
    const data = await fetchData<VideoResponse>('3', `${mediaType}/${id}/videos`, {
      disablePage: true,
      cache: { type: 'revalidate', seconds: TTL.DAY },
    });

    // Prefer the official trailer, fall back to a teaser.
    const youTubeVideo = (type: string) =>
      data?.results?.find((video) => video.type === type && video.site === 'YouTube');

    return (youTubeVideo('Trailer') ?? youTubeVideo('Teaser'))?.key ?? null;
  } catch (error) {
    logError(`getVideoKey ${mediaType}/${id}`, error);
    return null;
  }
}
