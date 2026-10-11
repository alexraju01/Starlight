import { api } from '@/utils/api';

import Slider from './Slider';
import GenreCollectionCard from '../GenreCollectionCard';

const GenreCollection = async () => {
  try {
    const genreMovies = await api.genre.getGenreCollection();

    if (!genreMovies || genreMovies.length === 0) return null;

    return (
      <Slider title="Browse by genre" href="/genre">
        {genreMovies.map((genre) => (
          <GenreCollectionCard key={genre.id} genre={genre} />
        ))}
      </Slider>
    );
  } catch (error) {
    console.error('GenreCollection Error:', error);
    return null;
  }
};

export default GenreCollection;
