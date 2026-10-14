import { HiRectangleStack } from 'react-icons/hi2';

import { pluralize } from '@/utils/format';

/** "3 Seasons" pill on TV cards. */
export default function SeasonBadge({ seasons }: { seasons: number }) {
  return (
    <div className="flex truncate">
      <div className="border-card-stroke bg-panel flex items-center gap-[4px] rounded-full border py-[6px] pr-[10px] pl-[6px] text-[13px] leading-[18px] text-gray-400">
        <HiRectangleStack aria-hidden="true" className="size-[18px] shrink-0" />
        <p>{pluralize(seasons, 'Season')}</p>
      </div>
    </div>
  );
}
