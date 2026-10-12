import SectionHeading from '@/components/Navigation/SectionHeading';
import ImageWithFallback from '@/components/Skeletons/BrokenImage/ImageWithFallback';
import { CastMember } from '@/types/cast';
import { getImageUrl } from '@/utils/image/getImageUrl';

interface Props {
  castList: CastMember[];
}

/** Top-billed cast as a swipeable row of portrait cards. */
export default function CastContainer({ castList }: Props) {
  if (!castList?.length) return null;

  return (
    <section aria-labelledby="cast-heading" className="flex flex-col gap-[20px]">
      <SectionHeading id="cast-heading">Top Cast</SectionHeading>

      <ul className="scroll-row">
        {castList.map((cast) => (
          <li
            key={cast.credit_id}
            className="w-[124px] shrink-0 snap-start sm:w-[140px] lg:w-[152px]"
          >
            <div className="bg-card-bg relative aspect-[2/3] overflow-hidden rounded-[12px] ring-1 ring-white/[0.06]">
              <ImageWithFallback
                src={getImageUrl(cast.profile_path, 'profile', 'w185')}
                alt={cast.name}
              />
            </div>
            <p className="mt-[10px] line-clamp-1 text-[14px] leading-[1.4] font-semibold text-white">
              {cast.name}
            </p>
            {cast.character && (
              <p className="mt-[2px] line-clamp-2 text-[13px] leading-[1.4] text-white/55">
                {cast.character}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
