export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD') // removes accents
    .replace(/[\u0300-\u036f]/g, '') // removes diacritics
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric → "-"
    .replace(/^-+|-+$/g, ''); // trim start/end hyphens

export const stripLeadingSlash = (path: string | null | undefined): string => {
  if (!path) return '';
  return path.startsWith('/') ? path.slice(1) : path;
};
