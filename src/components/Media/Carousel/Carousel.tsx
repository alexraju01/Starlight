import { MediaMode } from '@/types';
import { mapGenres } from '@/utils';
import { api } from '@/utils/api';

import CarouselClient from './CarouselClient';
import CarouselItem from './CarouselItem';

interface CarouselProps {
  mediaMode: MediaMode;
}

export default async function Carousel({ mediaMode }: CarouselProps) {
  const [genresData, trending] = await Promise.all([
    api.getGenres(mediaMode),
    api.getTrending(mediaMode, 1, 'week'),
  ]);

  const genreMap = mapGenres(genresData.genres);

  const moviesWithLogos = await Promise.all(
    trending.slice(0, 9).map(async (item) => ({
      ...item,
      logoImage: await api.getLogos(mediaMode, item.id),
    })),
  );

  return (
    <CarouselClient itemCount={moviesWithLogos.length}>
      {moviesWithLogos.map((movie, index) => (
        <CarouselItem key={movie.id} movie={movie} genres={genreMap} priority={index === 0} />
      ))}
    </CarouselClient>
  );
}
