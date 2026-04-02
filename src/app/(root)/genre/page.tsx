import { Suspense } from 'react';

import GenreCard from '@/components/Genre/GenreCollection/GenreCard';
import GenreSkeleton from '@/components/Skeletons/LoadingSkeletons/GenreSkeleton';
import { api } from '@/utils/api';
import Icons, { GenreKey } from '@/utils/icons';

async function GenreGrid() {
  const { movieGenres, tvGenres } = await api.genre.getAllGenres();

  const uniqueGenres = Array.from(
    new Map([...movieGenres, ...tvGenres].map((g) => [g.id, g])).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {uniqueGenres.map((genre, i) => (
        <GenreCard
          key={genre.id}
          name={genre.name}
          index={i}
          icon={Icons.genreIcons[genre.name as GenreKey]}
        />
      ))}
    </div>
  );
}

export default function GenrePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="relative border-b border-white/5 bg-gradient-to-b from-red-900/10 to-transparent px-6 py-16">
        <div className="lg:mx-[68px] 2xl:mx-[101px]">
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
            Browse by <span className="text-primary">Genres</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">
            From pulse-pounding action to heart-wrenching dramas, find your next favorite story.
          </p>
        </div>
      </div>

      <section className="lg:mx-[68px] 2xl:mx-[101px] px-6 py-12">
        <Suspense fallback={<GenreSkeleton />}>
          <GenreGrid />
        </Suspense>
      </section>
    </main>
  );
}
