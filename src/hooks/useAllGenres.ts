import { useEffect, useState } from 'react';

import { api } from '@/utils/api';

type GenreMap = Record<number, string>;

interface AllGenres {
  movie: GenreMap;
  tv: GenreMap;
}

export const useAllGenres = (): AllGenres => {
  const [genreMap, setGenreMap] = useState<AllGenres>({ movie: {}, tv: {} });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [movieData, tvData] = await Promise.all([
          api.genre.getGenres('movie'),
          api.genre.getGenres('tv'),
        ]);

        setGenreMap({
          movie: Object.fromEntries(movieData.genres.map((g) => [g.id, g.name])),
          tv: Object.fromEntries(tvData.genres.map((g) => [g.id, g.name])),
        });
      } catch (err) {
        console.error('Error fetching genre maps:', err);
      }
    };

    fetchAll();
  }, []);

  return genreMap;
};
