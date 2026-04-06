import { Genre, GenreResponse, GenreWithMovies, MediaMode, MovieWithLogos } from '@/types';
import { APIResponse, MediaWithDetails, TVShow } from '@/types/global';
import { fetchData } from '@/utils';

import { getImageUrl } from './image/getImageUrl';
import { getTvSeasons } from './serverActions/tvSeason';

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

export const api = {
  media: {
    search: async (query: string, page = 1) => {
      const { results } = await fetchData<APIResponse>('3', 'search/multi', {
        query: {
          query: encodeURIComponent(query),
          page,
          include_adult: 'false',
          language: 'en-US',
        },
      });

      return results.filter(
        (item) =>
          (item.media_type === 'movie' || item.media_type === 'tv') &&
          (item.poster_path || item.backdrop_path),
      );
    },

    getMedia: async (mediaMode: MediaMode, page = 1, withGenres?: number[]) => {
      const query: Record<string, string | number> = {
        page,
        sort_by: 'popularity.desc',
      };
      if (withGenres?.length) query.with_genres = withGenres.join(',');

      const { results } = await fetchData<APIResponse>('3', `discover/${mediaMode}`, {
        query,
        cache: { type: 'revalidate', seconds: 60 * 60 },
      });

      if (mediaMode === MediaMode.TV) {
        return attachTvSeasonData(results as TVShow[]);
      }

      return results.map((item) => ({ ...item, media_type: mediaMode })) as MediaWithDetails[];
    },

    getSliderData: async (mediaMode: MediaMode, endpoint: string): Promise<MediaWithDetails[]> => {
      const { results } = await fetchData<APIResponse>('3', endpoint, {
        cache: { type: 'revalidate', seconds: 60 * 60 * 24 },
      });
      console.log(mediaMode, endpoint);
      if (mediaMode === MediaMode.TV) {
        console.log('Enriching TV data with seasons...');
        return attachTvSeasonData(results as TVShow[]);
      }

      return results.map((item) => ({ ...item, media_type: mediaMode })) as MediaWithDetails[];
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
          { cache: { type: 'revalidate', seconds: 60 * 60 } },
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
        cache: { type: 'revalidate', seconds: 60 * 60 * 24 },
      });

      return {
        genres: data.genres,
        genresMap: Object.fromEntries(data.genres.map(({ id, name }) => [id, name])),
      };
    },

    getAllGenres: async () => {
      const [{ genres: movieGenres }, { genres: tvGenres }] = await Promise.all([
        api.genre.getGenres('movie'),
        api.genre.getGenres('tv'),
      ]);
      return { movieGenres, tvGenres };
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
      return await Promise.all(
        genres.map((genre) => api.genre.fetchGenreMovies(genre, seenMovieIds)),
      );
    },
  },
};
