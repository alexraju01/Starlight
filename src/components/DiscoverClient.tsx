'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SearchForm } from '@/components/Forms/SearchForm';

import { MovieGrid } from './Media';

export default function DiscoverClient({
  initialMovies,
  genreMap,
  initialQuery,
}: {
  initialMovies: any[];
  genreMap: Record<number, string>;
  initialQuery: string;
}) {
  const { replace } = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (value: string) => {
    setQuery(value);
    const slug = value.trim().toLowerCase().replace(/\s+/g, '-');
    const params = new URLSearchParams();

    if (slug) params.set('search', slug);

    replace(`?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-16 px-4 py-8">
      <h2 className="text-center text-4xl font-bold text-white animate-fadeIn">
        Discover More Movies...
      </h2>

      <SearchForm query={query} onChangeAction={handleInputChange} onSubmitAction={() => {}} />

      <div className="lg:mx-[68px] 2xl:mx-[101px] px-6 py-12">
        <MovieGrid media={initialMovies} genreMap={genreMap} />
      </div>
    </div>
  );
}
