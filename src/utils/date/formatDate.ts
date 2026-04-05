import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';

export default function formatDate(item: MediaWithDetails): string {
  let dateStr: string | undefined;

  if (item.media_type === MediaMode.MOVIE) {
    dateStr = item.release_date;
  } else {
    dateStr = item.first_air_date;
  }

  if (!dateStr) return 'Unknown';

  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export const getMediaDate = (item: MediaWithDetails): string => {
  return item.media_type === MediaMode.MOVIE ? item.release_date : item.first_air_date;
};
