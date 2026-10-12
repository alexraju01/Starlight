/**
 * The genres index is organised by mood ("what do I feel like?") rather than A–Z.
 * Names are TMDB genre names; any genre TMDB adds later lands in a trailing "More" group.
 */
export interface Mood {
  id: string;
  title: string;
  blurb: string;
  genres: string[];
}

export const MOODS: Mood[] = [
  {
    id: 'adrenaline',
    title: 'Adrenaline rush',
    blurb: 'Explosions, chases and edge-of-your-seat tension.',
    genres: ['Action', 'Action & Adventure', 'Adventure', 'Thriller', 'War', 'Western'],
  },
  {
    id: 'feel-good',
    title: 'Feel-good',
    blurb: 'Laughs, warmth and stories for the whole family.',
    genres: ['Comedy', 'Romance', 'Family', 'Animation', 'Kids', 'Music'],
  },
  {
    id: 'dark',
    title: 'Dark & twisted',
    blurb: 'Fear, crime and mysteries that keep you guessing.',
    genres: ['Horror', 'Crime', 'Mystery'],
  },
  {
    id: 'other-worlds',
    title: 'Other worlds',
    blurb: 'Futures, magic and the impossible made real.',
    genres: ['Science Fiction', 'Fantasy', 'Sci-Fi & Fantasy'],
  },
  {
    id: 'real-stories',
    title: 'Real stories',
    blurb: 'History, documentaries and the world as it is.',
    genres: ['Documentary', 'History', 'War & Politics', 'News', 'Reality', 'Talk'],
  },
  {
    id: 'drama',
    title: 'Drama & more',
    blurb: 'Character-driven stories and TV favourites.',
    genres: ['Drama', 'Soap', 'TV Movie'],
  },
];

/** Genres the spotlight rotates through, in order. */
export const SPOTLIGHT_GENRES = [
  'Action',
  'Science Fiction',
  'Comedy',
  'Horror',
  'Romance',
  'Animation',
];

/** The mood a genre belongs to, if any. */
export const moodOf = (genreName: string): Mood | undefined =>
  MOODS.find((mood) => mood.genres.includes(genreName));
