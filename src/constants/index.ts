import type { Route } from 'next';

/** Main navigation, shared by the navbar and the footer. */
export const links: { name: string; href: Route }[] = [
  { name: 'Home', href: '/' },
  { name: 'Movies', href: '/movie' },
  { name: 'TV Shows', href: '/tv' },
  { name: 'Genres', href: '/genre' },
];

/** TMDB list endpoints used by the home page sliders. */
export const ENDPOINTS = {
  TRENDING_MOVIES: 'trending/movie/day',
  POPULAR_MOVIES: 'movie/popular',
  TRENDING_TV: 'trending/tv/day',
};
