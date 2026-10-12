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
