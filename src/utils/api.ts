import { DEFAULT_SORT, SortOption } from '@/constants/browse';
import {
  CastMember,
  Credits,
  Genre,
  GenreResponse,
  GenreWithMovies,
  MediaMode,
  MovieWithLogos,
} from '@/types';
import { APIResponse, MediaWithDetails, TVShow } from '@/types/global';

import { getMediaDate } from './date/formatDate';
import { fetchData } from './fetchData';
import { getImageUrl } from './image/getImageUrl';
import { interleave } from './interleave';
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

/** Raw TMDB shapes for credits (only the fields used). */
interface TvAggregateCastMember {
  id: number;
  name: string;
  profile_path: string | null;
  total_episode_count: number;
  roles?: { character: string; episode_count: number }[];
}
interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

/** Behind-the-camera roles worth showing, in order (TMDB job names). */
const KEY_CREW = [
  { label: 'Director', jobs: ['Director'] },
  { label: 'Writer', jobs: ['Screenplay', 'Writer', 'Story', 'Novel'] },
  { label: 'Composer', jobs: ['Original Music Composer'] },
];

/** Which genre id to use for each media type (movie and TV genre lists differ). */
export type GenreIds = { movie?: number; tv?: number };

/** One tile on the genres index. */
export interface GenreShowcaseItem {
  name: string;
  ids: GenreIds;
  backdropPath: string | null;
  /** The popular title the backdrop belongs to. */
  featuredTitle: string | null;
  /** Up to three of the genre's most popular posters. */
  posterPaths: string[];
}

/** Value each sort orders by, used to merge movie and TV results. */
const SORT_KEY: Record<Exclude<SortOption, 'popular'>, (item: MediaWithDetails) => number> = {
  top_rated: (item) => item.vote_average,
  newest: (item) => Date.parse(getMediaDate(item)) || 0,
};

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

    /**
     * One page of a genre's movies and/or shows (a genre can exist for only one of them),
     * merged so the combined list still follows the chosen sort.
     */
    getGenreMedia: async (
      genreIds: GenreIds,
      page = 1,
      sort: SortOption = DEFAULT_SORT,
    ): Promise<MediaWithDetails[]> => {
      const [movies, tvShows] = await Promise.all([
        genreIds.movie ? api.media.getMedia(MediaMode.MOVIE, page, [genreIds.movie], sort) : [],
        genreIds.tv ? api.media.getMedia(MediaMode.TV, page, [genreIds.tv], sort) : [],
      ]);
      // TMDB popularity isn't comparable between movies and TV (shows score far higher), so
      // "popular" alternates the two lists; ratings and dates can be merged directly.
      if (sort === 'popular') return interleave(movies, tvShows);
      const key = SORT_KEY[sort];
      return [...movies, ...tvShows].sort((a, b) => key(b) - key(a));
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

    /**
     * Cast and key crew for the details page. TV uses `aggregate_credits`, which covers the
     * whole series and gives each actor's episode count (plain credits only list the latest
     * season). Movies also get their director, writers and composer.
     */
    getCredits: async (mediaMode: MediaMode, id: number): Promise<Credits> => {
      try {
        if (mediaMode === MediaMode.TV) {
          const { cast } = await fetchData<{ cast: TvAggregateCastMember[] }>(
            '3',
            `tv/${id}/aggregate_credits`,
            { cache: { type: 'revalidate', seconds: DAY } },
          );
          return {
            cast: cast.map((person) => ({
              id: person.id,
              name: person.name,
              character: person.roles?.[0]?.character ?? '',
              profilePath: person.profile_path ?? null,
              episodeCount: person.total_episode_count,
            })),
            keyCrew: [],
          };
        }

        const { cast, crew } = await fetchData<{ cast: CastMember[]; crew: CrewMember[] }>(
          '3',
          `movie/${id}/credits`,
          { cache: { type: 'revalidate', seconds: DAY } },
        );
        return {
          cast: cast.map((person) => ({
            id: person.id,
            name: person.name,
            character: person.character,
            profilePath: person.profile_path ?? null,
          })),
          keyCrew: KEY_CREW.map(({ label, jobs }) => {
            const people = crew
              .filter((member) => jobs.includes(member.job))
              .filter((member, i, all) => all.findIndex((m) => m.id === member.id) === i)
              .slice(0, 3)
              .map((member) => ({
                id: member.id,
                name: member.name,
                profilePath: member.profile_path ?? null,
              }));
            return { job: label, people };
          }).filter((credit) => credit.people.length > 0),
        };
      } catch (error) {
        console.error(`Failed to fetch credits for ${mediaMode} ${id}:`, error);
        return { cast: [], keyCrew: [] };
      }
    },

    getSliderData: async (mediaMode: MediaMode, endpoint: string): Promise<MediaWithDetails[]> => {
      const { results } = await fetchData<APIResponse>('3', endpoint, {
        cache: { type: 'revalidate', seconds: DAY },
      });

      return withMediaType(mediaMode, results);
    },

    /**
     * Whether TMDB has recommendations for a title. Same request (and cache entry) as the
     * recommendations slider, but without the per-show season lookups, so it's cheap to await.
     */
    hasRecommendations: async (mediaMode: MediaMode, id: number): Promise<boolean> => {
      try {
        const { results } = await fetchData<APIResponse>(
          '3',
          `${mediaMode}/${id}/recommendations`,
          {
            cache: { type: 'revalidate', seconds: DAY },
          },
        );
        return results.length > 0;
      } catch {
        return false;
      }
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

    /**
     * Every genre once (movie and TV lists merged by name) for the genres index: a distinct
     * backdrop, the title it came from and top posters. One raw discover request per genre
     * (no season lookups); images never repeat if avoidable.
     */
    getGenreShowcase: async (): Promise<GenreShowcaseItem[]> => {
      const { movieGenres, tvGenres } = await api.genre.getAllGenres();

      const byName = new Map<string, { name: string; ids: GenreIds }>();
      movieGenres.forEach((g) => byName.set(g.name, { name: g.name, ids: { movie: g.id } }));
      tvGenres.forEach((g) => {
        const existing = byName.get(g.name);
        if (existing) existing.ids.tv = g.id;
        else byName.set(g.name, { name: g.name, ids: { tv: g.id } });
      });
      const genres = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));

      // Artwork from the movie list when the genre has one (richer backdrops), else TV.
      const lists = await Promise.all(
        genres.map(({ ids }) =>
          fetchData<APIResponse>('3', `discover/${ids.movie ? MediaMode.MOVIE : MediaMode.TV}`, {
            query: { with_genres: (ids.movie ?? ids.tv)!, sort_by: 'popularity.desc' },
            cache: { type: 'revalidate', seconds: DAY },
          })
            .then(({ results }) => results)
            .catch(() => []),
        ),
      );

      const used = new Set<string>();
      return genres.map((genre, i) => {
        // Prefer an image no other tile uses; reuse one rather than show none.
        const pick =
          lists[i].find((m) => m.backdrop_path && !used.has(m.backdrop_path)) ??
          lists[i].find((m) => m.backdrop_path);
        if (pick?.backdrop_path) used.add(pick.backdrop_path);

        return {
          ...genre,
          backdropPath: pick?.backdrop_path ?? null,
          featuredTitle: pick ? ('title' in pick ? pick.title : pick.name) : null,
          posterPaths: lists[i]
            .map((m) => m.poster_path)
            .filter((path): path is string => Boolean(path))
            .slice(0, 3),
        };
      });
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
