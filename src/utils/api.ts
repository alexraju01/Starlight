import { DEFAULT_SORT, SortOption } from '@/constants/browse';
import {
  CastMember,
  Genre,
  GenreResponse,
  GenreWithMovies,
  MediaMode,
  MovieWithLogos,
} from '@/types';
import { APIResponse, MediaWithDetails, TVShow } from '@/types/global';

import { fetchData } from './fetchData';
import { getImageUrl } from './image/getImageUrl';
import { getTvSeasons } from './serverActions/tvSeason';

const HOUR = 60 * 60;
const DAY = 24 * HOUR;

const toGenreMap = (genres: Genre[]): Record<number, string> =>
  Object.fromEntries(genres.map(({ id, name }) => [id, name]));

async function attachTvSeasonData<T extends TVShow>(items: T[]): Promise<MediaWithDetails[]> {
  return Promise.all(
    items.map(async (item) => {
      const seasons = item.number_of_seasons ?? (await getTvSeasons(item.id));
      return {
        ...item,
        media_type: MediaMode.TV,
        number_of_seasons: seasons,
        genre_ids: item.genre_ids ?? [],
      };
    }),
  );
}

/** TMDB discover parameters for each sort option. */
function sortQuery(mediaMode: MediaMode, sort: SortOption): Record<string, string | number> {
  const dateField = mediaMode === MediaMode.TV ? 'first_air_date' : 'primary_release_date';
  // Only titles already out – TMDB lists unreleased films that already have votes.
  const released = { [`${dateField}.lte`]: new Date().toISOString().slice(0, 10) };

  switch (sort) {
    case 'top_rated':
      // Without a vote floor, "top rated" is dominated by titles with a handful of 10/10 votes.
      return {
        sort_by: 'vote_average.desc',
        'vote_count.gte': mediaMode === MediaMode.TV ? 200 : 500,
        ...released,
      };
    case 'newest':
      // Small vote floor so brand-new obscure uploads don't fill the page.
      return {
        sort_by: `${dateField}.desc`,
        ...released,
        'vote_count.gte': 20,
      };
    default:
      return { sort_by: 'popularity.desc' };
  }
}

/** Tags list results with their media type (TV shows also get their season count). */
const withMediaType = (
  mediaMode: MediaMode,
  results: APIResponse['results'],
): Promise<MediaWithDetails[]> =>
  mediaMode === MediaMode.TV
    ? attachTvSeasonData(results as TVShow[])
    : Promise.resolve(
        results.map((item) => ({ ...item, media_type: mediaMode })) as MediaWithDetails[],
      );

