import Image from 'next/image';
import Link from 'next/link';

import SectionHeading from '@/components/Navigation/SectionHeading';
import ScrollRow from '@/components/ui/ScrollRow';
import { ROUTES } from '@/constants/route';
import { PersonCredit } from '@/types';
import { formatYear } from '@/utils/format';
import { getImageUrl } from '@/utils/image/getImageUrl';

/** The person's best-known titles as a scrollable poster row. */
export default function KnownForRow({ credits }: { credits: PersonCredit[] }) {
  if (credits.length === 0) return null;

  return (
    <section aria-labelledby="known-for-heading">
      <ScrollRow
        heading={<SectionHeading id="known-for-heading">Known for</SectionHeading>}
        label="Known for"
        listClassName="gap-[16px] pt-[4px] pb-[8px]"
      >
        {credits.map((credit) => (
          <li
            key={`${credit.mediaType}-${credit.id}`}
            className="w-[132px] shrink-0 snap-start sm:w-[148px]"
          >
            <Link
              href={ROUTES.MEDIA(credit.mediaType, credit.id, credit.title)}
              className="group block"
            >
              <div className="bg-card-bg relative aspect-[2/3] overflow-hidden rounded-[12px] ring-1 ring-white/[0.06] transition-[box-shadow] group-hover:ring-white/30">
                <Image
                  src={getImageUrl(credit.posterPath, 'poster', 'w342')}
                  alt=""
                  fill
                  sizes="148px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-[10px] line-clamp-1 text-[14px] leading-[1.4] font-semibold text-white">
                {credit.title}
              </p>
              <p className="mt-[2px] line-clamp-1 text-[13px] leading-[1.4] text-white/55">
                {[formatYear(credit.date), credit.role].filter(Boolean).join(' · ')}
              </p>
            </Link>
          </li>
        ))}
      </ScrollRow>
    </section>
  );
}
