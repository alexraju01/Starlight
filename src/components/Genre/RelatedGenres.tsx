import SectionHeading from '@/components/Navigation/SectionHeading';
import { moodOf } from '@/constants/genreMoods';
import { genreTint } from '@/constants/genreTints';
import { ROUTES } from '@/constants/route';
import { GenreKey, Icons, genreCoverage } from '@/utils';
import { api } from '@/utils/api';
import { gridSpanClasses } from '@/utils/gridSpan';
import { getImageUrl } from '@/utils/image/getImageUrl';

import { GenreCard } from './GenreCollection';

/**
 * "More like Horror": the other genres in the same mood, so a visitor who finishes a genre
 * has somewhere to go next instead of a dead end.
 */
export default async function RelatedGenres({ genreName }: { genreName: string }) {
  const mood = moodOf(genreName);
  if (!mood) return null;

  const showcase = await api.genre.getGenreShowcase().catch(() => []);
  const related = mood.genres
    .filter((name) => name !== genreName)
    .flatMap((name) => showcase.find((g) => g.name === name) ?? []);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-genres" className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[6px]">
        <SectionHeading id="related-genres">More like {genreName}</SectionHeading>
        <p className="pl-[16px] text-[15px] text-white/55">
          More from <span className="font-medium text-white/80">{mood.title}</span> —{' '}
          {mood.blurb.charAt(0).toLowerCase() + mood.blurb.slice(1)}
        </p>
      </div>
      {/* Row height = one 4:3 tile (container units), so stretched last-row tiles match. */}
      <div className="[container-type:inline-size]">
        <ul className="grid auto-rows-[calc((100cqw-12px)/2*3/4)] grid-cols-2 gap-[12px] sm:auto-rows-[calc((100cqw-32px)/3*3/4)] sm:grid-cols-3 sm:gap-[16px]">
          {related.map((genre, i) => (
            <li key={genre.name} className={gridSpanClasses(i, related.length)}>
              <GenreCard
                name={genre.name}
                href={ROUTES.GENRE(genre.name)}
                backdrop={getImageUrl(genre.backdropPath, 'backdrop', 'w780') || null}
                tint={genreTint(genre.name)}
                coverage={genreCoverage(genre.ids)}
                featuredTitle={genre.featuredTitle}
                posters={genre.posterPaths.map((path) => getImageUrl(path, 'poster', 'w185'))}
                icon={Icons.genreIcons[genre.name as GenreKey]}
                sizes="(min-width: 640px) 33vw, 50vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
