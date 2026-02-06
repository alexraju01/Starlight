import { Genre, MediaMode } from '@/types';
import { fetchData, mapGenres } from '@/utils';
import { api } from '@/utils/api';
import { getImageUrl } from '@/utils/image/getImageUrl';

import CarouselClient from './CarouselClient';

type GenreResponse = { genres: Genre[] };
type ImageResponse = {
  logos: { file_path: string; iso_639_1: string }[];
};

interface Props {
  mediaMode: MediaMode;
}

const getLogoImageUrl = async (
  mediaMode: MediaMode,
  mediaId: number,
): Promise<string | undefined> => {
  try {
    const { logos } = await fetchData<ImageResponse>('3', `${mediaMode}/${mediaId}/images`);

    const logo = logos?.find((l) => l.iso_639_1 === 'en') ?? logos?.[0];

    return logo?.file_path ? getImageUrl(logo.file_path, 'logo', 'w300') : undefined;
  } catch {
    return undefined;
  }
};

const loadCarouselData = async (mediaMode: MediaMode) => {
  const [{ genres }, trendingMedia] = await Promise.all([
    fetchData<GenreResponse>('3', `genre/${mediaMode}/list`),
    api.getTrending(mediaMode, 1, 'week'),
    // fetchData<TrendingMediaResponse>('3', `trending/${mediaMode}/week`),
  ]);

  const movies = await Promise.all(
    trendingMedia.slice(0, 9).map(async (item) => {
      const logoImage = await getLogoImageUrl(mediaMode, item.id);
      return logoImage ? { ...item, logoImage } : item;
    }),
  );

  return {
    genreMap: mapGenres(genres),
    moviesWithLogos: movies,
  };
};

const Carousel = async ({ mediaMode }: Props) => {
  const { genreMap, moviesWithLogos } = await loadCarouselData(mediaMode);
  return <CarouselClient movies={moviesWithLogos} genres={genreMap} />;
};

export default Carousel;
