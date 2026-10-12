import { api } from '@/utils/api';
import { logError } from '@/utils/logger';

import GenreCollectionCard from './GenreCollectionCard';
import GenreRow from './GenreRow';

const GenreCollection = async () => {
  try {
    const genreMovies = await api.genre.getGenreCollection();

    if (!genreMovies || genreMovies.length === 0) return null;

    return (
      <GenreRow title="Browse by genre" href="/genre">
        {genreMovies.map((genre) => (
          <GenreCollectionCard key={genre.id} genre={genre} />
        ))}
      </GenreRow>
    );
  } catch (error) {
    logError('GenreCollection', error);
    return null;
  }
};

export default GenreCollection;
