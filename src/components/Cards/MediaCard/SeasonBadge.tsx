import { HiRectangleStack } from 'react-icons/hi2';

import { pluralize } from '@/utils/format';

/** "3 Seasons" pill on TV cards. */
export default function SeasonBadge({ seasons }: { seasons: number }) {
  return (
    <div className="flex truncate md:text-lg">
      <div className="flex-center border-card-stroke bg-panel gap-[4px] rounded-[51px] border py-[6px] pr-[10px] pl-[6px] text-xl text-gray-400">
        <span aria-hidden="true">
          <HiRectangleStack size={18} />
        </span>
        <p className="font-md">{pluralize(seasons, 'Season')}</p>
      </div>
    </div>
  );
}
