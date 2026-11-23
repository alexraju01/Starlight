import { MediaMode } from '@/types/mediaMode';

import type { PersonCredit } from '@/types';
import type { TmdbPersonCredit } from '@/types/person';

/** TMDB TV genres that are appearances, not roles: Talk, News. */
const APPEARANCE_GENRES = new Set([10767, 10763]);
const SELF_ROLE = /^(self|himself|herself|themselves)\b/i;
const KNOWN_FOR_COUNT = 12;

const isAppearance = (credit: TmdbPersonCredit) =>
  credit.genre_ids?.some((id) => APPEARANCE_GENRES.has(id)) ||
  SELF_ROLE.test(credit.character ?? '');

const toCredit = (credit: TmdbPersonCredit, department: string): PersonCredit => ({
  mediaType: credit.media_type,
  id: credit.id,
  title: (credit.media_type === MediaMode.MOVIE ? credit.title : credit.name) ?? '',
  date: (credit.media_type === MediaMode.MOVIE ? credit.release_date : credit.first_air_date) ?? '',
  posterPath: credit.poster_path,
  backdropPath: credit.backdrop_path,
  voteCount: credit.vote_count,
  role: (department === 'Acting' ? credit.character : credit.job) ?? '',
  department,
  episodeCount: credit.episode_count,
});

/** Newest first; unannounced (no date) at the top, as they're the most recent. */
const byDateDesc = (a: PersonCredit, b: PersonCredit) =>
  (b.date || '9999').localeCompare(a.date || '9999');

/**
 * TMDB's combined credits → one entry per title and department. Talk-show and "Himself"
 * appearances are dropped, and several jobs on one title ("Producer", "Writer") merge.
 */
export function normaliseCredits(cast: TmdbPersonCredit[], crew: TmdbPersonCredit[]) {
  const merged = new Map<string, PersonCredit>();
  const add = (raw: TmdbPersonCredit, department: string) => {
    if (raw.media_type !== MediaMode.MOVIE && raw.media_type !== MediaMode.TV) return;
    const credit = toCredit(raw, department);
    const key = `${credit.mediaType}-${credit.id}-${department}`;
    const existing = merged.get(key);
    if (!existing) merged.set(key, credit);
    else if (credit.role && !existing.role.split(', ').includes(credit.role)) {
      existing.role = existing.role ? `${existing.role}, ${credit.role}` : credit.role;
    }
  };

  cast.filter((c) => !isAppearance(c)).forEach((c) => add(c, 'Acting'));
  crew.forEach((c) => add(c, c.department ?? 'Crew'));
  return [...merged.values()].sort(byDateDesc);
}

/** Best-known titles (most votes) in the person's main department, one per title. */
export function pickKnownFor(credits: PersonCredit[], department: string): PersonCredit[] {
  const pool = credits.filter((c) => c.department === department && c.posterPath);
  const source = pool.length > 0 ? pool : credits.filter((c) => c.posterPath);
  const seen = new Set<string>();
  return [...source]
    .sort((a, b) => b.voteCount - a.voteCount)
    .filter((c) => !seen.has(`${c.mediaType}-${c.id}`) && seen.add(`${c.mediaType}-${c.id}`))
    .slice(0, KNOWN_FOR_COUNT);
}
