import SectionHeading from '@/components/Navigation/SectionHeading';
import ScrollRow from '@/components/ui/ScrollRow';
import { Credits } from '@/types/cast';
import { pluralize } from '@/utils/mediaFormat';

import PersonAvatar from './PersonAvatar';

interface Props {
  credits: Credits;
}

/**
 * Top cast as round portraits in a swipeable row (arrows on larger screens, no scrollbar),
 * with each actor's role – and for TV, how many episodes they're in – followed by the key
 * people behind the camera.
 */
export default function CastContainer({ credits }: Props) {
  const { cast, keyCrew } = credits;
  if (cast.length === 0 && keyCrew.length === 0) return null;

  return (
    <div className="flex flex-col gap-[28px] lg:gap-[32px]">
      {cast.length > 0 && (
        <section aria-labelledby="cast-heading">
          <ScrollRow
            heading={<SectionHeading id="cast-heading">Top Cast</SectionHeading>}
            label="Top cast"
            listClassName="gap-[4px] pt-[4px] pb-[8px] lg:gap-[8px]"
          >
            {cast.map((person) => (
              <li
                key={person.id}
                className="flex w-[116px] shrink-0 snap-start flex-col items-center text-center lg:w-[132px]"
              >
                <PersonAvatar
                  name={person.name}
                  profilePath={person.profilePath}
                  sizeClass="size-[96px] lg:size-[112px]"
                  sizes="112px"
                />
                <p className="mt-[12px] line-clamp-2 text-[14px] leading-[1.3] font-semibold text-white">
                  {person.name}
                </p>
                {person.character && (
                  <p className="mt-[4px] line-clamp-2 text-[13px] leading-[1.35] text-white/55">
                    {person.character}
                  </p>
                )}
                {person.episodeCount ? (
                  <p className="mt-[6px] rounded-full bg-white/[0.06] px-[8px] py-[2px] text-[11px] font-medium text-white/50">
                    {pluralize(person.episodeCount, 'episode')}
                  </p>
                ) : null}
              </li>
            ))}
          </ScrollRow>
        </section>
      )}

      {keyCrew.length > 0 && (
        <section aria-labelledby="crew-heading">
          <h3
            id="crew-heading"
            className="text-[12px] font-semibold tracking-[0.08em] text-white/40 uppercase"
          >
            Behind the camera
          </h3>
          <ul className="mt-[14px] grid grid-cols-2 gap-[10px] sm:flex sm:flex-wrap sm:gap-[12px]">
            {keyCrew.flatMap((credit) =>
              credit.people.map((person) => (
                <li
                  key={`${credit.job}-${person.id}`}
                  className="flex min-w-0 items-center gap-[10px] rounded-[14px] border border-white/[0.08] bg-white/[0.03] py-[6px] pr-[12px] pl-[6px] sm:gap-[12px] sm:rounded-full sm:pr-[18px]"
                >
                  <PersonAvatar
                    name={person.name}
                    profilePath={person.profilePath}
                    sizeClass="size-[38px]"
                    sizes="44px"
                    initialsClass="text-[13px]"
                  />
                  <div className="min-w-0 leading-[1.25]">
                    <p className="line-clamp-2 text-[14px] font-semibold text-white sm:line-clamp-1">
                      {person.name}
                    </p>
                    <p className="text-[12px] text-white/50">{credit.job}</p>
                  </div>
                </li>
              )),
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
