import { MediaListItem } from '@/types/global';

export function formatGenres(item: MediaListItem, genreMap: Record<number, string>): string {
  const ids = item.genre_ids ?? [];

  if (ids.length === 0) return 'Unknown genre';

  return ids
    .map((id) => (genreMap[id] === 'Science Fiction' ? 'Sci-Fi' : genreMap[id]))
    .filter(Boolean)
    .join(', ');
}

/** What a genre covers: "Movies · TV", "Movies" or "TV". */
export const genreCoverage = (ids: { movie?: number; tv?: number }): string =>
  ids.movie && ids.tv ? 'Movies · TV' : ids.movie ? 'Movies' : 'TV';
