import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import GenreHero from '@/components/Genre/GenreHero';
import GenreMediaList from '@/components/Genre/GenreMediaList';
import RelatedGenres from '@/components/Genre/RelatedGenres';
import TopTenRow from '@/components/Genre/TopTenRow';
import SectionHeading from '@/components/Navigation/SectionHeading';
import GridSkeleton from '@/components/Skeletons/GridSkeleton';
import { buttonClass } from '@/components/ui/buttonStyles';
import { SegmentedLinks } from '@/components/ui/Segmented';
import { DEFAULT_SORT, SORT_OPTIONS, SortOption, parseSort } from '@/constants/browse';
import { moodOf } from '@/constants/genreMoods';
import { genreTint } from '@/constants/genreTints';
import { GenreIds } from '@/types';
import { MediaMode } from '@/types/mediaMode';
import { api } from '@/utils/api';
import { getImageUrl } from '@/utils/image/getImageUrl';
import { firstParam } from '@/utils/searchParams';
import { slugify } from '@/utils/stringUtils';

import type { Route } from 'next';

type TypeFilter = 'all' | MediaMode;

interface Props {
  params: Promise<{ genreName: string }>;
  searchParams: Promise<{ type?: string | string[]; sort?: string | string[] }>;
}

/** Slug → genre, keeping each side's id ("Drama" is both, "Action" movie-only, "Kids" TV-only). */
async function getGenreData(genreSlug: string) {
  const { movieGenres, tvGenres, genresMap } = await api.genre.getAllGenres();
  const movieGenre = movieGenres.find((g) => slugify(g.name) === genreSlug);
  const tvGenre = tvGenres.find((g) => slugify(g.name) === genreSlug);
  const genre = movieGenre ?? tvGenre;
  if (!genre) notFound();

  const ids: GenreIds = { movie: movieGenre?.id, tv: tvGenre?.id };
  return { name: genre.name, ids, genresMap };
}

/** "movies", "TV shows" or "movies and TV shows". */
const describeTypes = (ids: GenreIds) =>
  [ids.movie && 'movies', ids.tv && 'TV shows'].filter(Boolean).join(' and ');

const genreHref = (slug: string, type: TypeFilter, sort: SortOption): Route => {
  const params = new URLSearchParams();
  if (type !== 'all') params.set('type', type);
  if (sort !== DEFAULT_SORT) params.set('sort', sort);
  const query = params.toString();
  return `/genre/${slug}${query ? `?${query}` : ''}` as Route;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { genreName } = await params;
  const { name, ids } = await getGenreData(genreName);
  const media = await api.media.getGenreMedia(ids);
  const image =
    getImageUrl(media.find((m) => m.backdrop_path)?.backdrop_path, 'backdrop', 'w780') || undefined;

  const kinds = describeTypes(ids);
  const title = `${name} ${kinds.replace('movies', 'Movies').replace('TV shows', 'TV Shows')}`;
  const description = `Explore the best ${name} ${kinds} on Starlight. Discover trending, popular, and top-rated ${name} titles.`;

  return {
    title,
    description,
    alternates: { canonical: `/genre/${genreName}` },
    keywords: [`${name} movies`, `${name} tv shows`, `${name} genre`],
    openGraph: { title, description, type: 'website', images: image ? [{ url: image }] : [] },
    twitter: { card: 'summary_large_image', title, description, images: image ? [image] : [] },
  };
}

async function GenreResults({
  name,
  slug,
  ids,
  sort,
  genresMap,
}: {
  name: string;
  slug: string;
  ids: GenreIds;
  sort: SortOption;
  genresMap: Record<number, string>;
}) {
  const media = await api.media.getGenreMedia(ids, 1, sort);

  return (
    <GenreMediaList
      initialMedia={media}
      genreIds={ids}
      sort={sort}
      genreMap={genresMap}
      emptyState={
        <div className="flex flex-col items-center gap-[12px] py-[80px] text-center">
          <p className="text-[20px] font-semibold text-white">Nothing to show here yet</p>
          <p className="text-[15px] text-white/55">Try a different sort order.</p>
          <Link
            href={genreHref(slug, 'all', DEFAULT_SORT)}
            scroll={false}
            className={buttonClass('ghost', 'sm', 'mt-[8px]')}
          >
            Show all {name}
          </Link>
        </div>
      }
    />
  );
}

