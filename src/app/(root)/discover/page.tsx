import DiscoverClient from '@/components/DiscoverClient';
import { searchMediaAction, getAllGenresAction } from '@/utils/serverActions/media';



export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  const cleanQuery = search ? search.replace(/-/g, ' ') : '';

  const [movies, genreMap] = await Promise.all([
    searchMediaAction(cleanQuery),
    getAllGenresAction(),
  ]);

  return <DiscoverClient initialMovies={movies} genreMap={genreMap} initialQuery={cleanQuery} />;
}
