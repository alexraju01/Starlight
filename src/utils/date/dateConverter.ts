/**
 * "2026-07-01" → "July 2026". TMDB dates are calendar dates (parsed as UTC midnight), so
 * they're formatted in UTC – in the visitor's local zone, US visitors saw the previous month.
 */
export const dateConverter = (date: string | undefined | null): string => {
  if (!date || isNaN(Date.parse(date))) {
    return '----';
  }

  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
};