export const api = {
  media: {
    search: async (query: string, page = 1): Promise<MediaWithDetails[]> => {
      const { results } = await fetchData<APIResponse>('3', 'search/multi', {
        query: {
          // URLSearchParams already encodes – encoding here as well double-encoded the query.
          query,
          page,
          include_adult: 'false',
          language: 'en-US',
        },
        cache: { type: 'revalidate', seconds: HOUR },
      });

      return results
        .filter(
          (item) =>
            (item.media_type === 'movie' || item.media_type === 'tv') &&
            (item.poster_path || item.backdrop_path),
        )
        .map((item) => ({ ...item, genre_ids: item.genre_ids ?? [] }));
    },

    getMedia: async (
      mediaMode: MediaMode,
      page = 1,
      withGenres?: number[],
      sort: SortOption = DEFAULT_SORT,
    ) => {
      const query: Record<string, string | number> = { page, ...sortQuery(mediaMode, sort) };
      if (withGenres?.length) query.with_genres = withGenres.join(',');

      const { results } = await fetchData<APIResponse>('3', `discover/${mediaMode}`, {
        query,
        cache: { type: 'revalidate', seconds: HOUR },
      });

      return withMediaType(mediaMode, results);
    },

    /** This week's trending movies and shows together, in TMDB's trending order. */
    getTrendingAll: async (): Promise<MediaWithDetails[]> => {
      const { results } = await fetchData<APIResponse>('3', 'trending/all/week', {
        cache: { type: 'revalidate', seconds: HOUR },
      });

      const [movies, tvShows] = await Promise.all([
        withMediaType(
          MediaMode.MOVIE,
          results.filter((item) => item.media_type === MediaMode.MOVIE),
        ),
        withMediaType(
          MediaMode.TV,
          results.filter((item) => item.media_type === MediaMode.TV),
        ),
      ]);

      const byKey = new Map(
        [...movies, ...tvShows].map((item) => [`${item.media_type}-${item.id}`, item]),
      );
      return results.flatMap((item) => byKey.get(`${item.media_type}-${item.id}`) ?? []);
    },

    /** Movies followed by TV shows for one genre. */
    getGenreMedia: async (genreId: number, page = 1) => {
      const [movies, tvShows] = await Promise.all([
        api.media.getMedia(MediaMode.MOVIE, page, [genreId]),
        api.media.getMedia(MediaMode.TV, page, [genreId]),
      ]);
      return [...movies, ...tvShows];
    },

    getOneMedia: async (
      mediaMode: MediaMode,
      id: string | number,
    ): Promise<MediaWithDetails | null> => {
      try {
        const details = await fetchData<MediaWithDetails>('3', `${mediaMode}/${id}`, {
          cache: { type: 'revalidate', seconds: DAY },
        });

        if (details) {
          details.media_type = mediaMode as MediaMode.MOVIE | MediaMode.TV;
          if (mediaMode === MediaMode.TV) {
            details.number_of_seasons =
              details.number_of_seasons ?? (await getTvSeasons(Number(id))) ?? undefined;
          }
        }
        return details;
      } catch (error) {
        console.error(`Failed to fetch ${mediaMode} details for ID ${id}:`, error);
        return null;
      }
    },

    getAllActors: async (mediaMode: MediaMode, id: string | number): Promise<CastMember[]> => {
      try {
        const { cast } = await fetchData<{ cast: CastMember[] }>(
          '3',
          `${mediaMode}/${id}/credits`,
          { cache: { type: 'revalidate', seconds: DAY } },
        );
        return cast || [];
      } catch (error) {
        console.error(`Failed to fetch actors for ${mediaMode} ID ${id}:`, error);
        return [];
      }
    },

    getSliderData: async (mediaMode: MediaMode, endpoint: string): Promise<MediaWithDetails[]> => {
      const { results } = await fetchData<APIResponse>('3', endpoint, {
        cache: { type: 'revalidate', seconds: DAY },
      });

      return withMediaType(mediaMode, results);
    },

    getTrending: async (mediaMode: MediaMode, page = 1, time: 'day' | 'week' = 'day') => {
      const { results } = await fetchData<APIResponse<MovieWithLogos>>(
        '3',
        `trending/${mediaMode}/${time}`,
        { page, cache: { type: 'revalidate', seconds: 60 * 10 } },
      );
      return results;
    },

    getLogos: async (mediaMode: MediaMode, mediaId: number) => {
      try {
        const { logos } = await fetchData<{ logos: { file_path: string; iso_639_1: string }[] }>(
          '3',
          `${mediaMode}/${mediaId}/images`,
          { cache: { type: 'revalidate', seconds: HOUR } },
        );

        const logo = logos?.find((l) => l.iso_639_1 === 'en') ?? logos?.[0];
        return logo?.file_path ? getImageUrl(logo.file_path, 'logo', 'w300') : undefined;
      } catch (err) {
        console.warn(`Failed to fetch logos for ${mediaMode} ${mediaId}:`, err);
        return undefined;
      }
    },
  },

  genre: {
    getGenres: async (mediaMode: string) => {
      const data = await fetchData<GenreResponse>('3', `genre/${mediaMode}/list`, {
        cache: { type: 'revalidate', seconds: DAY },
      });

      return { genres: data.genres, genresMap: toGenreMap(data.genres) };
    },

    /** Movie + TV genres, plus one id → name map covering both. */
    getAllGenres: async () => {
      const [{ genres: movieGenres }, { genres: tvGenres }] = await Promise.all([
        api.genre.getGenres('movie'),
        api.genre.getGenres('tv'),
      ]);
      return { movieGenres, tvGenres, genresMap: toGenreMap([...movieGenres, ...tvGenres]) };
    },

    fetchGenreMovies: async (genre: Genre, seenMovieIds: Set<number>): Promise<GenreWithMovies> => {
      try {
        const results = await api.media.getMedia(MediaMode.MOVIE, 1, [genre.id]);
        const uniqueMovies = results
          .filter((movie) => movie.poster_path && !seenMovieIds.has(movie.id))
          .slice(0, 4);
        uniqueMovies.forEach((movie) => seenMovieIds.add(movie.id));
        return { ...genre, movies: uniqueMovies };
      } catch (error) {
        console.error(`Failed to fetch movies for genre ${genre.name}:`, error);
        return { ...genre, movies: [] };
      }
    },

    getGenreCollection: async (): Promise<GenreWithMovies[]> => {
      const { genres } = await api.genre.getGenres('movie');
      const seenMovieIds = new Set<number>();
      return Promise.all(genres.map((genre) => api.genre.fetchGenreMovies(genre, seenMovieIds)));
    },
  },
};
