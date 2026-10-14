/**
 * Accent colour per genre (TMDB genre names), used to tint genre artwork so each genre has a
 * recognisable identity. Hex only – an alpha suffix is appended where used.
 */
const GENRE_TINTS: Record<string, string> = {
  Action: '#ef4444',
  'Action & Adventure': '#f97316',
  Adventure: '#f59e0b',
  Animation: '#22d3ee',
  Comedy: '#facc15',
  Crime: '#94a3b8',
  Documentary: '#a3e635',
  Drama: '#a855f7',
  Family: '#34d399',
  Fantasy: '#8b5cf6',
  History: '#d97706',
  Horror: '#dc2626',
  Kids: '#4ade80',
  Music: '#ec4899',
  Mystery: '#6366f1',
  News: '#38bdf8',
  Reality: '#fb7185',
  Romance: '#f43f5e',
  'Sci-Fi & Fantasy': '#14b8a6',
  'Science Fiction': '#06b6d4',
  Soap: '#f472b6',
  Talk: '#fbbf24',
  'TV Movie': '#3b82f6',
  Thriller: '#e11d48',
  War: '#a8a29e',
  'War & Politics': '#78716c',
  Western: '#ea580c',
};

/** Brand red for any genre TMDB adds later. */
export const genreTint = (name: string): string => GENRE_TINTS[name] ?? '#9e221a';
