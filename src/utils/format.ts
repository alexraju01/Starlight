/**
 * Display formatters. Each returns `null` when there is nothing meaningful to show, so
 * callers can skip the field or pick their own placeholder.
 *
 * TMDB dates are calendar dates (parsed as UTC midnight), so they're formatted in UTC – in
 * the visitor's own zone, anyone west of UTC would see the previous day.
 */

const isValidDate = (date?: string | null): date is string =>
  Boolean(date) && !Number.isNaN(Date.parse(date!));

/** 139 → "2h 19m", 45 → "45m". */
export const formatRuntime = (minutes?: number | null): string | null => {
  if (!minutes || minutes <= 0) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
};

/** A movie's runtime, or a show's typical episode length ("45m / ep"). */
export const formatMediaRuntime = (media: {
  runtime?: number;
  episode_run_time?: number[];
}): string | null => {
  const movieRuntime = formatRuntime(media.runtime);
  if (movieRuntime) return movieRuntime;
  const episodeRuntime = formatRuntime(media.episode_run_time?.[0]);
  return episodeRuntime ? `${episodeRuntime} / ep` : null;
};

/** "2024-03-14" → "14 March 2024". */
export const formatFullDate = (date?: string | null): string | null =>
  isValidDate(date)
    ? new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : null;

/** "2024-03-14" → "March 2024" (`long`) or "Mar 2024" (`short`). */
export const formatMonthYear = (
  date?: string | null,
  month: 'long' | 'short' = 'long',
): string | null =>
  isValidDate(date)
    ? new Date(date).toLocaleDateString('en-US', { month, year: 'numeric', timeZone: 'UTC' })
    : null;

/** "2024-03-14" → "2024". */
export const formatYear = (date?: string | null): string | null =>
  date && /^\d{4}/.test(date) ? date.slice(0, 4) : null;

const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });

/** "ja" → "Japanese". */
export const formatLanguage = (code?: string | null): string | null => {
  if (!code) return null;
  try {
    return languageNames.of(code) ?? null;
  } catch {
    return null;
  }
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});

/** 63000000 → "$63M". TMDB uses 0 for "unknown". */
export const formatMoney = (amount?: number | null): string | null =>
  amount && amount > 0 ? currency.format(amount) : null;

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });

/** 12345 → "12.3K". */
export const formatCount = (count: number): string => compact.format(count);

/** "3 Seasons", "1 Episode". */
export const pluralize = (count: number, noun: string): string =>
  `${count} ${noun}${count === 1 ? '' : 's'}`;
