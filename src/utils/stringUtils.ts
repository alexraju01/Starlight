import { Media, MediaMode } from '@/types';

export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (text: string) => {
  if (typeof text !== 'string') {
    console.warn('slugify received non-string input:', text);
    return '';
  }
  return text
    .toLowerCase()
    .normalize('NFD') // removes accents
    .replace(/[\u0300-\u036f]/g, '') // removes diacritics
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric → "-"
    .replace(/^-+|-+$/g, ''); // trim start/end hyphens
};
export const stripLeadingSlash = (path: string | null | undefined): string => {
  if (!path) return '';
  return path.startsWith('/') ? path.slice(1) : path;
};

export const displayName = (media: Media) =>
  media.media_type === MediaMode.MOVIE ? media.title : media.name;
