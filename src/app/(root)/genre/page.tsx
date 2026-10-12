import { Metadata } from 'next';
import { Suspense } from 'react';

import { GenreCard } from '@/components/Genre/GenreCollection';
import PageHeader from '@/components/Layout/PageHeader';
import SectionHeading from '@/components/Navigation/SectionHeading';
import { GenreSkeleton } from '@/components/Skeletons/LoadingSkeletons';
import { Genre } from '@/types';
import { GenreKey, Icons, slugify } from '@/utils';
import { api } from '@/utils/api';
import { getImageUrl } from '@/utils/image/getImageUrl';

import type { Route } from 'next';

export const metadata: Metadata = {
  title: 'Genres – Browse Movies & TV Categories',
  description:
    'Explore genres across movies and TV shows on Starlight. Discover action, drama, comedy, thriller, and more to find what to watch next.',

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

const byName = (genres: Genre[]) => [...genres].sort((a, b) => a.name.localeCompare(b.name));

async function GenreSections() {
  const { movieGenres, tvGenres } = await api.genre.getAllGenres();
  const movies = byName(movieGenres);
  const tv = byName(tvGenres);
  const backdrops = await api.genre.getGenreBackdrops(movies, tv);

  // Genres that exist on both sides ("Drama") open pre-filtered to the section's type.
  const sharedIds = new Set(movies.filter((m) => tv.some((t) => t.id === m.id)).map((m) => m.id));

  const sections = [
    { id: 'movie', title: 'Movie genres', genres: movies, images: backdrops.movie },
    { id: 'tv', title: 'TV genres', genres: tv, images: backdrops.tv },
  ];

  return (
    <div className="flex flex-col gap-[40px] lg:gap-[56px]">
      {sections.map((section, sectionIndex) => (
        <section
          key={section.id}
          aria-labelledby={`${section.id}-genres`}
          className="flex flex-col gap-[20px]"
        >
          <SectionHeading id={`${section.id}-genres`} count={section.genres.length}>
            {section.title}
          </SectionHeading>
          <ul className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 sm:gap-[16px] lg:grid-cols-4 2xl:grid-cols-5">
            {section.genres.map((genre, i) => (
              <li key={genre.id}>
                <GenreCard
                  name={genre.name}
                  href={
                    `/genre/${slugify(genre.name)}${sharedIds.has(genre.id) ? `?type=${section.id}` : ''}` as Route
                  }
                  backdrop={getImageUrl(section.images[i], 'backdrop', 'w780') || null}
                  icon={Icons.genreIcons[genre.name as GenreKey]}
                  priority={sectionIndex === 0 && i < 4}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function GenresPage() {
  return (
    <div className="animate-fadeIn pb-[48px] lg:pb-[72px]">
      <PageHeader
        title="Genres"
        description="From pulse-pounding action to heart-wrenching dramas — pick a mood and find your next favourite story."
      />

      <div className="page-gutter pt-[32px] lg:pt-[48px]">
        <Suspense fallback={<GenreSkeleton />}>
          <GenreSections />
        </Suspense>
      </div>
    </div>
  );
}
