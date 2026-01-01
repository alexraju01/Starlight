import { Genre } from '@/types/genre';
import { APIResponse } from '@/types/global';
import fetchData from '@/utils/fetchData';

import GenreCollectionClient from './GenreCollectionClient';

const fetchGenreMovies = async (genre: Genre, seenMovieIds: Set<number>) => {
  try {
    const data = await fetchData<APIResponse>(
      '3',
      `discover/movie?with_genres=${genre.id}&sort_by=popularity.desc`,
    );

    const uniqueMovies = data.results
      .filter((movie) => movie.poster_path && !seenMovieIds.has(movie.id))
      .slice(0, 4);

    uniqueMovies.forEach((movie) => seenMovieIds.add(movie.id));

    return { ...genre, movies: uniqueMovies };
  } catch (error) {
    console.error(`Failed to fetch movies for genre ${genre.name}:`, error);
    return { ...genre, movies: [] };
  }
};

const GenreCollection = async () => {
  try {
    const { genres }: { genres: Genre[] } = await fetchData('3', '/genre/movie/list');
    const seenMovieIds = new Set<number>();

    // Fetch all genre movies in parallel
    const genreMovies = await Promise.all(
      genres.map((genre) => fetchGenreMovies(genre, seenMovieIds)),
    );

    return (
      <section className="relative z-1 mb-[28px]">
        <GenreCollectionClient genreMovies={genreMovies} />
      </section>
    );
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    return null;
  }
};

export default GenreCollection;
