'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { MovieGrid } from '@/components';
import { SearchForm } from '@/components/Forms/SearchForm';
import { useAllGenres } from '@/hooks/useAllGenres';
import { useSearchMedia } from '@/hooks/useSearchMedia';

export default function DiscoverPage() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const rawQuery = searchParams.get('search') ?? '';
  const initialQuery = rawQuery.replace(/-/g, ' ');
  const [query, setQuery] = useState(initialQuery);

  const { results: movies } = useSearchMedia(query);
  const genreMap = useAllGenres();

  const genresLoaded =
    Object.keys(genreMap.movie).length > 0 && Object.keys(genreMap.tv).length > 0;

  const handleInputChange = (value: string) => {
    const params = new URLSearchParams();
    params.set('search', value);
    setQuery(value);
    replace(`?${params.toString()}`);
  };
  // lg:mx-[68px] 2xl:mx-[101px] px-6 py-12
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-16 px-4 py-8">
      <h2 className="text-center text-4xl font-bold text-white animate-fadeIn drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
        Discover More Movies...
      </h2>

      <SearchForm query={query} onChangeAction={handleInputChange} onSubmitAction={() => {}} />

      {genresLoaded ? (
        <div className="lg:mx-[68px] 2xl:mx-[101px] px-6 py-12">
          <MovieGrid media={movies} />
        </div>
      ) : (
        <p className="text-white text-2xl">Loading genres...</p>
      )}
    </div>
  );
}
