type ImageCategory = 'backdrop' | 'logo' | 'poster' | 'profile';

type ImageSizes = {
  backdrop: 'w300' | 'w780' | 'w1280' | 'original';
  logo: 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
  poster: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
  profile: 'w45' | 'w185' | 'h632' | 'original';
};

const BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = <T extends ImageCategory, S extends ImageSizes[T]>(
  path: string | null | undefined,
  type: T,
  size: S,
): string => (!path ? '' : `${BASE_URL}/${size}${path}`);
