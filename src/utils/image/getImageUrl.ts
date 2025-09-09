/**
 * Image categories supported by TMDB.
 */
type ImageCategory = 'backdrop' | 'logo' | 'poster' | 'profile';

/**
 * Allowed image sizes for each image category.
 * These values correspond to TMDB's supported width/height presets.
 */
type ImageSizes = {
  backdrop: 'w300' | 'w780' | 'w1280' | 'original';
  logo: 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
  poster: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
  profile: 'w45' | 'w185' | 'h632' | 'original';
};

const BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Constructs a full TMDB image URL from a given path, category, and size.
 *
 * - If `path` is `null`, `undefined`, or an empty string, an empty string is returned.
 * - The `size` parameter is type-safe and restricted to the allowed values for the given `type`.
 * - The function does **not** normalize slashes: if your `path` does not start with `/`,
 *   it will be concatenated directly.
 *
 * @template T - The image category (backdrop, logo, poster, profile).
 * @template S - The size value valid for the chosen category `T`.
 *
 * @param path - The relative TMDB image path (usually begins with a leading slash).
 * @param type - The type of image (`backdrop`, `logo`, `poster`, or `profile`).
 * @param size - The desired size for the given image type (e.g., `w500`, `original`).
 *
 * @returns The full image URL as a string, or an empty string if `path` is falsy.
 *
 * @example
 * getImageUrl('/kqjL17yufvn9OVLyXYpvtyrFfak.jpg', 'poster', 'w500');
 * // → "https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg"
 *
 * @example
 * getImageUrl(null, 'poster', 'w500');
 * // → ""
 */
export const getImageUrl = <T extends ImageCategory, S extends ImageSizes[T]>(
  path: string | null | undefined,
  type: T,
  size: S,
): string => (!path ? '' : `${BASE_URL}/${size}${path}`);
