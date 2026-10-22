import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

import { WatchKind, WatchOptions } from '@/types';
import { getImageUrl } from '@/utils/image/getImageUrl';

const VERB: Record<WatchKind, string> = {
  stream: 'Stream on',
  free: 'Watch free on',
  rent: 'Rent on',
  buy: 'Buy on',
};

/** "Stream on HBO Max +2" pill in the hero; jumps to the full "Where to watch" section. */
export default function WatchSummary({ options }: { options: WatchOptions }) {
  const [best] = options.groups;
  // Name the service itself, not an add-on ("HBO Max", not "HBO Max Amazon Channel").
  const provider =
    best.providers.find((p) => !/channel|with ads/i.test(p.name)) ?? best.providers[0];
  const more = best.providers.length - 1;

  return (
    <a
      href="#where-to-watch"
      className="group inline-flex w-fit items-center gap-[10px] rounded-full border border-white/12 bg-black/30 py-[4px] pr-[14px] pl-[4px] text-[14px] text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
    >
      <Image
        src={getImageUrl(provider.logoPath, 'logo', 'w92')}
        alt=""
        width={28}
        height={28}
        className="size-[28px] rounded-full object-cover"
      />
      <span>
        {VERB[best.kind]} <span className="font-semibold text-white">{provider.name}</span>
        {more > 0 && <span className="text-white/50"> +{more}</span>}
      </span>
      <ChevronDown
        aria-hidden="true"
        className="size-[16px] text-white/50 transition-transform group-hover:translate-y-[2px]"
      />
    </a>
  );
}
