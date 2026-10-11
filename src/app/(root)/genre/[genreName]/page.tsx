import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import GenreMediaList from '@/components/Genre/GenreMediaList';
import { LoadingSkeletons } from '@/components/Skeletons/LoadingSkeletons';
import SegmentedLinks from '@/components/ui/SegmentedLinks';
import { DEFAULT_SORT, SORT_OPTIONS, SortOption, parseSort } from '@/constants/browse';
import { slugify } from '@/utils';
import { api, GenreIds } from '@/utils/api';
import { getImageUrl } from '@/utils/image/getImageUrl';

import type { Route } from 'next';

type TypeFilter = 'all' | 'movie' | 'tv';

interface Props {
  params: Promise<{ genreName: string }>;
  searchParams: Promise<{ type?: string | string[]; sort?: string | string[] }>;
}

/**
 * Resolves a URL slug to the genre. Movie and TV genre lists overlap only partly
 * ("Drama" is both, "Action" is movie-only, "Kids" TV-only), so keep each side's id.
 */
async function getGenreData(genreSlug: string) {
  const { movieGenres, tvGenres, genresMap } = await api.genre.getAllGenres();
  const movieGenre = movieGenres.find((g) => slugify(g.name) === genreSlug);
  const tvGenre = tvGenres.find((g) => slugify(g.name) === genreSlug);
  const genre = movieGenre ?? tvGenre;
  if (!genre) notFound();

  const ids: GenreIds = { movie: movieGenre?.id, tv: tvGenre?.id };
  return { name: genre.name, ids, genresMap };
}

/** "movies", "TV shows" or "movies and TV shows" – whatever this genre actually has. */
const describeTypes = (ids: GenreIds) =>
  [ids.movie && 'movies', ids.tv && 'TV shows'].filter(Boolean).join(' and ');

const first = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);

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

  // The root layout template already appends "| Starlight".
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
            className="mt-[8px] inline-flex h-[44px] items-center rounded-[10px] border border-white/20 bg-white/[0.06] px-[20px] text-[15px] font-medium text-white transition-colors hover:bg-white/15"
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
  const requestedType = first(query.type);
  const type: TypeFilter =
    hasBothTypes && (requestedType === 'movie' || requestedType === 'tv') ? requestedType : 'all';
  const sort = parseSort(first(query.sort));
  const activeIds: GenreIds = type === 'all' ? ids : { [type]: ids[type] };

  // Hero artwork: the genre's most popular title (cached, and the same request as the
  // default results).
  const featured = await api.media.getGenreMedia(ids).catch(() => []);
  const backdrop = getImageUrl(
    featured.find((m) => m.backdrop_path)?.backdrop_path,
    'backdrop',
    'w1280',
  );

  const typeOptions = hasBothTypes
    ? (
        [
          ['all', 'All'],
          ['movie', 'Movies'],
          ['tv', 'TV Shows'],
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
    type === 'movie' ? 'Movies' : type === 'tv' ? 'TV Shows' : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="animate-fadeIn pb-[48px] lg:pb-[72px]">
      <header className="relative overflow-hidden">
        {backdrop && (
          <div aria-hidden="true" className="absolute inset-0 lg:left-auto lg:w-[72%]">
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 72vw, 100vw"
              className="object-cover object-[center_25%]"
            />
            <div className="from-secondary via-secondary/50 absolute inset-0 hidden bg-gradient-to-r via-35% to-transparent to-80% lg:block" />
            <div className="from-secondary via-secondary/60 to-secondary/20 absolute inset-0 bg-gradient-to-t via-40% lg:to-transparent" />
          </div>
        )}

        <div className="page-gutter relative flex flex-col gap-[8px] pt-[24px] pb-[32px] sm:pt-[32px] lg:min-h-[340px] lg:justify-end lg:gap-[12px] lg:pt-[56px] lg:pb-[48px]">
          <Link
            href="/genre"
            className="mb-[8px] inline-flex w-fit items-center gap-[4px] rounded-full py-[4px] pr-[10px] text-[14px] font-medium text-white/70 transition-colors hover:text-white lg:mb-auto"
          >
            <ChevronLeft aria-hidden="true" className="size-[16px]" />
            All genres
          </Link>
          <span className="border-primary/60 bg-primary/15 w-fit rounded-[4px] border px-[8px] py-[3px] text-[11px] leading-none font-bold tracking-[0.14em] text-[#ff7a6e] uppercase">
            Genre
          </span>
          <h1 className="text-[clamp(36px,5vw,64px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-white">
            {name}
          </h1>
          <p className="max-w-[56ch] text-[15px] leading-[1.6] text-pretty text-white/65 lg:text-[16px]">
            The most popular {name} {describeTypes(ids)}, updated daily.
          </p>
        </div>
      </header>

      <div className="bg-secondary/85 border-y border-white/[0.06] py-[16px] backdrop-blur-xl lg:sticky lg:top-[var(--nav-h)] lg:z-30">
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

      <section aria-labelledby="results-heading" className="page-gutter pt-[24px] lg:pt-[32px]">
        <h2
          id="results-heading"
          className="mb-[16px] text-[14px] font-medium tracking-[0.02em] text-white/50 lg:mb-[24px]"
        >
          {resultsLabel}
        </h2>
        {/* Keyed on the filters so changing them shows the skeleton and resets pagination. */}
        <Suspense key={`${type}-${sort}`} fallback={<LoadingSkeletons />}>
          <GenreResults name={name} slug={slug} ids={activeIds} sort={sort} genresMap={genresMap} />
        </Suspense>
      </section>
    </div>
  );
}
