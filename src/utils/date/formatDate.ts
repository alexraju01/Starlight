import { isMovie, isTVShow } from '@/utils/typeGuard';
import { Media } from '@/types/global';

export default function formatDate(item: Media): string {
  const dateStr = isMovie(item) ? item.release_date : isTVShow(item) ? item.first_air_date : null;

  if (!dateStr) return 'Unknown';

  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Unknown';
  }
}
