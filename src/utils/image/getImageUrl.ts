type ImageCategory = 'backdrop' | 'logo' | 'poster' | 'profile';

/** TMDB's preset sizes per image category. */
type ImageSizes = {
  backdrop: 'w300' | 'w780' | 'w1280' | 'original';
  logo: 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
  poster: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
  profile: 'w45' | 'w185' | 'h632' | 'original';
};

const BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Full TMDB image URL, or `''` when there's no path.
 * @example getImageUrl('/abc.jpg', 'poster', 'w500') // "https://image.tmdb.org/t/p/w500/abc.jpg"
 */
export const getImageUrl = <T extends ImageCategory, S extends ImageSizes[T]>(
  path: string | null | undefined,
  type: T,
  size: S,
): string => (!path ? '' : `${BASE_URL}/${size}${path}`);

/**
 * `srcset` from TMDB's fixed sizes (Next's image optimiser is off), or `''` without a path.
 * @example getImageSrcSet(path, 'poster', [['w500', 500], ['w780', 780]])
 */
export const getImageSrcSet = <T extends ImageCategory>(
  path: string | null | undefined,
  type: T,
  candidates: [size: ImageSizes[T], width: number][],
): string =>
  path
    ? candidates.map(([size, width]) => `${getImageUrl(path, type, size)} ${width}w`).join(', ')
    : '';