export default async function GenrePage({ params, searchParams }: Props) {
  const [{ genreName: slug }, query] = await Promise.all([params, searchParams]);
  const { name, ids, genresMap } = await getGenreData(slug);

  const hasBothTypes = Boolean(ids.movie && ids.tv);
  const requestedType = firstParam(query.type);
  const type: TypeFilter =
    hasBothTypes && (requestedType === MediaMode.MOVIE || requestedType === MediaMode.TV)
      ? requestedType
      : 'all';
  const sort = parseSort(firstParam(query.sort));
  const activeIds: GenreIds = type === 'all' ? ids : { [type]: ids[type] };

  // Ranked per type: popularity isn't comparable across the two. Same (cached) requests as the grid.
  const [topMovies, topShows] = await Promise.all([
    ids.movie ? api.media.getMedia(MediaMode.MOVIE, 1, [ids.movie]).catch(() => []) : [],
    ids.tv ? api.media.getMedia(MediaMode.TV, 1, [ids.tv]).catch(() => []) : [],
  ]);
  const heroTitles = topMovies.length > 0 ? topMovies : topShows;
  const tint = genreTint(name);

  const typeOptions = hasBothTypes
    ? (
        [
          ['all', 'All'],
          [MediaMode.MOVIE, 'Movies'],
          [MediaMode.TV, 'TV Shows'],
        ] as const
      ).map(([value, label]) => ({
        key: value,
        label,
        href: genreHref(slug, value, sort),
        active: value === type,
      }))
    : null;

  const resultsLabel = [
    SORT_OPTIONS.find((o) => o.value === sort)?.label,
    type === MediaMode.MOVIE ? 'Movies' : type === MediaMode.TV ? 'TV Shows' : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="animate-fadeIn pb-[56px] lg:pb-[96px]">
      <GenreHero
        name={name}
        tint={tint}
        moodTitle={moodOf(name)?.title}
        kinds={describeTypes(ids)}
        topTitles={heroTitles}
      />

      <div className="page-gutter pt-[32px] pb-[40px] lg:pt-[48px] lg:pb-[56px]">
        <TopTenRow genreName={name} tint={tint} movies={topMovies} shows={topShows} />
      </div>

      {/* Own wrapper so the sticky filter bar un-sticks once the grid ends. */}
      <div>
        <div className="page-gutter mb-[16px] lg:mb-[20px]">
          <SectionHeading id="browse-heading">Browse all {name}</SectionHeading>
        </div>
        <div className="bg-secondary/95 border-y border-white/[0.06] py-[16px] backdrop-blur-xl lg:sticky lg:top-[var(--nav-h)] lg:z-30">
          <div className="page-gutter flex flex-col gap-[12px] sm:flex-row sm:items-center sm:justify-between">
            {typeOptions ? <SegmentedLinks label="Show" options={typeOptions} /> : <span />}
            <SegmentedLinks
              label="Sort by"
              options={SORT_OPTIONS.map((option) => ({
                key: option.value,
                label: option.label,
                href: genreHref(slug, type, option.value),
                active: option.value === sort,
              }))}
            />
          </div>
        </div>

        <section aria-labelledby="browse-heading" className="page-gutter pt-[24px] lg:pt-[32px]">
          <p className="mb-[16px] text-[14px] font-medium tracking-[0.02em] text-white/50 lg:mb-[24px]">
            {resultsLabel}
          </p>
          {/* Keyed: a filter change shows the skeleton and resets pagination. */}
          <Suspense key={`${type}-${sort}`} fallback={<GridSkeleton />}>
            <GenreResults
              name={name}
              slug={slug}
              ids={activeIds}
              sort={sort}
              genresMap={genresMap}
            />
          </Suspense>
        </section>
      </div>

      <div className="page-gutter pt-[56px] lg:pt-[88px]">
        <Suspense fallback={null}>
          <RelatedGenres genreName={name} />
        </Suspense>
      </div>
    </div>
  );
}
