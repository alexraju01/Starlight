import { Metadata } from 'next';
import { Suspense } from 'react';

import GenreCard from '@/components/Genre/GenreCard';
import GenreSpotlight, { SpotlightGenre } from '@/components/Genre/GenreSpotlight';
import GenreIndexSkeleton from '@/components/Skeletons/GenreIndexSkeleton';
import DragScrollList from '@/components/ui/DragScrollList';
import { MOODS, Mood, SPOTLIGHT_GENRES } from '@/constants/genreMoods';
import { genreTint } from '@/constants/genreTints';
import { ROUTES } from '@/constants/route';
import { SITE_NAME } from '@/constants/site';
import { GenreShowcaseItem } from '@/types';
import { api } from '@/utils/api';
import { genreCoverage } from '@/utils/genre';
import { gridSpanClasses } from '@/utils/gridSpan';
import Icons, { GenreKey } from '@/utils/icons';
import { getImageUrl } from '@/utils/image/getImageUrl';

export const metadata: Metadata = {
  title: 'Genres – Browse Movies & TV Categories',
  description: `Explore genres across movies and TV shows on ${SITE_NAME}. Discover action, drama, comedy, thriller, and more to find what to watch next.`,

  keywords: [
    'genres',
    'movie genres',
    'tv genres',
    'action movies',
    'drama series',
    'comedy films',
    'thriller movies',
    'browse genres',
    'entertainment categories',
  ],
};

/** Coverage rather than title counts: TMDB caps those at 20,001. */
const coverageOf = (genre: GenreShowcaseItem) => genreCoverage(genre.ids);

const posterUrls = (genre: GenreShowcaseItem) =>
  genre.posterPaths.map((path) => getImageUrl(path, 'poster', 'w185'));

function MoodSection({ mood, genres }: { mood: Mood; genres: GenreShowcaseItem[] }) {
  return (
    <section
      id={`mood-${mood.id}`}
      aria-labelledby={`mood-${mood.id}-title`}
      className="grid scroll-mt-[calc(var(--nav-h)+88px)] gap-[20px] lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-[48px]"
    >
      <div className="lg:sticky lg:top-[calc(var(--nav-h)+104px)] lg:self-start">
        <h2
          id={`mood-${mood.id}-title`}
          className="text-[24px] leading-[1.15] font-bold tracking-[-0.02em] text-white lg:text-[30px]"
        >
          {mood.title}
        </h2>
        <p className="mt-[8px] max-w-[36ch] text-[15px] leading-[1.55] text-white/60">
          {mood.blurb}
        </p>
        <p className="mt-[12px] text-[13px] font-medium tracking-[0.04em] text-white/40 uppercase">
          {genres.length} genres
        </p>
      </div>

      {/* Row height = one 4:3 tile (container units), so stretched last-row tiles match. */}
      <div className="[container-type:inline-size]">
        <ul className="grid auto-rows-[calc((100cqw-12px)/2*3/4)] grid-cols-2 gap-[12px] sm:auto-rows-[calc((100cqw-32px)/3*3/4)] sm:grid-cols-3 sm:gap-[16px]">
          {genres.map((genre, i) => (
            <li key={genre.name} className={gridSpanClasses(i, genres.length)}>
              <GenreCard
                name={genre.name}
                href={ROUTES.GENRE(genre.name)}
                backdrop={getImageUrl(genre.backdropPath, 'backdrop', 'w780') || null}
                tint={genreTint(genre.name)}
                coverage={coverageOf(genre)}
                featuredTitle={genre.featuredTitle}
                posters={posterUrls(genre)}
                icon={Icons.genreIcons[genre.name as GenreKey]}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

async function GenreIndex() {
  const genres = await api.genre.getGenreShowcase();
  const byName = new Map(genres.map((g) => [g.name, g]));

  const spotlight: SpotlightGenre[] = SPOTLIGHT_GENRES.flatMap((name) => {
    const genre = byName.get(name);
    if (!genre) return [];
    return {
      name,
      href: ROUTES.GENRE(name),
      tint: genreTint(name),
      backdrop: getImageUrl(genre.backdropPath, 'backdrop', 'w1280') || null,
      posters: genre.posterPaths.map((path) => getImageUrl(path, 'poster', 'w342')),
      coverage: coverageOf(genre),
      featuredTitle: genre.featuredTitle,
    };
  });

  // Moods in order, then anything TMDB adds later that no mood claims.
  const claimed = new Set(MOODS.flatMap((m) => m.genres));
  const sections = [
    ...MOODS.map((mood) => ({
      mood,
      genres: mood.genres.flatMap((name) => byName.get(name) ?? []),
    })),
    {
      mood: {
        id: 'more',
        title: 'More genres',
        blurb: 'Everything else worth exploring.',
        genres: [],
      },
      genres: genres.filter((g) => !claimed.has(g.name)),
    },
  ].filter((section) => section.genres.length > 0);

  return (
    <>
      <GenreSpotlight genres={spotlight} allHrefs={genres.map((g) => ROUTES.GENRE(g.name))} />

      <nav
        aria-label="Moods"
        className="bg-secondary/95 border-y border-white/[0.06] py-[14px] backdrop-blur-xl lg:sticky lg:top-[var(--nav-h)] lg:z-30"
      >
        <div className="page-gutter flex items-center gap-[16px]">
          <span className="hidden shrink-0 text-[13px] font-semibold tracking-[0.08em] text-white/40 uppercase sm:block">
            Browse by mood
          </span>
          <DragScrollList className="-mx-[16px] flex gap-[8px] overflow-x-auto px-[16px] [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            {sections.map(({ mood }) => (
              <li key={mood.id}>
                {/* Plain <a>: a same-page jump, scrolled smoothly by the browser. */}
                <a
                  href={`#mood-${mood.id}`}
                  className="inline-flex h-[36px] shrink-0 items-center rounded-full border border-white/12 bg-white/[0.04] px-[16px] text-[14px] font-medium whitespace-nowrap text-white/75 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  {mood.title}
                </a>
              </li>
            ))}
          </DragScrollList>
        </div>
      </nav>

      <div className="page-gutter flex flex-col gap-[56px] pt-[40px] lg:gap-[88px] lg:pt-[64px]">
        {sections.map(({ mood, genres: moodGenres }) => (
          <MoodSection key={mood.id} mood={mood} genres={moodGenres} />
        ))}
      </div>
    </>
  );
}

export default function GenresPage() {
  return (
    <div className="animate-fadeIn pb-[56px] lg:pb-[96px]">
      <Suspense fallback={<GenreIndexSkeleton />}>
        <GenreIndex />
      </Suspense>
    </div>
  );
}
