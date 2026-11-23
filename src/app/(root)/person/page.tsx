import { Metadata } from 'next';

import PeopleBrowser from '@/components/Person/PeopleBrowser';
import PeopleSpotlight from '@/components/Person/PeopleSpotlight';
import TrendingCastSection from '@/components/Person/TrendingCastSection';
import { SITE_NAME } from '@/constants/site';
import { api } from '@/utils/api';

export const metadata: Metadata = {
  title: 'People – Actors, Directors & Filmographies',
  description: `Find actors and directors on ${SITE_NAME}: biographies, best-known roles and complete filmographies for movies and TV.`,
  alternates: { canonical: '/person' },
};

/** The most popular person across this week's casts, and the title they're in. */
async function pickSpotlight(casts: Awaited<ReturnType<typeof api.person.getTrendingCasts>>) {
  const top = casts
    .flatMap((title) => title.cast.map((member) => ({ member, title })))
    .sort((a, b) => b.member.popularity - a.member.popularity)[0];
  if (!top) return null;
  const person = await api.person.get(top.member.id);
  return person ? { person, title: top.title, character: top.member.character } : null;
}

/** People index: a spotlight, people search, and the casts of this week's trending titles. */
export default async function PeoplePage() {
  const casts = await api.person.getTrendingCasts().catch(() => []);
  const spotlight = await pickSpotlight(casts);

  return (
    <div className="animate-fadeIn pb-[48px] lg:pb-[72px]">
      {spotlight ? (
        <PeopleSpotlight {...spotlight} />
      ) : (
        <h1 className="page-gutter pt-[48px] text-[clamp(32px,4vw,52px)] font-extrabold text-white">
          People
        </h1>
      )}

      <div className="page-gutter pt-[32px] lg:pt-[48px]">
        <PeopleBrowser>
          <div className="flex flex-col gap-[20px] lg:gap-[28px]">
            {casts.map((title) => (
              <TrendingCastSection key={`${title.mediaType}-${title.id}`} title={title} />
            ))}
          </div>
        </PeopleBrowser>
      </div>
    </div>
  );
}
