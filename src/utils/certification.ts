import { MediaWithDetails } from '@/types/global';
import { MediaMode } from '@/types/mediaMode';

/** TMDB release types, most representative first: theatrical, limited, digital, physical, TV. */
const RELEASE_TYPE_ORDER = [3, 2, 4, 5, 6, 1];

export interface Certification {
  /** e.g. "15", "PG-13", "TV-MA". */
  rating: string;
  /** ISO 3166-1 country the rating is from. */
  region: string;
}

const ratingIn = (media: MediaWithDetails, region: string): string | null => {
  if (media.media_type === MediaMode.TV) {
    return media.content_ratings?.results.find((r) => r.iso_3166_1 === region)?.rating || null;
  }
  const releases = media.release_dates?.results.find((r) => r.iso_3166_1 === region)?.release_dates;
  const rated = releases?.filter((r) => r.certification.trim());
  if (!rated?.length) return null;
  // A film can be rated differently per release (e.g. limited 15, cinema 18): prefer the main one.
  const best = [...rated].sort(
    (a, b) => RELEASE_TYPE_ORDER.indexOf(a.type) - RELEASE_TYPE_ORDER.indexOf(b.type),
  )[0];
  return best.certification.trim();
};

/** The title's age rating in the visitor's country, else the UK's, else the US's. */
export function getCertification(media: MediaWithDetails, region: string): Certification | null {
  for (const candidate of [...new Set([region, 'GB', 'US'])]) {
    const rating = ratingIn(media, candidate);
    if (rating) return { rating, region: candidate };
  }
  return null;
}
