import { Genre } from '@/types/genre';
import { MediaListItem } from '@/types/global';
import { isGenreMovie } from '@/utils/typeGuard';

export function formatGenres(item: MediaListItem, genreMap: Record<number, string>): string {
  if (!isGenreMovie(item) || !item.genre_ids) return 'Unknown genre';

  return item.genre_ids
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
