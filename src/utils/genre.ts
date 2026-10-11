import { MediaListItem } from '@/types/global';

export function formatGenres(item: MediaListItem, genreMap: Record<number, string>): string {
  const ids = item.genre_ids ?? [];

  if (ids.length === 0) return 'Unknown genre';

  return ids
    .map((id) => (genreMap[id] === 'Science Fiction' ? 'Sci-Fi' : genreMap[id]))
    .filter(Boolean)
    .join(', ');
}
