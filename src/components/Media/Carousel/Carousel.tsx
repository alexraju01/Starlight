import { Genre, MediaMode, MoviesWithLogos } from '@/types';
import { fetchData, mapGenres } from '@/utils';
import { getImageUrl } from '@/utils/image/getImageUrl';

import CarouselClient from './CarouselClient';

type GenreResponse = { genres: Genre[] };
type TrendingMediaResponse = { results: MoviesWithLogos[] };
type ImageResponse = { logos: { file_path: string; iso_639_1: string }[] };

interface Props {
  mediaMode: MediaMode;
}

// Fetches the genre map for a given media mode.
const getGenreMap = async (mediaMode: MediaMode) => {
  const genres = await fetchData<GenreResponse>('3', `genre/${mediaMode}/list`);
  return mapGenres(genres.genres);
};

// Fetches trending media for a given media mode, limited to a max count.
const getTrendingMedia = async (mediaMode: MediaMode, limit = 9) => {
  const trending = await fetchData<TrendingMediaResponse>('3', `trending/${mediaMode}/week`);
  return trending.results.slice(0, limit);
};

// Fetches an English logo for a single media item (falls back to first available).
const getLogoImageUrl = async (mediaMode: MediaMode, mediaId: number) => {
  try {
    const { logos } = await fetchData<ImageResponse>('3', `${mediaMode}/${mediaId}/images`);
    if (!logos?.length) return undefined;

    const englishLogo = logos.find((l) => l.iso_639_1 === 'en');
    const selectedLogo = englishLogo || logos[0];
    return selectedLogo?.file_path
      ? `${getImageUrl(selectedLogo.file_path, 'logo', 'w300')}`
      : undefined;
  } catch (err) {
    console.warn(`Failed to fetch logos for ${mediaMode} ID ${mediaId}:`, err);
    return undefined;
  }
};

//  Enhances a list of media with logoImage URLs in parallel.
//  Uses Promise.allSettled to avoid failing the whole batch.
const attachLogos = async (
  mediaMode: MediaMode,
  items: MoviesWithLogos[],
): Promise<MoviesWithLogos[]> => {
  // Run all logo fetches in parallel with Promise.allSettled
  const results = await Promise.allSettled(
    items.map(async (item) => {
      // Try to get the logo image URL for this item
      const logoImage = await getLogoImageUrl(mediaMode, item.id);
      // Return the movie object with logoImage if found
      return { ...item, ...(logoImage ? { logoImage } : {}) };
    }),
  );

  return results.map((status, index) =>
    status.status === 'fulfilled' ? status.value : items[index],
  );
};

// Top-level loader that returns everything the Carousel needs.
const loadCarouselData = async (mediaMode: MediaMode) => {
  const [genreMap, trending] = await Promise.all([
    getGenreMap(mediaMode),
    getTrendingMedia(mediaMode),
  ]);

  const moviesWithLogos = await attachLogos(mediaMode, trending);
  return { genreMap, moviesWithLogos };
};

const Carousel = async ({ mediaMode }: Props) => {
  try {
    const { genreMap, moviesWithLogos } = await loadCarouselData(mediaMode);
    return <CarouselClient movies={moviesWithLogos} genres={genreMap} />;
  } catch (err) {
    console.error('Error rendering carousel:', err);
    return <p className="text-white">Failed to load carousel.</p>;
  }
};
export default Carousel;
