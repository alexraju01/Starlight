import Link from 'next/link';

import PersonAvatar from '@/components/Media/CastContainer/PersonAvatar';
import { ROUTES } from '@/constants/route';
import { PersonSummary } from '@/types';

/** Round portrait, name and best-known titles; links to the person's page. */
export default function PersonCard({ person }: { person: PersonSummary }) {
  return (
    <Link
      href={ROUTES.PERSON(person.id, person.name)}
      className="group flex flex-col items-center rounded-[12px] p-[4px] text-center"
    >
      <PersonAvatar
        name={person.name}
        profilePath={person.profilePath}
        sizeClass="size-[112px] sm:size-[128px] lg:size-[144px]"
        sizes="144px"
        initialsClass="text-[32px]"
      />
      <p className="mt-[12px] line-clamp-2 text-[15px] leading-[1.3] font-semibold text-white decoration-white/40 underline-offset-2 group-hover:underline">
        {person.name}
      </p>
      {person.knownFor.length > 0 && (
        <p className="mt-[4px] line-clamp-2 text-[13px] leading-[1.4] text-white/55">
          {person.knownFor.slice(0, 2).join(', ')}
        </p>
      )}
    </Link>
  );
}
