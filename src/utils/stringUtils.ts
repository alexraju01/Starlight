export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/** "Science Fiction" → "science-fiction"; accents are dropped ("Amélie" → "amelie"). */
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const stripLeadingSlash = (path: string | null | undefined): string => {
  if (!path) return '';
  return path.startsWith('/') ? path.slice(1) : path;
};

/** Cuts at a word boundary so search snippets never end mid-word. */
export const truncate = (text: string, max: number) =>
  text.length <= max
    ? text
    : `${text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[\s.,;:!?–-]+$/, '')}…`;
