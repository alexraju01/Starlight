import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';

import type { Media } from '@/types';

/** Release date for a movie, first air date for a show. */
export const getMediaDate = (item: Media): string =>
  item.media_type === MediaMode.MOVIE ? item.release_date : item.first_air_date;

/** e.g. "Mar 2024", or "Unknown" when the title has no date. */
export default function formatDate(item: MediaWithDetails): string {
  const dateStr = getMediaDate(item);
  if (!dateStr) return 'Unknown';

  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
