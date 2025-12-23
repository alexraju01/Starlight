import { APIResponse } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

import fetchData from '../fetchData';

export default async function getMedia(
  mediaMode: MediaMode,
  page = 1,
): Promise<APIResponse['results']> {
  const response = await fetchData<APIResponse>('3', `discover/${mediaMode}`, {
    page,
  });

  return response.results;
}
