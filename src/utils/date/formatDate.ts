import { MediaMode } from '@/types';
import { MediaWithDetails } from '@/types/global';

export default function formatDate(item: MediaWithDetails, mediaMode: MediaMode): string {
  const dateStr = mediaMode === MediaMode.MOVIE ? item.release_date : item.first_air_date;
  if (!dateStr) return 'Unknown';

  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

//   const dateStr = isMovie(item) ? item.release_date : isTVShow(item) ? item.first_air_date : null;

//   if (!dateStr) return 'Unknown';

//   try {
//     return new Date(dateStr).toLocaleDateString('en-US', {
//       month: 'short',
//       year: 'numeric',
//     });
//   } catch {
//     return 'Unknown';
//   }
// }
