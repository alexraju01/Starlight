/**
 * Display formatters for the media details page. All return `null` when there is nothing
 * meaningful to show, so callers can simply skip the field.
 */

/** 139 → "2h 19m", 45 → "45m". */
export const formatRuntime = (minutes?: number | null): string | null => {
  if (!minutes || minutes <= 0) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
};

/** "2024-03-14" → "14 March 2024". UTC so a date-only string never shifts a day. */
export const formatFullDate = (date?: string | null): string | null => {
  if (!date || Number.isNaN(Date.parse(date))) return null;
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

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
