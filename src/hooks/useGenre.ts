// useGenres.ts
import { useEffect, useState } from 'react';

import { MediaMode } from '@/types/mediaMode';
import getGenre from '@/utils/genre/getGenre';

export const useGenres = (mediaMode: MediaMode) => {
  const [genres, setGenres] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { genres } = await getGenre(mediaMode);
        setGenres(Object.fromEntries(genres.map(({ id, name }) => [id, name])));
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, [mediaMode]);

  return genres;
};
