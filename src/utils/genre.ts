import { Genre } from '@/types/genre';
import { MediaListItem } from '@/types/global';
// import { isGenreMovie } from '@/utils/typeGuard';

// utils/formatGenres.ts

export function formatGenres(item: MediaListItem, genreMap: Record<number, string>): string {
  // Use optional chaining and nullish coalescing
  const ids = item.genre_ids ?? [];

  if (ids.length === 0) return 'Unknown genre';

  return ids
    .map((id) => (genreMap[id] === 'Science Fiction' ? 'Sci-Fi' : genreMap[id]))
    .filter(Boolean)
    .join(', ');
}

export function mapGenres(genresArray: Genre[]): Record<number, string> {
  return genresArray.reduce<Record<number, string>>((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});
}
